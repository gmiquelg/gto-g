import React, { useState } from 'react';
import TableCards from './TableCards';
import HeroCards from './HeroCards';
import PotDisplay from './PotDisplay';
import VillianAction from './VillianAction';
import RoleSelection from './RoleSelection';
import Blinds from './Blinds';
import Bubbles from './Bubbles';

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
        'top-full    left-1/2    -translate-x-1/2                       lg:top-full     lg:left-1/2    lg:-translate-x-1/2                   ',
        'top-full    right-0                                            lg:top-full     lg:right-1/3     lg:left-auto                        ',
        'bottom-full right-0                                            lg:top-1/2      lg:right-full  lg:mr-2        lg:-translate-y-1/2    ',
        'bottom-full left-1/2    -translate-x-0                         lg:bottom-full  lg:right-1/4     lg:left-auto                        ',
        'bottom-full left-0                                             lg:bottom-full  lg:left-1/4                                          ',
        'top-full    left-0                                             lg:top-1/2      lg:left-full   lg:ml-2        lg:-translate-y-1/2    ',
    ];

    return (
        <div className="relative w-[20rem] h-[30rem] lg:w-[35rem] lg:h-[15rem] rounded-full border-4 border-neutral-300 flex items-center justify-center">
            {/* POKER CARDS */}
            <TableCards cards={cards} maxCards={maxCards} />

            {/* Pot Display */}
            <PotDisplay pot={pot} isTraining={isTraining} />

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
                            <HeroCards isTraining={isTraining} isHero={isHero} heroCards={heroCards} />

                            {/* Villain Action Label — same style as blinds */}
                            <VillianAction isTraining={isTraining} isVillain={isVillain} lastVillainAction={lastVillainAction} blindStyle={blindStyle} />

                            {/* Role Selection Menu and Delete Button */}
                            <RoleSelection isHovered={isHovered} role={role} isTraining={isTraining} onSetRole={onSetRole} onClearRole={onClearRole} posId={posId} />

                            {/* Blinds */}
                            <Blinds isTraining={isTraining} hasVillainAction={hasVillainAction} position={position} blindStyle={blindStyle} />

                            {/* Position Bubble */}
                            <Bubbles isTraining={isTraining} isHero={isHero} isVillain={isVillain} position={position} role={role} />
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default Table;