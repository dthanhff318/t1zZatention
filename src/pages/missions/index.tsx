import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Target,
	Trophy,
	Brain,
	CheckCircle2,
	Lock,
	Sparkles,
	Loader2,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { missionService, UserMission } from "@/services/missionService";

// Mission types
type MissionStatus = "locked" | "active" | "completed";

interface Mission {
	id: string;
	title: string;
	description: string;
	icon: any;
	requiredValue: number;
	currentValue: number;
	progress: number;
	reward: {
		points: number;
		badge?: string;
	};
	status: MissionStatus;
	publish: boolean;
}

const Missions = () => {
	const { user } = useAuthStore();
	const [missions, setMissions] = useState<Mission[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch user missions from database
	useEffect(() => {
		const fetchUserMissions = async () => {
			if (!user?.id) {
				return;
			}

			try {
				setIsLoading(true);
				const userMissions = await missionService.getUserMissions(user.id);

				// Transform user missions to display format
				const transformedMissions: Mission[] = userMissions.map(
					(userMission: UserMission) => ({
						id: userMission.mission_code,
						title: userMission.mission.name,
						description: userMission.mission.description,
						progress: userMission.progress || 0,
						icon: Brain,
						requiredValue: userMission.mission.target,
						currentValue: userMission.progress || 0,
						reward: {
							points: 100,
							badge:
								userMission.progress === userMission.mission.target
									? `${userMission.mission.name} Master`
									: undefined,
						},
						status: !userMission.mission.publish
							? "locked"
							: userMission.completed_at
								? "completed"
								: ("active" as MissionStatus),
						publish: userMission.mission.publish,
					})
				);

				setMissions(transformedMissions);
			} catch (err) {
				console.error("Error fetching user missions:", err);
				setError("Failed to load your missions");
			} finally {
				setIsLoading(false);
			}
		};

		fetchUserMissions();
	}, [user?.id]);

	const getProgressPercentage = (current: number, required: number) => {
		return Math.min((current / required) * 100, 100);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-primary via-primary to-border-secondary/20 overflow-x-hidden">
			{/* Background Effects */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
			</div>

			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="relative z-10 border-b border-border-primary/50 backdrop-blur-sm"
			>
				<div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						{/* Title Section */}
						<div className="flex items-center gap-3">
							<div className="relative">
								<div className="absolute inset-0 bg-purple-500/20 blur-xl"></div>
								<Target className="size-6 sm:size-8 text-purple-500 relative" />
							</div>
							<div>
								<h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-text-primary to-purple-500 bg-clip-text text-transparent">
									Missions
								</h1>
								<p className="text-xs sm:text-sm text-text-secondary hidden sm:block">
									Complete missions to earn rewards and badges
								</p>
							</div>
						</div>

						{/* Points Section */}
						<div className="flex items-center gap-3 sm:gap-4">
							<div className="text-right">
								<p className="text-xs sm:text-sm text-text-secondary">
									Total Time
								</p>
								<p className="text-xl sm:text-2xl font-bold text-text-primary">
									{user?.totalTime || 0}
								</p>
							</div>
							<motion.div
								whileHover={{ scale: 1.1, rotate: 10 }}
								className="size-10 sm:size-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
							>
								<Trophy className="size-5 sm:size-6 text-white" />
							</motion.div>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-3 py-4 sm:px-6 sm:py-8 lg:px-8">
				{/* Loading State */}
				{isLoading && (
					<div className="flex items-center justify-center min-h-[400px]">
						<div className="text-center">
							<Loader2 className="size-8 text-text-secondary animate-spin mx-auto mb-4" />
							<p className="text-text-secondary">Loading missions...</p>
						</div>
					</div>
				)}

				{/* Error State */}
				{error && !isLoading && (
					<div className="flex items-center justify-center min-h-[400px]">
						<div className="text-center">
							<p className="text-red-500 mb-4">{error}</p>
							<button
								onClick={() => window.location.reload()}
								className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
							>
								Retry
							</button>
						</div>
					</div>
				)}

				{/* Content */}
				{!isLoading && !error && missions.length === 0 && (
					<div className="flex items-center justify-center min-h-[400px]">
						<div className="text-center">
							<Target className="size-12 text-text-secondary mx-auto mb-4" />
							<p className="text-text-secondary">No missions available yet</p>
						</div>
					</div>
				)}

				{/* Missions List */}
				{!isLoading && !error && missions.length > 0 && (
					<>
						{/* Missions Grid - Single column on mobile */}
						<motion.div
							layout
							className="grid gap-y-3 gap-x-0 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full"
						>
							<AnimatePresence mode="popLayout">
								{missions.map((mission, index) => (
									<motion.div
										key={mission.id}
										layout
										initial={{ opacity: 0, scale: 0.9, y: 20 }}
										animate={{ opacity: 1, scale: 1, y: 0 }}
										exit={{ opacity: 0, scale: 0.9, y: -20 }}
										transition={{ delay: index * 0.05 }}
										whileHover={mission.status !== "locked" ? { y: -5 } : {}}
										className={cn(
											"relative rounded-xl border-2 p-3 sm:p-6 backdrop-blur-sm transition-all w-full overflow-hidden",
											mission.status === "locked" && "opacity-60",
											mission.status === "completed" &&
												"border-green-500/50 bg-green-500/10"
										)}
									>
										{/* Lock Overlay for unpublished missions */}
										{mission.status === "locked" && !mission.publish && (
											<div className="absolute inset-0 flex items-center justify-center bg-primary/80 backdrop-blur-sm rounded-xl">
												<div className="text-center px-4">
													<Lock className="size-6 sm:size-8 text-text-secondary mx-auto mb-2" />
													<p className="text-xs sm:text-sm text-text-secondary">
														Mission not available yet
													</p>
													<p className="text-[10px] sm:text-xs text-text-secondary/70 mt-1">
														Coming soon...
													</p>
												</div>
											</div>
										)}

										{/* Mission Content */}
										<div
											className={cn(
												mission.status === "locked" && "blur-sm",
												"w-full"
											)}
										>
											{/* Header */}
											<div className="flex items-start justify-between mb-3 sm:mb-4 gap-2 w-full">
												<div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
													<div
														className={cn(
															"w-9 h-9 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0",
															mission.status === "completed"
																? "bg-green-500/20"
																: "bg-border-secondary"
														)}
													>
														<mission.icon
															className={cn(
																"size-4 sm:size-6",
																mission.status === "completed"
																	? "text-green-500"
																	: "text-text-primary"
															)}
														/>
													</div>
													<div className="min-w-0 flex-1 overflow-hidden">
														<h3 className="font-semibold text-text-primary text-xs sm:text-base truncate">
															{mission.title}
														</h3>
													</div>
												</div>
												{mission.status === "completed" && (
													<motion.div
														initial={{ scale: 0 }}
														animate={{ scale: 1 }}
														transition={{ type: "spring", bounce: 0.5 }}
														className="flex-shrink-0"
													>
														<CheckCircle2 className="size-4 sm:size-6 text-green-500" />
													</motion.div>
												)}
											</div>

											{/* Description */}
											<p className="text-xs sm:text-sm text-text-secondary mb-3 sm:mb-4 line-clamp-2">
												{mission.description}
											</p>

											{/* Progress */}
											{mission.status !== "completed" && (
												<div className="space-y-2 mb-3 sm:mb-4 w-full">
													<div className="flex justify-between text-xs sm:text-sm gap-2">
														<span className="text-text-secondary">
															Progress
														</span>
														<span className="font-medium text-text-primary whitespace-nowrap">
															{mission.progress} / {mission.requiredValue}
														</span>
													</div>
													<div className="w-full">
														<Progress
															value={getProgressPercentage(
																mission.currentValue,
																mission.requiredValue
															)}
															className="h-2 w-full"
														/>
													</div>
												</div>
											)}

											{/* Rewards */}
											<div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-border-primary/30 gap-2">
												<div className="flex items-center gap-1 sm:gap-2 min-w-0">
													<Sparkles className="size-3 sm:size-4 text-yellow-500 flex-shrink-0" />
													<span className="text-[11px] sm:text-sm font-medium text-text-primary whitespace-nowrap">
														+{mission.reward.points} pts
													</span>
												</div>
											</div>
										</div>
									</motion.div>
								))}
							</AnimatePresence>
						</motion.div>
					</>
				)}
			</div>
		</div>
	);
};

export default Missions;
