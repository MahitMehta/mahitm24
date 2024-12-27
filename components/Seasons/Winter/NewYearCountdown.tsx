import useMobile from "@/app/hooks/useMobile";
import SplitFlapCountdown from "@/components/SplitFlapCountdown";
import React, { useMemo } from "react";

const NewYearCountdown = () => {
	const newYearDate = useMemo(() => {
		const now = new Date();
		const currentYear = now.getFullYear();
		const newYear = new Date(currentYear + 1, 0, 1);

		// if new year is more than 10 days away, show 0
		if (newYear.getTime() - now.getTime() > 10 * 24 * 60 * 60 * 1000) {
			return 0;
		}

		return newYear.getTime();
	}, []);

	const isMobile = useMobile();

	return (
		<SplitFlapCountdown
			fontSize={isMobile ? 75 : 100}
			gap={isMobile ? 2 : 4}
			width={isMobile ? 30 : 40}
			futureDate={newYearDate}
			label="New Year Countdown"
			completedMessage={
				<span
					className="text-center fade-in indian-gradient"
					style={{ fontSize: 75, lineHeight: 1 }}
				>
					Happy New Year
				</span>
			}
		/>
	);
};

export default NewYearCountdown;
