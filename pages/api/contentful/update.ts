import { EventType } from "@/interfaces/contentful";
import type { NextApiRequest, NextApiResponse } from "next";

enum EContentfulContentTypeID {
	EVENT = "event",
}

interface IContentfulWebhookPayload<T = object> {
	sys: {
		contentType: {
			sys: {
				id: EContentfulContentTypeID;
			};
		};
	};
	fields: T;
}

interface IContentfulEventFields {
	type: {
		"en-US": EventType;
	};
	slug: {
		"en-US": string;
	};
}

async function attemptRevalidation(
	res: NextApiResponse,
	path: string,
): Promise<boolean> {
	const success = await res
		.revalidate(path)
		.then(() => true)
		.catch((err) => {
			console.log(`Failed to revalidate ${path}\n`, err);
			return false;
		});
	return success;
}

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

	const body = JSON.parse(req.body) as IContentfulWebhookPayload;
	console.log(body);
	const modelId = body.sys.contentType.sys.id;
	console.log(modelId);

	if (modelId === EContentfulContentTypeID.EVENT) {
		(await attemptRevalidation(res, "/svc")) && revalidatedPages.push("/svc");

		const fields = body.fields as IContentfulEventFields;
		const type = fields.type["en-US"];
		if (type === EventType.Article || type === EventType.Video) {
			const blogPagePath = `/blog/${fields.slug["en-US"]}`;
			(await attemptRevalidation(res, blogPagePath)) &&
				revalidatedPages.push(blogPagePath);
		}
	}

	return res.status(200).json({
		message: "Success",
		revalidatedPages,
		error: false,
	});
}
