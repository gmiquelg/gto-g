import React from 'react';

const HeroActions = ({ toCall, onAction }) => {
    const facingRaise = toCall > 1;

    return (
        <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <button
                onClick={() => onAction('fold')}
                className="flex items-center bg-neutral-400 hover:bg-neutral-500 text-white font-bold py-2 px-5 rounded-md transition-all"
            >
                FOLD
            </button>
            {facingRaise && (
                <button
                    onClick={() => onAction('call')}
                    className="flex items-center bg-brand-100 hover:bg-brand-200 text-neutral-100 font-bold py-2 px-5 rounded-md transition-all"
                >
                    CALL {toCall}BB
                </button>
            )}
            <button
                onClick={() => onAction('raise')}
                className="flex items-center bg-danger-100 hover:bg-red-400 text-white font-bold py-2 px-5 rounded-md transition-all"
            >
                RAISE
            </button>
        </div>
    );
};

export default HeroActions;

