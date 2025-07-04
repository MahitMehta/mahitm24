"use client";

import PosterWindowSVG from "@/public/svg/poster_window.svg";
import StickerWindow from "@/public/svg/sticker_window.svg";
import BasicWindowSVG from "@/public/svg/window.svg";

const WindowRow = () => {
	return (
		<div className="flex justify-around mt-8 gap-6">
			<PosterWindowSVG width="175" height="300" />
			<BasicWindowSVG
				className="window-disappear-one"
				width="175"
				height="300"
			/>
			<StickerWindow width="175" height="300" />
		</div>
	);
};

export default WindowRow;
