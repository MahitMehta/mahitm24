const CONTENTFUL_ACCESS_TOKEN =
	process.env.NODE_ENV === "production"
		? process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
		: process.env.NEXT_PUBLIC_PREVIEW_ACCESS_TOKEN;

export async function fetchContentful<T>(
	query: string,
	variables = {},
): Promise<T> {
	return fetch(
		`https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
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
