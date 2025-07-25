import { create } from "zustand";

type ProfileStore = {
	isProfileOpen: boolean;
	setIsProfileOpen: (isOpen: boolean) => void;
};

export const useProfileStore = create<ProfileStore>((set) => ({
	isProfileOpen: false,
	setIsProfileOpen: (isOpen) => set({ isProfileOpen: isOpen }),
}));