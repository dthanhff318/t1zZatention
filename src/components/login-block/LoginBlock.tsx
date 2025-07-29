import supabase from "@/lib/supabase";

const LoginBlock = () => {
	const loginWithGoogle = async () => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: import.meta.env["VITE_REDIRECT_URL"],
			},
		});
		if (error) {
			console.error("Login error:", error.message);
		}
	};

	return (
		<div className="flex justify-center items-center w-full h-full">
			<div className="flex flex-col items-center justify-center gap-4 w-[60%] h-full">
				<button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
					<img
						src="https://www.svgrepo.com/show/512317/github-142.svg"
						alt="GitHub"
						className="h-[18px] w-[18px] "
					/>
					Continue with GitHub
				</button>

				<button
					className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
					onClick={loginWithGoogle}
				>
					<img
						src="https://www.svgrepo.com/show/475656/google-color.svg"
						alt="Google"
						className="h-[18px] w-[18px] "
					/>
					Continue with Google
				</button>
			</div>
		</div>
	);
};

export default LoginBlock;
