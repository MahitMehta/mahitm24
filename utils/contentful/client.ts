export async function fetchContentful<T>(
	query: string,
	variables = {},
	isDraftModeEnabled = false,
): Promise<T> {
	const CONTENTFUL_ACCESS_TOKEN =
		process.env.NODE_ENV !== "production" || isDraftModeEnabled
			? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
			: process.env.CONTENTFUL_ACCESS_TOKEN;

	return fetch(
		`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
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
