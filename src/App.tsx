import type { FunctionComponent } from "./common/types";
import {
	createBrowserRouter,
	RouterProvider,
	useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import appConfigStore from "./store/appConfigStore";
import { ETheme } from "./helpers/enum";
import MainLoading from "./components/loading/MainLoading.tsx";
import { account, databases } from "@/lib/appwrite.ts";
import { useAuthStore } from "@/store/authStore.ts";
import { User } from "@/types/auth.ts";

type AppProps = { router: ReturnType<typeof createBrowserRouter> };

const App = ({ router }: AppProps): FunctionComponent => {
	const { setTheme } = appConfigStore();
	const [loading] = useState<boolean>(false);
	const { setUser } = useAuthStore();

	useEffect(() => {
		const themeLocal = JSON.parse(
			JSON.stringify(localStorage.getItem("theme") || "")
		);
		if (!!themeLocal) {
			setTheme(themeLocal as ETheme);
		} else if (window.matchMedia("(prefers-color-schema: dark)")) {
			setTheme(ETheme.DARK);
		} else {
			setTheme(ETheme.LIGHT);
		}
	}, []);

	useEffect(() => {
		const checkAuth = async () => {
			const accountUser = await account.get();
			if (!accountUser) {
				window.location.href = "/login";
			} else {
				const user = await databases.getDocument(
					"tj-dev-318",
					"users",
					accountUser.$id
				);
				setUser(user as unknown as User);
			}
		};
		checkAuth();
	}, []);

	return <>{loading ? <MainLoading /> : <RouterProvider router={router} />}</>;
};

export default App;
