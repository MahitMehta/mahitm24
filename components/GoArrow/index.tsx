"use client";

import GoArrowSVG from "@/public/svg/go-arrow.svg";
import clsx from "clsx";
import type React from "react";

interface GoArrowProps extends React.ComponentPropsWithoutRef<"span"> {}

const GoArrow: React.FC<GoArrowProps> = ({ className, ...props }) => {
	return (
		<span className={clsx(className)} {...props}>
			<GoArrowSVG data-go-arrow />
		</span>
	);
};

export default GoArrow;
