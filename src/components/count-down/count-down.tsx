import { useEffect, useRef, useState } from "react";

type CountdownProps = {
	totalSeconds: number;
	onEnd?: () => void;
};

export const Countdown = ({ totalSeconds, onEnd }: CountdownProps) => {
	const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
	const audioRef = useRef<HTMLAudioElement>(null);

	const handleEnd = () => {
		if (audioRef.current) {
			audioRef.current.play();
		}
		if (onEnd) onEnd();
	};

	useEffect(() => {
		if (secondsLeft <= 0) {
			handleEnd();
			return;
		}

		const interval = setInterval(() => {
			setSecondsLeft((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [secondsLeft, onEnd]);

	const formatTime = (total: number) => {
		const hours = Math.floor(total / 3600);
		const minutes = Math.floor((total % 3600) / 60);
		const seconds = total % 60;

		const pad = (n: number) => String(n).padStart(2, "0");

		return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
	};

	return (
		<div className="text-text-primary text-3xl sm:text-4xl md:text-5xl font-mono font-bold w-fit px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 bg-border-secondary rounded-lg border border-border-primary">
			{formatTime(secondsLeft)}
			<audio src="/bell.mp3" className="hidden" loop={false} ref={audioRef} />
		</div>
	);
};
