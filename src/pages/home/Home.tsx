import { motion } from "framer-motion";
import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import { Badge } from "@/components/ui/badge";
import {
	Clock,
	Trophy,
	Zap,
	TrendingUp,
	Calendar,
	Gift,
	Users,
	ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import EPath from "@/routes/path";
import Footer from "@/components/layout/Footer";

const Home = () => {
	const navigate = useNavigate();

	const fadeInUp = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.5 },
	};

	const staggerChildren = {
		animate: {
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	return (
		<div className="min-h-screen bg-primary flex flex-col">
			<div className="flex-1">
				{/* Hero Section */}
				<section className="relative overflow-hidden">
					<div className="grid grid-cols-[8%_84%_8%] sm:grid-cols-[15%_70%_15%] lg:grid-cols-[20%_60%_20%]">
						{/* Left column */}
						<div className="border-r border-border-primary"></div>

						{/* Middle column */}
						<div className="border-r border-border-primary">
							<motion.div
								className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6"
								initial="initial"
								animate="animate"
								variants={staggerChildren}
							>
								{/* Hero Badge */}
								<motion.div
									variants={fadeInUp as any}
									className="flex justify-center mb-6"
								>
									<Badge className="text-text-secondary bg-border-secondary hover:bg-border-secondary px-4 py-1.5">
										<Zap size={14} className="mr-2" />
										Attention. Achieve. Repeat.
									</Badge>
								</motion.div>

								{/* Hero Title */}
								<motion.h1
									variants={fadeInUp as any}
									className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary text-center mb-6"
								>
									Master Your Attention,
									<br />
									<span className="text-green-500">Unlock Rewards</span>
								</motion.h1>

								{/* Hero Description */}
								<motion.p
									variants={fadeInUp as any}
									className="text-lg sm:text-xl text-text-secondary text-center mb-8 max-w-2xl mx-auto"
								>
									Build unbreakable attention habits. Earn badges, unlock
									achievements, and join a community of high performers. Your
									journey to deep work starts here.
								</motion.p>

								{/* CTA Button */}
								<motion.div
									variants={fadeInUp as any}
									className="flex justify-center"
								>
									<RippleButton
										onClick={() => navigate(EPath.Main)}
										className="h-12 px-8 text-lg font-semibold bg-green-600 hover:bg-green-700"
									>
										Start Now
										<ChevronRight size={20} className="ml-2" />
									</RippleButton>
								</motion.div>

								{/* Stats */}
								<motion.div
									variants={fadeInUp as any}
									className="grid grid-cols-3 gap-4 mt-12 max-w-lg mx-auto"
								>
									<div className="text-center">
										<p className="text-2xl sm:text-3xl font-bold text-text-primary">
											10K+
										</p>
										<p className="text-sm text-text-secondary">Active Users</p>
									</div>
									<div className="text-center border-x border-border-primary">
										<p className="text-2xl sm:text-3xl font-bold text-text-primary">
											2M+
										</p>
										<p className="text-sm text-text-secondary">
											Attention Hours
										</p>
									</div>
									<div className="text-center">
										<p className="text-2xl sm:text-3xl font-bold text-text-primary">
											98%
										</p>
										<p className="text-sm text-text-secondary">
											Performance Boost
										</p>
									</div>
								</motion.div>
							</motion.div>
						</div>

						{/* Right column */}
						<div className="border-border-primary"></div>
					</div>
				</section>

				{/* Features Section */}
				<section className="border-t border-border-primary">
					<div className="grid grid-cols-[8%_84%_8%] sm:grid-cols-[15%_70%_15%] lg:grid-cols-[20%_60%_20%]">
						{/* Left column */}
						<div className="border-r border-border-primary"></div>

						{/* Middle column */}
						<div className="border-r border-border-primary">
							<div className="py-16 sm:py-24 px-4 sm:px-6">
								<motion.h2
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true }}
									className="text-3xl sm:text-4xl font-bold text-text-primary text-center mb-12"
								>
									Everything You Need to Stay Attentive
								</motion.h2>

								<motion.div
									className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
									initial="initial"
									whileInView="animate"
									viewport={{ once: true }}
									variants={staggerChildren}
								>
									{/* Feature 1 */}
									<motion.div
										variants={fadeInUp as any}
										className="p-6 border border-border-primary rounded-lg hover:border-green-600 transition-colors"
									>
										<div className="bg-border-secondary p-3 rounded-lg w-fit mb-4">
											<Clock className="size-6 text-green-500" />
										</div>
										<h3 className="text-xl font-semibold text-text-primary mb-2">
											Pomodoro Timer
										</h3>
										<p className="text-text-secondary">
											Customizable attention sessions with built-in breaks to
											maximize productivity.
										</p>
									</motion.div>

									{/* Feature 2 */}
									<motion.div
										variants={fadeInUp as any}
										className="p-6 border border-border-primary rounded-lg hover:border-green-600 transition-colors"
									>
										<div className="bg-border-secondary p-3 rounded-lg w-fit mb-4">
											<Trophy className="size-6 text-yellow-500" />
										</div>
										<h3 className="text-xl font-semibold text-text-primary mb-2">
											Achievement System
										</h3>
										<p className="text-text-secondary">
											Earn badges and unlock rewards as you build consistent
											attention habits.
										</p>
									</motion.div>

									{/* Feature 3 */}
									<motion.div
										variants={fadeInUp as any}
										className="p-6 border border-border-primary rounded-lg hover:border-green-600 transition-colors"
									>
										<div className="bg-border-secondary p-3 rounded-lg w-fit mb-4">
											<TrendingUp className="size-6 text-blue-500" />
										</div>
										<h3 className="text-xl font-semibold text-text-primary mb-2">
											Progress Tracking
										</h3>
										<p className="text-text-secondary">
											Visualize your attention journey with detailed analytics
											and insights.
										</p>
									</motion.div>

									{/* Feature 4 */}
									<motion.div
										variants={fadeInUp as any}
										className="p-6 border border-border-primary rounded-lg hover:border-green-600 transition-colors"
									>
										<div className="bg-border-secondary p-3 rounded-lg w-fit mb-4">
											<Calendar className="size-6 text-purple-500" />
										</div>
										<h3 className="text-xl font-semibold text-text-primary mb-2">
											Streak System
										</h3>
										<p className="text-text-secondary">
											Build momentum with daily streaks and consistency rewards.
										</p>
									</motion.div>

									{/* Feature 5 */}
									<motion.div
										variants={fadeInUp as any}
										className="p-6 border border-border-primary rounded-lg hover:border-green-600 transition-colors"
									>
										<div className="bg-border-secondary p-3 rounded-lg w-fit mb-4">
											<Gift className="size-6 text-orange-500" />
										</div>
										<h3 className="text-xl font-semibold text-text-primary mb-2">
											Daily Rewards
										</h3>
										<p className="text-text-secondary">
											Get bonus points and special badges for maintaining your
											attention streak.
										</p>
									</motion.div>

									{/* Feature 6 */}
									<motion.div
										variants={fadeInUp as any}
										className="p-6 border border-border-primary rounded-lg hover:border-green-600 transition-colors"
									>
										<div className="bg-border-secondary p-3 rounded-lg w-fit mb-4">
											<Users className="size-6 text-cyan-500" />
										</div>
										<h3 className="text-xl font-semibold text-text-primary mb-2">
											Community
										</h3>
										<p className="text-text-secondary">
											Join attention rooms and compete with friends on the
											leaderboard.
										</p>
									</motion.div>
								</motion.div>
							</div>
						</div>

						{/* Right column */}
						<div className="border-border-primary"></div>
					</div>
				</section>
			</div>

			{/* Footer */}
			<Footer />
		</div>
	);
};

export default Home;
