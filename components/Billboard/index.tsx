"use client";

import BillboardSVG from "@/public/svg/billboard.svg";
import Lottie from "react-lottie";
import SpiderJSON from "@/public/lottie/spider.json";

const Billboard = () => {
	return (
		<div className="mt-[5vh] sm:mt-[25vh] w-full overflow-visible max-w-screen-md h-[300px] relative">
			<div className="left-0 absolute bottom-0 w-[calc(109%)] billboard">
				<div className="absolute left-[58%] top-0">
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
				<BillboardSVG />
			</div>
		</div>
	);
};

export default Billboard;
