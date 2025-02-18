import {
	EMediaType,
	type IArticleEvent,
	type IEvent,
} from "@/interfaces/contentful";
import Document from "@/components/Contentful/Document";
import Card from "@/components/Card";

interface IBlogArticleProps {
	event: IEvent<IArticleEvent>;
}

const BlogArticle: React.FC<IBlogArticleProps> = ({ event }) => {
	return (
		<div>
			{event.content.highlightedMediaCollection.items.map((media) => {
				if (media.type === EMediaType.Image) {
					return <></>;
				}
				if (media.type === EMediaType.Video) {
					return (
						<Card className="relative w-full px-[2px]">
							<video
								className="w-full"
								style={{ outline: 0 }}
								controls
								poster={`/cdn/v1/video/t/so_${media.thumbnailOffset}/${media.id}.webp`}
								src={`/cdn/v1/video/t/q_auto/${media.id}`}
								playsInline
							/>
						</Card>
					);
				}
			})}
			{event.content.body && <Document document={event.content.body.json} />}
		</div>
	);
};

export default BlogArticle;
