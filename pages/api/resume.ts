import stream, { type PipelineSource } from "node:stream";
import { promisify } from "node:util";
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

const pipeline = promisify(stream.pipeline);

const RESUME_URL_ORIGINAL =
	"https://res.cloudinary.com/mahitm-cdn/image/upload/mahitm/resume.pdf";

export default async function handler(
	_req: NextApiRequest,
	res: NextApiResponse,
) {
	const response = await fetch(RESUME_URL_ORIGINAL).catch(() => null);
	if (!response) {
		res.status(500).send(null);
		return;
	}

	res.setHeader("Content-Type", "application/pdf");
	res.setHeader("Content-Disposition", "attachment; filename=Mahit_Mehta.pdf");

	return await pipeline(response.body as PipelineSource<ReadableStream>, res);
}
