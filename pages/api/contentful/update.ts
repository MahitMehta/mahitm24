import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const revalidatedPages: string[] = [];

	if (req.method !== "POST") {
		return res.status(405).json({
			message: "Invalid HTTP Method",
			revalidatedPages: [],
			error: false,
		});
	}

	const token = req.headers.authorization?.slice(7);
	if (token !== process.env.CONTENTFUL_WEBHOOK_SECRET_TOKEN) {
		return res.status(401).json({
			message: "Invalid token",
			revalidatedPages,
			error: false,
		});
	}

	console.log(req.body);
	const modelId = req.body?.sys?.contentType?.sys?.id;
	console.log(modelId);

	return res.status(200).json({
		message: "Success",
		revalidatedPages,
		error: false,
	});
}
