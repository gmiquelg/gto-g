import { useState, useEffect } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import PageContainer from '@/Layouts/PageLayout';
import Table from '@/Components/Trainer/Table';

const Train = () => {
    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stage, setStage] = useState('preflop');
    const [cards, setCards] = useState([]);
    const [roles, setRoles] = useState({});
    const [heroCards, setHeroCards] = useState([]);
    const [isTraining, setIsTraining] = useState(false);
    const [rotationOffset, setRotationOffset] = useState(0);
    const [manualSelections, setManualSelections] = useState({});

    useEffect(() => {
        fetch('/api/train/positions')
            .then(res => res.json())
            .then(data => {
                setPositions(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch positions", err);
                setLoading(false);
            });
    }, []);

    const getRandomCards = (count, exclude = []) => {
        const suits = ['s', 'h', 'd', 'c'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
        const result = [];
        const used = new Set(exclude.map(c => `${c.value}${c.suit}`));

        while (result.length < count) {
            const suit = suits[Math.floor(Math.random() * suits.length)];
            const value = values[Math.floor(Math.random() * values.length)];
            const key = `${value}${suit}`;
            if (!used.has(key)) {
                used.add(key);
                result.push({ value, suit });
            }
        }
        return result;
    };

    const handleStart = () => {
        if (positions.length < 2) return;

        // 1. Identify current manual selections
        let heroPos = null;
        let villainPos = null;

        Object.entries(roles).forEach(([posId, role]) => {
            const pos = positions.find(p => String(p.id) === String(posId));
            if (role === 'hero') heroPos = pos;
            if (role === 'villain') villainPos = pos;
        });

        // 2. Determine final positions (randomize if not selected)
        let finalHeroPos = heroPos;
        let finalVillainPos = villainPos;

        if (!finalHeroPos && !finalVillainPos) {
            const heroIdx = Math.floor(Math.random() * positions.length);
            finalHeroPos = positions[heroIdx];
            let villainIdx;
            do {
                villainIdx = Math.floor(Math.random() * positions.length);
            } while (villainIdx === heroIdx);
            finalVillainPos = positions[villainIdx];
        } else if (!finalHeroPos) {
            const available = positions.filter(p => String(p.id) !== String(finalVillainPos.id));
            finalHeroPos = available[Math.floor(Math.random() * available.length)];
        } else if (!finalVillainPos) {
            const available = positions.filter(p => String(p.id) !== String(finalHeroPos.id));
            finalVillainPos = available[Math.floor(Math.random() * available.length)];
        }

        // 3. Rotation: visually move hero to seat index 3 (bottom-right on desktop)
        const finalHeroIdx = positions.findIndex(p => String(p.id) === String(finalHeroPos.id));
        const rot = (3 - finalHeroIdx + 6) % 6;
        setRotationOffset(rot);

        // 4. Set roles (completely fresh, no merging)
        setRoles({
            [finalHeroPos.id]: 'hero',
            [finalVillainPos.id]: 'villain'
        });

        // 5. Generate Hero's 2 pocket cards
        const hCards = getRandomCards(2);
        setHeroCards(hCards);

        // 6. Board cards: only generated for flop stage
        if (stage === 'flop') {
            setCards(getRandomCards(3, hCards));
        } else {
            setCards([]);
        }

        setIsTraining(true);
    };

    const handleStop = () => {
        setIsTraining(false);
        setCards([]);
        setHeroCards([]);
        setRoles({ ...manualSelections });
        setRotationOffset(0);
    };

    const handleSetRole = (posId, role) => {
        const updateRoles = (prev) => {
            const newRoles = { ...prev };
            Object.keys(newRoles).forEach(id => {
                if (newRoles[id] === role) delete newRoles[id];
            });
            newRoles[posId] = role;
            return newRoles;
        };
        setRoles(updateRoles);
        setManualSelections(updateRoles);
    };

    const handleClearRole = (posId) => {
        const clearRole = (prev) => {
            const newRoles = { ...prev };
            delete newRoles[posId];
            return newRoles;
        };
        setRoles(clearRole);
        setManualSelections(clearRole);
    };

    return (
        <MainLayout title="Train">
            <div className="flex flex-col w-full">
                <PageContainer>
                    <div className="flex flex-col items-center mt-[10rem]">
                        <Table
                            positions={positions}
                            loading={loading}
                            cards={cards}
                            roles={roles}
                            isTraining={isTraining}
                            heroCards={heroCards}
                            rotationOffset={rotationOffset}
                            onSetRole={handleSetRole}
                            onClearRole={handleClearRole}
                        />

                        {/* Training Settings / Controls */}
                        <div className="flex flex-col items-center mt-[6rem] gap-8">
                            {!isTraining ? (
                                <>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="flex items-center gap-2 font-semibold text-neutral-600">
                                            <p className="text-xs">Starting spot</p>
                                            <i className="bi bi-info-circle text-xs"></i>
                                        </div>
                                        <div className="flex bg-neutral-200 rounded-lg border border-neutral-400">
                                            <button onClick={() => setStage('preflop')}
                                                className={`px-4 py-1 rounded-md rounded-r-none font-semibold text-sm transition-all ${stage === 'preflop'
                                                    ? 'bg-brand-100 text-neutral-100 shadow-lg'
                                                    : 'text-gray-400 hover:text-gray-200'
                                                    }`}
                                            >
                                                Preflop
                                            </button>
                                            <button onClick={() => setStage('flop')}
                                                className={`px-4 py-1 rounded-md rounded-l-none font-semibold text-sm transition-all ${stage === 'flop'
                                                    ? 'bg-brand-100 text-neutral-100 shadow-lg'
                                                    : 'text-gray-400 hover:text-gray-200'
                                                    }`}
                                            >
                                                Flop
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleStart}
                                        className="flex items-center bg-brand-100 hover:bg-brand-200 hover:text-neutral-100 text-neutral-100 font-bold py-1 px-4 rounded-md transition-all group"
                                    >
                                        <i className="bi bi-play-fill text-2xl mr-2"></i>
                                        START
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={handleStop}
                                    className="flex items-center bg-brand-100 hover:bg-brand-200 hover:text-neutral-100 text-neutral-100 font-bold py-1 px-4 rounded-md transition-all group"
                                >
                                    <i className="bi bi-stop-fill text-2xl mr-2"></i>
                                    STOP
                                </button>
                            )}
                        </div>
                    </div>
                </PageContainer>
            </div>
        </MainLayout>
    );
};

export default Train;
