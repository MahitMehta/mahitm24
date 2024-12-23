"use client";

import BillboardSVG from "@/public/svg/billboard.svg";
import SVCBillboardSVG from "@/public/svg/svc-billboard.svg";
import Lottie from "react-lottie";
import SpiderJSON from "@/public/lottie/spider.json";
import clsx from "clsx";

interface BillboardProps {
	svc?: boolean;
	className?: string;
}

const Billboard: React.FC<BillboardProps> = ({ svc = false, className }) => {
	return (
		<div className="z-50 mt-[5vh] sm:mt-[25vh] w-full overflow-visible max-w-screen-md h-[300px] relative">
			<div
				className={clsx(
					"left-0 absolute bottom-0 w-[calc(109%)] billboard",
					className,
				)}
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
			</div>
		</div>
	);
};

export default Billboard;
