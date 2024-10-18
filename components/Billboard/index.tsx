"use client";

import BillboardSVG from "@/public/svg/billboard.svg";

const Billboard = () => {
	return (
		<div className="mt-[5vh] sm:mt-[25vh] w-full overflow-visible max-w-screen-md h-[300px] relative">
			<div className="left-0 absolute bottom-0 w-[calc(109%)] billboard">
				<BillboardSVG />
			</div>
		</div>
	);
};

export default Billboard;
