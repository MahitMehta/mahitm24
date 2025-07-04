"use server";

import type { IEventCollection } from "@/interfaces/contentful";
import { gql } from "graphql-request";
import { draftMode } from "next/headers";
import { fetchContentful } from "./client";

const eventsPreviewQuery = gql`
	query EventsCollection($limit: Int, $skip: Int, $preview: Boolean) {
		eventCollection(limit: $limit, skip: $skip, order: published_DESC, preview: $preview) {
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
					... on Song {
						title
						spotifyId
					}
				}
				slug,
				type,
				published,
			}
		}
	}
`;

export const getEventsPreview = async ({ limit = 2, skip = 0 }) => {
	const { isEnabled } = await draftMode();

	return fetchContentful<IEventCollection>(
		eventsPreviewQuery,
		{
			limit,
			skip,
			preview: process.env.NODE_ENV !== "production" || isEnabled,
		},
		isEnabled,
	);
};
