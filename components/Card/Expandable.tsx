"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from ".";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
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
					<FontAwesomeIcon
						className={clsx(expanded && "rotate-90", "transition-transform")}
						size="xs"
						icon={faChevronRight}
					/>
					<span className="cursor-pointer highlighted">{label}</span>
					{rightIcon ? (
						<span onKeyDown={() => {}} onClick={(e) => e.stopPropagation()}>
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
