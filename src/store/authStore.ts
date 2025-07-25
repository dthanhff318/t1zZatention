import { User } from "@/types/auth";
import { create } from "zustand";

type AuthStore = {
	user: User | null;
	isLoading: boolean;
	setUser: (user: User) => void;
	setIsLoading: (isLoading: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
	user: null,
	isLoading: false,
	setUser: (user) => set({ user }),
	setIsLoading: (isLoading) => set({ isLoading }),
}));
