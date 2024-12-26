"use client";

import BillboardSVG from "@/public/svg/billboard.svg";
import SVCBillboardSVG from "@/public/svg/svc-billboard.svg";
import Lottie from "react-lottie";
import clsx from "clsx";

import SpiderJSON from "@/public/lottie/spider.json";
import FireworksJSON from "@/public/lottie/fireworks.json";

interface BillboardProps {
	svc?: boolean;
	className?: string;
}

const Billboard: React.FC<BillboardProps> = ({ svc = false, className }) => {
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
				{/* {svc && (
					<div className="absolute left-[21%]  md:left-[33.5%] top-0">
						<Lottie
							options={{
								loop: false,
								autoplay: true,
								animationData: SpiderJSON,
							}}
							height={200}
							width={200}
						/>
					</div>
				)} */}
				{svc ? <SVCBillboardSVG /> : <BillboardSVG />}
				{svc && (
					<div className="-z-10 absolute flex -top-[50%] justify-between w-full">
						<Lottie
							speed={0.5}
							options={{
								loop: true,
								autoplay: true,
								animationData: FireworksJSON,
							}}
						/>
						<Lottie
							speed={0.75}
							options={{
								loop: true,
								autoplay: true,
								animationData: FireworksJSON,
							}}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Billboard;
