import clsx from "clsx";
import BrandBrownButton, { type IBrandBrownButtonProps } from ".";

interface ISelectProps<T> extends Omit<IBrandBrownButtonProps, "onClick"> {
	id: T;
	selectedId: string | null;
	onSelect: (id: T) => void;
}

const Select = <T,>({
	id,
	selectedId,
	className,
	onSelect,
	...props
}: ISelectProps<T>) => {
	return (
		<BrandBrownButton
			onClick={() => onSelect(id)}
			className={clsx(
				className,
				"transition-opacity",
				id === selectedId && "text-brand-yellow",
				selectedId !== null && id !== selectedId && "opacity-50",
			)}
			{...props}
		/>
	);
};

export default Select;
