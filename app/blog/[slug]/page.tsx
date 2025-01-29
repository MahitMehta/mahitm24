import Billboard from "@/components/Billboard";
import Footer from "@/components/Footer";
import Sky from "@/components/Sky";
import { getServiceConfig } from "@/helpers/serviceConfig";
import type { Metadata } from "next";
import { gql } from "graphql-request";
import { fetchContentful } from "@/utils/contentful/client";
import type {
	IVideoEvent,
	IArticleEvent,
	IEvent,
	IEventCollection,
} from "@/interfaces/contentful";
import { EventType } from "@/interfaces/contentful";
import { redirect } from "next/navigation";
import BlogArticle from "./BlogArticle";
import BlogVideo from "./BlogVideo";
import BlogDate from "./BlogDate";
import { draftMode } from "next/headers";

export const revalidate = 900;

const blogSlugsQuery = gql`
    query BlogEvents($preview: Boolean!) {
        eventCollection(where: { type_in: ["Article","Video"] }, preview: $preview) {
            items {
                slug
            }
        }
    }
`;

const blogEventQuery = gql`
	query BlogEvent($slug: String!, $preview: Boolean!) {
		eventCollection(where: { slug: $slug }, preview: $preview, limit: 1) {
			items {
				sys {
					id
				}
				type
				content {
					... on Article {
						title
							subtitle
							body {
								json
							}
							thumbnail
					}
					... on Video {
						title
						id
						thumbnailOffset
					}
				}
				published
			}
		}
	}
`;

export async function generateStaticParams() {
	const response = await fetchContentful<IEventCollection>(blogSlugsQuery, {
		preview: process.env.NODE_ENV !== "production",
	});

	const posts = response.eventCollection.items
		.filter((event) => new Date(event.published) <= new Date())
		.map((event) => ({
			slug: event.slug,
		}));

	return posts;
}

export async function generateMetadata({
	params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const slug = (await params).slug;

	const response = await fetchContentful<IEventCollection>(blogEventQuery, {
		slug,
		preview: process.env.NODE_ENV !== "production",
	});

	const event = response.eventCollection.items[0];

	let thumbnailURL: string;
	if (event.type === EventType.Article) {
		const content = event.content as IArticleEvent;
		thumbnailURL = `/cdn/v1/svc/thumbnails/${content.thumbnail}`;
	} else {
		const content = event.content as IVideoEvent;
		thumbnailURL = `/cdn/v1/video/t/so_${content.thumbnailOffset}/${content.id}.webp`;
	}

	return {
		title: `${event.content.title} | MahitM Blog`,
		openGraph: {
			images: [thumbnailURL],
		},
		twitter: {
			images: [thumbnailURL],
		},
	};
}

export default async function BlogEventPage({
	params,
}: { params: Promise<{ slug: string }> }) {
	const serviceConfig = getServiceConfig();

	const slug = (await params).slug;
	const { isEnabled: isDraftModeEnabled } = await draftMode();
	const response = await fetchContentful<IEventCollection>(blogEventQuery, {
		slug,
		preview: process.env.NODE_ENV !== "production" || isDraftModeEnabled,
		isDraftModeEnabled,
	});

	const event = response.eventCollection.items[0];

	if (
		new Date(event.published) > new Date() &&
		process.env.NODE_ENV === "production"
	) {
		// Redirect to the blog page if the event is not published yet
		// ("blog is locked")
		// only in production
		return redirect("/svc");
	}

	return (
		<div
			id="blog"
			className="flex flex-col items-center p-3 max-w-[100vw] overflow-hidden min-h-screen"
		>
			<Sky />
			<div className="w-full h-[300px] fixed bottom-0 brightness-50 building-container" />
			<Billboard blog serviceConfig={serviceConfig} />
			<section className="building-flicker z-50 flex flex-col w-full max-w-screen-md p-6 building relative bg-brand-blue">
				<h1 style={{ lineHeight: 1 }} className="text-[3rem]">
					{event.content.title}
				</h1>
				<span className="opacity-75">
					Published at <BlogDate published={event.published} />
				</span>
				<br />
				{event.type === EventType.Article && <BlogArticle event={event} />}
				{event.type === EventType.Video && (
					<BlogVideo event={event as IEvent<IVideoEvent>} />
				)}
				<br />
				<Footer />
			</section>
		</div>
	);
}
