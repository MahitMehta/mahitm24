const CONTENTFUL_PREVIEW_ACCESS_TOKEN =
	process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

export async function fetchContentful<T>(
	query: string,
	variables = {},
	isDraftModeEnabled = false,
): Promise<T> {
	console.log("prod:", CONTENTFUL_ACCESS_TOKEN);
	console.log("preview:", CONTENTFUL_PREVIEW_ACCESS_TOKEN);
	const access_token =
		process.env.NODE_ENV !== "production" || isDraftModeEnabled
			? CONTENTFUL_PREVIEW_ACCESS_TOKEN
			: CONTENTFUL_ACCESS_TOKEN;

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
