export enum EBillboardMode {
	DEFAULT = 0,
	NEW_YEAR = 1,
}

export enum ECountdownType {
	OFF = 0,
	NEW_YEAR = 1,
	BIRTHDAY = 2,
}

export interface IServiceConfig {
	fireworksEnabled: boolean;

	// The countdown endpoint is the number of ms since
	// the Unix epoch representing the end of the countdown.
	// Honored if no other special countdown is active.
	countdownEndpoint: number;
	countdownEnabled: ECountdownType;
	snowEnabled: boolean;
	rainEnabled: boolean;
	billboardMode: EBillboardMode;
}
