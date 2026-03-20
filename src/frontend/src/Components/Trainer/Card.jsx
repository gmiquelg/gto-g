import React from 'react';

const Card = ({ value, suit }) => {
    const suitMap = {
        s: { icon: 'bi-suit-spade-fill', bg: '#4e4e4e', iconColor: '#1e1e1e', label: '♠' },
        h: { icon: 'bi-suit-heart-fill', bg: '#ff4d4d', iconColor: '#b30000', label: '♥' },
        d: { icon: 'bi-suit-diamond-fill', bg: '#4d79ff', iconColor: '#002699', label: '♦' },
        c: { icon: 'bi-suit-club-fill', bg: '#2ecc71', iconColor: '#1d8348', label: '♣' }
    };

    const config = suitMap[suit] || { icon: '', bg: '#525252', iconColor: '#333', label: '' };

    if (!value || !suit) {
        return (
            <div className={`w-full h-[4rem] bg-[#3e3e3e] border border-[#3f3f3f] rounded-lg flex items-center justify-center opacity-50`}>
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
