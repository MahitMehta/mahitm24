export enum EBillboardMode {
	DEFAULT = 0,
	NEW_YEAR = 1,
}

export interface IServiceConfig {
	fireworksEnabled: boolean;

	// The countdown goal is the number of ms since
	// the Unix epoch representing the end of the countdown.
	// Honored if no other special countdown is active.
	countdownGoal: number;

	newYearCountdownEnabled: boolean;
	snowEnabled: boolean;
	rainEnabled: boolean;
	billboardMode: EBillboardMode;
}
