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

        // 1. Pick two distinct random indices from positions array
        const heroIdx = Math.floor(Math.random() * positions.length);
        let villainIdx;
        do {
            villainIdx = Math.floor(Math.random() * positions.length);
        } while (villainIdx === heroIdx);

        const heroPos = positions[heroIdx];
        const villainPos = positions[villainIdx];

        // 2. Rotation: visually move hero to seat index 3 (bottom-right on desktop)
        const rot = (3 - heroIdx + 6) % 6;
        setRotationOffset(rot);

        // 3. Set roles (completely fresh, no merging)
        setRoles({
            [heroPos.id]: 'hero',
            [villainPos.id]: 'villain'
        });

        // 4. Generate Hero's 2 pocket cards
        const hCards = getRandomCards(2);
        setHeroCards(hCards);

        // 5. Board cards: only generated for flop stage
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
        setRoles({});
        setRotationOffset(0);
    };

    const handleSetRole = (posId, role) => {
        setRoles(prev => {
            const newRoles = { ...prev };
            Object.keys(newRoles).forEach(id => {
                if (newRoles[id] === role) delete newRoles[id];
            });
            newRoles[posId] = role;
            return newRoles;
        });
    };

    const handleClearRole = (posId) => {
        setRoles(prev => {
            const newRoles = { ...prev };
            delete newRoles[posId];
            return newRoles;
        });
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
                                        <div className="flex items-center gap-2 font-semibold text-[#8a8a8a]">
                                            <p className="text-xs">Starting spot</p>
                                            <i className="bi bi-info-circle text-xs"></i>
                                        </div>
                                        <div className="flex bg-[#252525] rounded-lg border border-[#3f3f3f]">
                                            <button onClick={() => setStage('preflop')}
                                                className={`px-4 py-1 rounded-md rounded-r-none font-semibold text-sm transition-all ${stage === 'preflop'
                                                    ? 'bg-[#fcd982] text-[#181818] shadow-lg'
                                                    : 'text-gray-400 hover:text-gray-200'
                                                    }`}
                                            >
                                                Preflop
                                            </button>
                                            <button onClick={() => setStage('flop')}
                                                className={`px-4 py-1 rounded-md rounded-l-none font-semibold text-sm transition-all ${stage === 'flop'
                                                    ? 'bg-[#fcd982] text-[#181818] shadow-lg'
                                                    : 'text-gray-400 hover:text-gray-200'
                                                    }`}
                                            >
                                                Flop
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleStart}
                                        className="flex items-center bg-[#fcd982] hover:bg-[#ffeec4] hover:text-[#181818] text-[#181818] font-bold py-1 px-4 rounded-md transition-all group"
                                    >
                                        <i className="bi bi-play-fill text-2xl mr-2"></i>
                                        START
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={handleStop}
                                    className="flex items-center bg-[#fcd982] hover:bg-[#ffeec4] hover:text-[#181818] text-[#181818] font-bold py-1 px-4 rounded-md transition-all group"
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
