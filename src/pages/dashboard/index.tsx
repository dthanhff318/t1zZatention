import { motion } from "framer-motion";
import {
	Trophy,
	Clock,
	Target,
	Zap,
	TrendingUp,
	Calendar,
	Star,
	Flame,
	Award,
	Activity,
	BarChart3,
	Timer,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";

const Dashboard = () => {
	const { user } = useAuthStore();

	// Generate last 7 days with date format
	const generateLast7Days = () => {
		const days = [];
		const today = new Date();

		// Start from 6 days ago to get last 7 days including today
		for (let i = 6; i >= 0; i--) {
			const date = new Date();
			date.setDate(today.getDate() - i);

			const day = date.getDate();
			const month = date.getMonth() + 1; // getMonth() returns 0-11

			days.push({
				date: `${day}/${month}`,
				hours: 0, // No fake data - show 0
			});
		}

		return days;
	};

	// Chart data with actual dates
	const [chartData] = useState(generateLast7Days());

	// Mock badges data - all disabled
	const [badges] = useState([
		{
			id: 1,
			name: "First Focus",
			icon: Target,
			color: "bg-green-600",
			achieved: false,
		},
		{
			id: 2,
			name: "Week Warrior",
			icon: Calendar,
			color: "bg-blue-600",
			achieved: false,
		},
		{
			id: 3,
			name: "Early Bird",
			icon: Zap,
			color: "bg-orange-600",
			achieved: false,
		},
		{
			id: 4,
			name: "Focus Master",
			icon: Trophy,
			color: "bg-purple-600",
			achieved: false,
		},
		{
			id: 5,
			name: "100 Hours",
			icon: Clock,
			color: "bg-yellow-600",
			achieved: false,
		},
		{
			id: 6,
			name: "Night Owl",
			icon: Star,
			color: "bg-indigo-600",
			achieved: false,
		},
	]);

	// Stats using real user data with fallbacks
	const stats = {
		totalHours: user?.totalTime || 0,
		currentStreak: user?.streak || 0,
		longestStreak: user?.max_focus_streak || 0,
		sessionsCompleted: 0, // No fake data - show 0
		averageSession: 0, // No fake data - show 0
		weeklyGoal: 0, // No fake data - show 0
		weeklyProgress: 0, // No fake data - show 0
	};

	// Recent sessions - no fake data
	const recentSessions: { id: number; duration: number; date: string; completed: boolean }[] = [];

	const fadeInUp = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.5 },
	};

	const maxHours = Math.max(...chartData.map((d) => d.hours));

	return (
		<div className="min-h-screen bg-primary">
			<div className="grid grid-cols-[8%_84%_8%] sm:grid-cols-[10%_80%_10%] lg:grid-cols-[15%_70%_15%]">
				{/* Left column */}
				<div className="border-r border-border-primary"></div>

				{/* Middle column */}
				<div className="border-r border-border-primary">
					<div className="py-8 sm:py-12 px-4 sm:px-6">
						{/* Page Header */}
						<motion.div
							className="mb-8"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
						>
							<h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">
								Dashboard
							</h1>
							<p className="text-text-secondary">
								Track your progress and achievements
							</p>
						</motion.div>

						{/* Quick Stats */}
						<motion.div
							className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
							initial="initial"
							animate="animate"
							variants={{
								animate: {
									transition: {
										staggerChildren: 0.1,
									},
								},
							}}
						>
							<motion.div
								variants={fadeInUp as any}
								className="p-4 border border-border-primary rounded-lg bg-border-secondary/30"
							>
								<div className="flex items-center justify-between mb-2">
									<Flame className="size-5 text-orange-500" />
									<span className="text-xs text-text-secondary">Streak</span>
								</div>
								<p className="text-2xl font-bold text-text-primary">
									{stats.currentStreak}
								</p>
								<p className="text-xs text-text-secondary">days</p>
							</motion.div>

							<motion.div
								variants={fadeInUp as any}
								className="p-4 border border-border-primary rounded-lg bg-border-secondary/30"
							>
								<div className="flex items-center justify-between mb-2">
									<Clock className="size-5 text-green-500" />
									<span className="text-xs text-text-secondary">Total</span>
								</div>
								<p className="text-2xl font-bold text-text-primary">
									{stats.totalHours}
								</p>
								<p className="text-xs text-text-secondary">hours</p>
							</motion.div>

							<motion.div
								variants={fadeInUp as any}
								className="p-4 border border-border-primary rounded-lg bg-border-secondary/30"
							>
								<div className="flex items-center justify-between mb-2">
									<Target className="size-5 text-blue-500" />
									<span className="text-xs text-text-secondary">Sessions</span>
								</div>
								<p className="text-2xl font-bold text-text-primary">
									{stats.sessionsCompleted}
								</p>
								<p className="text-xs text-text-secondary">completed</p>
							</motion.div>

							<motion.div
								variants={fadeInUp as any}
								className="p-4 border border-border-primary rounded-lg bg-border-secondary/30"
							>
								<div className="flex items-center justify-between mb-2">
									<Activity className="size-5 text-purple-500" />
									<span className="text-xs text-text-secondary">Average</span>
								</div>
								<p className="text-2xl font-bold text-text-primary">
									{stats.averageSession}
								</p>
								<p className="text-xs text-text-secondary">min/session</p>
							</motion.div>
						</motion.div>

						{/* Weekly Chart */}
						<motion.div
							className="mb-8"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
						>
							<div className="border border-border-primary rounded-lg p-2 md:p-6 bg-border-secondary/10">
								<div className="flex items-center justify-between mb-6">
									<div className="flex items-center gap-2">
										<BarChart3 className="size-5 text-green-500" />
										<h2 className="text-xl font-semibold text-text-primary">
											Last 7 Days
										</h2>
									</div>
									<Badge className="bg-green-600/20 text-green-500 hover:bg-green-600/20">
										{stats.weeklyProgress}h / {stats.weeklyGoal}h goal
									</Badge>
								</div>

								{/* Column Chart */}
								<div className="h-48 flex items-end justify-center gap-1 sm:gap-2 md:gap-3 overflow-x-auto overflow-y-hidden">
									{chartData.map((data, index) => (
										<motion.div
											key={index}
											className="flex flex-col items-center gap-1 w-full"
											initial={{ height: 0 }}
											animate={{ height: "100%" }}
											transition={{ delay: index * 0.1, duration: 0.5 }}
										>
											<div className="w-full flex flex-col items-center justify-end h-full">
												<span className="text-[9px] sm:text-[10px] md:text-xs text-text-secondary mb-1">
													{data.hours}h
												</span>
												<div
													className="w-full bg-green-600 rounded-t-md transition-all hover:bg-green-500"
													style={{
														height: `${(data.hours / maxHours) * 100}%`,
														minHeight: "4px",
													}}
												/>
											</div>
											<span className="text-[9px] sm:text-[10px] md:text-xs text-text-secondary whitespace-nowrap">
												{data.date}
											</span>
										</motion.div>
									))}
								</div>
							</div>
						</motion.div>

						{/* Badges Section */}
						<motion.div
							className="mb-8"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
						>
							<div className="border border-border-primary rounded-lg p-2 md:p-6 bg-border-secondary/10">
								<div className="flex items-center gap-2 mb-6">
									<Award className="size-5 text-yellow-500" />
									<h2 className="text-xl font-semibold text-text-primary">
										Achievements
									</h2>
								</div>

								<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
									{badges.map((badge) => (
										<motion.div
											key={badge.id}
											className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
												badge.achieved
													? "border-green-600/50 bg-border-secondary/50"
													: "border-border-primary opacity-50 grayscale"
											}`}
											whileHover={badge.achieved ? { scale: 1.05 } : {}}
										>
											<div
												className={`${badge.color} p-3 rounded-full ${!badge.achieved && "opacity-50"}`}
											>
												<badge.icon className="size-5 text-white" />
											</div>
											<p className="text-xs text-text-secondary text-center">
												{badge.name}
											</p>
										</motion.div>
									))}
								</div>
							</div>
						</motion.div>

						{/* Recent Sessions & Weekly Goal */}
						<div className="grid md:grid-cols-2 gap-8">
							{/* Recent Sessions */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4 }}
							>
								<div className="border border-border-primary rounded-lg p-2 md:p-6 bg-border-secondary/10 h-full">
									<div className="flex items-center gap-2 mb-4">
										<Timer className="size-5 text-blue-500" />
										<h2 className="text-xl font-semibold text-text-primary">
											Recent Sessions
										</h2>
									</div>

									<div className="space-y-3">
										{recentSessions.length > 0 ? (
											recentSessions.map((session) => (
												<div
													key={session.id}
													className="flex items-center justify-between p-3 rounded-lg bg-border-secondary/30"
												>
													<div className="flex items-center gap-3">
														<div
															className={`size-2 rounded-full ${
																session.completed ? "bg-green-500" : "bg-red-500"
															}`}
														/>
														<div>
															<p className="text-sm text-text-primary">
																{session.duration} minutes
															</p>
															<p className="text-xs text-text-secondary">
																{session.date}
															</p>
														</div>
													</div>
													<Badge variant="outline" className="text-xs">
														{session.completed ? "Completed" : "Interrupted"}
													</Badge>
												</div>
											))
										) : (
											<div className="p-6 text-center">
												<p className="text-text-secondary text-sm">No recent sessions</p>
											</div>
										)}
									</div>
								</div>
							</motion.div>

							{/* Weekly Goal Progress */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5 }}
							>
								<div className="border border-border-primary rounded-lg p-6 bg-border-secondary/10 h-full">
									<div className="flex items-center gap-2 mb-4">
										<TrendingUp className="size-5 text-purple-500" />
										<h2 className="text-xl font-semibold text-text-primary">
											Weekly Goal
										</h2>
									</div>

									<div className="space-y-4">
										<div>
											<div className="flex justify-between text-sm mb-2">
												<span className="text-text-secondary">Progress</span>
												<span className="text-text-primary font-medium">
													{stats.weeklyProgress}h / {stats.weeklyGoal}h
												</span>
											</div>
											<div className="w-full bg-border-primary rounded-full h-3 overflow-hidden">
												<motion.div
													className="h-full bg-gradient-to-r from-green-500 to-green-600"
													initial={{ width: 0 }}
													animate={{
														width: `${Math.min((stats.weeklyProgress / stats.weeklyGoal) * 100, 100)}%`,
													}}
													transition={{ duration: 1, delay: 0.5 }}
												/>
											</div>
											<p className="text-xs text-green-500 mt-2">
												{Math.round(
													(stats.weeklyProgress / stats.weeklyGoal) * 100
												)}
												% completed
											</p>
										</div>

										<div className="pt-4 border-t border-border-primary">
											<p className="text-sm text-text-secondary mb-2">
												Longest Streak
											</p>
											<div className="flex items-center gap-2">
												<Flame className="size-5 text-orange-500" />
												<span className="text-2xl font-bold text-text-primary">
													{stats.longestStreak} days
												</span>
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</div>

				{/* Right column */}
				<div className="border-border-primary"></div>
			</div>
		</div>
	);
};

export default Dashboard;
