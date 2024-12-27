import { EBillboardMode, type IServiceConfig } from "@/interfaces/svc";

export const getServiceConfig = (): IServiceConfig => {
	return {
		date: new Date(),
		fireworksEnabled: false,
		newYearCountdownEnabled: false,
		snowEnabled: false,
		rainEnabled: false,
		billboardMode: EBillboardMode.DEFAULT,
	};
};
