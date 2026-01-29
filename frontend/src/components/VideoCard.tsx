import { Video } from '../types';
import { Heart, MessageCircle, User as UserIcon } from 'lucide-react';
import { CommentSection } from './CommentSection';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface VideoCardProps {
    video: Video;
    onToggleLike: () => void;
    onAddComment: (text: string) => void;
    isLiked: boolean;
}

export const VideoCard = ({ video, onToggleLike, onAddComment, isLiked }: VideoCardProps) => {
    const [showComments, setShowComments] = useState(false);

    const formatTimestamp = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - new Date(date).getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days} days ago`;
        if (hours > 0) return `${hours} hours ago`;
        if (minutes > 0) return `${minutes} minutes ago`;
        return 'just now';
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-video bg-black">
                <video
                    src={video.videoUrl}
                    controls
                    className="w-full h-full object-contain"
                    preload="metadata"
                />
            </div>

            <div className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                            {video.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                            {video.description}
                        </p>
                        <Link
                            to={`/profile/${video.userId}`}
                            className="flex items-center space-x-2 text-sm text-gray-700 hover:text-blue-600 transition-colors w-fit"
                        >
                            <UserIcon className="w-4 h-4" />
                            <span className="font-medium">{video.username}</span>
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">
                            {formatTimestamp(video.timestamp)}
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-6 pt-2 border-t border-gray-100">
                    <button
                        onClick={onToggleLike}
                        className="flex items-center space-x-2 group"
                    >
                        <Heart
                            className={`w-6 h-6 transition-colors ${
                                isLiked
                                    ? 'fill-red-500 text-red-500'
                                    : 'text-gray-600 group-hover:text-red-500'
                            }`}
                        />
                        <span className={`font-semibold ${isLiked ? 'text-red-500' : 'text-gray-700'}`}>
              {video.likes.length}
            </span>
                    </button>

                    <button
                        onClick={() => setShowComments(!showComments)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group"
                    >
                        <MessageCircle className="w-6 h-6 group-hover:text-blue-600" />
                        <span className="font-semibold text-gray-700">
              {video.comments.length}
            </span>
                    </button>
                </div>

                {showComments && (
                    <div className="pt-3 border-t border-gray-100">
                        <CommentSection
                            comments={video.comments}
                            onAddComment={onAddComment}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
