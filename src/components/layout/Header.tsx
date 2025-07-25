import { useAuthStore } from "@/store/authStore";
import { useProfileStore } from "@/store/profileStore";
import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import { useNavigate, useLocation } from "react-router-dom";
import EPath from "@/routes/path";
import {
	LogIn,
	Timer,
	Sparkles,
	Loader2,
	BarChart3,
	Clock,
	Target,
} from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
	const { user, isLoading } = useAuthStore();
	const { setIsProfileOpen } = useProfileStore();
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<motion.header
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="h-20 flex items-center justify-between px-4 sm:px-8 lg:px-12 bg-primary border-b border-border-primary"
		>
			{/* Logo Section */}
			<motion.div
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				className="cursor-pointer flex items-center gap-3"
				onClick={() => navigate(EPath.Home)}
			>
				{/* Logo Icon */}
				<motion.div
					className="relative"
					animate={{
						rotate: [0, 0, 0, 0],
					}}
					transition={{
						duration: 4,
						repeat: Infinity,
						times: [0, 0.25, 0.5, 0.75, 1],
					}}
				>
					<div className="relative size-10 sm:size-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
						<Timer className="size-5 sm:size-6 text-white" strokeWidth={2.5} />
						<motion.div
							className="absolute -top-1 -right-1"
							animate={{
								scale: [1, 1.2, 1],
								opacity: [0.8, 1, 0.8],
							}}
							transition={{
								duration: 2,
								repeat: Infinity,
							}}
						>
							<Sparkles
								className="size-3 text-yellow-400"
								fill="currentColor"
							/>
						</motion.div>
					</div>
				</motion.div>

				{/* Logo Text */}
				<div className="hidden sm:flex flex-col">
					<motion.h1
						className="text-lg sm:text-xl font-bold text-text-primary leading-tight"
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.2 }}
					>
						AttentionTime
					</motion.h1>
					<motion.p
						className="text-xs text-text-secondary"
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.3 }}
					>
						Master Your Attention
					</motion.p>
				</div>
			</motion.div>

			{/* User/Login Section */}
			<div className="flex items-center gap-2 sm:gap-3">
				{isLoading ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="flex items-center gap-2"
					>
						<Loader2 className="size-5 text-text-secondary animate-spin" />
					</motion.div>
				) : user ? (
					<motion.div
						className="flex items-center gap-2 sm:gap-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<motion.button
							onClick={() => navigate(EPath.Main)}
							className={`relative p-2 rounded-lg transition-all ${
								location.pathname === EPath.Main
									? "text-green-500 bg-green-500/10"
									: "text-text-secondary hover:text-text-primary hover:bg-border-secondary/50"
							}`}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							title="Timer"
						>
							<Clock size={18} />
							{location.pathname === EPath.Main && (
								<motion.div
									className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ type: "spring", bounce: 0.5 }}
								/>
							)}
						</motion.button>

						<motion.button
							onClick={() => navigate(EPath.Missions)}
							className={`relative p-2 rounded-lg transition-all ${
								location.pathname === EPath.Missions
									? "text-purple-500 bg-purple-500/10"
									: "text-text-secondary hover:text-text-primary hover:bg-border-secondary/50"
							}`}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							title="Missions"
						>
							<Target size={18} />
							{location.pathname === EPath.Missions && (
								<motion.div
									className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-500 rounded-full"
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ type: "spring", bounce: 0.5 }}
								/>
							)}
						</motion.button>

						<motion.button
							onClick={() => navigate(EPath.Dashboard)}
							className={`relative p-2 rounded-lg transition-all ${
								location.pathname === EPath.Dashboard
									? "text-blue-500 bg-blue-500/10"
									: "text-text-secondary hover:text-text-primary hover:bg-border-secondary/50"
							}`}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							title="Dashboard"
						>
							<BarChart3 size={18} />
							{location.pathname === EPath.Dashboard && (
								<motion.div
									className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ type: "spring", bounce: 0.5 }}
								/>
							)}
						</motion.button>

						<div className="hidden sm:flex flex-col items-end">
							<p className="text-sm font-medium text-text-primary truncate max-w-[120px]">
								{user?.name}
							</p>
							<p className="text-xs text-text-secondary">
								{user?.point} points
							</p>
						</div>
						<motion.button
							className="relative flex-shrink-0"
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							onClick={() => setIsProfileOpen(true)}
						>
							<div className="size-9 sm:size-10 rounded-full overflow-hidden border-2 border-green-600/50 shadow-lg cursor-pointer">
								<img
									src={
										user.avatar ||
										"https://i.pinimg.com/736x/bf/9f/87/bf9f87cab07ae674f3c426fa5dbb3804.jpg"
									}
									alt="avatar"
									className="w-full h-full object-cover"
								/>
							</div>
							{/* Online indicator */}
							<div className="absolute bottom-0 right-0 size-2.5 sm:size-3 bg-green-500 rounded-full border-2 border-primary animate-pulse" />
						</motion.button>
					</motion.div>
				) : (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<RippleButton
							onClick={() => navigate(EPath.Login)}
							className="h-8 sm:h-9 px-3 sm:px-4 text-sm font-medium bg-green-600 hover:bg-green-700 flex items-center gap-1.5 sm:gap-2"
						>
							<LogIn size={14} className="sm:hidden" />
							<LogIn size={16} className="hidden sm:block" />
							<span>Sign In</span>
						</RippleButton>
					</motion.div>
				)}
			</div>
		</motion.header>
	);
};

export default Header;
