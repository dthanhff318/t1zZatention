import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	X,
	Camera,
	Edit2,
	Check,
	User,
	Mail,
	Calendar,
	Trophy,
	Clock,
	Target,
	LogOut,
} from "lucide-react";
import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import { useAuthStore } from "@/store/authStore";
import { useProfileStore } from "@/store/profileStore";

const UserProfileSlider = () => {
	const { isProfileOpen, setIsProfileOpen } = useProfileStore();
	const { user, setUser } = useAuthStore();
	const [isEditingName, setIsEditingName] = useState(false);
	const [tempName, setTempName] = useState(user?.name || "");
	const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
	const [hasAvatarChanged, setHasAvatarChanged] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Mock user stats
	const userStats = {
		totalHours: 156.5,
		streak: 7,
		badges: 3,
		level: 5,
		joinDate: "January 2024",
	};

	const handleSaveName = () => {
		if (tempName.trim() && user) {
			setUser({ ...user, name: tempName.trim() });
			setIsEditingName(false);
		}
	};

	const handleCancelEdit = () => {
		setTempName(user?.name || "");
		setIsEditingName(false);
	};

	const handleSaveAvatar = () => {
		if (avatarPreview && user) {
			setUser({ ...user, avatar: avatarPreview });
			setHasAvatarChanged(false);
		}
	};

	const handleCancelAvatar = () => {
		setAvatarPreview(null);
		setHasAvatarChanged(false);
	};

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const result = e.target?.result as string;
				setAvatarPreview(result);
				setHasAvatarChanged(true);
			};
			reader.readAsDataURL(file);
		}
	};

	const slideVariants = {
		hidden: { x: "100%", opacity: 0 },
		visible: { x: 0, opacity: 1 },
		exit: { x: "100%", opacity: 0 },
	};

	const backdropVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
		exit: { opacity: 0 },
	};

	if (!user) return null;

	const onClose = () => setIsProfileOpen(false);

	return (
		<AnimatePresence>
			{isProfileOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						className="fixed inset-0 bg-black/50 z-[9998]"
						variants={backdropVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						onClick={onClose}
					/>

					{/* Slider */}
					<motion.div
						className="fixed right-0 top-0 h-full w-full max-w-md bg-primary border-l border-border-primary z-[9999] overflow-y-auto"
						variants={slideVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						transition={{ type: "spring", damping: 25, stiffness: 200 }}
					>
						{/* Header */}
						<div className="flex items-center justify-between p-6 border-b border-border-primary">
							<h2 className="text-xl font-semibold text-text-primary">
								Profile
							</h2>
							<motion.button
								onClick={onClose}
								className="p-2 rounded-lg hover:bg-border-secondary/50 transition-colors"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<X size={20} className="text-text-secondary" />
							</motion.button>
						</div>

						{/* Profile Content */}
						<div className="p-6 space-y-6">
							{/* Avatar Section */}
							<div className="text-center">
								<div className="relative inline-block">
									<div className="size-24 rounded-full overflow-hidden border-4 border-green-600/50 shadow-lg">
										<img
											src={
												avatarPreview ||
												user.avatar ||
												"https://i.pinimg.com/736x/bf/9f/87/bf9f87cab07ae674f3c426fa5dbb3804.jpg"
											}
											alt="avatar"
											className="w-full h-full object-cover"
										/>
									</div>
									<motion.button
										onClick={() => fileInputRef.current?.click()}
										className="absolute bottom-0 right-0 p-2 bg-green-600 rounded-full text-white shadow-lg"
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
									>
										<Camera size={14} />
									</motion.button>
								</div>
								<input
									ref={fileInputRef}
									type="file"
									accept="image/*"
									onChange={handleFileUpload}
									className="hidden"
								/>

								{/* Save/Cancel Avatar Buttons */}
								{hasAvatarChanged && (
									<motion.div
										className="flex gap-2 justify-center mt-4"
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
									>
										<RippleButton
											onClick={handleCancelAvatar}
											variant="outline"
											className="px-4 py-2 border-border-primary hover:bg-border-secondary text-sm text-text-primary hover:text-text-secondary"
										>
											<X size={14} className="mr-1" />
											Cancel
										</RippleButton>
										<RippleButton
											onClick={handleSaveAvatar}
											className="px-4 py-2 bg-green-600 hover:bg-green-700 text-sm text-text-primary "
										>
											<Check size={14} className="mr-1" />
											Save
										</RippleButton>
									</motion.div>
								)}
							</div>

							{/* Name Section */}
							<div>
								<div className="flex items-center justify-between mb-3">
									<label className="text-sm text-text-secondary">Name</label>
									{!isEditingName && (
										<motion.button
											onClick={() => setIsEditingName(true)}
											className="p-1 rounded text-text-secondary hover:text-text-primary"
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
										>
											<Edit2 size={14} />
										</motion.button>
									)}
								</div>

								{isEditingName ? (
									<div className="flex gap-2">
										<input
											type="text"
											value={tempName}
											onChange={(e) => setTempName(e.target.value)}
											className="flex-1 px-3 py-2 bg-border-secondary border border-border-primary rounded-lg text-text-primary focus:outline-none focus:border-green-600"
											autoFocus
											onKeyDown={(e) => {
												if (e.key === "Enter") handleSaveName();
												if (e.key === "Escape") handleCancelEdit();
											}}
										/>
										<motion.button
											onClick={handleSaveName}
											className="p-2 bg-green-600 text-white rounded-lg"
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
										>
											<Check size={14} />
										</motion.button>
									</div>
								) : (
									<p className="text-text-primary font-medium text-lg">
										{user.name}
									</p>
								)}
							</div>

							{/* User Info */}
							<div className="space-y-4">
								<div className="flex items-center gap-3">
									<Mail size={16} className="text-text-secondary" />
									<span className="text-text-secondary text-sm">
										{user.email || "user@example.com"}
									</span>
								</div>
								<div className="flex items-center gap-3">
									<Calendar size={16} className="text-text-secondary" />
									<span className="text-text-secondary text-sm">
										Joined {userStats.joinDate}
									</span>
								</div>
								<div className="flex items-center gap-3">
									<User size={16} className="text-text-secondary" />
									<span className="text-text-secondary text-sm">
										Level {userStats.level}
									</span>
								</div>
							</div>

							{/* Stats */}
							<div className="border border-border-primary rounded-lg p-4 bg-border-secondary/20">
								<h3 className="text-text-primary font-medium mb-3">
									Your Progress
								</h3>
								<div className="grid grid-cols-3 gap-4">
									<div className="text-center">
										<div className="flex items-center justify-center mb-1">
											<Clock size={16} className="text-green-500" />
										</div>
										<p className="text-lg font-bold text-text-primary">
											{userStats.totalHours}
										</p>
										<p className="text-xs text-text-secondary">Hours</p>
									</div>
									<div className="text-center">
										<div className="flex items-center justify-center mb-1">
											<Target size={16} className="text-blue-500" />
										</div>
										<p className="text-lg font-bold text-text-primary">
											{userStats.streak}
										</p>
										<p className="text-xs text-text-secondary">Day Streak</p>
									</div>
									<div className="text-center">
										<div className="flex items-center justify-center mb-1">
											<Trophy size={16} className="text-yellow-500" />
										</div>
										<p className="text-lg font-bold text-text-primary">
											{userStats.badges}
										</p>
										<p className="text-xs text-text-secondary">Badges</p>
									</div>
								</div>
							</div>

							{/* Actions */}
							<div className="space-y-3">
								<RippleButton
									className="w-full bg-red-600 hover:bg-red-700 text-white"
									onClick={() => {
										// Handle logout
										console.log("Logout clicked");
									}}
								>
									<LogOut size={16} className="mr-2" />
									Sign Out
								</RippleButton>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default UserProfileSlider;
