"use client";

import SplitFlapCountdown from "@/components/SplitFlapCountdown";
import useMobile from "@/hooks/useMobile";
import { getTimezoneOffset } from "date-fns-tz";
import React, { useMemo } from "react";

const NewYearCountdown = () => {
	const newYearDate = useMemo(() => {
		const estTimeZone = "America/New_York";

		const now = new Date();
		const formatter = new Intl.DateTimeFormat([], {
			timeZone: estTimeZone,
			year: "numeric",
		});
		const easternCurrentYear = Number.parseInt(formatter.format(now));

		const newUTCYear = new Date(Date.UTC(easternCurrentYear + 1, 0, 1));

		const estOffset = getTimezoneOffset(estTimeZone, now);

		// if new year is more than 10 days away, return current time (wish happy new year)
		const endTimeInMS = 10 * 24 * 60 * 60 * 1000;
		if (newUTCYear.getTime() - estOffset - now.getTime() > endTimeInMS) {
			return Date.now() + 2 * 1000;
		}

		return newUTCYear.getTime() - estOffset;
	}, []);

	const isMobile = useMobile();

	return (
		<SplitFlapCountdown
			fontSize={isMobile ? 75 : 100}
			gap={isMobile ? 2 : 4}
			width={isMobile ? 30 : 40}
			futureDate={newYearDate}
			label="EST New Year Countdown"
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
