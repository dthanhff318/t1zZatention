import React from "react";
import SelectSquad from "@/components/start-journey/select-squad";
import CheckIn from "@/components/check-in/check-in";

const JourneyStart = () => {
	const contentBlocks = [<SelectSquad />, <CheckIn />];

	return (
		<div className="min-h-screen">
			{/* Container  */}
			<div className="grid grid-cols-[8%_84%_8%] sm:grid-cols-[15%_70%_15%] lg:grid-cols-[20%_60%_20%]">
				{/* Each block */}
				{contentBlocks.map((Block, index) => (
					<React.Fragment key={index}>
						{/* Left column */}
						<div className="border-r border-b border-border-primary"></div>

						{/* Middle column */}
						<div className="border-r border-b border-border-primary flex items-center">
							<div className="w-full">
								<>{Block}</>
							</div>
						</div>

						{/* Right column */}
						<div className="border-b border-border-primary "></div>
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default JourneyStart;
