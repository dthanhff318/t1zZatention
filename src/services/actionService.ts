import supabase from "@/lib/supabase";

export interface UserAction {
	id: string;
	user_id: string;
	action: string;
	action_type: string;
	action_value: number;
	action_target: number;
	action_progress: number;
	action_status: string;
	action_category: string;
	created_at: string;
}

export interface ActionService {
	handleUserAction: any;
}

class ActionServiceImpl implements ActionService {
	async handleUserAction(userId: string, action: string, payload: any) {
		await supabase.rpc("increment_user_mission_progress", {
			user_id: userId,
			action,
			payload,
		});
	}
}

export const actionService = new ActionServiceImpl();
