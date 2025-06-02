import clsx from "clsx";
import { useCallback } from "react";

export interface IBrandBrownButtonProps {
	children: React.ReactNode;
	onClick: () => void;
	className?: string;
	disabled?: boolean;
}

const BrandBrownButton: React.FC<IBrandBrownButtonProps> = ({
	children,
	className,
	onClick,
	disabled = false,
}) => {
	const handleClick = useCallback(() => {
		if (!disabled) {
			onClick();
		}
	}, [onClick, disabled]);

	return (
		<button
			onClick={handleClick}
			type="button"
			className={clsx(
				"w-min flex group whitespace-nowrap items-center justify-center px-3 py-1 border-4 border-brand-brown-darker bg-brand-brown hover:text-brand-yellow transition-opacity",
				className,
				disabled && "opacity-50 cursor-not-allowed",
			)}
		>
			{children}
		</button>
	);
};

export default BrandBrownButton;
