import Billboard from "@/components/Billboard";
import Footer from "@/components/Footer";
import Sky from "@/components/Sky";
import { getServiceConfig } from "@/helpers/serviceConfig";
import RequestForm from "./RequestForm";

export const revalidate = 3600;

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
				<h1 style={{ lineHeight: 1.0 }} className="text-2xl">
					Professional AI Headshot Generator
				</h1>
				<h2 style={{ lineHeight: 1.0 }}>
					Create a professional headshot for LinkedIn, work, etc. in{" "}
					<span className="text-brand-yellow">under a minute</span>
				</h2>
				<RequestForm />
				<Footer />
			</section>
		</div>
	);
}
