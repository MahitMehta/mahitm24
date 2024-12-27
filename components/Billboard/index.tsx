"use client";

import { useEffect } from "react";
import clsx from "clsx";

import BillboardSVG from "@/public/svg/billboard.svg";
import SVCBillboardSVG from "@/public/svg/holiday-billboard.svg";
import dynamic from "next/dynamic";

const NewYearCountdown = dynamic(
	() => import("@/components/Seasons/Winter/NewYearCountdown"),
	{ ssr: false },
);

interface BillboardProps {
	svc?: boolean;
	className?: string;
}

const Billboard: React.FC<BillboardProps> = ({ svc = false, className }) => {
	useEffect(() => {
		import("@lottiefiles/lottie-player");
	}, []);

	return (
		<div
			className={clsx(
				"z-50 w-full overflow-visible max-w-screen-md h-[300px] relative",
				className,
			)}
		>
			<div
				className={
					"left-0 absolute bottom-0 w-[calc(109%)] billboard billboard-flicker"
				}
			>
				{svc && <NewYearCountdown />}
				{svc ? <SVCBillboardSVG /> : <BillboardSVG />}
				{svc && (
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
				)}
			</div>
		</div>
	);
};

export default Billboard;
