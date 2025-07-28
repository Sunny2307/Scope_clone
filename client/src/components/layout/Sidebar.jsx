// src/components/layout/Sidebar.jsx

import React from 'react';
import { FiHome, FiUser, FiBookOpen, FiAward, FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // Changed from <a> to <Link> for navigation

// The component now accepts an `activeItem` prop to determine the active link
const Sidebar = ({ isSidebarOpen, onSidebarToggle, activeItem }) => {

    const navItems = [
        { name: 'Home', icon: FiHome, path: '/student/dashboard' },
        { name: 'Profile', icon: FiUser, path: '/profile' },
        { name: 'Enjoyed Leave', icon: FiBookOpen, path: '/student/enjoyed-leave' },
        { name: 'Scholarship', icon: FiAward, path: '/scholarship' },
    ];
    // The hardcoded activeItem has been removed, it's now a prop.

    return (
        <aside className={`bg-white transition-all transition-width duration-500 ease-in-out h-full border-r border-gray-200 z-30 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-16'} overflow-x-hidden`} style={{ minWidth: isSidebarOpen ? '16rem' : '4rem' }}>
            <button
                className="group p-3 flex items-start justify-start hover:bg-cyan-100"
                onClick={onSidebarToggle}
                style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none'
                }}
            >
                <FiMenu
                    size={28}
                    className="text-gray-700 transition-colors duration-200 group-hover:text-cyan-700"
                />
            </button>
            <nav className="mt-4 flex-1">
                <ul>
                    {navItems.map((item) => {
                        const IconComponent = item.icon;
                        const isActive = item.name === activeItem;

                        return (
                            <li key={item.name} className="mb-2 px-2">
                                <Link // Using Link for client-side routing instead of <a>
                                    to={item.path}
                                    className={`group flex items-center gap-4 p-3 rounded-lg text-base transition-colors duration-200
                                    ${isActive
                                        ? 'bg-cyan-100 hover:bg-cyan-50'
                                        : 'hover:bg-cyan-100'
                                    }`}
                                    style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center' }}
                                >
                                    <IconComponent
                                        size={24}
                                        className={`transition-colors duration-200
                                        ${isActive
                                            ? 'text-cyan-700'
                                            : 'text-gray-700 group-hover:text-cyan-700'
                                        }`}
                                    />
                                    {isSidebarOpen && (
                                        <span
                                            className={`whitespace-nowrap transition-colors duration-200 font-semibold
                                            ${isActive
                                                ? 'text-cyan-900'
                                                : 'text-gray-500 group-hover:text-cyan-700'
                                            }`}
                                        >
                                            {item.name}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
