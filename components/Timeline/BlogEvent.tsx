import type { IArticleEvent, IEvent } from "@/interfaces/contentful";
import Image from "next/image";
import GoArrow from "../GoArrow";
import Link from "next/link";

interface BlogEventProps {
	event: IEvent<IArticleEvent>;
}

const BlogEvent: React.FC<BlogEventProps> = ({ event }) => {
	return (
		<Link
			href={`/blog/${event.sys.id}/${event.slug}`}
			className="w-full h-full px-2 gap-0 flex flex-col py-2 cursor-pointer hover:opacity-75 transition-all duration-300 go-arrow-container"
		>
			<div className="h-full w-full relative">
				<Image
					src={`/cdn/v1/svc/thumbnails/${event.content.thumbnail}`}
					alt={"Blog Thumbnail"}
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
			{event.content.subtitle && (
				<h2 style={{ lineHeight: 1, opacity: 0.75 }} className="text-lg">
					{event.content.subtitle}
				</h2>
			)}
		</Link>
	);
};

export default BlogEvent;
