import SplitFlap from "./SplitFlap";

interface ISplitFlapGroupProps {
	digits: number[];
	label: string;
}

const SplitFlapGroup: React.FC<ISplitFlapGroupProps> = ({ digits, label }) => {
	return (
		<div className="flex flex-col items-center">
			<div className="flex">
				{digits.map((value, index) => {
					return (
						<SplitFlap
							fontSize={100}
							width={40}
							gap={4}
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
