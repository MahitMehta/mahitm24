import Billboard from "@/components/Billboard";
import Footer from "@/components/Footer";
import Platform from "@/components/Platform";
import Sky from "@/components/Sky";
import { getServiceConfig } from "@/helpers/serviceConfig";
import { ECountdownType } from "@/interfaces/svc";
import { getEventsPreview } from "@/utils/contentful/events";
import Search from "./Search";

export const revalidate = 3600;

export default async function SVCSearch() {
	const serviceConfig = getServiceConfig();
	const { countdownEnabled } = serviceConfig;

	const defaultEventsPreview = await getEventsPreview({ limit: 2, skip: 0 });

	return (
		<div
			id="search"
			className="flex flex-col items-center p-3 max-w-[100vw] overflow-hidden min-h-screen max-h-[1000px]"
		>
			<Sky serviceConfig={serviceConfig} />
			<div className="w-full h-[300px] fixed bottom-0 brightness-50 building-container" />
			<Billboard
				svc
				serviceConfig={serviceConfig}
				style={{
					marginTop: countdownEnabled !== ECountdownType.OFF ? "15vh" : 0,
				}}
			/>
			<Search defaultEventsPreview={defaultEventsPreview} />
			<section className="building-flicker z-40 flex items-center mt-auto flex-col w-full max-w-screen-md p-6 building relative bg-brand-blue">
				<Platform className="top-0 -translate-y-full billboard-flicker !absolute" />
				<Footer />
			</section>
		</div>
	);
}
