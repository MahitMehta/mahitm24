"use client";

import BillboardSVG from "@/public/svg/billboard.svg";

const Billboard = () => {
	return (
		<div className="mt-[15vh] sm:mt-[25vh] w-full overflow-visible max-w-screen-md h-[300px] relative">
			<div className="left-0 absolute bottom-0 w-[calc(109%)] billboard flex items-end">
				<BillboardSVG />
			</div>
		</div>
	);
};

export default Billboard;
