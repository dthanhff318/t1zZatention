import { User } from "@/types/auth";
import { create } from "zustand";

type AuthStore = {
	user: User | null;
	isLoading: boolean;
	setUser: (user: User) => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
	user: null,
	isLoading: false,
	setUser: (user) => set({ user }),

	// logout: async () => {
	// 	try {
	// 		await account.deleteSession("current");
	// 		set({ user: null });
	// 	} catch (error) {
	// 		console.error("Logout error:", error);
	// 	}
	// },
}));
