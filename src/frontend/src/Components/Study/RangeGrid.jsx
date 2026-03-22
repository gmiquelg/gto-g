import RangeCell, { ACTION_COLORS } from './RangeCell';
import { useState, useEffect } from 'react';

const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

const getHandName = (row, col) => {
    if (row === col) return `${RANKS[row]}${RANKS[col]}`;
    if (row < col) return `${RANKS[row]}${RANKS[col]}s`;
    return `${RANKS[col]}${RANKS[row]}o`;
};

const buildHandIdGrid = () => {
    const grid = Array.from({ length: 13 }, () => Array(13).fill(null));
    let id = 1;
    for (let i = 0; i < 13; i++) grid[i][i] = id++;
    for (let row = 0; row < 13; row++)
        for (let col = row + 1; col < 13; col++)
            grid[row][col] = id++;
    for (let row = 1; row < 13; row++)
        for (let col = 0; col < row; col++)
            grid[row][col] = id++;
    return grid;
};

const handIdGrid = buildHandIdGrid();

const RangeGrid = ({ rangeActions, rangeId }) => {
    const [localActions, setLocalActions] = useState([]);

    useEffect(() => {
        setLocalActions(rangeActions);
    }, [rangeActions]);

    const actionsByHandId = localActions.reduce((acc, a) => {
        if (!acc[a.handId]) acc[a.handId] = [];
        acc[a.handId].push(a);
        return acc;
    }, {});

    const handleActionsUpdated = (handId, updated) => {
        setLocalActions(prev => [
            ...prev.filter(a => a.handId !== handId),
            ...updated,
        ]);
    };

    return (
        <div className="flex gap-6 items-start">
            <div className="grid gap-[2px] w-full max-w-[45rem]"
                style={{ gridTemplateColumns: 'repeat(13, 1fr)' }}>
                {RANKS.map((_, row) =>
                    RANKS.map((_, col) => {
                        const handName = getHandName(row, col);
                        const handId = handIdGrid[row][col];
                        const actions = actionsByHandId[handId] ?? [];
                        return (
                            <RangeCell
                                key={handName}
                                handName={handName}
                                handId={handId}
                                rangeId={rangeId}
                                actions={actions}
                                onActionsUpdated={handleActionsUpdated}
                            />
                        );
                    })
                )}
            </div>

            <div className="flex flex-col gap-2 mt-1 min-w-[5rem]">
                <span className="text-xs text-neutral-600 font-semibold uppercase mb-1">Legend</span>
                {Object.entries(ACTION_COLORS).map(([action, color]) => (
                    <div key={action} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: color }} />
                        <span className="text-xs text-neutral-500 capitalize">{action.toLowerCase()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RangeGrid;