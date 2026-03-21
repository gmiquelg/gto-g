import Card from "./Card";

const TableCards = ({ cards, maxCards }) => {
    return (
        <div className="flex gap-1 w-[15rem] bg-neutral-300 p-1 rounded-md border border-neutral-400 shadow-xl">
            {[...Array(maxCards)].map((_, index) => (
                <Card
                    key={index}
                    value={cards[index]?.value}
                    suit={cards[index]?.suit}
                />
            ))}
        </div>
    );
};

export default TableCards;