import supabase from "@/lib/supabase";

export interface UserMission {
	mission_code: string;
	user_id: string;
	progress?: number;
	completed_at?: string;
	created_at: string;
	mission: {
		code: string;
		name: string;
		description: string;
		target: number;
		publish: boolean;
	};
}

export interface MissionService {
	getUserMissions: (userId: string) => Promise<UserMission[]>;
}

class MissionServiceImpl implements MissionService {
	async getUserMissions(userId: string): Promise<UserMission[]> {
		const { data, error } = await supabase
			.from("user_missions")
			.select(
				`
				mission_code,
				user_id,
				progress,
				created_at,
				achieved,
				missions!inner (
					code,
					name,
					description,
					target,
					publish
				)
			`
			)
			.eq("user_id", userId)
			.order("created_at", { ascending: false });

		if (error) {
			console.error("Error fetching user missions:", error);
			throw new Error(`Failed to fetch user missions: ${error.message}`);
		}

		// Transform the data to match our interface
		const transformedData =
			data?.map((item) => ({
				...item,
				mission: item.missions,
			})) || [];

		return transformedData as any;
	}
}

export const missionService = new MissionServiceImpl();
