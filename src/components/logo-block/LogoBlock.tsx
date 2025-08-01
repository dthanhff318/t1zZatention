import { GradientText } from "@/components/animate-ui/text/gradient";

type LogoBlockProps = {
	size?: "sm" | "md" | "lg";
};
const LogoBlock = ({ size = "lg" }: LogoBlockProps) => {
	const fontSize = {
		sm: "text-xl",
		md: "text-2xl",
		lg: "text-4xl",
	};
	return (
		<div
			className="min-h-[60px] flex items-center justify-center bg-center h-full w-full"
			style={{
				backgroundImage: `
			  linear-gradient(to right, rgba(83, 83, 83, 0.2) 1px, transparent 1px),
			  linear-gradient(to bottom, rgba(83, 83, 83, 0.2) 1px, transparent 1px)
			`,
				backgroundSize: "10px 10px",
			}}
		>
			<GradientText
				className={`text-4xl font-bold ${fontSize[size]}`}
				text="t1zzed-Mind"
				neon
				gradient="linear-gradient(90deg, #ffffff 0%, #bbbbbb 20%, #666666 50%, #bbbbbb 80%, #ffffff 100%)"
			/>
		</div>
	);
};

export default LogoBlock;
