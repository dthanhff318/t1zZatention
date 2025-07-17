import Header from "@/components/layout/Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
	return (
		<div className="relative w-screen h-screen bg-primary overflow-y-auto overflow-x-hidden flex">
			<div className="flex-1">
				<Header />
				<Outlet />
			</div>
		</div>
	);
};

export default AppLayout;
