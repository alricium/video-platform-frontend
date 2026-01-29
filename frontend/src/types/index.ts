export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
}

export interface Comment {
    id: string;
    userId: string;
    username: string;
    text: string;
    timestamp: Date;
}

export interface Video {
    id: string;
    userId: string;
    username: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnail?: string;
    likes: string[];
    comments: Comment[];
    timestamp: Date;
}

export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

export interface VideoContextType {
    videos: Video[];
    addVideo: (video: Omit<Video, 'id' | 'userId' | 'username' | 'likes' | 'comments' | 'timestamp'>) => void;
    toggleLike: (videoId: string) => void;
    addComment: (videoId: string, text: string) => void;
    getUserVideos: (userId: string) => Video[];
}
