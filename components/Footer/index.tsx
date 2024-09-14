import Image from "next/image";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="mt-auto pt-10 flex sm:flex-row flex-col items-center gap-2 sm:justify-between sm:items-end">
			<a target="_blank" rel="noopener noreferrer" href="https://notbyai.fyi/">
				<Image
					width={131}
					height={42}
					alt="Not by AI"
					src="/images/notbyai.png"
				/>
			</a>
			<div className="flex gap-1">
				<span>©2024 Mahit Mehta</span>
				<span>✦</span>
				<span className="highlighted">
					<Link href="/">colophon</Link>
				</span>
			</div>
		</footer>
	);
};

export default Footer;
