import { CheckIcon } from "@heroicons/react/24/outline";

interface ICheckboxProps {
	children?: React.ReactNode;
	checked: boolean;
	onCheck: (checked: boolean) => void;
}

const Checkbox: React.FC<ICheckboxProps> = ({ children, checked, onCheck }) => {
	return (
		<div
			onClick={() => {
				onCheck(!checked);
			}}
			className="flex gap-2 cursor-pointer"
		>
			<div className="border-4 bg-brand-brown border-brand-brown-darker w-6 h-6">
				{checked && <CheckIcon className="text-brand-yellow" />}
			</div>
			{children && <span>{children}</span>}
		</div>
	);
};

export default Checkbox;
