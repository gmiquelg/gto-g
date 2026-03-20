import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeaderMenu = ({ title }) => {
    useEffect(() => {
        if (title) {
            document.title = title;
        }
    }, [title]);

    const userName = "Miquel";
    const userSurname = "Gibert";

    return (
        <header className="bg-[#252525] shadow">
            <nav className="hidden md:flex px-10 py-6 justify-between items-center">
                <ul className="flex gap-6 text-gray-200 font-medium items-center">
                    <span className="text-[#fcd982] text-2xl mr-10 font-bold">GTO-G</span>
                    <li className="hover:text-[#fcd982] flex items-center gap-2">
                        <i className="bi-house-fill"></i>
                        <Link to="/" className="transition">Home</Link>
                    </li>
                    <li className="hover:text-[#fcd982] flex items-center gap-2">
                        <i className="bi-mortarboard-fill"></i>
                        <Link to="/study" className="transition">Study</Link>
                    </li>
                    <li className="hover:text-[#fcd982] flex items-center gap-2">
                        <i className="bi-play-fill text-xl"></i>
                        <Link to="/train" className="transition">Train</Link>
                    </li>
                </ul>
                <ul className="flex gap-5 text-gray-200 font-medium items-center">
                    <li className="hover:text-[#fcd982] flex items-center gap-2">
                        <i className="bi-person-fill"></i>
                        <Link to="/user" className="hidden lg:flex transition">{userName} {userSurname[0]}</Link>
                        <Link to="/user" className="flex lg:hidden transition">{userName[0]}{userSurname[0]}</Link>
                        <i className="bi-chevron-down"></i>
                    </li>
                </ul>
            </nav>
            <nav className="flex md:hidden px-10 py-6 justify-between items-center">
                <ul className="flex gap-8 text-gray-200 font-medium items-center">
                    <span className="text-[#fcd982] text-2xl font-bold">GTO-G</span>
                    <li className="flex items-center gap-2">
                        <Link to="/" className="bi-house-fill text-2xl hover:text-[#fcd982] transition"></Link>
                    </li>
                    <li className="flex items-center gap-2">
                        <Link to="/study" className="bi-mortarboard-fill text-2xl hover:text-[#fcd982] transition"></Link>
                    </li>
                    <li className="flex items-center gap-2">
                        <Link to="/train" className="bi-play-fill text-4xl hover:text-[#fcd982] transition"></Link>
                    </li>
                </ul>
                <ul className="flex gap-5 text-gray-200 font-medium items-center">
                    <Link to="/user" className="bi-person-fill text-2xl hover:text-[#fcd982] transition"></Link>
                </ul>
            </nav>
        </header>
    );
};

export default HeaderMenu;
