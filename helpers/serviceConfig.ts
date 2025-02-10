import {
	EBillboardMode,
	ECountdownType,
	type IServiceConfig,
} from "@/interfaces/svc";
import { getTimezoneOffset } from "date-fns-tz";

// Returns the month and day in EST.
// The month is first, then the day.
const dateInEST = (now = new Date()): [number, number] => {
	const formatter = new Intl.DateTimeFormat([], {
		timeZone: "America/New_York",
		month: "2-digit",
		day: "2-digit",
	});

	const [month, day] = formatter.format(now).split("/").map(Number);

	return [month, day];
};

// In EST timezone, the new year period is from December 21 (exclusive) to January 10.
const getIsNewYearPeriod = (month: number, day: number): boolean => {
	if (month === 1 && day < 10) {
		return true;
	}

	if (month === 12 && day > 21) {
		return true;
	}

	return false;
};

const getIsBirthdayPeriod = (month: number, day: number): boolean => {
	if (month === 2 && day <= 14) {
		return true;
	}

	return false;
};

const getESTOffset = (): number => {
	const estTimeZone = "America/New_York";
	const now = new Date();
	const estOffset = getTimezoneOffset(estTimeZone, now);

	return estOffset;
};

export const getServiceConfig = (): IServiceConfig => {
	let countdownEndpoint = 0;

	const [month, day] = dateInEST();
	const isNewYearPeriod = getIsNewYearPeriod(month, day);
	const isBirthdayPeriod = getIsBirthdayPeriod(month, day);

	const yearUTC = new Date().getUTCFullYear();

	let countdownEnabled = ECountdownType.OFF;
	if (isNewYearPeriod) {
		countdownEnabled = ECountdownType.NEW_YEAR;
		countdownEndpoint =
			new Date(`${yearUTC + 1}-01-01`).getTime() - getESTOffset();
		// If it is January, then continue showing the Happy New Year message
		// by setting the countdown endpoint to 0
		if (month === 1) {
			countdownEndpoint = 0;
		}
	} else if (isBirthdayPeriod) {
		countdownEnabled = ECountdownType.BIRTHDAY;
		countdownEndpoint = new Date(`${yearUTC}-02-13`).getTime() - getESTOffset();
	}

	return {
		fireworksEnabled: isNewYearPeriod,
		countdownEndpoint: countdownEndpoint,
		countdownEnabled,
		snowEnabled: isNewYearPeriod,
		rainEnabled: false,
		billboardMode: isNewYearPeriod
			? EBillboardMode.NEW_YEAR
			: EBillboardMode.DEFAULT,
	};
};
