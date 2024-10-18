import Card from ".";
import GoArrow from "../GoArrow";

interface ProjectCardProps {
	title: string;
	description: string;
	projectURL?: string;
	isMahitMSVC?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
	title,
	description,
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
		</Card>
	);
};

export default ProjectCard;
