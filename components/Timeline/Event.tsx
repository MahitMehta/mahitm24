"use client";

import { useEffect, useMemo } from "react";
import GoArrow from "../GoArrow";
import Image from "next/image";
import type { IEvent } from ".";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

interface IEventProps {
	content: IEvent;
}

const Event: React.FC<IEventProps> = ({ content }) => {
	useEffect(() => {
		import("@lottiefiles/lottie-player");
	}, []);

	const locked = useMemo(() => {
		return new Date(content.published) > new Date();
	}, [content.published]);

	const formmatedPublishedDate = useMemo(() => {
		const date = new Date(content.published);
		const hours = date.getHours();
		const minutes = date.getMinutes().toString().padStart(2, "0");
		const ampm = hours >= 12 ? "pm" : "am";
		const formattedHours = hours % 12 || 12;
		return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${formattedHours}:${minutes} ${ampm}`;
	}, [content.published]);

	return (
		<div
			className={clsx(
				"fade-in relative flex justify-center items-center w-[280px] h-full border-4 bg-brand-blue-darker border-brand-blue-accent",
				locked &&
					"brightness-75 pointer-events-none cursor-not-allowed select-none",
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
						{locked ? "Locked till" : "Published on"}
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
				<div className="h-full w-full relative">
					<Image
						src={`/cdn/v1/svc/thumbnails/${content.thumbnail}`}
						alt="2024 Thumbnail"
						layout="fill"
						objectFit="contain"
						draggable={false}
					/>
				</div>
				<h1
					style={{ lineHeight: 1 }}
					className="text-2xl mt-auto mb-1 flex gap-2 items-center"
				>
					{content.title}
					<GoArrow className="translate-y-[1px] text-brand-yellow" />
				</h1>
				<h2 style={{ lineHeight: 1, opacity: 0.75 }} className="text-lg">
					{content.subtitle}
				</h2>
			</div>
		</div>
	);
};

export default Event;
