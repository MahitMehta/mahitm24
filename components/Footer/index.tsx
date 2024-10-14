import Image from "next/image";
import Link from "next/link";
import Card from "../Card";

const Footer = () => {
	return (
		<Card className="mt-auto">
			<footer className="flex sm:flex-row flex-col items-center gap-2 sm:justify-between">
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://notbyai.fyi/"
				>
					<Image
						width={131}
						height={42}
						alt="Not by AI"
						src="/images/notbyai.png"
					/>
				</a>
				<div className="flex gap-1">
					<span>©2024 Mahit Mehta</span>
					<span className="text-brand-yellow">✦</span>
					<span className="highlighted">
						<Link href="/">colophon</Link>
					</span>
				</div>
			</footer>
		</Card>
	);
};

export default Footer;
