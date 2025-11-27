import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
    name: string;
    email: string;
    bookmarks: number[]; // IDs de artículos guardados
    hasCompletedOnboarding: boolean;

    setName: (name: string) => void;
    setEmail: (email: string) => void;
    toggleBookmark: (articleId: number) => void;
    completeOnboarding: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            name: '',
            email: '',
            bookmarks: [],
            hasCompletedOnboarding: false,

            setName: (name) => set({ name }),
            setEmail: (email) => set({ email }),

            toggleBookmark: (articleId) => set((state) => {
                const bookmarks = state.bookmarks.includes(articleId)
                    ? state.bookmarks.filter(id => id !== articleId)
                    : [...state.bookmarks, articleId];
                return { bookmarks };
            }),

            completeOnboarding: () => set({ hasCompletedOnboarding: true }),
        }),
        {
            name: 'dones-user-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
