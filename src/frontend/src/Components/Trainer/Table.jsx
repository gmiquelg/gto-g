import React, { useState } from 'react';
import Card from './Card';

const Table = ({ positions, loading, cards, roles, isTraining, heroCards, rotationOffset = 0, onSetRole, onClearRole }) => {
    const [hoveredPosId, setHoveredPosId] = useState(null);
    const maxCards = 5;

    // Responsive physical locations for 6 seats (Mobile: Vertical Table, Desktop: Horizontal Table)
    const seatStyles = [
        'top-0                  -translate-y-1/2                       lg:top-0     lg:left-1/4    lg:-translate-y-1/2  lg:-translate-x-1/2   ',
        'top-1/4    right-0     -translate-y-1/2    translate-x-1/2    lg:top-0     lg:right-1/4   lg:-translate-y-1/2  lg:translate-x-1/2    ',
        'top-3/4    right-0     -translate-y-1/2    translate-x-1/2    lg:top-1/2   lg:right-0                                                ',
        'bottom-0               translate-y-1/2                        lg:bottom-0  lg:right-1/4   lg:translate-y-1/2   lg:translate-x-1/2    ',
        'top-3/4    left-0      -translate-y-1/2    -translate-x-1/2   lg:top-3/4   lg:left-1/4    lg:translate-y-1/4   lg:-translate-x-1/2   ',
        'top-1/4    left-0      -translate-y-1/2    -translate-x-1/2   lg:top-1/2   lg:left-0                                                 ',
    ];

    return (
        <div className="relative w-[20rem] h-[30rem] lg:w-[35rem] lg:h-[15rem] rounded-full border-4 border-[#2e2e2e] flex items-center justify-center">
            {/* POKER CARDS */}
            <div className="flex gap-1 w-[15rem] bg-[#2e2e2e] p-1 rounded-md border border-[#3f3f3f] shadow-xl">
                {[...Array(maxCards)].map((_, index) => (
                    <Card
                        key={index}
                        value={cards[index]?.value}
                        suit={cards[index]?.suit}
                    />
                ))}
            </div>
            {loading ? (
                <p className="text-gray-400">Loading positions...</p>
            ) : (
                seatStyles.map((style, index) => {
                    // Visual seat index -> original positions array index
                    // Rotating by 'rotationOffset' means: visual seat 5 = heroIdx
                    // So visual index i -> original index = (i - rotationOffset + 6) % 6
                    const originalIdx = (index - rotationOffset + 6) % 6;
                    const position = Array.isArray(positions) ? positions[originalIdx] : null;
                    const posId = position?.id;
                    const role = roles[posId];
                    const isHero = role === 'hero';
                    const isVillain = role === 'villain';
                    const isHovered = hoveredPosId === posId;

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

                            {/* Role Selection Menu (Only when NOT training) */}
                            {isHovered && !role && !isTraining && (
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 pb-4 z-20">
                                    <div className="flex gap-1 bg-[#2e2e2e] p-1 rounded-md border border-[#3f3f3f] shadow-xl">
                                        <button className="px-2 py-1 text-[10px] bg-[#fcd982] text-[#181818] font-bold rounded hover:bg-white transition-colors whitespace-nowrap"
                                            onClick={() => onSetRole(posId, 'hero')}
                                        >
                                            HERO
                                        </button>
                                        <button className="px-2 py-1 text-[10px] bg-[#ff4d4d] text-white font-bold rounded hover:bg-[#ff6666] transition-colors whitespace-nowrap"
                                            onClick={() => onSetRole(posId, 'villain')}
                                        >
                                            VILLAIN
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Delete Button (X) (Only when NOT training) */}
                            {role && !isTraining && (
                                <button className="absolute -top-1 -right-2 w-5 h-5 bg-[#3f3f3f] border border-[#4f4f4f] rounded-full flex items-center justify-center text-gray-400 hover:text-hover:bg-red-500 transition-all z-30"
                                    onClick={() => onClearRole(posId)}
                                >
                                    <i className="bi bi-x"></i>
                                </button>
                            )}

                            {/* Position Bubble */}
                            <div className={`w-full h-full rounded-full flex flex-col items-center justify-center font-bold transition-all duration-300 ${isTraining
                                ? (isHero || isVillain
                                    ? (isHero ? 'bg-[#2e2e2e] border-4 border-[#fcd982] shadow-[0_0_15px_rgba(252,217,130,0.4)] text-[#fcd982]'
                                        : 'bg-[#2e2e2e] border-4 border-[#ff4d4d] shadow-[0_0_15px_rgba(255,77,77,0.3)] text-[#ff4d4d]')
                                    : 'bg-[#181818] border-4 border-[#2e2e2e] text-[#2e2e2e]')
                                : (isHero ? 'bg-[#2e2e2e] border-4 border-[#fcd982] shadow-[0_0_15px_rgba(252,217,130,0.4)] text-[#fcd982]' :
                                    isVillain ? 'bg-[#2e2e2e] border-4 border-[#ff4d4d] shadow-[0_0_15px_rgba(255,77,77,0.3)] text-[#ff4d4d]' :
                                        'bg-[#2e2e2e] border-4 border-[#3f3f3f] text-gray-200 hover:border-[#fcd982]/50')
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
