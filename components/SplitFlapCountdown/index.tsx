import Countdown from "react-countdown";
import SplitFlap from "./SplitFlap";
import SplitFlapGroup from "./SplitFlapGroup";
import { useMemo } from "react";

interface ISplitFlapCountdownProps {
	futureDate: number;
}

const SplitFlapCountdown: React.FC<ISplitFlapCountdownProps> = ({
	futureDate,
}) => {
	return (
		<Countdown
			date={futureDate}
			renderer={({ formatted }) => {
				const secondDigits = formatted.seconds.split("").map(Number);
				const minuteDigits = formatted.minutes.split("").map(Number);
				const hourDigits = formatted.hours.split("").map(Number);
				const dayDigits = formatted.days.split("").map(Number);

				return (
					<div className="flex justify-center space-x-4">
						<SplitFlapGroup digits={dayDigits} label="Days" />
						<SplitFlapGroup digits={hourDigits} label="Hours" />
						<SplitFlapGroup digits={minuteDigits} label="Minutes" />
						<SplitFlapGroup digits={secondDigits} label="Seconds" />
					</div>
				);
			}}
		/>
	);
};

export default SplitFlapCountdown;
