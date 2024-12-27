export enum EBillboardMode {
	DEFAULT = 0,
	NEW_YEAR = 1,
}

export interface IServiceConfig {
	date: Date;
	fireworksEnabled: boolean;
	newYearCountdownEnabled: boolean;
	snowEnabled: boolean;
	rainEnabled: boolean;
	billboardMode: EBillboardMode;
}
