import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Video, VideoContextType } from '../types';
import { useAuth } from './AuthContext';

const VideoContext = createContext<VideoContextType | undefined>(undefined);

const VIDEOS_KEY = 'video_app_videos';

const initialVideos: Video[] = [
  {
    id: 'video_1',
    userId: 'demo_user_1',
    username: 'TechCreator',
    title: 'Amazing Sunset Timelapse',
    description: 'Beautiful sunset captured over the mountains',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    likes: [],
    comments: [
      {
        id: 'comment_1',
        userId: 'demo_user_2',
        username: 'NatureLover',
        text: 'This is absolutely stunning!',
        timestamp: new Date('2024-01-15T10:30:00'),
      },
    ],
    timestamp: new Date('2024-01-15T08:00:00'),
  },
  {
    id: 'video_2',
    userId: 'demo_user_2',
    username: 'NatureLover',
    title: 'Ocean Waves',
    description: 'Relaxing ocean waves at the beach',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    likes: [],
    comments: [],
    timestamp: new Date('2024-01-16T12:00:00'),
  },
  {
    id: 'video_3',
    userId: 'demo_user_3',
    username: 'AdventureSeeker',
    title: 'Mountain Hiking Adventure',
    description: 'Epic hiking trail through the mountains',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    likes: [],
    comments: [],
    timestamp: new Date('2024-01-17T14:30:00'),
  },
];

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [videos, setVideos] = useState<Video[]>(() => {
    const savedVideos = localStorage.getItem(VIDEOS_KEY);
    return savedVideos ? JSON.parse(savedVideos, (key, value) => {
      if (key === 'timestamp') return new Date(value);
      return value;
    }) : initialVideos;
  });

  useEffect(() => {
    localStorage.setItem(VIDEOS_KEY, JSON.stringify(videos));
  }, [videos]);

  const addVideo = (videoData: Omit<Video, 'id' | 'userId' | 'username' | 'likes' | 'comments' | 'timestamp'>) => {
    if (!user) return;

    const newVideo: Video = {
      ...videoData,
      id: `video_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: user.id,
      username: user.username,
      likes: [],
      comments: [],
      timestamp: new Date(),
    };

    setVideos(prev => [newVideo, ...prev]);
  };

  const toggleLike = (videoId: string) => {
    if (!user) return;

    setVideos(prev =>
      prev.map(video => {
        if (video.id === videoId) {
          const hasLiked = video.likes.includes(user.id);
          return {
            ...video,
            likes: hasLiked
              ? video.likes.filter(id => id !== user.id)
              : [...video.likes, user.id],
          };
        }
        return video;
      })
    );
  };

  const addComment = (videoId: string, text: string) => {
    if (!user) return;

    setVideos(prev =>
      prev.map(video => {
        if (video.id === videoId) {
          const newComment = {
            id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            userId: user.id,
            username: user.username,
            text,
            timestamp: new Date(),
          };
          return {
            ...video,
            comments: [...video.comments, newComment],
          };
        }
        return video;
      })
    );
  };

  const getUserVideos = (userId: string) => {
    return videos.filter(video => video.userId === userId);
  };

  return (
    <VideoContext.Provider
      value={{
        videos,
        addVideo,
        toggleLike,
        addComment,
        getUserVideos,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideos = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideos must be used within a VideoProvider');
  }
  return context;
};
