import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import EPath from "./path";
import AnimateRouting from "./AnimateRouting";
import Login from "@/pages/login";
import AuthCallback from "@/pages/auth";
import AppLayout from "@/components/layout/AppLayout";
import Home from "@/pages/home/Home";
import Main from "@/pages/main";
import Dashboard from "@/pages/dashboard";
import Missions from "@/pages/missions";

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
		path: EPath.Main,
		element: <AppLayout />,
		children: [
			{
				path: EPath.Main,
				element: (
					<AnimateRouting key={EPath.Main}>
						<Main />
					</AnimateRouting>
				),
			},
		],
	},
	{
		path: EPath.Dashboard,
		element: <AppLayout />,
		children: [
			{
				path: EPath.Dashboard,
				element: (
					<AnimateRouting key={EPath.Dashboard}>
						<Dashboard />
					</AnimateRouting>
				),
			},
		],
	},
	{
		path: EPath.Missions,
		element: <AppLayout />,
		children: [
			{
				path: EPath.Missions,
				element: (
					<AnimateRouting key={EPath.Missions}>
						<Missions />
					</AnimateRouting>
				),
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
