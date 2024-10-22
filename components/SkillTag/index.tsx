export enum ESkillTag {
	React = "React",
	Archived = "Archived",
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

const getSkillTagColor = (tag: ESkillTag) => {
	switch (tag) {
		case ESkillTag.React:
			return "#61dbfb";
		case ESkillTag.Archived:
			return "#9d853c";
		case ESkillTag.NodeJS:
			return "#43853d";
		case ESkillTag.NextJS:
			return "#ffffff";
		case ESkillTag.Redis:
			return "#A41E11";
		case ESkillTag.Rust:
			return "#AA2704";
		case ESkillTag.Docker:
			return "#0db7ed";
		case ESkillTag.ReactNative:
			return "#61dbfb";
		case ESkillTag.WireGuard:
			return "#88171a";
		case ESkillTag.Linux:
			return "#9d853c";
		case ESkillTag.TLS:
			return "#cc58d6";
		case ESkillTag.Flutter:
			return "#027DFD";
		case ESkillTag.Python:
			return "#306998";
		case ESkillTag.FEC:
			return "#007852";
		default:
			return "#ffffff";
	}
};

interface SkillTagProps {
	value: ESkillTag;
}

const SkillTag: React.FC<SkillTagProps> = ({ value }) => {
	return (
		<span
			style={{
				fontWeight: 500,
				color: getSkillTagColor(value),
				border: "1px solid rgba(255, 255, 255, 0.15)",
			}}
			className={
				"px-2 inline-block border-solid border-[2px] text-white rounded-sm text-[14px] font-bold"
			}
		>
			{value}
		</span>
	);
};

export default SkillTag;
