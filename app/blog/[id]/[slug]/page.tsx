import Billboard from "@/components/Billboard";
import Footer from "@/components/Footer";
import Sky from "@/components/Sky";
import { getServiceConfig } from "@/helpers/serviceConfig";
import type { Metadata } from "next";
import { gql } from "graphql-request";
import { fetchContentful } from "@/utils/contentful/client";
import type {
	IBlogEvent,
	IEvent,
	IEventCollection,
} from "@/interfaces/contentful";
import Document from "@/components/Contentful/Document";
import { getFormattedDate } from "@/utils/common";
import { redirect } from "next/navigation";

export const revalidate = 900;

const blogSlugsQuery = gql`
    query BlogEvents($preview: Boolean!) {
        eventCollection(where: { type: "Blog" }, preview: $preview) {
            items {
				sys {
					id
				}
                slug
            }
        }
    }
`;

const blogEventQuery = gql`
	query BlogEvent($id: String!, $preview: Boolean!) {
		event(id:$id, preview: $preview) {
			sys {
				id
			}
			content {
				... on Blog {
					title
						subtitle
						body {
							json
						}
						thumbnail
				}
			}
			published
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
			id: event.sys.id,
			slug: event.slug,
		}));

	return posts;
}

export async function generateMetadata({
	params,
}: { params: Promise<{ id: string; slug: string }> }): Promise<Metadata> {
	const id = (await params).id;

	const { event } = await fetchContentful<{ event: IEvent<IBlogEvent> }>(
		blogEventQuery,
		{
			id,
			preview: process.env.NODE_ENV !== "production",
		},
	);

	const thumbnailURL = `/cdn/v1/svc/thumbnails/${event.content.thumbnail}`;

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
}: { params: Promise<{ slug: string; id: string }> }) {
	const serviceConfig = getServiceConfig();

	const { id } = await params;
	const { event } = await fetchContentful<{ event: IEvent<IBlogEvent> }>(
		blogEventQuery,
		{
			id,
			preview: process.env.NODE_ENV !== "production",
		},
	);

	if (new Date(event.published) > new Date()) {
		// Redirect to the blog page if the event is not published yet
		// ("blog is locked")
		return redirect("/svc");
	}

	const formattedDate = getFormattedDate(new Date(event.published));

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
				<span className="opacity-75">Published at {formattedDate}</span>
				<br />
				{event.content.body && <Document document={event.content.body.json} />}
				<br />
				<Footer />
			</section>
		</div>
	);
}
