import { useState } from 'react';
import { Comment } from '../types';
import { Send } from 'lucide-react';

interface CommentSectionProps {
    comments: Comment[];
    onAddComment: (text: string) => void;
}

export const CommentSection = ({ comments, onAddComment }: CommentSectionProps) => {
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            onAddComment(newComment.trim());
            setNewComment('');
        }
    };

    const formatTimestamp = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - new Date(date).getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days}d ago`;
        if (hours > 0) return `${hours}h ago`;
        if (minutes > 0) return `${minutes}m ago`;
        return 'just now';
    };

    return (
        <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">
                Comments ({comments.length})
            </h3>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    <Send className="w-5 h-5" />
                </button>
            </form>

            <div className="space-y-3 max-h-64 overflow-y-auto">
                {comments.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-4">
                        No comments yet. Be the first to comment!
                    </p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm text-gray-900">
                  {comment.username}
                </span>
                                <span className="text-xs text-gray-500">
                  {formatTimestamp(comment.timestamp)}
                </span>
                            </div>
                            <p className="text-gray-700 text-sm">{comment.text}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
