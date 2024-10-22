import Card from ".";
import GoArrow from "../GoArrow";
import SkillTag, { type ESkillTag } from "../SkillTag";

interface ProjectCardProps {
	title: string;
	description: string;
	linkLabel?: string;
	tags?: ESkillTag[];
	projectURL?: string;
	isMahitMSVC?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
	title,
	description,
	linkLabel = "Learn More",
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
			<p className="font-normal">
				{description}
				{projectURL && (
					<>
						{" "}
						<a target="_blank" rel="noopener noreferrer" href={projectURL}>
							<span className="go-arrow-container inline-flex items-center highlighted text-brand-yellow">
								<span>{linkLabel}</span>
								<GoArrow className="ml-1 text-brand-yellow" />
							</span>
						</a>
					</>
				)}
			</p>
			{tags.length > 0 && (
				<div className="flex my-2 gap-3">
					{tags.map((tag) => (
						<SkillTag key={tag} value={tag} />
					))}
				</div>
			)}
		</Card>
	);
};

export default ProjectCard;
