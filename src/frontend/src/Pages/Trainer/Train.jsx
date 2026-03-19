import MainLayout from '@/Layouts/MainLayout';
import GreyTitleLayout from '@/Layouts/GreyTitleLayout';
import PageContainer from '@/Layouts/PageLayout';

const Train = () => {
    // Fixed physical locations on the oval table for the 6 seats
    const seatStyles = [
        'top-0 left-1/4 -translate-y-1/2 -translate-x-1/2',
        'top-0 right-1/4 -translate-y-1/2 translate-x-1/2',
        'top-1/2 -right-8 -translate-y-1/2',
        'bottom-0 right-1/4 translate-y-1/2 translate-x-1/2',
        'bottom-0 left-1/4 translate-y-1/2 -translate-x-1/2',
        'top-1/2 -left-8 -translate-y-1/2'
    ];

    // Current assigned player roles that belong to those physical seats (can logically cycle/rotate)
    const currentRoles = ['UTG', 'HJ', 'CO', 'BTN', 'SB', 'BB'];

    return (
        <MainLayout>
            <div className="flex flex-col w-full">
                <GreyTitleLayout title="Trainer" />
                <PageContainer>
                    <div className="flex flex-col items-center mt-[5rem]">
                        <div className="relative w-[40rem] h-[20rem] rounded-full border-4 border-gray-300 flex items-center justify-center">
                            {seatStyles.map((style, index) => (
                                <button key={index}
                                    className={`absolute w-20 h-20 bg-white border-4 border-gray-200 rounded-full flex items-center justify-center font-bold text-gray-800 text-lg hover:bg-indigo-50 hover:border-indigo-500 hover:shadow-indigo-500/50 transition-all duration-200 ${style}`}
                                >
                                    {currentRoles[index]}
                                </button>
                            ))}
                        </div>
                        <button className="flex items-center mt-[6rem] bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-md">
                            <i className="bi bi-play-fill text-2xl mr-2"></i>
                            Start
                        </button>
                    </div>
                </PageContainer>
            </div>
        </MainLayout>
    );
};

export default Train;
