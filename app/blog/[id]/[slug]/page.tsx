import Billboard from "@/components/Billboard";
import Footer from "@/components/Footer";
import Platform from "@/components/Platform";
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

export const revalidate = 900;

const blogSlugsQuery = gql`
    query BlogEvents {
        eventCollection(where: { type: "Blog" }) {
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
	query BlogEvent($id: String!) {
		event(id:$id) {
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
	const response = await fetchContentful<IEventCollection>(blogSlugsQuery);

	return response.eventCollection.items.map((event) => ({
		id: event.sys.id,
		slug: event.slug,
	}));
}

export async function generateMetadata({
	params,
}: { params: Promise<{ id: string; slug: string }> }): Promise<Metadata> {
	const id = (await params).id;

	const { event } = await fetchContentful<{ event: IEvent<IBlogEvent> }>(
		blogEventQuery,
		{ id },
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
		{ id },
	);

	return (
		<div
			id="search"
			className="flex flex-col items-center p-3 max-w-[100vw] overflow-hidden min-h-screen max-h-[1000px]"
		>
			<Sky />
			<div className="w-full h-[300px] fixed bottom-0 brightness-50 building-container" />
			<Billboard blog serviceConfig={serviceConfig} />
			<section className="building-flicker z-50 flex items-center flex-col w-full max-w-screen-md p-6 building relative bg-brand-blue">
				<Platform className="top-0 -translate-y-full billboard-flicker !absolute" />
				<Footer />
			</section>
		</div>
	);
}
