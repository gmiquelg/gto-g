import HeaderMenu from '@/Components/HeaderMenu';
import Footer from '@/Components/Footer';

const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen w-full bg-gray-50 text-gray-800">
            <HeaderMenu />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
