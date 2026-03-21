import React from 'react';

const Card = ({ value, suit }) => {
    const suitMap = {
        s: { icon: 'bi-suit-spade-fill', bg: 'var(--card-spade)', iconColor: 'var(--card-spade-icon)', label: '♠' },
        h: { icon: 'bi-suit-heart-fill', bg: 'var(--card-heart)', iconColor: 'var(--card-heart-icon)', label: '♥' },
        d: { icon: 'bi-suit-diamond-fill', bg: 'var(--card-diamond)', iconColor: 'var(--card-diamond-icon)', label: '♦' },
        c: { icon: 'bi-suit-club-fill', bg: 'var(--card-club)', iconColor: 'var(--card-club-icon)', label: '♣' }
    };

    const config = suitMap[suit] || { icon: '', bg: '#525252', iconColor: '#333', label: '' };

    if (!value || !suit) {
        return (
            <div className={`w-full h-[4rem] bg-neutral-400 border border-neutral-400 rounded-lg flex items-center justify-center opacity-50`}>
                <span className="text-gray-500 text-xl font-bold">-</span>
            </div>
        );
    }

    return (
        <div className={`w-full h-[4rem] rounded-lg shadow-xl flex flex-col items-center justify-center relative overflow-hidden`} style={{ backgroundColor: config.bg }} >
            <div className="z-10 font-bold text-white text-4xl pointer-events-none">
                {value}
            </div>
            <div className="absolute left-[5%] opacity-80 pointer-events-none" style={{ color: config.iconColor }} >
                <i className={`${config.icon} text-6xl`}></i>
            </div>
        </div>
    );
};

export default Card;
