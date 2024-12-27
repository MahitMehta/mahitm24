import { EBillboardMode, type IServiceConfig } from "@/interfaces/svc";

export const getServiceConfig = (): IServiceConfig => {
	return {
		fireworksEnabled: false,
		newYearCountdownEnabled: false,
		snowEnabled: false,
		rainEnabled: false,
		billboardMode: EBillboardMode.DEFAULT,
	};
};
