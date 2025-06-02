import Card from "@/components/Card";
import { CogIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useMemo } from "react";

interface IHeadshotPreviewProps {
	index: number;
	count?: number;
}

const TOTAL_DURATION = 6; // Total duration for the animation

const HeadshotPreview: React.FC<IHeadshotPreviewProps> = ({
	index,
	count = 3,
}) => {
	// Calculate time allocated for each item
	const timeAllocated = useMemo(() => TOTAL_DURATION / count, [count]);

	return (
		<motion.div
			initial={{ opacity: 0.25 }}
			animate={{ opacity: [0.25, 1, 0.25] }}
			transition={{
				duration: TOTAL_DURATION,
				ease: "linear",
				repeat: Number.POSITIVE_INFINITY,
				times: [
					(0 + index * timeAllocated) / TOTAL_DURATION,
					(1 + index * timeAllocated) / TOTAL_DURATION,
					(2 + index * timeAllocated) / TOTAL_DURATION,
				],
			}}
			className="transition-opacity"
		>
			<Card className=" w-[80px] h-[120px] flex justify-center items-center">
				<CogIcon
					style={{ animationDuration: "3s" }}
					className={clsx("w-6 h-6 animate-spin ease-linear")}
				/>
			</Card>
		</motion.div>
	);
};

export default HeadshotPreview;
