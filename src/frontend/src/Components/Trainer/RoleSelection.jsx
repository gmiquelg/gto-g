const RoleSelection = ({ isHovered, role, isTraining, onSetRole, onClearRole, posId }) => {
    return (
        <>
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
        </>
    );
};

export default RoleSelection;