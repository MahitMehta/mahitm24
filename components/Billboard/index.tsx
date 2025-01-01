"use client";

import { useEffect } from "react";
import clsx from "clsx";

import BillboardSVG from "@/public/svg/billboard.svg";
import NewYearBillboardSVG from "@/public/svg/holiday-billboard.svg";
import dynamic from "next/dynamic";
import { EBillboardMode, type IServiceConfig } from "@/interfaces/svc";

const NewYearCountdown = dynamic(
	() => import("@/components/Seasons/Winter/NewYearCountdown"),
	{ ssr: false },
);

interface BillboardProps {
	serviceConfig: IServiceConfig;
	svc?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const Billboard: React.FC<BillboardProps> = ({
	serviceConfig,
	svc = false,
	className,
	style = {},
}) => {
	const { newYearCountdownEnabled, fireworksEnabled, billboardMode } =
		serviceConfig;

	useEffect(() => {
		import("@lottiefiles/lottie-player");
	}, []);

	return (
		<div
			style={style}
			className={clsx(
				"z-50 w-full overflow-visible max-w-screen-md h-[300px] relative",
				className,
			)}
		>
			<div
				className={
					"left-0 absolute bottom-0 w-[calc(109%)] billboard billboard-flicker flex flex-col items-center"
				}
			>
				{svc && newYearCountdownEnabled ? <NewYearCountdown /> : <></>}
				{svc ? (
					<>
						{billboardMode === EBillboardMode.DEFAULT && <BillboardSVG />}
						{billboardMode === EBillboardMode.NEW_YEAR && (
							<NewYearBillboardSVG />
						)}
					</>
				) : (
					<BillboardSVG />
				)}
				{svc && fireworksEnabled ? (
					<div className="-z-10 absolute flex -top-[50%] justify-between w-full">
						<lottie-player
							autoplay
							loop
							style={{ height: "100%", width: "100%" }}
							speed={0.5}
							mode="normal"
							src="/lottie/fireworks.json"
						/>
						<lottie-player
							autoplay
							loop
							style={{ height: "100%", width: "100%" }}
							speed={0.75}
							mode="normal"
							src="/lottie/fireworks.json"
						/>
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Billboard;
