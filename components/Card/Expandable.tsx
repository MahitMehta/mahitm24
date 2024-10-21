"use client";

import Card from ".";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import clsx from "clsx";
import type { MouseEvent, ReactNode } from "react";

interface ExpandableCardProps {
	label: string;
	children: ReactNode;
	rightIcon?: ReactNode;
	onRightIconClick?: () => void;
}

const ExpandableCard: React.FC<ExpandableCardProps> = ({
	label,
	rightIcon,
	children,
}) => {
	const [expanded, setExpanded] = useState(false);

	return (
		<>
			<button
				className="w-full"
				aria-expanded={expanded}
				type="button"
				onClick={() => setExpanded((prev) => !prev)}
				onKeyDown={() => {}}
				tabIndex={0}
			>
				<Card className="flex justify-between items-center">
					<ChevronRightIcon
						className={clsx(expanded && "rotate-90", "transition-transform")}
						width={18}
					/>
					<span className="cursor-pointer highlighted">{label}</span>
					{rightIcon ? (
						<span
							className="flex items-center"
							onKeyDown={() => {}}
							onClick={(e) => e.stopPropagation()}
						>
							{rightIcon}
						</span>
					) : (
						<span />
					)}
				</Card>
			</button>
			{expanded && <Card className="!px-1 mt-3">{children}</Card>}
		</>
	);
};

export default ExpandableCard;
