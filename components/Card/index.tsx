import clsx from "clsx";

interface CardProps {
	children: React.ReactNode;
	className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
	return (
		<div
			className={clsx(
				"border-4 bg-brand-blue-darker border-brand-blue-accent px-3 py-1",
				className,
			)}
		>
			{children}
		</div>
	);
};

export default Card;
