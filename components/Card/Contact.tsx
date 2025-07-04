import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from ".";
import GoArrow from "../GoArrow";

interface ContactCardProps {
	name: string;
	value: string;
	link: string;
	icon: IconDefinition;
}

const ContactCard: React.FC<ContactCardProps> = ({
	name,
	value,
	link,
	icon,
}) => {
	return (
		<a target="_blank" rel="noreferrer noopener" href={link}>
			<Card className="go-arrow-container pr-1 flex justify-between items-center">
				<span>{name}</span>
				<span className="flex items-center gap-2">
					<FontAwesomeIcon width={16} height={16} icon={icon} />
					<span>{value}</span>
					<GoArrow className="ml-1 text-brand-yellow" />
				</span>
			</Card>
		</a>
	);
};

export default ContactCard;
