
const PotDisplay = ({ pot, isTraining }) => {
    return (
        isTraining && pot != null && (
            <div className="absolute left-1/2 translate-y-[4rem] -translate-x-1/2 bg-neutral-300 border border-neutral-400 rounded-md px-3 py-1 text-xs font-bold text-brand-100 shadow-lg whitespace-nowrap">
                Pot: {pot}BB
            </div>
        )
    );
};

export default PotDisplay;