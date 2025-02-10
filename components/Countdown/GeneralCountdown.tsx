"use client";

import SplitFlapCountdown from "@/components/SplitFlapCountdown";
import useMobile from "@/hooks/useMobile";
import { useMemo } from "react";

interface GeneralCountdownProps {
	futureDate: number;
	label: string;
	completedMessage: React.ReactNode;
	rewindAfterComplete?: boolean;
}

const GeneralCountdown: React.FC<GeneralCountdownProps> = ({
	futureDate,
	label,
	completedMessage,
	rewindAfterComplete = false,
}) => {
	const isMobile = useMobile();

	const timeTill = useMemo(() => {
		if (rewindAfterComplete && Date.now() > futureDate) {
			return Date.now() + 1000 * 2;
		}
		return futureDate;
	}, [futureDate, rewindAfterComplete]);

	return (
		<SplitFlapCountdown
			fontSize={isMobile ? 75 : 100}
			gap={isMobile ? 2 : 4}
			width={isMobile ? 30 : 40}
			futureDate={timeTill}
			label={label}
			completedMessage={
				typeof completedMessage === "string" ? (
					<span
						className="text-center fade-in indian-gradient"
						style={{ fontSize: 75, lineHeight: 1 }}
					>
						{completedMessage}
					</span>
				) : (
					completedMessage
				)
			}
		/>
	);
};

export default GeneralCountdown;
