import LogoBlock from "@/components/logo-block/LogoBlock";
import { useAuthStore } from "@/store/authStore";
import React from "react";

const Header = () => {
	const { user } = useAuthStore();
	console.log(">", user?.name);
	return (
		<div className="grid grid-cols-[15%_60%_25%] sm:grid-cols-[15%_50%_35%] lg:grid-cols-[20%_50%_30%] h-20">
			<React.Fragment>
				{/* Left column */}
				<div className="border-r border-b border-border-primary"></div>

				{/* Middle column */}
				<div className="border-r border-b border-border-primary flex items-center">
					<LogoBlock size="sm" />
				</div>

				{/* Right column */}
				<div className="border-b border-border-primary flex items-center justify-center gap-2">
					<div className="size-9 rounded-full overflow-hidden">
						<img
							src="https://i.pinimg.com/736x/bf/9f/87/bf9f87cab07ae674f3c426fa5dbb3804.jpg"
							alt="logo"
						/>
					</div>
					<p className="text-sm text-text-primary font-medium hidden sm:block">
						{user?.name}
					</p>
				</div>
			</React.Fragment>
		</div>
	);
};

export default Header;
