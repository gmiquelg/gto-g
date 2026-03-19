const GreyTitleLayout = ({ title }) => {
    return (
        <header className="bg-[#252525] w-full">
            <div className="flex mx-auto max-w-[95rem] px-4 py-6">
                <h2 className="text-4xl font-extrabold text-[#FAE2A7]">{title}</h2>
            </div>
        </header>
    );
};

export default GreyTitleLayout;
