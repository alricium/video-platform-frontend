import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Home, Upload, User, LogOut, Video } from 'lucide-react';

export const Header = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-2 text-blue-600 font-bold text-xl">
                        <Video className="w-8 h-8" />
                        <span>VideoShare</span>
                    </Link>

                    <nav className="flex items-center space-x-6">
                        <Link
                            to="/"
                            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            <Home className="w-5 h-5" />
                            <span className="hidden sm:inline">Home</span>
                        </Link>

                        <Link
                            to="/upload"
                            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            <Upload className="w-5 h-5" />
                            <span className="hidden sm:inline">Upload</span>
                        </Link>

                        <Link
                            to={`/profile/${user?.id}`}
                            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            <User className="w-5 h-5" />
                            <span className="hidden sm:inline">{user?.username}</span>
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
};
