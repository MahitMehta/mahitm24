import Card from "@/components/Card";
import { CogIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { motion } from "framer-motion";
import { use, useMemo } from "react";

interface IHeadshotPreviewProps {
	index: number;
	count?: number;
	imageUrl?: string | null;
}

const TOTAL_DURATION = 6; // Total duration for the animation

const HeadshotPreview: React.FC<IHeadshotPreviewProps> = ({
	index,
	count = 3,
	imageUrl,
}) => {
	// Calculate time allocated for each item
	const timeAllocated = useMemo(() => TOTAL_DURATION / count, [count]);

	const loading = useMemo(() => !imageUrl, [imageUrl]);

	return (
		<motion.div
			initial={loading ? { opacity: 0.25 } : { opacity: 1 }}
			animate={loading ? { opacity: [0.25, 1, 0.25] } : { opacity: 1 }}
			transition={
				loading
					? {
							duration: TOTAL_DURATION,
							ease: "linear",
							repeat: Number.POSITIVE_INFINITY,
							times: [
								(0 + index * timeAllocated) / TOTAL_DURATION,
								(1 + index * timeAllocated) / TOTAL_DURATION,
								(2 + index * timeAllocated) / TOTAL_DURATION,
							],
						}
					: { duration: 0.5 }
			}
			className="transition-opacity"
		>
			<Card className="pl-0 pr-0 pt-0 pb-0 h-[120px] w-[80px] md:w-[110px] md:h-[165px] flex justify-center items-center">
				{loading ? (
					<CogIcon
						style={{ animationDuration: "3s" }}
						className={clsx("w-6 h-6 animate-spin ease-linear")}
					/>
				) : (
					<motion.img
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						src={imageUrl ?? ""}
						alt={`Headshot ${index + 1}`}
						className="w-full h-full object-cover"
					/>
				)}
			</Card>
		</motion.div>
	);
};

export default HeadshotPreview;
