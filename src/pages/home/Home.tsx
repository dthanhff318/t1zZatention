import { motion } from "framer-motion";
import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import { Badge } from "@/components/ui/badge";
import { 
	ArrowRight, 
	Play, 
	Sparkles, 
	Timer, 
	Target, 
	Award,
	Users,
	TrendingUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import EPath from "@/routes/path";

const Home = () => {
	const navigate = useNavigate();

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: "easeOut",
			},
		},
	};

	const floatingVariants = {
		animate: {
			y: [-10, 10, -10],
			transition: {
				duration: 4,
				repeat: Infinity,
				ease: "easeInOut",
			},
		},
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-primary via-primary to-primary/95 relative overflow-hidden">
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden">
				<motion.div
					className="absolute top-20 left-20 w-72 h-72 bg-green-500/5 rounded-full blur-3xl"
					animate={{ 
						scale: [1, 1.2, 1],
						opacity: [0.3, 0.1, 0.3]
					}}
					transition={{ duration: 8, repeat: Infinity }}
				/>
				<motion.div
					className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
					animate={{ 
						scale: [1.2, 1, 1.2],
						opacity: [0.1, 0.3, 0.1]
					}}
					transition={{ duration: 10, repeat: Infinity }}
				/>
				<motion.div
					className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
					animate={{ 
						scale: [1, 1.3, 1],
						opacity: [0.2, 0.05, 0.2]
					}}
					transition={{ duration: 12, repeat: Infinity }}
				/>
			</div>

			{/* Main content */}
			<div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-16">
				<div className="max-w-6xl mx-auto text-center">
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className="space-y-8"
					>
						{/* Hero badge */}
						<motion.div variants={itemVariants} className="flex justify-center">
							<Badge className="bg-green-500/10 text-green-400 border-green-500/20 px-6 py-2 text-sm font-medium backdrop-blur-sm">
								<Sparkles className="w-4 h-4 mr-2" />
								Transform Your Focus Journey
							</Badge>
						</motion.div>

						{/* Main heading */}
						<motion.div variants={itemVariants} className="space-y-6">
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
								Focus.
								<br />
								<span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
									Achieve.
								</span>
								<br />
								Repeat.
							</h1>
							<p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
								Master deep work with our gamified focus system. 
								Earn rewards and unlock your potential.
							</p>
						</motion.div>

						{/* CTA button */}
						<motion.div 
							variants={itemVariants} 
							className="flex justify-center"
						>
							<RippleButton
								onClick={() => navigate(EPath.Main)}
								className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 text-base font-semibold rounded-xl shadow-lg shadow-green-500/25 border-0"
							>
								<Play className="w-4 h-4 mr-2" />
								Start Focusing Now
								<ArrowRight className="w-4 h-4 ml-2" />
							</RippleButton>
						</motion.div>

						{/* Feature highlights */}
						<motion.div 
							variants={itemVariants}
							className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
						>
							<motion.div 
								variants={floatingVariants}
								animate="animate"
								className="group p-6 rounded-2xl bg-border-secondary/10 backdrop-blur-sm border border-border-primary/50 hover:border-green-500/30 transition-all duration-300 hover:bg-border-secondary/20"
							>
								<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
									<Timer className="w-6 h-6 text-white" />
								</div>
								<h3 className="text-lg font-semibold text-text-primary mb-2">Smart Timer</h3>
								<p className="text-text-secondary text-sm">Pomodoro technique with AI-powered break suggestions</p>
							</motion.div>

							<motion.div 
								variants={floatingVariants}
								animate="animate"
								style={{ animationDelay: "1s" }}
								className="group p-6 rounded-2xl bg-border-secondary/10 backdrop-blur-sm border border-border-primary/50 hover:border-yellow-500/30 transition-all duration-300 hover:bg-border-secondary/20"
							>
								<div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
									<Award className="w-6 h-6 text-white" />
								</div>
								<h3 className="text-lg font-semibold text-text-primary mb-2">Achievements</h3>
								<p className="text-text-secondary text-sm">Unlock badges and rewards for consistent focus habits</p>
							</motion.div>

							<motion.div 
								variants={floatingVariants}
								animate="animate"
								style={{ animationDelay: "2s" }}
								className="group p-6 rounded-2xl bg-border-secondary/10 backdrop-blur-sm border border-border-primary/50 hover:border-purple-500/30 transition-all duration-300 hover:bg-border-secondary/20"
							>
								<div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
									<Target className="w-6 h-6 text-white" />
								</div>
								<h3 className="text-lg font-semibold text-text-primary mb-2">Goal Tracking</h3>
								<p className="text-text-secondary text-sm">Set targets and visualize your productivity journey</p>
							</motion.div>
						</motion.div>

						{/* Social proof */}
						<motion.div 
							variants={itemVariants}
							className="mt-12 flex flex-wrap justify-center items-center gap-6 text-text-secondary text-sm"
						>
							<div className="flex items-center gap-2">
								<Users className="w-5 h-5 text-green-400" />
								<span className="font-semibold text-text-primary">12K+</span>
								<span>Focus Warriors</span>
							</div>
							<div className="hidden sm:block w-px h-6 bg-border-primary"></div>
							<div className="flex items-center gap-2">
								<TrendingUp className="w-5 h-5 text-blue-400" />
								<span className="font-semibold text-text-primary">2.5M+</span>
								<span>Hours Focused</span>
							</div>
							<div className="hidden sm:block w-px h-6 bg-border-primary"></div>
							<div className="flex items-center gap-2">
								<Award className="w-5 h-5 text-yellow-400" />
								<span className="font-semibold text-text-primary">95%</span>
								<span>Success Rate</span>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default Home;