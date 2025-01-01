"use client";

import React, { useMemo } from "react";
import Carousel from "./Carousel";
import { useInfiniteQuery } from "@tanstack/react-query";
import { gql, GraphQLClient } from "graphql-request";

const CONTENTFUL_ACCESS_TOKEN =
	process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ||
	process.env.NEXT_PUBLIC_CONTENT_PREVIEW_ACCESS_TOKEN;

const eventsQuery = gql`
	query EventsCollection($limit: Int) {
		eventCollection(limit: $limit, order: published_DESC) {
			items {
				sys {
					id
				}
				title
				subtitle,
				published,
				thumbnail
			}
		}
	}
`;

const graphQLClient = new GraphQLClient(
	`https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
	{
		headers: {
			authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
		},
	},
);

export interface IEvent {
	sys: {
		id: string;
	};
	title: string;
	subtitle: string;
	published: string;
	thumbnail: string;
}

export interface IEventFrame {
	eventCollection: {
		items: IEvent[];
	};
}

const Timeline = () => {
	const { data, fetchNextPage } = useInfiniteQuery<IEventFrame>({
		queryKey: ["events"],
		queryFn: async () => graphQLClient.request(eventsQuery, { limit: 3 }),
		initialPageParam: 0,
		getNextPageParam: (lastPage) => {
			return 0;
		},
	});

	const slides = useMemo(() => {
		if (!data) return [];
		return data.pages.flatMap((page) => page.eventCollection.items);
	}, [data]);
	console.log(slides);

	return (
		<div className="z-50 flex items-center justify-center h-[290px] pb-2">
			<Carousel slides={slides} options={{ direction: "rtl" }} />
		</div>
	);
};

export default Timeline;
