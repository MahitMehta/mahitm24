import SplitFlap from "./SplitFlap";

interface ISplitFlapGroupProps {
	digits: number[];
	label: string;
	fontSize: number;
	gap: number;
	width: number;
}

const SplitFlapGroup: React.FC<ISplitFlapGroupProps> = ({
	digits,
	label,
	fontSize,
	gap,
	width,
}) => {
	return (
		<div className="flex flex-col items-center">
			<div className="flex">
				{digits.map((value, index) => {
					return (
						<SplitFlap
							fontSize={fontSize}
							width={width}
							gap={gap}
							// biome-ignore lint/suspicious/noArrayIndexKey: Digit count is fixed
							key={index}
							value={value}
						/>
					);
				})}
			</div>
			<p className="-translate-y-4">{label}</p>
		</div>
	);
};

export default SplitFlapGroup;
