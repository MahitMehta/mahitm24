import Billboard from "@/components/Billboard";
import Footer from "@/components/Footer";
import Platform from "@/components/Platform";
import Sky from "@/components/Sky";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Timeline from "@/components/Timeline";
import { getServiceConfig } from "@/helpers/serviceConfig";
import { getEventsPreview } from "@/utils/contentful/events";

export const revalidate = 3600;

export default async function SVCSearch() {
	const serviceConfig = getServiceConfig();
	const { newYearCountdownEnabled, countdownGoal } = serviceConfig;

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
					marginTop: newYearCountdownEnabled || countdownGoal > 0 ? "15vh" : 0,
				}}
			/>
			<section className="building-flicker z-50 flex items-center flex-col w-full max-w-screen-md p-6 building relative bg-brand-blue">
				<div className="w-full relative border-4 bg-brand-blue-darker border-brand-blue-accent">
					<input
						className="bg-transparent outline-none px-2 w-full"
						type="text"
						autoCorrect="off"
						autoCapitalize="off"
						autoComplete="off"
						placeholder="Search SVC - Coming Soon"
					/>
					<span className="absolute right-2 top-1/2 -translate-y-1/2 opacity-75 hover:opacity-50 transition-all cursor-pointer">
						<MagnifyingGlassIcon width={16} />
					</span>
				</div>
			</section>
			<Timeline events={defaultEventsPreview} />
			<section className="building-flicker z-40 flex items-center mt-auto flex-col w-full max-w-screen-md p-6 building relative bg-brand-blue">
				<Platform className="top-0 -translate-y-full billboard-flicker !absolute" />
				<Footer />
			</section>
		</div>
	);
}
