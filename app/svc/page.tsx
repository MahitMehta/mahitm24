import Billboard from "@/components/Billboard";
import Footer from "@/components/Footer";
import Sky from "@/components/Sky";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SVCSearch() {
	return (
		<div
			id="search"
			className="flex flex-col items-center p-3 max-w-[100vw] overflow-hidden"
		>
			<Sky seasons />
			<div className="w-full h-[300px] fixed bottom-0 brightness-50 building-container" />
			<Billboard svc className="billboard-flicker" />
			<section className="building-flicker z-50 flex items-center flex-col w-full max-w-screen-md p-6 building relative bg-brand-blue">
				<div className="w-full relative border-4 bg-brand-blue-darker border-brand-blue-accent">
					<input
						className="bg-transparent outline-none px-2 w-full"
						type="text"
						autoCorrect="off"
						autoCapitalize="off"
						autoComplete="off"
						placeholder="Search SVC..."
					/>
					<span className="absolute right-2 top-1/2 -translate-y-1/2 opacity-75 hover:opacity-50 transition-all cursor-pointer">
						<MagnifyingGlassIcon width={16} />
					</span>
				</div>
				<span className="opacity-50 font-thin">(Coming Soon)</span>
				<div className="p-2" />
				<Footer />
			</section>
		</div>
	);
}
