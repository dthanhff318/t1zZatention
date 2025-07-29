import supabase from "@/lib/supabase";

class UserService {
	async updateUserTotalHours(id: string, totalHours: number) {
		const { data, error } = await supabase.rpc("increment_user_total_time", {
			uid: id,
			inc_value: totalHours,
		});
		if (error) throw error;
		return data;
	}
}

export default UserService;
