const GreyTitleLayout = ({ title }) => {
    return (
        <header className="bg-gray-200/80 w-full">
            <div className="flex mx-auto max-w-[95rem] px-4 py-10">
                <h2 className="text-4xl font-extrabold text-indigo-600">{title}</h2>
            </div>
        </header>
    );
};

export default GreyTitleLayout;
