import type { IVideoEvent, IEvent } from "@/interfaces/contentful";
import Image from "next/image";
import GoArrow from "../GoArrow";
import Link from "next/link";
import { useMemo } from "react";

interface VideoEventProps {
	event: IEvent<IVideoEvent>;
}

const VideoEvent: React.FC<VideoEventProps> = ({ event }) => {
	const thumbnailURL = useMemo(() => {
		return `/cdn/v1/video/t/so_${event.content.thumbnailOffset}/${event.content.id}.webp`;
	}, [event.content.thumbnailOffset, event.content.id]);

	return (
		<Link
			href={`/blog/${event.sys.id}/${event.slug}`}
			className="w-full h-full px-2 gap-2 flex flex-col py-2 cursor-pointer hover:opacity-75 transition-all duration-300 go-arrow-container"
		>
			<div className="h-full w-full overflow-hidden box-content relative border-2 border-brand-blue-accent">
				<Image
					className="blur-sm"
					src={thumbnailURL}
					alt="Video Thumbnail Blurred"
					layout="fill"
					objectFit="cover"
					draggable={false}
				/>
				<Image
					src={thumbnailURL}
					alt="Video Thumbnail"
					layout="fill"
					objectFit="contain"
					draggable={false}
				/>
			</div>
			{event.content.title && (
				<h1
					style={{ lineHeight: 1 }}
					className="text-2xl mt-auto mb-1 flex gap-2 items-center"
				>
					{event.content.title}
					<GoArrow className="translate-y-[1px] text-brand-yellow" />
				</h1>
			)}
		</Link>
	);
};

export default VideoEvent;
