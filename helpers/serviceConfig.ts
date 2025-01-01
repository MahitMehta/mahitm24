import { EBillboardMode, type IServiceConfig } from "@/interfaces/svc";

// In EST timezone, the new year period is from December 21 (exclusive) to January 10.
const getIsNewYearPeriod = (): boolean => {
	const now = new Date();
	const formatter = new Intl.DateTimeFormat([], {
		timeZone: "America/New_York",
		month: "2-digit",
		day: "2-digit",
	});

	const [month, day] = formatter.format(now).split("/").map(Number);

	if (month === 1 && day < 10) {
		return true;
	}

	if (month === 12 && day > 21) {
		return true;
	}

	return false;
};

export const getServiceConfig = (): IServiceConfig => {
	const isNewYearPeriod = getIsNewYearPeriod();

	return {
		fireworksEnabled: isNewYearPeriod,
		newYearCountdownEnabled: isNewYearPeriod,
		snowEnabled: isNewYearPeriod,
		rainEnabled: false,
		billboardMode: isNewYearPeriod
			? EBillboardMode.NEW_YEAR
			: EBillboardMode.DEFAULT,
	};
};
