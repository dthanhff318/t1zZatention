const AuthCallback = () => {
	// useEffect(() => {
	// 	const ensureUserDocument = async () => {
	// 		const user = await account.get();
	// 		try {
	// 			// Check if user has a document
	// 			const checkUser = await databases.getDocument(
	// 				"tj-dev-318",
	// 				"users",
	// 				user.$id
	// 			);
	// 			if (!checkUser) {
	// 				const newUser = await databases.createDocument(
	// 					"tj-dev-318",
	// 					"users",
	// 					user.$id,
	// 					{
	// 						name: user.name,
	// 					}
	// 				);
	// 				setUser(newUser as unknown as User);
	// 			} else {
	// 				setUser(checkUser as unknown as User);
	// 			}
	// 		} catch (error) {
	// 			console.log("Something went wrong", error);
	// 		} finally {
	// 			navigate("/");
	// 		}
	// 	};

	// 	ensureUserDocument();
	// }, [navigate]);

	return <div>Authenticating...</div>;
};

export default AuthCallback;
