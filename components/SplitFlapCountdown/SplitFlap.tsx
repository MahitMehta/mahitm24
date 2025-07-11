import { useEffect, useMemo, useRef, useState } from "react";

interface ISplitFlapProps {
	value: number;
	fontSize: number;
	width: number;
	gap: number;
	backgroundColor?: string;
}

const SplitFlap: React.FC<ISplitFlapProps> = ({
	value,
	fontSize,
	width,
	gap,
	backgroundColor = "black",
}) => {
	const [prevValue, setPrevValue] = useState<number>(0);
	const [currentValue, setCurrentValue] = useState<number>(0);

	const flipRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setCurrentValue(value);
		flipRef.current?.classList.add("split-flap-flip");
		const timerRef = setTimeout(() => {
			setPrevValue(value);
			flipRef.current?.classList.remove("split-flap-flip");
		}, 750);

		return () => {
			clearTimeout(timerRef);
		};
	}, [value]);

	const halfHeight = useMemo(() => fontSize / 2, [fontSize]);
	const halfHeightGap = useMemo(() => halfHeight + gap, [halfHeight, gap]);
	const size = useMemo(() => fontSize + gap, [fontSize, gap]);

	return (
		<div
			style={{
				height: size,
				width,
			}}
			className="relative overflow-hidden"
		>
			<div style={{ height: halfHeight }} className="absolute bottom-0">
				<span
					style={{ height: halfHeightGap }}
					className="overflow-hidden inline-block"
				>
					<span
						style={{ lineHeight: 1, fontSize, color: "#d2d2d2" }}
						className="-translate-y-1/2 inline-block"
					>
						{prevValue}
					</span>
				</span>
			</div>
			<div style={{ height: halfHeight }} className="absolute">
				<span
					style={{
						lineHeight: 1,
						fontSize,
						background: backgroundColor,
					}}
					className="h-[0.5em] overflow-hidden inline-block"
				>
					{currentValue}
				</span>
			</div>
			<div
				style={{
					transformStyle: "preserve-3d",
					willChange: "transform",
					height: halfHeight,
					background: backgroundColor,
				}}
				className="absolute w-full"
				ref={flipRef}
			>
				<span
					style={{
						height: halfHeightGap,
						transform: `translateY(-${gap * 2}px) rotateX(180deg)`,
						backfaceVisibility: "hidden",
						background: backgroundColor,
					}}
					className="overflow-hidden absolute inline-block"
				>
					<span
						style={{ lineHeight: 1, fontSize, color: "#d2d2d2" }}
						className="-translate-y-1/2 inline-block"
					>
						{currentValue}
					</span>
				</span>
				<span
					style={{
						lineHeight: 1,
						backfaceVisibility: "hidden",
						fontSize,
						background: backgroundColor,
					}}
					className="absolute h-[0.5em] overflow-hidden inline-block"
				>
					{prevValue}
				</span>
			</div>
		</div>
	);
};

export default SplitFlap;
