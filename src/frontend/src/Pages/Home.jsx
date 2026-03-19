import MainLayout from '@/Layouts/MainLayout';
import GreyTitleLayout from '@/Layouts/GreyTitleLayout';
import PageContainer from '@/Layouts/PageLayout';

const Home = () => {
    return (
        <MainLayout>
            <div className="flex flex-col w-full mb-10">
                <GreyTitleLayout title="Home" />
                <PageContainer>
                    <div className="flex flex-col items-center">
                        <p className="text-gray-600">This is the Home component loaded dynamically inside MainLayout!</p>
                    </div>
                </PageContainer>
            </div>
        </MainLayout>
    );
};

export default Home;
