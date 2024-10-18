"use client";

import Link from "next/link";
import Card from "../Card";
// import NotByAiLogo from "@/public/svg/notbyai.svg";
import MahitMLogo from "@/public/svg/logo.svg";
import {
	faGithub,
	faInstagram,
	faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";

interface LinkIconProps {
	href: string;
	icon: IconDefinition;
}

const LinkIcon: React.FC<LinkIconProps> = ({ href, icon }) => {
	return (
		<a rel="noopener noreferrer" target="_blank" href={href}>
			<FontAwesomeIcon
				icon={icon}
				className="hover:text-brand-yellow transition-colors"
			/>
		</a>
	);
};

const Footer = () => {
	return (
		<Card className="py-3 md:py-1 mt-auto">
			<footer className="min-h-8 flex sm:flex-row flex-col-reverse items-center gap-2 sm:justify-between">
				<div className="flex h-full items-center">
					<Link href="#home" className="w-full h-full">
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
						<Link href="#home">
							<ArrowUpCircleIcon
								className="hover:text-brand-yellow transition-colors"
								width={18}
							/>
						</Link>
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
					<span className="highlighted">
						<Link href="/">colophon</Link>
					</span>
				</div>
			</footer>
		</Card>
	);
};

export default Footer;
