const Bubbles = ({ isTraining, isHero, isVillain, position, role }) => {
    return (
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
    );
};

export default Bubbles;