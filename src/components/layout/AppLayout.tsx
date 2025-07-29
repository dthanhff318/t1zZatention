import Header from "@/components/layout/Header";
import UserProfileSlider from "@/components/profile/UserProfileSlider";
import LoginModal from "@/components/modals/LoginModal";
import { useAuthStore } from "@/store/authStore";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
	const { isLoginModalOpen, closeLoginModal } = useAuthStore();

	return (
		<div className="relative w-screen h-screen bg-primary overflow-y-auto overflow-x-hidden flex">
			<div className="flex-1">
				<Header />
				<Outlet />
			</div>
			<UserProfileSlider />
			<LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
		</div>
	);
};

export default AppLayout;
