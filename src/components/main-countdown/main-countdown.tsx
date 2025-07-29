import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import { Countdown } from "@/components/count-down/count-down";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Play, Pause, Volume2, VolumeX } from "lucide-react";
import supabase from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import UserService from "@/services/userService";
import { PRESET_DURATIONS } from "@/constants/timer";

const MainCountdown = () => {
	const { user } = useAuthStore();
	const [duration, setDuration] = useState<string | null>(null);
	const [timeLeft, setTimeLeft] = useState<number | null>(null);
	const [isPaused, setIsPaused] = useState(false);
	const [soundEnabled, setSoundEnabled] = useState(true);

	const isExistCountdown =
		sessionStorage.getItem("start") && sessionStorage.getItem("duration");

	const calculateTimeLeft = () => {
		const start = sessionStorage.getItem("start");
		const duration = sessionStorage.getItem("duration");
		if (!start || !duration) return 0;
		const elapsed = (Date.now() - Number(start)) / 1000;
		const timeLeft = Number(duration) - elapsed;
		return Math.max(0, Math.floor(timeLeft));
	};

	useEffect(() => {
		if (isExistCountdown) {
			const timeLeft = calculateTimeLeft();
			setTimeLeft(timeLeft);
		}
	}, [isExistCountdown]);

	const handleStartAttention = () => {
		sessionStorage.setItem("duration", String(duration));
		sessionStorage.setItem("start", String(Date.now()));
		setTimeLeft(Number(duration));
	};

	const handleEndSession = () => {
		sessionStorage.removeItem("start");
		sessionStorage.removeItem("duration");
		setTimeLeft(null);
		setDuration(null);
		setIsPaused(false);
	};

	const saveUserActivity = async (totalSeconds: number) => {
		if (!user) return;

		try {
			const totalMinutes = Math.floor(totalSeconds / 60);

			// Validate if totalMinutes matches any preset duration (with small tolerance)
			const isValidDuration = PRESET_DURATIONS.some((preset) => {
				const presetMinutes = Math.floor(Number(preset.value) / 60);
				// Allow 1 minute tolerance for timing deviations
				return Math.abs(totalMinutes - presetMinutes) <= 1;
			});

			if (!isValidDuration) {
				console.log(
					`Invalid duration (${totalMinutes} minutes) - activity not saved`
				);
				return;
			}
			const { error } = await supabase.from("user_activities").insert({
				user_id: user.id,
				action: "focus",
				detail: `${totalMinutes} minutes`,
			});

			if (error) {
				console.error("Error saving user activity:", error);
			} else {
				await new UserService().updateUserTotalHours(
					user.id,
					Number((totalMinutes / 60).toFixed(2))
				);

				console.log("Focus session recorded successfully");
			}
		} catch (err) {
			console.error("Error saving activity:", err);
		}
	};

	const checkStreak = async () => {
		if (!user) return;
		const { data, error } = await supabase.rpc("process_focus_streak", {
			p_user_id: user.id,
		});

		if (error) console.error(error);
		else console.log(data);
	};

	return (
		<div className="w-full">
			<AnimatePresence mode="wait">
				{!timeLeft || timeLeft === 0 ? (
					<motion.div
						key="setup"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
						className="space-y-6"
					>
						{/* Header */}
						<div className="text-center space-y-2">
							<motion.div
								initial={{ scale: 0.8 }}
								animate={{ scale: 1 }}
								transition={{ delay: 0.1 }}
								className="inline-flex items-center justify-center size-16 bg-green-500/20 rounded-full mb-4"
							>
								<Clock className="size-8 text-green-500" />
							</motion.div>
							<h2 className="text-2xl font-bold text-text-primary">
								Ready to Focus?
							</h2>
							<p className="text-text-secondary">
								Choose your session duration and eliminate distractions
							</p>
						</div>

						{/* Duration Grid */}
						<motion.div
							className="grid grid-cols-2 sm:grid-cols-3 gap-3"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.2 }}
						>
							{PRESET_DURATIONS.map((preset, index) => (
								<motion.button
									key={preset.value}
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 0.3 + index * 0.05 }}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => setDuration(preset.value)}
									className={`p-4 rounded-xl border-2 transition-all ${
										duration === preset.value
											? "border-green-500 bg-green-500/10 text-text-primary"
											: "border-border-primary hover:border-green-500/50 text-text-secondary hover:text-text-primary"
									}`}
								>
									<p className="text-lg font-semibold">{preset.label}</p>
									<p className="text-xs opacity-70">{preset.desc}</p>
								</motion.button>
							))}
						</motion.div>

						{/* Start Button */}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6 }}
						>
							<RippleButton
								className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
								onClick={handleStartAttention}
								disabled={!duration}
							>
								<Play className="size-5" />
								Start Focus Session
							</RippleButton>
						</motion.div>
					</motion.div>
				) : (
					<motion.div
						key="timer"
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.3 }}
						className="space-y-6"
					>
						{/* Timer Display */}
						<div className="text-center space-y-4">
							<motion.div
								animate={{
									scale: isPaused ? 0.95 : 1,
									opacity: isPaused ? 0.7 : 1,
								}}
								transition={{ duration: 0.3 }}
							>
								<p className="text-sm font-medium text-text-secondary mb-2">
									{isPaused ? "Session Paused" : "Focus Mode Active"}
								</p>
								<div className="relative inline-block">
									{/* Animated Ring */}
									<motion.div
										className="absolute inset-0 rounded-full border-4 border-green-500/20"
										animate={isPaused ? {} : { rotate: 360 }}
										transition={{
											duration: 10,
											repeat: Infinity,
											ease: "linear",
										}}
									/>
									<div className="relative bg-border-secondary/50 backdrop-blur-sm rounded-full p-8 border border-border-primary/50">
										<Countdown
											key={timeLeft}
											totalSeconds={timeLeft}
											onEnd={async () => {
												// Get the original duration from sessionStorage
												const originalDuration =
													sessionStorage.getItem("duration");
												if (originalDuration) {
													// Only save activity when session completes naturally
													await saveUserActivity(Number(originalDuration));
													await checkStreak();
												}

												handleEndSession();
												if (soundEnabled) {
													const audio = new Audio("/bell.mp3");
													audio
														.play()
														.catch((e) => console.log("Audio play failed:", e));
												}
											}}
										/>
									</div>
								</div>
							</motion.div>

							{/* Progress Bar */}
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.3 }}
								className="w-full max-w-xs mx-auto"
							>
								<div className="h-2 bg-border-secondary rounded-full overflow-hidden">
									<motion.div
										className="h-full bg-gradient-to-r from-green-500 to-blue-500"
										initial={{ width: "100%" }}
										animate={{
											width: `${(timeLeft / Number(sessionStorage.getItem("duration"))) * 100}%`,
										}}
										transition={{ duration: 1 }}
									/>
								</div>
							</motion.div>
						</div>

						{/* Pause Button Only */}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
							className="flex justify-center"
						>
							<RippleButton
								className="h-12 px-6 flex items-center justify-center gap-2 bg-border-secondary hover:bg-border-secondary/80 text-text-primary"
								onClick={() => setIsPaused(!isPaused)}
							>
								{isPaused ? (
									<Play className="size-4" />
								) : (
									<Pause className="size-4" />
								)}
								{isPaused ? "Resume" : "Pause"}
							</RippleButton>
						</motion.div>

						{/* Sound Toggle */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5 }}
							className="flex justify-center"
						>
							<button
								onClick={() => setSoundEnabled(!soundEnabled)}
								className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
							>
								{soundEnabled ? (
									<Volume2 className="size-4" />
								) : (
									<VolumeX className="size-4" />
								)}
								<span className="text-sm">
									{soundEnabled ? "Sound On" : "Sound Off"}
								</span>
							</button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default MainCountdown;
