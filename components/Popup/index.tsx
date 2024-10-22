"use client";

import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type ReactNode,
} from "react";

interface HighlightPopUpProps {
	highlight: ReactNode;
	children: React.ReactNode;
}

const HighlightPopUp: React.FC<HighlightPopUpProps> = ({
	highlight,
	children,
}) => {
	const popupRef = useRef<HTMLDivElement | null>(null);
	const [isLeft, setIsLeft] = useState(true);

	const determineDirection = useCallback((ref: HTMLDivElement) => {
		const { left, width } = ref.getBoundingClientRect();
		setIsLeft(left + width < window.innerWidth);
	}, []);

	useEffect(() => {
		if (!popupRef.current) return;
		determineDirection(popupRef.current);
	}, [determineDirection]);

	return (
		<span className="relative popup-container">
			{typeof highlight === "string" ? (
				<span className="text-brand-yellow highlighted">{highlight}</span>
			) : (
				highlight
			)}
			<div
				ref={popupRef}
				style={isLeft ? { left: 0 } : { right: 0 }}
				className="popup text-[18px] bg-brand-blue-darker bg-opacity-75 backdrop-blur-lg border-solid border-brand-yellow border-2"
			>
				{children}
			</div>
		</span>
	);
};

export default HighlightPopUp;
