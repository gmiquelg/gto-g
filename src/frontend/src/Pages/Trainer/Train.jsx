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
                <PageContainer>
                    <div className="flex flex-col items-center mt-[10rem]">
                        <div className="relative w-[40rem] h-[20rem] rounded-full border-4 border-[#2e2e2e] flex items-center justify-center">
                            {seatStyles.map((style, index) => (
                                <button key={index}
                                    className={`absolute w-20 h-20 bg-[#2e2e2e] border-4 border-[#3f3f3f] rounded-full flex items-center justify-center font-bold text-gray-200 text-lg hover:border-[#fcd982] hover:shadow-[#fcd982]/50 transition-all duration-200 ${style}`}
                                >
                                    {currentRoles[index]}
                                </button>
                            ))}
                        </div>
                        <button className="flex items-center mt-[6rem] border-2 border-[#fcd982] hover:bg-[#292416] text-[#fcd982] font-bold py-2 px-6 rounded-md">
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
