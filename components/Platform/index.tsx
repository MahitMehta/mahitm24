"use client";

import PlatformSVG from "@/public/svg/platform.svg";
import clsx from "clsx";

interface PlatformProps {
	className?: string;
}

const Platform: React.FC<PlatformProps> = ({ className }) => {
	return (
		<div
			className={clsx(
				"z-10 w-full overflow-visible max-w-screen-md h-[55px] relative",
				className,
			)}
		>
			<div className={"left-0 absolute bottom-0 w-[calc(109%)] platform"}>
				<PlatformSVG />
			</div>
		</div>
	);
};

export default Platform;
