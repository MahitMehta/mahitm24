"use client";

import React, { useMemo } from "react";
import Carousel from "./Carousel";
import { useInfiniteQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { fetchContentful } from "@/utils/contentful/client";
import type { IEventCollection } from "@/interfaces/contentful";

const eventsQuery = gql`
	query EventsCollection($limit: Int) {
		eventCollection(limit: $limit, order: published_DESC) {
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

const Timeline = () => {
	const { data, fetchNextPage } = useInfiniteQuery<IEventCollection>({
		queryKey: ["events"],
		queryFn: async () => fetchContentful(eventsQuery, { limit: 3 }),
		initialPageParam: 0,
		getNextPageParam: (lastPage) => {
			return 0;
		},
	});

	const slides = useMemo(() => {
		if (!data) return [];
		return data.pages.flatMap((page) => page.eventCollection.items);
	}, [data]);

	return (
		<div className="z-50 flex items-center justify-center h-[290px] pb-2">
			<Carousel slides={slides} options={{ direction: "rtl" }} />
		</div>
	);
};

export default Timeline;
