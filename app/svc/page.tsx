import Billboard from "@/components/Billboard";
import Sky from "@/components/Sky";

export default function SVCSearch() {
	return (
		<div
			id="search"
			className="flex flex-col items-center p-3 max-w-[100vw] overflow-hidden"
		>
			<Sky />
			<div className="w-full h-[300px] fixed bottom-0 brightness-50 building-container" />
			<Billboard svc />
			<section className="z-10 flex items-center flex-col w-full max-w-screen-md p-6 building relative bg-brand-blue">
				<h1 className="text-xl">Coming Soon</h1>
			</section>
		</div>
	);
}
