import Card from "@/components/Card";
import type { IEvent, IVideoEvent } from "@/interfaces/contentful";

interface BlogVideoProps {
	event: IEvent<IVideoEvent>;
}

const BlogVideo: React.FC<BlogVideoProps> = ({ event }) => {
	return (
		<Card className="relative w-full px-[2px]">
			<video
				style={{ outline: 0 }}
				controls
				autoPlay
				poster={`/cdn/v1/video/t/so_${event.content.thumbnailOffset}/${event.content.id}.webp`}
				src={`/cdn/v1/video/t/q_auto/${event.content.id}`}
				playsInline
			/>
		</Card>
	);
};

export default BlogVideo;
