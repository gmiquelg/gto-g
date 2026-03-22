import { useState, useEffect } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import PageContainer from '@/Layouts/PageLayout';
import RangeGrid from '@/Components/Study/RangeGrid';

const Study = () => {
    const [positions, setPositions] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [ranges, setRanges] = useState([]);
    const [selectedRange, setSelectedRange] = useState(null);
    const [rangeActions, setRangeActions] = useState([]);

    useEffect(() => {
        fetch('/api/study/positions')
            .then(res => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
            .then(data => setPositions(Array.isArray(data) ? data : []))
            .catch(err => console.error("Failed to fetch positions", err));
    }, []);

    useEffect(() => {
        if (!selectedPosition) return;
        fetch(`/api/study/ranges/${selectedPosition.id}`)
            .then(res => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
            .then(data => { setRanges(Array.isArray(data) ? data : []); setSelectedRange(null); setRangeActions([]); })
            .catch(err => console.error("Failed to fetch ranges", err));
    }, [selectedPosition]);

    useEffect(() => {
        if (!selectedRange) return;
        fetch(`/api/study/range-actions/${selectedRange.id}`)
            .then(res => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
            .then(data => setRangeActions(Array.isArray(data) ? data : []))
            .catch(err => console.error("Failed to fetch range actions", err));
    }, [selectedRange]);

    const getButtonLabel = (range) => {
        if (range.situationType === 'RFI') return 'RFI';
        return `${range.description}`;
    };

    return (
        <MainLayout title="Study">
            <div className="flex flex-col w-full">
                <PageContainer>
                    <div className="flex flex-col gap-2 mt-[2rem]">

                        <div className="border-t-[0.1rem] my-1 border-neutral-400"></div>

                        <div className="flex gap-2">
                            {positions.map((position) => (
                                <button
                                    key={position.id}
                                    onClick={() => {
                                        if (selectedPosition?.id === position.id) return;
                                        setSelectedPosition(position);
                                        setRanges([]);
                                    }}
                                    className={`px-3 py-1 rounded-md ${selectedPosition?.id === position.id ? 'button-primary' : 'button-secondary'}`}
                                >
                                    {position.name}
                                </button>
                            ))}
                        </div>

                        <div className="border-t-[0.1rem] my-1 border-neutral-400"></div>

                        {selectedPosition && ranges.length > 0 && (
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    {ranges.map((range) => (
                                        <button
                                            key={range.id}
                                            onClick={() => {
                                                if (selectedRange?.id === range.id) return;
                                                setSelectedRange(range);
                                            }}
                                            className={`px-3 py-1 rounded-md ${selectedRange?.id === range.id ? 'button-primary' : 'button-secondary'}`}
                                        >
                                            {getButtonLabel(range)}
                                        </button>
                                    ))}
                                </div>
                                <div className="border-t-[0.1rem] my-1 border-neutral-400"></div>
                            </div>
                        )}

                        {selectedRange && (
                            <div className="mt-2">
                                <RangeGrid rangeActions={rangeActions} rangeId={selectedRange.id} />
                            </div>
                        )}
                    </div>
                </PageContainer>
            </div>
        </MainLayout>
    );
};

export default Study;