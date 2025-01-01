import Link from "next/link";
import GoArrow from "../GoArrow";

interface BannerProps {
	label: string;
	href: string;
}

const Banner: React.FC<BannerProps> = ({ label, href }) => {
	return (
		<Link href={href} className="z-50 absolute top-4">
			<div className="bg-brand-brown border-4 border-brand-brown-darker pl-2 flex items-center go-arrow-container cursor-pointer justify-center gap-2">
				<span className="text-brand-yellow">{label}</span>
				<GoArrow className="text-brand-yellow" />
			</div>
		</Link>
	);
};

export default Banner;
