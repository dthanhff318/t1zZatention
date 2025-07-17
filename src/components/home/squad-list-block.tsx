const SquadListBlock = () => {
	return (
		<div className="p-3 flex flex-col gap-2 items-start text-text-primary">
			<p>Hmm, that's your squads</p>
			<div className="flex flex-col gap-2 w-full">
				{[1, 2, 3, 4, 5].map((item) => (
					<SquadCard key={item} />
				))}
			</div>
		</div>
	);
};

const SquadCard = () => {
	return (
		<div
			className="flex flex-col gap-2 relative rounded-lg bg-slate-700 p-3"
			style={{
				boxShadow: "0px 0px 10px 0px rgba(165, 165, 165, 0.2)",
				// backgroundImage:
				// "url(https://m.media-amazon.com/images/M/MV5BZjMwZTcyNTctYTIyNC00YTkwLTkzNjItNzk5ODcwZTU3ZGMwXkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_QL75_UX500_CR0,47,500,281_.jpg)",
			}}
		>
			<div className="absolute inset-0 rounded-lg"></div>
			<div className="flex flex-col gap-3 ">
				<p className="text-text-primary text-base font-semibold">Squad 1</p>
				<p className="text-text-secondary text-sm">4 members</p>
			</div>
		</div>
	);
};

export default SquadListBlock;
