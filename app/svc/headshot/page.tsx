import Billboard from "@/components/Billboard";
import Footer from "@/components/Footer";
import Sky from "@/components/Sky";
import { getServiceConfig } from "@/helpers/serviceConfig";

export default function HeadshotPage() {
	const serviceConfig = getServiceConfig();

	return (
		<div
			id="blog"
			className="flex flex-col items-center p-3 max-w-[100vw] overflow-hidden min-h-screen"
		>
			<Sky />
			<div className="w-full h-[300px] fixed bottom-0 brightness-50 building-container" />
			<Billboard serviceConfig={serviceConfig} />
			<section className="building-flicker z-50 flex flex-col w-full max-w-screen-md p-6 building relative bg-brand-blue">
				<Footer />
			</section>
		</div>
	);
}
