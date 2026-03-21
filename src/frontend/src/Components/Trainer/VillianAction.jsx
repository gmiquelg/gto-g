const VillianAction = ({ isTraining, isVillain, lastVillainAction, blindStyle }) => {
    return (
        isTraining && isVillain && lastVillainAction && (
            <span className={`absolute ${blindStyle} flex items-center gap-1 text-[9px] font-bold text-danger-100 opacity-70 whitespace-nowrap z-20`}>
                <i className="bi bi-circle text-[8px]"></i>
                {lastVillainAction.action === 'raise' && `Raise ${lastVillainAction.size}BB`}
                {lastVillainAction.action === 'call' && `Call ${lastVillainAction.size}BB`}
                {lastVillainAction.action === 'fold' && 'Fold'}
            </span>
        )
    );
};

export default VillianAction;