import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import EPath from "@/routes/path";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

const WelcomeBlock = () => {
	const { user } = useAuthStore();
	const navigate = useNavigate();
	const handleStartJourney = () => {
		navigate(EPath.JourneyStart);
	};
	return (
		<div className="p-3 flex flex-col gap-4 items-start">
			<p className="text-text-primary text-sm">
				Hello, {user?.name}. How long has it been since you last traveled?
			</p>
			<div className="flex gap-3 items-center">
				<span className="text-text-primary text-sm">On a trip?</span>
				<RippleButton variant="default" size="sm" onClick={handleStartJourney}>
					Start now
				</RippleButton>
			</div>
		</div>
	);
};

export default WelcomeBlock;
