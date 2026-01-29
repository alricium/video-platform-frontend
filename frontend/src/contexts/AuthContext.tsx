import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import type { User, AuthContextType } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS_KEY = "video_app_users";
const CURRENT_USER_KEY = "video_app_current_user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem(CURRENT_USER_KEY);

        if (!savedUser) return null;

        return JSON.parse(savedUser) as User;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(CURRENT_USER_KEY);
        }
    }, [user]);

    const getMockUsers = (): User[] => {
        const users = localStorage.getItem(MOCK_USERS_KEY);
        return users ? JSON.parse(users) : [];
    };

    const saveMockUsers = (users: User[]) => {
        localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
    };

    const login = async (email: string, password: string) => {
        const users = getMockUsers();
        const foundUser = users.find((u) => u.email === email);

        if (!foundUser) {
            throw new Error("Invalid credentials");
        }

        setUser(foundUser);
    };

    const register = async (
        username: string,
        email: string,
        password: string
    ) => {
        const users = getMockUsers();

        if (users.some((u) => u.email === email)) {
            throw new Error("Email already exists");
        }

        const newUser: User = {
            id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
            username,
            email,
            password,
        };

        users.push(newUser);
        saveMockUsers(users);
        setUser(newUser);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};
