"use client";

import HighlightsBar from "@/components/HighlightsBar";
import Timeline from "@/components/Timeline";
import type { IEventCollection } from "@/interfaces/contentful";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface ISearchProps {
	defaultEventsPreview: IEventCollection;
}

const Search: React.FC<ISearchProps> = ({ defaultEventsPreview }) => {
	return (
		<>
			<section className="building-flicker z-50 flex items-center flex-col w-full max-w-screen-md p-6 pb-2 building relative bg-brand-blue">
				<div className="w-full flex gap-2">
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
					<div className="w-8 h-8 flex items-center justify-center bg-brand-blue-darker border-4 border-brand-blue-accent cursor-pointer hover:bg-brand-blue-accent transition-all">
						<FunnelIcon width={16} />
					</div>
				</div>
				<HighlightsBar />
			</section>
			<section className="mt-2" />
			<Timeline events={defaultEventsPreview} />
		</>
	);
};

export default Search;
