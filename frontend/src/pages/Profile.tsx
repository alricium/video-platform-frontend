import { useParams } from 'react-router-dom';
import { useVideos } from '../contexts/VideoContext';
import { useAuth } from '../contexts/AuthContext';
import { VideoCard } from '../components/VideoCard';
import { User as UserIcon, Video as VideoIcon } from 'lucide-react';

export const Profile = () => {
    const { userId } = useParams<{ userId: string }>();
    const { videos, toggleLike, addComment, getUserVideos } = useVideos();
    const { user } = useAuth();

    const userVideos = userId ? getUserVideos(userId) : [];
    const profileUser = videos.find(v => v.userId === userId);
    const isOwnProfile = user?.id === userId;

    if (!profileUser && userVideos.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white rounded-xl shadow-md p-12 text-center">
                        <UserIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">User not found</p>
                    </div>
                </div>
            </div>
        );
    }

    const displayUsername = profileUser?.username || user?.username || 'Unknown User';

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex items-center space-x-6">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                            <UserIcon className="w-12 h-12 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{displayUsername}</h1>
                            <div className="flex items-center space-x-6 text-blue-100">
                                <div className="flex items-center space-x-2">
                                    <VideoIcon className="w-5 h-5" />
                                    <span className="font-semibold">{userVideos.length} videos</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {isOwnProfile ? 'My Videos' : 'Videos'}
                    </h2>
                </div>

                {userVideos.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md p-12 text-center">
                        <VideoIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg mb-2">
                            {isOwnProfile ? "You haven't uploaded any videos yet" : 'No videos uploaded yet'}
                        </p>
                        {isOwnProfile && (
                            <p className="text-gray-400">
                                Share your first video with the community!
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {userVideos.map((video) => (
                            <VideoCard
                                key={video.id}
                                video={video}
                                onToggleLike={() => toggleLike(video.id)}
                                onAddComment={(text) => addComment(video.id, text)}
                                isLiked={user ? video.likes.includes(user.id) : false}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
