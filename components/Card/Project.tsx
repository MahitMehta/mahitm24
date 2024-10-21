import Card from ".";
import GoArrow from "../GoArrow";

export enum EProjectTag {
	React = "React",
	NodeJS = "Node.js",
	NextJS = "Next.js",
	Redis = "Redis",
	Rust = "Rust",
	Docker = "Docker",
	ReactNative = "React Native",
	WireGuard = "WireGuard",
	Linux = "Linux",
	TLS = "TLS",
	UDP = "UDP",
	FEC = "FEC",
	Flutter = "Flutter",
	CMS = "CMS",
	Python = "Python",
}

const getTagColor = (tag: EProjectTag) => {
	switch (tag) {
		case EProjectTag.React:
			return "#61dbfb";
		case EProjectTag.NodeJS:
			return "#43853d";
		case EProjectTag.NextJS:
			return "#ffffff";
		case EProjectTag.Redis:
			return "#A41E11";
		case EProjectTag.Rust:
			return "#AA2704";
		case EProjectTag.Docker:
			return "#0db7ed";
		case EProjectTag.ReactNative:
			return "#61dbfb";
		case EProjectTag.WireGuard:
			return "#88171a";
		case EProjectTag.Linux:
			return "#9d853c";
		case EProjectTag.TLS:
			return "#cc58d6";
		case EProjectTag.Flutter:
			return "#027DFD";
		case EProjectTag.Python:
			return "#306998";
		default:
			return "#ffffff";
	}
};

interface ProjectTagProps {
	value: EProjectTag;
}

const ProjectTag: React.FC<ProjectTagProps> = ({ value }) => {
	return (
		<span
			style={{
				color: getTagColor(value),
				letterSpacing: "0.75px",
			}}
			className={
				"px-2 inline-block border-solid border-[1px] text-white rounded-sm text-[14px] font-bold"
			}
		>
			{value}
		</span>
	);
};

interface ProjectCardProps {
	title: string;
	description: string;
	tags?: EProjectTag[];
	projectURL?: string;
	isMahitMSVC?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
	title,
	description,
	tags = [],
	projectURL,
	isMahitMSVC = false,
}) => {
	return (
		<Card className="w-full">
			<h1 className="text-xl text-brand-yellow">
				{title}
				{isMahitMSVC && (
					<sup className="ml-1 text-white text-[14px]">MahitM-SVC</sup>
				)}
			</h1>
			<p>
				{description}
				{projectURL && (
					<>
						{" "}
						<a target="_blank" rel="noopener noreferrer" href={projectURL}>
							<span className="go-arrow-container inline-flex items-center highlighted text-brand-yellow">
								<span>Learn More</span>
								<GoArrow className="ml-1 text-brand-yellow" />
							</span>
						</a>
					</>
				)}
			</p>
			{tags.length > 0 && (
				<div className="flex my-2 gap-3">
					{tags.map((tag) => (
						<ProjectTag key={tag} value={tag} />
					))}
				</div>
			)}
		</Card>
	);
};

export default ProjectCard;
