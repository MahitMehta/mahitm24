import Card from ".";

interface ProjectCardProps {
	title: string;
	description: string;
	isMahitMSVC?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
	title,
	description,
	isMahitMSVC = false,
}) => {
	return (
		<Card className="md:w-1/2 w-full">
			<h1 className="text-xl text-brand-yellow">
				{title}
				{isMahitMSVC && (
					<sup className="ml-1 text-white text-[14px]">MahitM-SVC</sup>
				)}
			</h1>
			<p>{description}</p>
		</Card>
	);
};

export default ProjectCard;
