"use client";

import clsx from "clsx";
import Link from "next/link";
import GoArrow from "../GoArrow";
import { useAtomValue } from "jotai";
import { userAtom } from "@/utils/atom";
import { useMemo } from "react";

interface IHighlightItemProps {
	href: string;
	children: React.ReactNode;
	auth?: boolean;
	className?: string;
	target?: string;
	newItem?: boolean;
	comingSoon?: boolean;
}

const HighlightItem: React.FC<IHighlightItemProps> = ({
	href,
	children,
	auth = false,
	className = "",
	target = "_blank",
	newItem = false,
	comingSoon = false,
}) => {
	const user = useAtomValue(userAtom);

	const validatedHref = useMemo(() => {
		if (user) {
			return href;
		}

		return `/login?next=${href}`;
	}, [user, href]);

	return (
		<Link
			target={target}
			href={validatedHref}
			onClick={(e) => {
				if (comingSoon) {
					e.preventDefault();
					e.stopPropagation();
				}
			}}
			className={clsx(
				"border-4 w-full sm:w-min justify-center go-arrow-container border-brand-blue-accent h-min relative flex overflow-visible items-center gap-2 bg-brand-blue-darker pl-2",
				className,
				comingSoon ? "cursor-not-allowed" : "cursor-pointer",
			)}
		>
			{(newItem || comingSoon) && (
				<div
					style={{ lineHeight: 0.8 }}
					className="z-10 absolute border-orange-700 border-[2px] bg-orange-500 px-1 bottom-0 left-0 translate-x-2 translate-y-[calc(75%+2px)]"
				>
					{newItem && "new"}
					{comingSoon && "coming"}
				</div>
			)}
			<p className="whitespace-nowrap text-white">{children}</p>
			<GoArrow />
		</Link>
	);
};

const HighlightsBar = () => {
	return (
		<div className="flex h-12 mt-2 gap-2 w-full overflow-x-auto no-scrollbar sm:justify-center">
			<HighlightItem href="https://www.polistock.app">
				<span className="text-green-500">Poli</span>Stock
			</HighlightItem>
			<HighlightItem auth newItem href="/svc/headshot" target="_self">
				<span className="text-blue-500">Professional</span> Headshot
			</HighlightItem>
			<HighlightItem comingSoon href="/svc">
				<span className="text-red-600">Mrial</span> RDP
			</HighlightItem>
		</div>
	);
};

export default HighlightsBar;
