import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import EPath from "./path";
import AnimateRouting from "./AnimateRouting";
import Login from "@/pages/login";
import AuthCallback from "@/pages/auth";
import AppLayout from "@/components/layout/AppLayout";
import Home from "@/pages/home/Home";
import JourneyStart from "@/pages/journey-start";

const router = createBrowserRouter([
	{
		path: EPath.Auth,
		element: <AuthCallback />,
	},
	{
		path: EPath.Home,
		element: <AppLayout />,
		children: [
			{
				path: EPath.Home,
				element: (
					<AnimateRouting key={EPath.Home}>
						<Home />
					</AnimateRouting>
				),
			},
		],
	},
	{
		path: EPath.JourneyStart,
		element: <AppLayout />,
		children: [
			{
				path: EPath.JourneyStart,
				element: <JourneyStart />,
			},
		],
	},
	{
		path: EPath.Login,
		element: <Layout />,
		children: [
			{
				path: EPath.Login,
				element: <Login />,
			},
		],
	},
]);

export default router;
