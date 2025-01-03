import { gql } from "graphql-request";
import { fetchContentful } from "./client";
import type { IEventCollection } from "@/interfaces/contentful";

const eventsPreviewQuery = gql`
	query EventsCollection($limit: Int, $skip: Int) {
		eventCollection(limit: $limit, skip: $skip, order: published_DESC) {
            total
			items {
				sys {
					id
				}
				content {
					... on Article {
						title
						subtitle
						thumbnail
					}
					... on Video {
						title
						id
						thumbnailOffset
					}
				}
				slug,
				type,
				published,
			}
		}
	}
`;

export const getEventsPreview = async ({ limit = 3, skip = 0 }) => {
	return fetchContentful<IEventCollection>(eventsPreviewQuery, { limit, skip });
};
