enum EBillboardMode {
	DEFAULT = 0,
	NEW_YEAR = 1,
}

interface ServiceConfig {
	fireworksEnabled: boolean;
	newYearCountdownEnabled: boolean;
	snowEnabled: boolean;
	rainEnabled: boolean;
	billboardMode: EBillboardMode;
}
