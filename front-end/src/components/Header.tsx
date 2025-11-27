import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const navigation = [
	{ name: 'Home', href: '/', requiresAuth: false },
	{ name: 'Live Visualizer', href: '/visualizer', requiresAuth: true },
	{ name: 'Video Generator', href: '/generator', requiresAuth: true },
	{ name: 'Learning Paths', href: '/paths', requiresAuth: true },
	{ name: 'Mentor System', href: '/mentors', requiresAuth: true },
	{ name: 'Course', href: '/microlearning', requiresAuth: true },
	{ name: 'Internship', href: '/internship', requiresAuth: true },
	{ name: 'Quiz', href: '/quiz', requiresAuth: true }
];

const Header = () => {
	const location = useLocation();
	const { isAuthenticated, logout, user } = useAuth();

	return (
		<header className="bg-white shadow-sm px-6 py-3">
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				{/* Logo */}
				<Link to="/" className="flex items-center space-x-2 flex-shrink-0">
					<div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-2">
						<span role="img" aria-label="graduation cap">🎓</span>
					</div>
					<span className="font-bold text-xl">
						Learno AI
					</span>
				</Link>

				{/* Navigation - Centered with equal spacing */}
				<nav className="hidden lg:flex items-center justify-center flex-1 mx-8">
					<div className="flex items-center space-x-6">
						{navigation.map((item) => {
							if (item.requiresAuth && !isAuthenticated) return null;
							
							const isActive = location.pathname === item.href;
							return (
								<Link
									key={item.name}
									to={item.href}
									className={`text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
										isActive 
											? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600' 
											: 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
									}`}
								>
									{item.name}
								</Link>
							);
						})}
					</div>
				</nav>

				{/* User Menu */}
				<div className="flex items-center space-x-4 flex-shrink-0">
					{isAuthenticated ? (
						<>
							<div className="flex items-center space-x-2">
								<div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
									{user?.name?.charAt(0) || 'U'}
								</div>
								<span className="text-sm font-medium text-gray-700 hidden sm:block">
									{user?.name || 'User'}
								</span>
							</div>
							<button
								onClick={logout}
								className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
							>
								<LogOut size={16} />
								<span className="hidden sm:block">Logout</span>
							</button>
						</>
					) : (
						<Link
							to="/login"
							className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
						>
							Login
						</Link>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;