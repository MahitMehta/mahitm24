"use server";

import * as contentful from "contentful";

const getAccessToken = (isDraftModeEnabled: boolean): string => {
	return process.env.NODE_ENV !== "production" || isDraftModeEnabled
		? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!
		: process.env.CONTENTFUL_ACCESS_TOKEN ||
				process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!;
};

export async function getParentEntry(
	entryId: string,
	isDraftModeEnabled = false,
): Promise<contentful.Entry<
	contentful.EntrySkeletonType,
	undefined,
	string
> | null> {
	const config = {
		space: process.env.CONTENTFUL_SPACE_ID!,
		accessToken: getAccessToken(isDraftModeEnabled),
		host: "cdn.contentful.com",
	};

	if (
		process.env.NODE_ENV !== "production" ||
		isDraftModeEnabled ||
		!process.env.CONTENTFUL_ACCESS_TOKEN
	) {
		config.host = "preview.contentful.com";
	}

	const client = contentful.createClient(config);

	const entries = await client.getEntries({
		links_to_entry: entryId,
	});

	if (entries.items.length === 1) {
		return entries.items[0];
	}

	return null;
}

export async function fetchContentful<T>(
	query: string,
	variables = {},
	isDraftModeEnabled = false,
): Promise<T> {
	const access_token = getAccessToken(isDraftModeEnabled);

	return fetch(
		`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${access_token}`,
			},
			body: JSON.stringify({ query, variables }),
		},
	)
		.then((res) => res.json())
		.then((res) => {
			if (res.errors) {
				console.error(res.errors);
				throw new Error("Failed to fetch contentful");
			}
			return res.data;
		});
}
