"use client";

import React, { useEffect } from "react";

const Event = () => {
	useEffect(() => {
		import("@lottiefiles/lottie-player");
	}, []);

	return (
		<div className="relative flex justify-center items-center w-[200px] h-full border-4 bg-brand-blue-darker border-brand-blue-accent">
			<div
				style={{
					transform: "translate(-110%, -65%)",
				}}
				className="absolute left-0 top-0"
			>
				<lottie-player
					autoplay
					loop
					style={{ height: "50px", width: "50px", transform: "scale(4)" }}
					speed={1}
					mode="normal"
					src="/lottie/propeller.json"
				/>
			</div>
			<div
				style={{
					transform: "translate(100%, -65%)",
				}}
				className="absolute right-0 top-0"
			>
				<lottie-player
					autoplay
					loop
					style={{ height: "50px", width: "50px", transform: "scale(4)" }}
					speed={1}
					mode="normal"
					src="/lottie/propeller.json"
				/>
			</div>
		</div>
	);
};

export default Event;
