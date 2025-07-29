import type { FunctionComponent } from "./common/types";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import appConfigStore from "./store/appConfigStore";
import { ETheme } from "./helpers/enum";
import { useAuthStore } from "@/store/authStore.ts";
import supabase from "@/lib/supabase";

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

	const checkUserExist = async (user: any) => {
		const { data, error } = await supabase
			.from("users")
			.select("*")
			.eq("id", user.id)
			.maybeSingle();
		if (error) {
			console.error("Error checking authentication:", error.message);
			setUser(null);
			return;
		}

		if (!data) {
			const { error: insertError } = await supabase.from("users").insert(user);
			if (insertError) {
				console.error("Error creating user:", insertError.message);
			} else {
				console.log("✅ User inserted into DB");
			}
		} else {
			setUser(data);
			console.log("✅ User already exists in DB");
		}
	};

	useEffect(() => {
		const checkAuth = async () => {
			setIsLoading(true);
			try {
				const { data } = await supabase.auth.getUser();
				if (!data.user) {
					setUser(null);
				} else {
					const { user }: { user: any } = data;
					await checkUserExist({
						id: user?.id,
						email: user?.user_metadata?.email,
						name: user?.user_metadata?.full_name,
						avatar: user?.user_metadata?.avatar_url,
					});
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
