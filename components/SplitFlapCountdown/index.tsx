import clsx from "clsx";
import type { ReactNode } from "react";
import Countdown from "react-countdown";
import SplitFlapGroup from "./SplitFlapGroup";

interface ISplitFlapCountdownProps {
	futureDate: number;
	completedMessage?: ReactNode;
	fontSize?: number;
	gap?: number;
	width?: number;
	label?: string;
	className?: string;
}

const SplitFlapCountdown: React.FC<ISplitFlapCountdownProps> = ({
	futureDate,
	completedMessage,
	fontSize = 100,
	gap = 4,
	width = 40,
	label = "",
	className = "",
}) => {
	return (
		<Countdown
			now={() => Date.now()}
			date={futureDate}
			renderer={({ formatted, completed }) => {
				const secondDigits = formatted.seconds.split("").map(Number);
				const minuteDigits = formatted.minutes.split("").map(Number);
				const hourDigits = formatted.hours.split("").map(Number);
				const dayDigits = formatted.days.split("").map(Number);

				if (completed && !!completedMessage) {
					return (
						<div className="flex justify-center items-center">
							{completedMessage}
						</div>
					);
				}

				return (
					<div
						className={clsx(
							"flex justify-center space-x-4 fade-in relative w-min",
							className,
						)}
					>
						<SplitFlapGroup
							digits={dayDigits}
							label="Days"
							fontSize={fontSize}
							gap={gap}
							width={width}
						/>
						<SplitFlapGroup
							digits={hourDigits}
							label="Hours"
							fontSize={fontSize}
							gap={gap}
							width={width}
						/>
						<SplitFlapGroup
							digits={minuteDigits}
							label="Minutes"
							fontSize={fontSize}
							gap={gap}
							width={width}
						/>
						<SplitFlapGroup
							digits={secondDigits}
							label="Seconds"
							fontSize={fontSize}
							gap={gap}
							width={width}
						/>
						{!!label && (
							<span className="absolute block right-0 -top-2 text-brand-yellow">
								{label}
							</span>
						)}
					</div>
				);
			}}
		/>
	);
};

export default SplitFlapCountdown;
