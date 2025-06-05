"use client";

import BrandBrownButton from "@/components/BrandBrownButton";
import Select from "@/components/BrandBrownButton/Select";
import Card from "@/components/Card";
import { createSupabaseClient } from "@/utils/supabase/client";
import { CogIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import HeadshotPreview from "./HeadshotPreview";
import SplitFlapGroup from "@/components/SplitFlapCountdown/SplitFlapGroup";
import { useAtomValue } from "jotai";
import { userAtom } from "@/utils/atom";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const supabase = createSupabaseClient();

const MODAL_API_URL = "https://mahitmehta--headshots-v11.modal.run";

type genderType = "male" | "female" | "non-binary";

const RequestForm = () => {
	const [inputImage, setInputImage] = useState<File | null>(null);
	const [generating, setGenerating] = useState(false);
	const [gender, setGender] = useState<genderType | null>(null);
	const [headshotUrls, setHeadshotUrls] = useState<string[]>([]);
	const [selectedHeadshotIndex, setSelectedHeadshotIndex] = useState<
		number | null
	>(null);
	const user = useAtomValue(userAtom);

	const [errorMessage, setErrorMessage] = useState<string>("");

	const splitFlapIntervalRef = useRef<NodeJS.Timeout | null>(null);
	const splitFlapDigitsRef = useRef<number[]>([0, 0]);
	const [splitFlapDigits, setSplitFlapDigits] = useState<number[]>([0, 0]);

	const fetchSignedImageUrls = useCallback(async (objectPaths: string[]) => {
		const { data, error } = await supabase.storage
			.from("headshots")
			.createSignedUrls(objectPaths, 60 * 60); // 1 hour expiration

		if (error) {
			console.error("Error getting signed URLs:", error);
			return;
		}

		const signedUrls = data?.map((item) => item.signedUrl);
		setHeadshotUrls(signedUrls || []);
		setSelectedHeadshotIndex(0); // Set to first headshot

		setGenerating(false);
	}, []);

	const pollForResult = useCallback(
		async (
			callId: string,
			requestId: string,
			userId: string,
			jwt: string,
			pollCount = 0,
		) => {
			fetch(
				`${MODAL_API_URL}/result?call_id=${callId}&request_id=${requestId}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				},
			)
				.then((res) => res.json())
				.then((result) => {
					if (result?.status === "pending") {
						// Still pending, keep polling
						if (pollCount >= 90) {
							splitFlapIntervalRef.current &&
								clearInterval(splitFlapIntervalRef.current);
							setErrorMessage("Generation timed out. Please try again.");
						} else {
							setTimeout(
								() =>
									pollForResult(callId, requestId, userId, jwt, pollCount + 1),
								1000,
							); // Poll every 1 seconds
						}
					} else if (result?.status === "success") {
						console.debug("Generation successful", result.object_paths);
						splitFlapDigitsRef.current = [0, 0, 1];
						fetchQuotaUsed(userId);
						fetchSignedImageUrls(result.object_paths);
					} else if (result?.status === "error") {
						splitFlapIntervalRef.current &&
							clearInterval(splitFlapIntervalRef.current);
						setGenerating(false);
						splitFlapDigitsRef.current = [0, 0];
						setSplitFlapDigits([0, 0]);
						console.debug("Generation failed");
						setErrorMessage("Generation failed. Please try again.");
					}
				})
				.catch((error) => {
					console.error("Error fetching result:", error);
					setGenerating(false);
					splitFlapDigitsRef.current = [0, 0];
					setSplitFlapDigits([0, 0]);
					setErrorMessage(
						"Error fetching generation result. Please try again.",
					);
				});
		},
		[fetchSignedImageUrls],
	);

	const startProgessUpdates = useCallback(() => {
		splitFlapIntervalRef.current = setInterval(() => {
			// don't update if at 100 (or 3 digits)
			if (splitFlapDigitsRef.current.length === 3) {
				setSplitFlapDigits(splitFlapDigitsRef.current);
				splitFlapIntervalRef.current &&
					clearInterval(splitFlapIntervalRef.current);
				splitFlapDigitsRef.current = [0, 0]; // Reset digits
				return;
			}

			let increment = 5;
			const newDigits = [...splitFlapDigitsRef.current];
			if (newDigits[0] >= 4) {
				increment = 1;
			}
			// Increment the first digit, reset to 0 if it reaches 10
			newDigits[1] = (newDigits[1] + increment) % 10;
			// If the first digit rolls over, increment the second digit
			if (newDigits[1] === 0) {
				newDigits[0] = (newDigits[0] + 1) % 10;
			}

			if (newDigits[0] === 9 && newDigits[1] === 9) {
				splitFlapIntervalRef.current &&
					clearInterval(splitFlapIntervalRef.current);
			}

			splitFlapDigitsRef.current = newDigits; // Update the ref to keep track of the current digits
			setSplitFlapDigits(newDigits);
		}, 1000);
	}, []);

	const router = useRouter();

	const [quota, setQuota] = useState<number | null>(null);

	const fetchQuota = useCallback(async (userId: string) => {
		const { data, error } = await supabase
			.from("headshots_config")
			.select("quota")
			.eq("user_id", userId);

		if (error) {
			console.error("Error fetching quota:", error);
			return;
		}

		if (data.length === 0) {
			await supabase.from("headshots_config").insert({ user_id: userId });
			setQuota(5);
		} else {
			setQuota(data[0].quota);
		}
	}, []);

	const getMostRecentSunday = useCallback(() => {
		const now = new Date();
		// 0 = Sunday
		const day = now.getDay();
		// How many days since last Sunday
		const diff = day === 0 ? 0 : day;
		now.setDate(now.getDate() - diff);
		// Set to start of day
		now.setHours(0, 0, 0, 0);
		return now.toISOString();
	}, []);

	const [quotaUsed, setQuotaUsed] = useState<number | null>(null);

	const fetchQuotaUsed = useCallback(
		async (userId: string) => {
			const fromDate = getMostRecentSunday();
			const { data } = await supabase
				.from("headshots")
				.select("cost")
				.eq("user_id", userId)
				.neq("status", "error")
				.gte("created_at", fromDate);

			if (!data) {
				console.error("Error fetching quota used");
				return;
			}

			const totalUsed = data.reduce((acc, item) => acc + (item.cost || 0), 0);
			setQuotaUsed(totalUsed);
		},
		[getMostRecentSunday],
	);

	useEffect(() => {
		if (quotaUsed !== null || !user) return;
		fetchQuotaUsed(user.id);
	}, [fetchQuotaUsed, user, quotaUsed]);

	const remainingQuota = useMemo(() => {
		if (quota === null || quotaUsed === null) return null;
		return quota - quotaUsed;
	}, [quota, quotaUsed]);

	const inputImageURL = useMemo(() => {
		return inputImage ? URL.createObjectURL(inputImage) : null;
	}, [inputImage]);

	const outOfCoins = useMemo(() => {
		return remainingQuota !== null && remainingQuota <= 0;
	}, [remainingQuota]);

	const requestGeneration = useCallback(async () => {
		setSplitFlapDigits([0, 0]); // Reset split flap digits
		setErrorMessage(""); // Clear any previous error messages

		if (outOfCoins) {
			setErrorMessage("You are out of coins.");
			return;
		}

		if (generating) {
			setErrorMessage("Already generating. Please wait.");
			return;
		}

		if (gender === null) {
			setErrorMessage("Please select a gender.");
			return;
		}

		if (!inputImage) {
			setErrorMessage("Please upload an image before generating.");
			return;
		}

		setHeadshotUrls([]);
		setSelectedHeadshotIndex(null);
		setGenerating(true);

		const { data: sessionResponse, error } =
			await supabase.auth.refreshSession();

		if (error) {
			setGenerating(false);
			router.push(`/login?next=${window.location.pathname}`);
			return;
		}

		const session = sessionResponse.session;
		const jwt = session?.access_token;

		if (!jwt || !sessionResponse.user) {
			setGenerating(false);
			// No JWT or user, redirect to login
			router.push(`/login?next=${window.location.pathname}`);
			return;
		}
		const user_id = sessionResponse.user.id;

		splitFlapDigitsRef.current = [0, 0];
		startProgessUpdates();

		const formData = new FormData();
		formData.append("file", inputImage);
		formData.append("gender", gender);

		fetch(`${MODAL_API_URL}/trigger-inference`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.call_id && data.request_id) {
					console.debug("Generation request successful");
					setTimeout(() => {
						pollForResult(data.call_id, data.request_id, user_id, jwt);
					}, 15 * 1000); // Wait 15 seconds before starting to poll
				}
			})
			.catch((error) => {
				setGenerating(false);
				splitFlapIntervalRef.current &&
					clearInterval(splitFlapIntervalRef.current);
				splitFlapDigitsRef.current = [0, 0];
				setSplitFlapDigits([0, 0]);
				console.error("Error starting generation:", error);
				setErrorMessage("Error starting generation. Please try again.");
			});
	}, [
		inputImage,
		pollForResult,
		generating,
		gender,
		startProgessUpdates,
		router,
		outOfCoins,
	]);

	const handleFileUpload = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];

			if (!file) {
				console.debug("No file selected");
				setErrorMessage("Please select a valid image file.");
				return;
			}

			setInputImage(file);
		},
		[],
	);

	const imageInputRef = useRef<HTMLInputElement>(null);
	const [isDragging, setIsDragging] = useState(false);

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = () => {
		setIsDragging(false);
	};

	const handleDrop = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
		if (e.dataTransfer.files?.[0]) {
			setInputImage(e.dataTransfer.files[0]);
		}
	}, []);

	const handleClick = () => {
		imageInputRef.current?.click();
	};

	useEffect(() => {
		if (!user) return;
		if (quota !== null) return;

		fetchQuota(user.id);
	}, [user, quota, fetchQuota]);

	const showCustomizationOptions = useMemo(() => {
		return !generating && headshotUrls.length === 0;
	}, [generating, headshotUrls.length]);

	const handleGenerateAnother = useCallback(() => {
		setInputImage(null);
		setHeadshotUrls([]);
		setSelectedHeadshotIndex(null);
		setGender(null);
	}, []);

	return (
		<div className="flex gap-3 my-3 flex-col sm:flex-row items-center">
			<Card className="!px-1 flex min-w-[240px] sm:w-[240px] max-w-[240px] h-[360px] justify-center items-center flex-col">
				{selectedHeadshotIndex === null ? (
					<div
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
						onClick={handleClick}
						className={`w-full h-full flex justify-center items-center text-center cursor-pointer transition ${
							isDragging ? "opacity-50" : "opacity-100"
						}`}
					>
						{inputImageURL ? (
							<motion.img
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								src={inputImageURL}
								alt="Uploaded"
								className="w-full h-full object-cover hover:opacity-65 duration-300 transition"
							/>
						) : (
							<p className="text-gray-600">
								Drag and Drop an Image
								<br />
								or Click to Browse
							</p>
						)}
						<input
							ref={imageInputRef}
							type="file"
							accept="image/jpeg"
							className="hidden"
							onChange={handleFileUpload}
						/>
					</div>
				) : (
					<motion.img
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						src={headshotUrls[selectedHeadshotIndex]}
						alt="AI Headshot"
						className="w-full h-full object-cover hover:opacity-65 duration-300 transition"
					/>
				)}
			</Card>
			<Card className="w-full min-h-[360px] flex flex-col">
				<h1 style={{ lineHeight: 1.0 }} className="text-2xl">
					Generation Config
				</h1>
				<div className="flex">
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://huggingface.co/mahitm/mahitm-headshots-v1"
						className="ml-1 text-gray-600 hover:underline"
					>
						Model = mahitm-headshots-v1.1
					</a>
				</div>
				<div className="relative min-h-[100px]">
					<div
						className={clsx(
							"mt-3 ml-1 transition-opacity duration-300 absolute top-0",
							showCustomizationOptions
								? "opacity-100"
								: "opacity-0 pointer-events-none",
						)}
					>
						<div>
							<p>1. Select Gender</p>
							<div className="flex gap-2">
								<Select
									id={"male"}
									selectedId={gender}
									onSelect={setGender}
									className="w-[125px]"
								>
									<span className="font-bold mr-1">♂</span>Male
								</Select>
								<Select
									id={"female"}
									selectedId={gender}
									onSelect={setGender}
									className="w-[125px]"
								>
									<span className="font-bold mr-1">♀</span> Female
								</Select>
								<Select
									id={"non-binary"}
									selectedId={gender}
									onSelect={setGender}
									className="w-[125px]"
								>
									<span className="font-bold mr-1">🜬</span>Non-binary
								</Select>
							</div>
						</div>
					</div>
					<div
						className={clsx(
							"absolute top-2 flex gap-2",
							showCustomizationOptions && "opacity-0 pointer-events-none",
						)}
					>
						{generating
							? Array.from({ length: 3 }).map((_, index) => (
									<HeadshotPreview key={index} index={index} count={3} />
								))
							: headshotUrls.map((url, index) => (
									<HeadshotPreview
										imageUrl={url}
										key={index}
										index={index}
										count={headshotUrls.length}
									/>
								))}
					</div>
				</div>
				<div className="mt-14 sm:mt-auto mb-3">
					{errorMessage && (
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							style={{ lineHeight: 1.0 }}
							className="text-red-500 ml-1"
						>
							{errorMessage}
						</motion.p>
					)}
					{quota !== null && remainingQuota !== null && (
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className={clsx(
								"ml-1",
								outOfCoins ? "text-red-500" : "text-gray-600",
							)}
						>
							{remainingQuota}/{quota} weekly coins remaining.
						</motion.p>
					)}
					<div className="flex gap-2 items-center">
						{headshotUrls.length === 0 ? (
							<BrandBrownButton
								disabled={!inputImage || outOfCoins || !gender}
								onClick={requestGeneration}
								className={clsx(
									"group gap-2 w-[180px]",
									generating && "cursor-not-allowed text-brand-yellow",
								)}
							>
								<CogIcon
									style={{ animationDuration: "3s" }}
									className={clsx(
										"w-6 h-6 group-hover:rotate-[25deg] transition-all duration-200 ease-linear",
										generating ? "animate-spin" : "",
									)}
								/>
								<span className="duration-200 transition-colors">
									{generating ? "Generating..." : "Generate for 1 coin"}
								</span>
							</BrandBrownButton>
						) : (
							<BrandBrownButton onClick={handleGenerateAnother}>
								Generator Another?
							</BrandBrownButton>
						)}
						<div
							className={clsx(
								!generating && "opacity-0 pointer-events-none",
								"flex",
							)}
						>
							<SplitFlapGroup
								digits={splitFlapDigits}
								label=""
								fontSize={36}
								gap={2}
								width={16}
								backgroundColor={"#0E1417"}
							/>
							<span>%</span>
						</div>
					</div>
				</div>
				<p>
					Note: All images <span className="text-red-500">are deleted</span>{" "}
					upon refresh of page.
				</p>
			</Card>
		</div>
	);
};

export default RequestForm;
