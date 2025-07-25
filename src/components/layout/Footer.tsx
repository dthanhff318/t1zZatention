import { Link } from "react-router-dom";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-t border-border-primary bg-primary">
			<div className="grid grid-cols-[8%_84%_8%] sm:grid-cols-[15%_70%_15%] lg:grid-cols-[20%_60%_20%]">
				{/* Left column */}
				<div className="border-r border-border-primary"></div>

				{/* Middle column */}
				<div className="border-r border-border-primary">
					<div className="py-6 px-4 sm:px-6">
						<div className="flex flex-col sm:flex-row justify-between items-center gap-4">
							<p className="text-text-secondary text-sm text-center sm:text-left">
								© {currentYear} AttentionTime. All rights reserved.
							</p>
							<div className="flex items-center gap-4">
								<Link to="/privacy" className="text-text-secondary hover:text-text-primary text-sm transition-colors">
									Privacy
								</Link>
								<span className="text-border-primary">·</span>
								<Link to="/terms" className="text-text-secondary hover:text-text-primary text-sm transition-colors">
									Terms
								</Link>
								<span className="text-border-primary">·</span>
								<Link to="/cookies" className="text-text-secondary hover:text-text-primary text-sm transition-colors">
									Cookies
								</Link>
							</div>
						</div>
					</div>
				</div>

				{/* Right column */}
				<div className="border-border-primary"></div>
			</div>
		</footer>
	);
};

export default Footer;