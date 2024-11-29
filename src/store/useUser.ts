// path/to/useUser.ts
import {create} from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    name: string;
    email: string;
}

interface UserState {
    user: User | null;
    loading: boolean;
    isLoggedIn: boolean;
    setUser: (user: User | null) => void;
    fetchUser: () => Promise<void>;
    logout: () => void;
}

const useUserStore = create<UserState>()(persist((set) => ({
    user: null,
    loading: true,
    isLoggedIn: false,
    setUser: (user) => set({ user, loading: false, isLoggedIn: !!user }),
    fetchUser: async () => {
        set({ loading: true });
        const response = await fetch('/api/user');
        const data: User = await response.json();
        set({ user: data, loading: false, isLoggedIn: true });
    },

    logout: () => {
        set({ user: null, loading: false, isLoggedIn: false });
    },
}), {
    name: 'user-storage',
    getStorage: () => localStorage,
}));

export const useUser = () => {
    const { user, loading, fetchUser, setUser, isLoggedIn, logout } = useUserStore();
    return { user, loading, fetchUser, setUser, isLoggedIn, logout };
};