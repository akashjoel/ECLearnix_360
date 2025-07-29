import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const navigation = [
	{ name: 'Home', href: '/', requiresAuth: false },
	{ name: 'Dashboard', href: '/dashboard', requiresAuth: true },
	{ name: 'Live Visualizer', href: '/visualizer', requiresAuth: true },
	{ name: 'Video Generator', href: '/generator', requiresAuth: true },
	{ name: 'Learning Paths', href: '/paths', requiresAuth: true },
	{ name: 'Mentor System', href: '/mentors', requiresAuth: true },
	{ name: 'Microlearning', href: '/microlearning', requiresAuth: true },
	{ name: 'Internship', href: '/internship', requiresAuth: true }
];

const Header = () => {
	const location = useLocation();
	const { isAuthenticated, logout, user } = useAuth();

	return (
		<header className="bg-white shadow-sm px-6 py-3 flex items-center justify-between">
			{/* Logo */}
			<Link to="/" className="flex items-center space-x-2">
				<div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-2">
					<span role="img" aria-label="graduation cap">🎓</span>
				</div>
				<span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
					Learno AI
				</span>
			</Link>

			{/* Navigation */}
			<nav className="hidden md:flex space-x-8 ml-10">
				{navigation.map((item) => {
					if (item.requiresAuth && !isAuthenticated) return null;
					const isActive = location.pathname === item.href;
					return (
						<Link
							key={item.name}
							to={item.href}
							className={`text-sm font-medium ${
								isActive ? 'text-blue-600 underline underline-offset-4' : 'text-gray-700 hover:text-blue-600'
							}`}
						>
							{item.name}
						</Link>
					);
				})}
			</nav>

			{/* User Menu */}
			<div className="hidden md:flex items-center space-x-4">
				{isAuthenticated && (
					<Link
						to="/profile"
						className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-gray-200 hover:opacity-90 transition"
						title="Profile"
					>
						{user?.image ? (
							<img
								src={user.image}
								alt="Profile"
								className="w-full h-full object-cover"
							/>
						) : (
							<span className="text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 w-full h-full flex items-center justify-center">
								{'G'}
							</span>
						)}
					</Link>
				)}

				{isAuthenticated ? (
					<button
						onClick={logout}
						className="text-gray-600 hover:text-red-600 transition-colors"
						title="Logout"
					>
						<LogOut className="w-5 h-5" />
					</button>
				) : (
					<Link
						to="/login"
						className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
					>
						Sign In
					</Link>
				)}
			</div>
		</header>
	);
};

export default Header;