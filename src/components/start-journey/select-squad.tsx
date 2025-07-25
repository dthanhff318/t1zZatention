import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const SelectSquad = () => {
	return (
		<div className="p-3 text-text-primary flex flex-col gap-3">
			<div className="flex items-center gap-2">
				<p className="text-base font-semibold">Who are you ?</p>
				<span className="text-3xl">🙄</span>
			</div>
			<Select>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Choose squad" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="light">Badboiz</SelectItem>
					<SelectItem value="dark">Family</SelectItem>
					<SelectItem value="system">Lover</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
};

export default SelectSquad;
