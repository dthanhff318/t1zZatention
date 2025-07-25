import { useState, useEffect } from "react";
import MainCountdown from "@/components/main-countdown/main-countdown";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Zap, ChevronRight } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const Main = () => {
	const { user } = useAuthStore();
	const [currentQuote, setCurrentQuote] = useState(0);

	const motivationalQuotes = [
		{
			text: "Focus is the art of knowing what to ignore.",
			author: "James Clear",
		},
		{ text: "Where focus goes, energy flows.", author: "Tony Robbins" },
		{
			text: "The successful warrior is the average man with laser-like focus.",
			author: "Bruce Lee",
		},
		{
			text: "Concentrate all your thoughts upon the work at hand.",
			author: "Alexander Graham Bell",
		},
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-br from-primary via-primary to-border-secondary/20">
			{/* Animated Background Pattern */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
			</div>

			{/* Header Section with Animation */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="relative z-10"
			>
				<div className="grid grid-cols-[8%_84%_8%] sm:grid-cols-[15%_70%_15%] lg:grid-cols-[20%_60%_20%]">
					<div className="border-r border-b border-border-primary/50 h-20 backdrop-blur-sm"></div>
					<div className="border-r border-b border-border-primary/50 h-20 backdrop-blur-sm">
						<div className="h-full flex flex-col items-center justify-center">
							<motion.div
								initial={{ scale: 0.9 }}
								animate={{ scale: 1 }}
								transition={{ duration: 0.5, delay: 0.2 }}
								className="flex items-center gap-3"
							>
								<div className="relative">
									<div className="absolute inset-0 bg-green-500/20 blur-xl"></div>
									<Brain className="size-8 text-green-500 relative" />
								</div>
								<h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-text-primary to-green-500 bg-clip-text text-transparent">
									Focus Zone
								</h1>
							</motion.div>
							{user && (
								<motion.p
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.4 }}
									className="text-sm text-text-secondary mt-1"
								>
									Welcome back, {user.name}
								</motion.p>
							)}
						</div>
					</div>
					<div className="border-b border-border-primary/50 h-20 backdrop-blur-sm"></div>
				</div>
			</motion.div>

			{/* Main Content Container */}
			<div className="grid grid-cols-[8%_84%_8%] sm:grid-cols-[15%_70%_15%] lg:grid-cols-[20%_60%_20%] min-h-[calc(100vh-5rem)]">
				{/* Left column */}
				<div className="border-r border-border-primary/50"></div>

				{/* Middle column - Main Content */}
				<div className="border-r border-border-primary/50 py-8 px-4 sm:px-6">
					<div className="max-w-4xl mx-auto space-y-8">
						{/* Motivational Quote Section */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
							className="text-center mb-8"
						>
							<AnimatePresence mode="wait">
								<motion.div
									key={currentQuote}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.5 }}
									className="space-y-2"
								>
									<p className="text-lg sm:text-xl text-text-secondary italic">
										"{motivationalQuotes[currentQuote]?.text}"
									</p>
									<p className="text-sm text-text-secondary/70">
										— {motivationalQuotes[currentQuote]?.author}
									</p>
								</motion.div>
							</AnimatePresence>
						</motion.div>

						{/* Main Timer Card */}
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.6 }}
							className="relative"
						>
							{/* Glow Effect */}
							<div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 blur-xl"></div>

							{/* Card Content */}
							<div className="relative bg-primary/80 backdrop-blur-md rounded-2xl border border-border-primary/50 shadow-2xl overflow-hidden">
								{/* Animated Border */}
								<div className="absolute inset-0 rounded-2xl">
									<div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-green-500 to-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
								</div>

								{/* Timer Section */}
								<div className="relative p-8 sm:p-12">
									<MainCountdown />
								</div>

								{/* Quick Tips */}
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.8 }}
									className="border-t border-border-primary/50 p-6 bg-border-secondary/20"
								>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<Zap className="size-5 text-yellow-500" />
											<div>
												<p className="text-sm font-medium text-text-primary">
													Pro Tip
												</p>
												<p className="text-xs text-text-secondary">
													Take a 5-minute break every 25 minutes for optimal
													focus
												</p>
											</div>
										</div>
										<ChevronRight className="size-5 text-text-secondary" />
									</div>
								</motion.div>
							</div>
						</motion.div>
					</div>
				</div>

				{/* Right column */}
				<div className="border-border-primary/50"></div>
			</div>
		</div>
	);
};

export default Main;
