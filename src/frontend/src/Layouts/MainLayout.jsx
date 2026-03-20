import HeaderMenu from '@/Components/HeaderMenu';
import Footer from '@/Components/Footer';

const MainLayout = ({ children, title }) => {
    return (
        <div className="flex flex-col min-h-screen w-full bg-[#181818] text-gray-800">
            <HeaderMenu title={title + " | GTO-G"} />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
