import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Target,
	Trophy,
	Clock,
	Flame,
	Star,
	Zap,
	Brain,
	Coffee,
	Moon,
	Sun,
	Calendar,
	TrendingUp,
	Award,
	CheckCircle2,
	Lock,
	Sparkles,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mission types
type MissionCategory = "daily" | "weekly" | "achievement" | "special";
type MissionStatus = "locked" | "active" | "completed";

interface Mission {
	id: string;
	title: string;
	description: string;
	category: MissionCategory;
	icon: any;
	requiredValue: number;
	currentValue: number;
	reward: {
		points: number;
		badge?: string;
	};
	status: MissionStatus;
	unlockRequirement?: string;
}

const Missions = () => {
	const [selectedCategory, setSelectedCategory] = useState<
		MissionCategory | "all"
	>("all");

	// Sample missions data
	const missions: Mission[] = [
		// Daily Missions
		{
			id: "daily-1",
			title: "Morning Focus",
			description: "Complete a 25-minute focus session before 10 AM",
			category: "daily",
			icon: Sun,
			requiredValue: 1,
			currentValue: 0,
			reward: { points: 50 },
			status: "active",
		},
		{
			id: "daily-2",
			title: "Triple Threat",
			description: "Complete 3 focus sessions in one day",
			category: "daily",
			icon: Zap,
			requiredValue: 3,
			currentValue: 2,
			reward: { points: 100 },
			status: "active",
		},
		{
			id: "daily-3",
			title: "Night Owl",
			description: "Complete a focus session after 8 PM",
			category: "daily",
			icon: Moon,
			requiredValue: 1,
			currentValue: 0,
			reward: { points: 50 },
			status: "active",
		},

		// Weekly Missions
		{
			id: "weekly-1",
			title: "Consistency King",
			description: "Maintain a 7-day streak",
			category: "weekly",
			icon: Flame,
			requiredValue: 7,
			currentValue: 5,
			reward: { points: 500, badge: "Consistent Achiever" },
			status: "active",
		},
		{
			id: "weekly-2",
			title: "Marathon Runner",
			description: "Complete 20 hours of focus time this week",
			category: "weekly",
			icon: Clock,
			requiredValue: 20,
			currentValue: 14,
			reward: { points: 750, badge: "Time Master" },
			status: "active",
		},
		{
			id: "weekly-3",
			title: "Early Bird Week",
			description: "Start sessions before 9 AM for 5 days",
			category: "weekly",
			icon: Calendar,
			requiredValue: 5,
			currentValue: 3,
			reward: { points: 300 },
			status: "active",
		},

		// Achievement Missions
		{
			id: "achievement-1",
			title: "Focus Novice",
			description: "Complete your first 10 focus sessions",
			category: "achievement",
			icon: Award,
			requiredValue: 10,
			currentValue: 10,
			reward: { points: 200, badge: "Focus Novice" },
			status: "completed",
		},
		{
			id: "achievement-2",
			title: "Time Warrior",
			description: "Accumulate 100 hours of focus time",
			category: "achievement",
			icon: Trophy,
			requiredValue: 100,
			currentValue: 67,
			reward: { points: 2000, badge: "Time Warrior" },
			status: "active",
		},
		{
			id: "achievement-3",
			title: "Streak Master",
			description: "Achieve a 30-day streak",
			category: "achievement",
			icon: TrendingUp,
			requiredValue: 30,
			currentValue: 7,
			reward: { points: 1500, badge: "Streak Master" },
			status: "active",
		},

		// Special Missions
		{
			id: "special-1",
			title: "Weekend Warrior",
			description: "Complete 5 sessions on weekend days",
			category: "special",
			icon: Star,
			requiredValue: 5,
			currentValue: 2,
			reward: { points: 400, badge: "Weekend Warrior" },
			status: "active",
		},
		{
			id: "special-2",
			title: "Deep Focus Master",
			description: "Complete a 60-minute uninterrupted session",
			category: "special",
			icon: Brain,
			requiredValue: 1,
			currentValue: 0,
			reward: { points: 300, badge: "Deep Focus" },
			status: "locked",
			unlockRequirement: "Reach Level 10",
		},
		{
			id: "special-3",
			title: "Coffee Break Champion",
			description: "Take proper breaks between all sessions for a week",
			category: "special",
			icon: Coffee,
			requiredValue: 7,
			currentValue: 0,
			reward: { points: 250 },
			status: "locked",
			unlockRequirement: "Complete 'Consistency King'",
		},
	];

	const categories = [
		{ id: "all", label: "All", color: "text-text-primary" },
		{ id: "daily", label: "Daily", color: "text-blue-500" },
		{ id: "weekly", label: "Weekly", color: "text-purple-500" },
		{ id: "achievement", label: "Achieve", color: "text-yellow-500" },
		{ id: "special", label: "Special", color: "text-pink-500" },
	];

	const filteredMissions =
		selectedCategory === "all"
			? missions
			: missions.filter((m) => m.category === selectedCategory);

	const getCategoryColor = (category: MissionCategory) => {
		switch (category) {
			case "daily":
				return "border-blue-500/50 bg-blue-500/10";
			case "weekly":
				return "border-purple-500/50 bg-purple-500/10";
			case "achievement":
				return "border-yellow-500/50 bg-yellow-500/10";
			case "special":
				return "border-pink-500/50 bg-pink-500/10";
		}
	};

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
									Total Points
								</p>
								<p className="text-xl sm:text-2xl font-bold text-text-primary">
									2,450
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
				{/* Category Filters - Horizontal scroll on mobile */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className="flex gap-1.5 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2"
				>
					{categories.map((category) => (
						<motion.button
							key={category.id}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => setSelectedCategory(category.id as any)}
							className={cn(
								"px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all whitespace-nowrap text-xs sm:text-base flex-shrink-0",
								selectedCategory === category.id
									? "bg-border-secondary text-text-primary border-2 border-green-500/50"
									: "bg-border-secondary/50 text-text-secondary hover:bg-border-secondary"
							)}
						>
							{category.label}
						</motion.button>
					))}
				</motion.div>

				{/* Missions Grid - Single column on mobile */}
				<motion.div
					layout
					className="grid gap-y-3 gap-x-0 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full"
				>
					<AnimatePresence mode="popLayout">
						{filteredMissions.map((mission, index) => (
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
									getCategoryColor(mission.category),
									mission.status === "locked" && "opacity-60",
									mission.status === "completed" &&
										"border-green-500/50 bg-green-500/10"
								)}
							>
								{/* Lock Overlay */}
								{mission.status === "locked" && (
									<div className="absolute inset-0 flex items-center justify-center bg-primary/80 backdrop-blur-sm rounded-xl">
										<div className="text-center px-4">
											<Lock className="size-6 sm:size-8 text-text-secondary mx-auto mb-2" />
											<p className="text-xs sm:text-sm text-text-secondary">
												{mission.unlockRequirement}
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
												<Badge
													variant="secondary"
													className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs inline-block"
												>
													{mission.category}
												</Badge>
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
												<span className="text-text-secondary">Progress</span>
												<span className="font-medium text-text-primary whitespace-nowrap">
													{mission.currentValue} / {mission.requiredValue}
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
			</div>
		</div>
	);
};

export default Missions;
