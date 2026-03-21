import React, { useState } from 'react';
import Card from './Card';

const Table = ({ positions, loading, cards, roles, isTraining, heroCards, rotationOffset = 0, onSetRole, onClearRole, pot, actionHistory = [] }) => {
    const [hoveredPosId, setHoveredPosId] = useState(null);
    const maxCards = 5;

    // Find the last villain action for display
    const lastVillainAction = [...actionHistory].reverse().find(a => {
        const villainPosId = Object.keys(roles).find(id => roles[id] === 'villain');
        const villainPos = positions.find(p => String(p.id) === String(villainPosId));
        return villainPos && a.position === villainPos.name;
    });

    // Responsive physical locations for 6 seats (Mobile: Vertical Table, Desktop: Horizontal Table)
    const seatStyles = [
        'top-0                  -translate-y-1/2                       lg:top-0     lg:left-1/4    lg:-translate-y-1/2  lg:-translate-x-1/2   ',
        'top-1/4    right-0     -translate-y-1/2    translate-x-1/2    lg:top-0     lg:right-1/4   lg:-translate-y-1/2  lg:translate-x-1/2    ',
        'top-3/4    right-0     -translate-y-1/2    translate-x-1/2    lg:top-1/2   lg:right-0                                                ',
        'bottom-0               translate-y-1/2                        lg:bottom-0  lg:right-1/4   lg:translate-y-1/2   lg:translate-x-1/2    ',
        'top-3/4    left-0      -translate-y-1/2    -translate-x-1/2   lg:top-3/4   lg:left-1/4    lg:translate-y-1/4   lg:-translate-x-1/2   ',
        'top-1/4    left-0      -translate-y-1/2    -translate-x-1/2   lg:top-1/2   lg:left-0                                                 ',
    ];

    const blindLabelStyles = [
        'top-full    left-1/2    -translate-x-1/2                       lg:top-full     lg:left-1/2    lg:-translate-x-1/2                    ',
        'top-full    right-0                                            lg:top-full     lg:right-1/3     lg:left-auto                           ',
        'bottom-full right-0                                            lg:top-1/2      lg:right-full  lg:mr-2        lg:-translate-y-1/2    ',
        'bottom-full left-1/2    -translate-x-1/2                      lg:bottom-full  lg:right-1/4     lg:left-auto                           ',
        'bottom-full left-0                                             lg:bottom-full  lg:left-1/4                                          ',
        'top-full    left-0                                             lg:top-1/2      lg:left-full   lg:ml-2        lg:-translate-y-1/2    ',
    ];

    return (
        <div className="relative w-[20rem] h-[30rem] lg:w-[35rem] lg:h-[15rem] rounded-full border-4 border-neutral-300 flex items-center justify-center">
            {/* POKER CARDS */}
            <div className="flex gap-1 w-[15rem] bg-neutral-300 p-1 rounded-md border border-neutral-400 shadow-xl">
                {[...Array(maxCards)].map((_, index) => (
                    <Card
                        key={index}
                        value={cards[index]?.value}
                        suit={cards[index]?.suit}
                    />
                ))}
            </div>
            {/* Pot Display */}
            {isTraining && pot != null && (
                <div className="absolute left-1/2 translate-y-[4rem] -translate-x-1/2 bg-neutral-300 border border-neutral-400 rounded-md px-3 py-1 text-xs font-bold text-brand-100 shadow-lg whitespace-nowrap">
                    Pot: {pot}BB
                </div>
            )}
            {loading ? (
                <p className="text-gray-400">Loading positions...</p>
            ) : (
                seatStyles.map((style, index) => {
                    const originalIdx = (index - rotationOffset + 6) % 6;
                    const position = Array.isArray(positions) ? positions[originalIdx] : null;
                    const posId = position?.id;
                    const role = roles[posId];
                    const isHero = role === 'hero';
                    const isVillain = role === 'villain';
                    const isHovered = hoveredPosId === posId;

                    const blindStyle = blindLabelStyles[index];

                    // Suppress the blind amount when this seat is the villain and has an active action
                    const hasVillainAction = isVillain && !!lastVillainAction;

                    return (
                        <div key={index} className={`absolute w-[4rem] h-[4rem] lg:w-[4.5rem] lg:h-[4.5rem] transition-all duration-200 ${style}`} onMouseEnter={() => posId && !isTraining && setHoveredPosId(posId)} onMouseLeave={() => setHoveredPosId(null)}>
                            {/* Hero Cards (Pocket Cards) */}
                            {isTraining && isHero && heroCards.length > 0 && (
                                <div className="w-full scale-75 absolute right-0 top-1/2 -translate-y-1/2 translate-x-[5rem] flex gap-1 z-40 animate-in fade-in slide-in-from-left-2 duration-300">
                                    {heroCards.map((card, i) => (
                                        <Card key={i} value={card.value} suit={card.suit} />
                                    ))}
                                </div>
                            )}

                            {/* Villain Action Label — same style as blinds */}
                            {isTraining && isVillain && lastVillainAction && (
                                <span className={`absolute ${blindStyle} flex items-center gap-1 text-[9px] font-bold text-danger-100 opacity-70 whitespace-nowrap z-20`}>
                                    <i className="bi bi-circle text-[8px]"></i>
                                    {lastVillainAction.action === 'raise' && `Raise ${lastVillainAction.size}BB`}
                                    {lastVillainAction.action === 'call' && `Call ${lastVillainAction.size}BB`}
                                    {lastVillainAction.action === 'fold' && 'Fold'}
                                </span>
                            )}

                            {/* Role Selection Menu (Only when NOT training) */}
                            {isHovered && !role && !isTraining && (
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 pb-4 z-20">
                                    <div className="flex gap-1 bg-neutral-300 p-1 rounded-md border border-neutral-400 shadow-xl">
                                        <button className="px-2 py-1 text-[10px] bg-brand-100 text-neutral-100 font-bold rounded hover:bg-white transition-colors whitespace-nowrap"
                                            onClick={() => onSetRole(posId, 'hero')}
                                        >
                                            HERO
                                        </button>
                                        <button className="px-2 py-1 text-[10px] bg-danger-100 text-white font-bold rounded hover:bg-danger-200 transition-colors whitespace-nowrap"
                                            onClick={() => onSetRole(posId, 'villain')}
                                        >
                                            VILLAIN
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Delete Button (X) (Only when NOT training) */}
                            {role && !isTraining && (
                                <button className="absolute -top-1 -right-2 w-5 h-5 bg-neutral-400 border border-neutral-500 rounded-full flex items-center justify-center text-gray-400 hover:text-hover:bg-red-500 transition-all z-30"
                                    onClick={() => onClearRole(posId)}
                                >
                                    <i className="bi bi-x"></i>
                                </button>
                            )}

                            {/* Blinds — hidden if this seat is the villain with an active action */}
                            {isTraining && !hasVillainAction && position?.name === 'SB' && (
                                <span className={`absolute ${blindStyle} flex items-center gap-1 text-[9px] font-bold text-white opacity-70 whitespace-nowrap`}>
                                    <i className="bi bi-circle text-[8px]"></i>
                                    0.5BB
                                </span>
                            )}

                            {isTraining && !hasVillainAction && position?.name === 'BB' && (
                                <span className={`absolute ${blindStyle} flex items-center gap-1 text-[9px] font-bold text-white opacity-70 whitespace-nowrap`}>
                                    <i className="bi bi-circle text-[8px]"></i>
                                    1BB
                                </span>
                            )}

                            {/* Position Bubble */}
                            <div className={`w-full h-full rounded-full flex flex-col items-center justify-center font-bold transition-all duration-300 ${isTraining
                                ? (isHero || isVillain
                                    ? (isHero ? 'bg-neutral-300 border-4 border-brand-100 shadow-[0_0_15px_rgba(252,217,130,0.4)] text-brand-100'
                                        : 'bg-neutral-300 border-4 border-danger-100 shadow-[0_0_15px_rgba(255,77,77,0.3)] text-danger-100')
                                    : 'bg-neutral-100 border-4 border-neutral-300 text-neutral-300')
                                : (isHero ? 'bg-neutral-300 border-4 border-brand-100 shadow-[0_0_15px_rgba(252,217,130,0.4)] text-brand-100' :
                                    isVillain ? 'bg-neutral-300 border-4 border-danger-100 shadow-[0_0_15px_rgba(255,77,77,0.3)] text-danger-100' :
                                        'bg-neutral-300 border-4 border-neutral-400 text-gray-200 hover:border-brand-100/50')
                                }`}
                            >
                                <span className={isTraining && !isHero && !isVillain ? 'text-sm' : 'text-lg'}>
                                    {position ? position.name : '?'}
                                </span>
                                {role && <span className="text-[10px] tracking-widest opacity-80 uppercase">{role}</span>}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default Table;