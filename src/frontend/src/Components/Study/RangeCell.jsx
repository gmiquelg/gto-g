import { useState } from 'react';

const ACTION_STYLES = {
    RAISE: 'bg-red-500',
    CALL: 'bg-yellow-400',
    FOLD: 'bg-neutral-500',
};

const ACTION_COLORS = {
    RAISE: '#ef4444',
    CALL: '#facc15',
    FOLD: '#737373',
};

const EditModal = ({ handName, handId, rangeId, actions, onClose, onSaved }) => {
    const toForm = (key) => {
        const a = actions.find(a => a.action.toUpperCase() === key);
        return a ? String(a.frequency) : '';
    };

    const [values, setValues] = useState({
        RAISE: toForm('RAISE'),
        CALL: toForm('CALL'),
        FOLD: toForm('FOLD'),
    });
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);

    const filled = Object.entries(values).filter(([, v]) => v !== '');
    const total = filled.reduce((sum, [, v]) => sum + Number(v), 0);

    const handleSave = async () => {
        if (filled.length === 0) { setError('Enter at least one action.'); return; }
        if (total !== 100) { setError(`Values must sum to 100. Current: ${total}`); return; }

        const payload = filled.map(([action, frequency]) => ({
            handId,
            rangeId,
            action: action.toLowerCase(),
            frequency: Number(frequency),
        }));

        setSaving(true);
        try {
            const res = await fetch(`/api/study/range-actions/save/${rangeId}/${handId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const saved = await res.json();
            onSaved(saved);
            onClose();
        } catch (e) {
            setError(`Save failed: ${e.message}`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            onClick={onClose}
        >
            <div
                className="bg-neutral-900 border border-neutral-700 rounded-lg p-6 w-72 flex flex-col gap-4"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center">
                    <span className="text-white font-bold text-lg">{handName}</span>
                    <button onClick={onClose} className="text-neutral-500 hover:text-white text-xl leading-none">×</button>
                </div>

                {Object.entries(ACTION_COLORS).map(([action, color]) => (
                    <div key={action} className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: color }} />
                        <span className="text-neutral-400 text-sm w-14 capitalize">{action.toLowerCase()}</span>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="—"
                            value={values[action]}
                            onChange={e => {
                                setError(null);
                                setValues(v => ({ ...v, [action]: e.target.value }));
                            }}
                            className="flex-1 bg-neutral-800 border border-neutral-600 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-neutral-400"
                        />
                        <span className="text-neutral-500 text-sm">%</span>
                    </div>
                ))}

                <div className="flex justify-between items-center text-xs">
                    <span className={`${total === 100 ? 'text-green-400' : 'text-neutral-500'}`}>
                        Total: {total}%
                    </span>
                    {error && <span className="text-red-400">{error}</span>}
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={onClose}
                        className="flex-1 px-3 py-2 rounded bg-neutral-700 text-neutral-300 text-sm hover:bg-neutral-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving || total !== 100}
                        className="flex-1 px-3 py-2 rounded bg-neutral-300 text-neutral-900 text-sm font-semibold hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const Tooltip = ({ actions }) => (
    <div className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-xs whitespace-nowrap pointer-events-none shadow-lg">
        {actions.length === 0 ? (
            <span className="text-neutral-500">No actions</span>
        ) : (
            actions.map(a => (
                <div key={a.action} className="flex items-center gap-2">
                    <div
                        className="w-2 h-2 rounded-sm flex-shrink-0"
                        style={{ backgroundColor: ACTION_COLORS[a.action.toUpperCase()] ?? '#555' }}
                    />
                    <span className="text-neutral-300 capitalize">{a.action.toLowerCase()}: {a.frequency}%</span>
                </div>
            ))
        )}
    </div>
);

const RangeCell = ({ handName, handId, rangeId, actions, onActionsUpdated }) => {
    const [hovered, setHovered] = useState(false);
    const [editing, setEditing] = useState(false);

    const total = actions.reduce((sum, a) => sum + a.frequency, 0);

    const sorted = [...actions].sort((a, b) => {
        const order = { RAISE: 0, CALL: 1, FOLD: 2 };
        return (order[a.action.toUpperCase()] ?? 3) - (order[b.action.toUpperCase()] ?? 3);
    });

    let cumulative = 0;

    return (
        <>
            <div
                className="relative w-full aspect-square border border-neutral-700 overflow-hidden rounded-sm cursor-pointer"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => setEditing(true)}
            >
                {sorted.length === 0 ? (
                    <div className="absolute inset-0 bg-neutral-800" />
                ) : (
                    sorted.map((a, i) => {
                        const left = (cumulative / total) * 100;
                        const width = (a.frequency / total) * 100;
                        cumulative += a.frequency;
                        return (
                            <div
                                key={i}
                                className={`absolute top-0 h-full ${ACTION_STYLES[a.action.toUpperCase()] ?? 'bg-neutral-600'}`}
                                style={{ left: `${left}%`, width: `${width}%` }}
                            />
                        );
                    })
                )}

                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-semibold text-white">
                        {handName}
                    </span>
                </div>

                {hovered && (
                    <div className="absolute inset-0 overflow-visible z-10 flex items-start justify-center">
                        <Tooltip actions={sorted} />
                    </div>
                )}
            </div>

            {editing && (
                <EditModal
                    handName={handName}
                    handId={handId}
                    rangeId={rangeId}
                    actions={actions}
                    onClose={() => setEditing(false)}
                    onSaved={(updated) => {
                        onActionsUpdated(handId, updated);
                        setEditing(false);
                    }}
                />
            )}
        </>
    );
};

export default RangeCell;
export { ACTION_STYLES, ACTION_COLORS };