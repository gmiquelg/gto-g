import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeaderMenu = ({ title }) => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        if (title) {
            document.title = title;
        }

        fetch('/api/menus/MMAIN')
            .then(res => res.json())
            .then(data => setMenuItems(data))
            .catch(err => console.error("Failed to fetch menu", err));
    }, [title]);

    const userName = "Miquel";
    const userSurname = "Gibert";

    return (
        <header className="bg-neutral-200 shadow">
            <nav className="hidden md:flex px-10 py-6 justify-between items-center">
                <ul className="flex gap-6 text-gray-200 font-medium items-center">
                    <span className="text-brand-100 text-2xl mr-10 font-bold">GTO-G</span>
                    {menuItems.map(item => (
                        <li key={item.id} className="hover:text-brand-100 flex items-center gap-2">
                            {item.icon && <i className={item.icon}></i>}
                            <Link to={item.route} className="transition">{item.name}</Link>
                        </li>
                    ))}
                </ul>
                <ul className="flex gap-5 text-gray-200 font-medium items-center">
                    <li className="hover:text-brand-100 flex items-center gap-2">
                        <i className="bi-person-fill"></i>
                        <Link to="/user" className="hidden lg:flex transition">{userName} {userSurname[0]}</Link>
                        <Link to="/user" className="flex lg:hidden transition">{userName[0]}{userSurname[0]}</Link>
                        <i className="bi-chevron-down"></i>
                    </li>
                </ul>
            </nav>
            <nav className="flex md:hidden px-10 py-6 justify-between items-center">
                <ul className="flex gap-8 text-gray-200 font-medium items-center">
                    <span className="text-brand-100 text-2xl font-bold">GTO-G</span>
                    {menuItems.map(item => (
                        <li key={item.id} className="flex items-center gap-2">
                            <Link to={item.route} className={`${item.icon || 'bi-circle'} text-2xl hover:text-brand-100 transition`}></Link>
                        </li>
                    ))}
                </ul>
                <ul className="flex gap-5 text-gray-200 font-medium items-center">
                    <Link to="/user" className="bi-person-fill text-2xl hover:text-brand-100 transition"></Link>
                </ul>
            </nav>
        </header>
    );
};

export default HeaderMenu;
