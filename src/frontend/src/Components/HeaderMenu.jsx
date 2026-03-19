import { Link } from 'react-router-dom';

const HeaderMenu = () => {
    return (
        <header className="bg-white shadow">
            <nav className="px-10 py-6 flex justify-between items-center">
                <ul className="flex gap-6 text-gray-700 font-medium items-center">
                    <span className="text-indigo-600 text-2xl mr-10 font-bold">GTO-G</span>
                    <li className="flex items-center gap-2">
                        <i className="bi-house-fill"></i>
                        <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
                    </li>
                    <li className="flex items-center gap-2">
                        <i className="bi-mortarboard-fill"></i>
                        <Link to="/study" className="hover:text-indigo-600 transition">Study</Link>
                    </li>
                    <li className="flex items-center gap-2">
                        <i className="bi-play-fill text-xl"></i>
                        <Link to="/train" className="hover:text-indigo-600 transition">Train</Link>
                    </li>
                </ul>
                <ul className="flex gap-5 text-gray-700 font-medium items-center">
                    <li className="flex items-center gap-2">
                        <i className="bi-person-fill"></i>
                        <Link to="/user" className="hover:text-indigo-600 transition">Miquel G</Link>
                        <i className="bi-chevron-down"></i>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default HeaderMenu;
