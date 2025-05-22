"use client";

import { useEffect, useMemo } from "react";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import {
	EventType,
	type IVideoEvent,
	type IEvent,
	type IArticleEvent,
	type ISongEvent,
} from "@/interfaces/contentful";
import BlogEvent from "./BlogEvent";
import { getFormattedDate } from "@/utils/common";
import VideoEvent from "./VideoEvent";
import SongEvent from "./SongEvent";

interface IEventProps {
	className?: string;
	event: IEvent;
}

const Event: React.FC<IEventProps> = ({ className, event }) => {
	useEffect(() => {
		import("@lottiefiles/lottie-player");
	}, []);

	const locked = useMemo(() => {
		return new Date(event.published) > new Date();
	}, [event.published]);

	const formmatedPublishedDate = useMemo(
		() => getFormattedDate(new Date(event.published)),
		[event.published],
	);

	return (
		<div className={clsx(className, locked && "cursor-not-allowed")} dir="ltr">
			<div
				className={clsx(
					"fade-in relative flex justify-center items-center w-[280px] h-full border-4 bg-brand-blue-darker border-brand-blue-accent",
					locked && "brightness-75 select-none",
					locked &&
						process.env.NODE_ENV === "production" &&
						"pointer-events-none",
				)}
			>
				<div
					style={{
						transform: "translate(-110%, -65%)",
					}}
					className="absolute left-0 top-0"
				>
					<lottie-player
						autoplay
						loop
						style={{ height: "50px", width: "50px" }}
						speed={1}
						mode="normal"
						src="/lottie/propeller.json"
					/>
				</div>
				<div className="absolute translate-y-[calc(-100%-3px)] top-0">
					<p className="flex space-x-1">
						{locked && <LockClosedIcon width={18} />}
						<span className="opacity-75 flex">
							{locked ? "Locked till" : "Published at"}
						</span>
						<span>{formmatedPublishedDate}</span>
					</p>
				</div>
				<div
					style={{
						transform: "translate(110%, -65%)",
					}}
					className="absolute right-0 top-0"
				>
					<lottie-player
						autoplay
						loop
						style={{ height: "50px", width: "50px" }}
						speed={1}
						mode="normal"
						src="/lottie/propeller.json"
					/>
				</div>
				<div className="w-full h-full px-2 gap-0 flex flex-col py-2 cursor-pointer hover:opacity-75 transition-all duration-300 go-arrow-container">
					{event.type === EventType.Article && (
						<BlogEvent event={event as IEvent<IArticleEvent>} />
					)}
					{event.type === EventType.Video && (
						<VideoEvent event={event as IEvent<IVideoEvent>} />
					)}
					{event.type === EventType.Song && (
						<SongEvent event={event as IEvent<ISongEvent>} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Event;
