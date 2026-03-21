const Blinds = ({ isTraining, hasVillainAction, position, blindStyle }) => {
    return (
        <>
            {
                isTraining && !hasVillainAction && position?.name === 'SB' && (
                    <span className={`absolute ${blindStyle} flex items-center gap-1 text-[9px] font-bold text-white opacity-70 whitespace-nowrap`}>
                        <i className="bi bi-circle text-[8px]"></i>
                        0.5BB
                    </span>
                )
            }
            {
                isTraining && !hasVillainAction && position?.name === 'BB' && (
                    <span className={`absolute ${blindStyle} flex items-center gap-1 text-[9px] font-bold text-white opacity-70 whitespace-nowrap`}>
                        <i className="bi bi-circle text-[8px]"></i>
                        1BB
                    </span>
                )
            }
        </>
    );
};

export default Blinds;