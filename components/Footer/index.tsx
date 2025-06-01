"use client";

import Link from "next/link";
import Card from "../Card";
import MahitMLogo from "@/public/svg/logo.svg";
import {
	faGithub,
	faInstagram,
	faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useAtom } from "jotai";
import { userAtom } from "@/utils/atom";
import { useCallback, useEffect } from "react";
import { createSupabaseClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

interface LinkIconProps {
	href: string;
	icon: IconDefinition;
}

const LinkIcon: React.FC<LinkIconProps> = ({ href, icon }) => {
	return (
		<a rel="noopener noreferrer" target="_blank" href={href}>
			<FontAwesomeIcon
				width={16}
				height={16}
				icon={icon}
				className="hover:text-brand-yellow transition-colors"
			/>
		</a>
	);
};

const supabase = createSupabaseClient();

const Footer = ({ className }: { className?: string }) => {
	const [user, setUser] = useAtom(userAtom);

	useEffect(() => {
		if (user) return;

		supabase.auth.getUser().then(({ data }) => {
			if (data) {
				setUser(data.user);
			}
		});
	}, [setUser, user]);

	const router = useRouter();

	const handleLogOut = useCallback(() => {
		setUser(null);
		supabase.auth.signOut().then(() => {
			router.refresh();
		});
	}, [setUser, router]);

	return (
		<Card className={clsx("py-3 md:py-1 mt-auto w-full", className)}>
			<footer className="min-h-8 flex sm:flex-row flex-col-reverse items-center gap-2 sm:justify-between">
				<div className="flex h-full items-center">
					<Link href="/#home" className="w-full h-full">
						<div className="flex w-8 h-8">
							<MahitMLogo />
						</div>
					</Link>
					<span className="text-brand-yellow mx-2">✦</span>
					<span className="text-nowrap">© 2024-25 Mahit Mehta</span>
				</div>
				<span className="md:hidden h-[1px] w-12 bg-brand-blue inline-block my-2" />
				<div className="flex gap-1 items-center">
					<span className="highlighted">
						{user ? (
							<span
								onClick={handleLogOut}
								className="highlighted cursor-pointer"
							>
								Log Out
							</span>
						) : (
							<Link href="/login">Login</Link>
						)}
					</span>
					<span className="text-brand-yellow mx-2">✦</span>
					<div className="flex gap-3 items-center px-1">
						<LinkIcon href="https://github.com/MahitMehta" icon={faGithub} />
						<LinkIcon
							href="https://www.linkedin.com/in/mahitm"
							icon={faLinkedin}
						/>
						<LinkIcon
							href="https://www.instagram.com/mahit_mehta/"
							icon={faInstagram}
						/>
					</div>
					<span className="text-brand-yellow mx-2">✦</span>
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://github.com/MahitMehta/mahitm24?tab=readme-ov-file#colophon"
					>
						<span className="highlighted">colophon</span>
					</a>
				</div>
			</footer>
		</Card>
	);
};

export default Footer;
