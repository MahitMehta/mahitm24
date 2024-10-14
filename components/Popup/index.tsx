interface HighlightPopUpProps {
	highlight: string;
	children: React.ReactNode;
}

const HighlightPopUp: React.FC<HighlightPopUpProps> = ({
	highlight,
	children,
}) => {
	return (
		<span className="relative popup-container">
			<span className="text-brand-yellow highlighted">{highlight}</span>
			<div className="popup text-[18px] bg-brand-blue-darker bg-opacity-75 backdrop-blur-lg border-solid border-brand-yellow border-2">
				{children}
			</div>
		</span>
	);
};

export default HighlightPopUp;
