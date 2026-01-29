import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVideos } from '../contexts/VideoContext';
import { Upload as UploadIcon, Film } from 'lucide-react';

export const Upload = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { addVideo } = useVideos();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!title.trim() || !videoUrl.trim()) {
            setError('Title and video URL are required');
            return;
        }

        try {
            new URL(videoUrl);
        } catch {
            setError('Please enter a valid video URL');
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            addVideo({
                title: title.trim(),
                description: description.trim(),
                videoUrl: videoUrl.trim(),
            });

            setIsLoading(false);
            navigate('/');
        }, 500);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex items-center space-x-3 mb-8">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <Film className="w-8 h-8 text-blue-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">Upload Video</h1>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                                Video Title *
                            </label>
                            <input
                                id="title"
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter a catchy title"
                                maxLength={100}
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                {title.length}/100 characters
                            </p>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                placeholder="Tell viewers about your video"
                                maxLength={500}
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                {description.length}/500 characters
                            </p>
                        </div>

                        <div>
                            <label htmlFor="videoUrl" className="block text-sm font-semibold text-gray-700 mb-2">
                                Video URL *
                            </label>
                            <input
                                id="videoUrl"
                                type="url"
                                required
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="https://example.com/video.mp4"
                            />
                            <p className="mt-2 text-xs text-gray-500">
                                Enter a direct link to your video file (e.g., .mp4, .webm)
                            </p>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-800">
                                <strong>Note:</strong> This is a frontend-only demo. You can use any publicly accessible video URL. Try sample videos from{' '}
                                <a
                                    href="https://gist.github.com/jsturgis/3b19447b304616f18657"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-blue-900"
                                >
                                    this list
                                </a>.
                            </p>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                            >
                                <UploadIcon className="w-5 h-5" />
                                <span>{isLoading ? 'Uploading...' : 'Upload Video'}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
