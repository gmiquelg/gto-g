import Card from "./Card";

const HeroCards = ({ isTraining, isHero, heroCards }) => {
    return (
        isTraining && isHero && heroCards.length > 0 && (
            <div className="w-full scale-75 absolute right-0 top-1/2 -translate-y-1/2 translate-x-[5rem] flex gap-1 z-40 animate-in fade-in slide-in-from-left-2 duration-300">
                {heroCards.map((card, i) => (
                    <Card key={i} value={card.value} suit={card.suit} />
                ))}
            </div>
        )
    );
};

export default HeroCards;