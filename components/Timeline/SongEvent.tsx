import type { ISongEvent, IEvent } from "@/interfaces/contentful";
import { useMemo } from "react";

interface SongEventProps {
	event: IEvent<ISongEvent>;
}

const SongEvent: React.FC<SongEventProps> = ({ event }) => {
	console.log("SongEvent", event.content);
	const spotifyURL = useMemo(() => {
		return `https://open.spotify.com/embed/track/${event.content.spotifyId}`;
	}, [event.content.spotifyId]);

	return (
		<div className="w-full h-full flex flex-col">
			<iframe
				width="100%"
				style={{ borderRadius: "0px !important" }}
				height="100%"
				title={`Spotify - ${event.content.title || "Song"}`}
				allowFullScreen
				allow="clipboard-write; encrypted-media; fullscreen"
				loading="lazy"
				src={spotifyURL}
			/>
			<h1 className="text-2xl">Song of the Month</h1>
			<h2 style={{ lineHeight: 1.0, opacity: 0.75 }} className="text-lg pb-4">
				{event.content.title}
			</h2>
		</div>
	);
};

export default SongEvent;
