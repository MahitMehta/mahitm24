"use client";

import Image from "next/image";
import Link from "next/link";

import GoArrow from "@/components/GoArrow";
import Card from "@/components/Card";
import { useCallback, useEffect } from "react";
import { createSupabaseClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useAtomValue } from "jotai";
import { userAtom } from "@/utils/atom";

const supabase = createSupabaseClient();

const LoginForm = () => {
	const searchParams = useSearchParams();

	const user = useAtomValue(userAtom);
	const router = useRouter();

	useEffect(() => {
		const next = searchParams?.get("next");
		if (user && next) {
			router.replace(next);
		}
	}, [user, searchParams, router]);

	const signInWithGitHub = useCallback(async () => {
		const origin = window.location.origin;
		const next = searchParams?.get("next");

		const { error } = await supabase.auth.signInWithOAuth({
			provider: "github",
			options: {
				redirectTo: next ? `${origin}/login?next=${next}` : `${origin}/svc`,
			},
		});

		if (error) {
			console.error("GitHub sign-in error:", error);
		}
	}, [searchParams]);

	return (
		<Card className="my-3 py-3 w-full flex flex-col items-center gap-3">
			<button
				onClick={signInWithGitHub}
				type="button"
				className="w-full go-arrow-container flex justify-center items-center h-10 bg-black border-2 border-brand-blue-accent"
			>
				<Image
					src="/images/github.png"
					alt="Github Logo"
					width={16}
					height={16}
					className="inline-block mr-2"
				/>
				Continue with GitHub
				<GoArrow className="ml-2" />
			</button>
			<button
				type="button"
				className="w-full go-arrow-container flex justify-center items-center h-10 bg-black border-2 border-brand-blue-accent"
			>
				<Image
					src="/images/google.png"
					alt="Google Logo"
					width={16}
					height={16}
					className="inline-block mr-2"
				/>
				Continue with Google
				<GoArrow className="ml-2" />
			</button>
			<p>
				OR <sup>(Sigh)</sup>
			</p>
			<button
				type="button"
				className="w-full go-arrow-container flex justify-center items-center h-10 bg-black border-2 border-brand-blue-accent"
			>
				Continue with Email
				<GoArrow className="ml-2" />
			</button>
			<p style={{ lineHeight: 1.0 }} className="text-center">
				By proceeding, I agree to the{" "}
				<Link
					className="text-brand-yellow hover:underline"
					href="terms-and-conditions"
				>
					Terms and Conditions
				</Link>{" "}
				+{" "}
				<Link className="text-brand-yellow hover:underline" href="privacy">
					Privacy Policy
				</Link>
				.
			</p>
		</Card>
	);
};

export default LoginForm;
