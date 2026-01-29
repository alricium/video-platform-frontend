import { useVideos } from '../contexts/VideoContext';
import { useAuth } from '../contexts/AuthContext';
import { VideoCard } from '../components/VideoCard';

export const Home = () => {
    const { videos, toggleLike, addComment } = useVideos();
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {videos.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md p-12 text-center">
                        <p className="text-gray-500 text-lg">
                            No videos yet. Be the first to upload!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {videos.map((video) => (
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
