import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const secret = searchParams.get("secret");
	const path = searchParams.get("path");

	if (!path) {
		return new Response("Invalid Path", { status: 400 });
	}

	const draft = await draftMode();
	draft.enable();

	redirect(path);
}
