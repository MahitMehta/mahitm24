"use client";

import Image from "next/image";
import Link from "next/link";

import GoArrow from "@/components/GoArrow";
import Card from "@/components/Card";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createSupabaseClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleOneTap from "@/components/GoogleOneTap";

import { motion } from "framer-motion";
import clsx from "clsx";
import BrandBrownButton from "@/components/BrandBrownButton";
import { isValidEmail } from "@/utils/common";
import { CogIcon } from "@heroicons/react/24/outline";

const supabase = createSupabaseClient();

const LoginForm = () => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const canGoNext = useCallback(async () => {
		const { data, error } = await supabase.auth.getSession();
		if (error || !data.session) {
			return;
		}

		const next = searchParams?.get("next");
		if (next) {
			router.replace(next);
		}
	}, [router, searchParams]);

	useEffect(() => {
		canGoNext();
	}, [canGoNext]);

	const redirectTo = useMemo(() => {
		const origin = window.location.origin;

		const next = searchParams?.get("next");
		return next ? `${origin}/login?next=${next}` : `${origin}/svc`;
	}, [searchParams]);

	const handleContinueWithOAuth = useCallback(
		async (provider: "google" | "github") => {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: provider,
				options: {
					redirectTo,
				},
			});

			if (error) {
				console.error(`${provider} sign-in error:`, error);
			}
		},
		[redirectTo],
	);

	const [continueWithEmail, setContinueWithEmail] = useState(false);
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState<string>("");
	const [sentEmailOnce, setSentEmailOnce] = useState(false);
	const [sendingEmail, setSendingEmail] = useState(false);

	const handleContinueWithMagicLink = useCallback(async () => {
		setEmailError("");

		if (!isValidEmail(email)) {
			setEmailError("Please enter a valid email address.");
			return;
		}

		setSendingEmail(true);
		const { error } = await supabase.auth
			.signInWithOtp({
				email,
				options: {
					// user should not be automatically created
					// this is to prevent spam accounts
					shouldCreateUser: false,
					emailRedirectTo: redirectTo,
				},
			})
			.finally(() => {
				setSendingEmail(false);
			});

		if (error) {
			console.error("Magic link error:", error);
			setEmailError("Failed to send email. Please try again in a moment.");
			return;
		}

		setSentEmailOnce(true);
	}, [email, redirectTo]);

	return (
		<Card className="my-3 py-3 w-full flex flex-col items-center gap-3 overflow-hidden">
			<GoogleOneTap />
			<div className="h-[180px] w-full relative">
				<motion.div
					initial={{ opacity: 0, y: -40 }}
					animate={{
						opacity: continueWithEmail ? 1 : 0,
						y: continueWithEmail ? 0 : -40,
					}}
					transition={{ duration: 0.25 }}
					className={clsx(
						"absolute top-0 w-full flex flex-col",
						!continueWithEmail && "pointer-events-none",
					)}
				>
					<button
						type="button"
						onClick={() => setContinueWithEmail(false)}
						className="go-arrow-container flex gap-1 items-center -translate-x-2 hover:underline hover:text-brand-yellow"
					>
						<GoArrow className="rotate-180" />
						Use OAuth Instead?
					</button>
					<input
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						placeholder="Enter your email..."
						className="mt-2 w-full h-10 px-3 border-2 border-brand-blue-accent bg-black outline-none focus:border-brand-blue text-white"
					/>
					<BrandBrownButton
						className="!w-full go-arrow-container mt-2"
						onClick={handleContinueWithMagicLink}
						disabled={sendingEmail}
					>
						{sendingEmail ? (
							<>
								<CogIcon
									style={{ animationDuration: "3s" }}
									className={clsx(
										"w-6 h-6 mr-1",
										sendingEmail ? "animate-spin" : "",
									)}
								/>
								Sending Verification Email
							</>
						) : (
							<>
								{sentEmailOnce
									? "Sent Email. Sent Again?"
									: "Send Verification Email"}{" "}
								<GoArrow className="ml-2" />
							</>
						)}
					</BrandBrownButton>
					{emailError && (
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.25 }}
							className="text-red-500 ml-1"
						>
							{emailError}
						</motion.p>
					)}
				</motion.div>

				<motion.div
					animate={{
						opacity: continueWithEmail ? 0 : 1,
						y: continueWithEmail ? 40 : 0,
					}}
					transition={{ duration: 0.25 }}
					className={clsx(
						"w-full flex flex-col items-center gap-3 absolute top-0",
						continueWithEmail && "pointer-events-none",
					)}
				>
					<button
						onClick={() => {
							handleContinueWithOAuth("github");
						}}
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
						onClick={() => {
							handleContinueWithOAuth("google");
						}}
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
						onClick={() => setContinueWithEmail(true)}
						type="button"
						className="w-full go-arrow-container flex justify-center items-center h-10 bg-black border-2 border-brand-blue-accent"
					>
						Continue with Email
						<GoArrow className="ml-2" />
					</button>
				</motion.div>
			</div>
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
