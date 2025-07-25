import type { FunctionComponent } from "./common/types";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import appConfigStore from "./store/appConfigStore";
import { ETheme } from "./helpers/enum";
import { account, databases } from "@/lib/appwrite.ts";
import { useAuthStore } from "@/store/authStore.ts";
import { User } from "@/types/auth.ts";

type AppProps = { router: ReturnType<typeof createBrowserRouter> };

const App = ({ router }: AppProps): FunctionComponent => {
	const { setTheme } = appConfigStore();
	const { setUser, setIsLoading } = useAuthStore();

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
			setIsLoading(true);
			try {
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
			} catch (error) {
				console.error("Error checking auth:", error);
			} finally {
				setIsLoading(false);
			}
		};
		checkAuth();
	}, []);

	return <RouterProvider router={router} />;
};

export default App;
