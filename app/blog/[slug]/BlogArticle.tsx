import type { IArticleEvent, IEvent } from "@/interfaces/contentful";
import Document from "@/components/Contentful/Document";

interface IBlogArticleProps {
	event: IEvent<IArticleEvent>;
}

const BlogArticle: React.FC<IBlogArticleProps> = ({ event }) => {
	return (
		<div>
			{event.content.body && <Document document={event.content.body.json} />}
		</div>
	);
};

export default BlogArticle;
