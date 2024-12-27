import Countdown from "react-countdown";
import SplitFlap from "./SplitFlap";
import SplitFlapGroup from "./SplitFlapGroup";
import type { ReactNode } from "react";

interface ISplitFlapCountdownProps {
	futureDate: number;
	completedMessage?: ReactNode;
	fontSize?: number;
	gap?: number;
	width?: number;
}

const SplitFlapCountdown: React.FC<ISplitFlapCountdownProps> = ({
	futureDate,
	completedMessage,
	fontSize = 100,
	gap = 4,
	width = 40,
}) => {
	return (
		<Countdown
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
					<div className="flex justify-center space-x-4 fade-in">
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
					</div>
				);
			}}
		/>
	);
};

export default SplitFlapCountdown;
