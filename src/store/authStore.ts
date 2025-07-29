import { User } from "@/types/auth";
import { create } from "zustand";

type AuthStore = {
	user: User | null;
	isLoading: boolean;
	isLoginModalOpen: boolean;
	setUser: (user: User | null) => void;
	clearUser: () => void;
	setIsLoading: (isLoading: boolean) => void;
	openLoginModal: () => void;
	closeLoginModal: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
	user: null,
	isLoading: false,
	isLoginModalOpen: false,
	setUser: (user) => set({ user }),
	clearUser: () => set({ user: null }),
	setIsLoading: (isLoading) => set({ isLoading }),
	openLoginModal: () => set({ isLoginModalOpen: true }),
	closeLoginModal: () => set({ isLoginModalOpen: false }),
}));
