import { MapPin } from "lucide-react";

const CheckIn = () => {
	return (
		<div className="p-3 text-text-primary flex flex-col gap-3">
			<p className="text-base font-semibold">Oh!, let's check your location</p>
			<div className="flex justify-center gap-3 pt-2">
				<div className="flex items-center gap-2 cursor-pointer">
					<MapPin size={30} />
					<p className="text-base">Click !</p>
				</div>
				<div className="flex items-center gap-2"></div>
			</div>
		</div>
	);
};

export default CheckIn;
