import { useMemo } from "react";
import {
	BLOCKS,
	INLINES,
	MARKS,
	type Block,
	type Document as DocumentType,
	type Inline,
} from "@contentful/rich-text-types";
import {
	documentToReactComponents,
	type Options as DocumentOptions,
} from "@contentful/rich-text-react-renderer";
import clsx from "clsx";
import Link from "next/link";
import Card from "../Card";

interface DocumentProps {
	document: DocumentType;
	options?: DocumentOptions;
	color?: string;
}

const withBaseStyles = <P extends object>(
	Component: React.ComponentType<P>,
	color?: string,
) => {
	const WithBaseStyles = ({ ...props }) => {
		return (
			<span
				className={clsx(color ? color : "text-medium-grey", "inline-block")}
			>
				<Component {...(props as P)} />
			</span>
		);
	};
	return WithBaseStyles;
};

const Text: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<Card>
			<p className="text-base">{children}</p>
		</Card>
	);
};

const Heading1: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <h1 className="mt-4 text-white text-2xl">{children}</h1>;
};

const Heading2: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <h2 className="text-white text-2xl">{children}</h2>;
};

const HyperLink: React.FC<{
	node: Block | Inline;
	children: React.ReactNode;
}> = ({ node, children }) => {
	const link: string = useMemo(() => node.data.uri || "", [node]);
	const origin = useMemo(
		() => (typeof window === "undefined" ? null : window.location.origin),
		[],
	);
	const currentPage = useMemo(
		() => link.startsWith("/") || (origin && link.startsWith(origin)),
		[link, origin],
	);

	return (
		<Link
			href={link}
			passHref
			className="text-brand-purple-secondary hover:underline cursor-pointer"
			target={currentPage ? "_self" : "_blank"}
			rel="noopener nofollow noreferrer"
		>
			{children}
		</Link>
	);
};

const OrderedList: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<ol className="text-white list-decimal space-y-1 pl-4 my-3">{children}</ol>
	);
};

const UnorderedList: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return <ul className="text-white space-y-1 list-disc pl-4">{children}</ul>;
};

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	// const { classes } = makeStyles({ name: "cms-document" })(() => ({
	// 	li: {
	// 		"& > p": {
	// 			display: "inline-block",
	// 		},
	// 	},
	// }))();

	return <li className={clsx("text-white")}>{children}</li>;
};

const Document: React.FC<DocumentProps> = ({
	document,
	color,
	options = {},
}) => {
	const documentOptions = useMemo<DocumentOptions>(() => {
		const base: DocumentOptions = {
			renderMark: {
				[MARKS.BOLD]: (text) => (
					<span className="text-brand-yellow">{text}</span>
				),
			},
			renderNode: {
				[INLINES.HYPERLINK]: (node, children) => (
					<HyperLink node={node}>{children}</HyperLink>
				),
				[BLOCKS.PARAGRAPH]: (_node, children) => {
					const TextWithColor = withBaseStyles(Text, color);
					return <TextWithColor>{children}</TextWithColor>;
				},
				[BLOCKS.UL_LIST]: (_node, children) => (
					<UnorderedList>{children}</UnorderedList>
				),
				[BLOCKS.OL_LIST]: (_node, children) => (
					<OrderedList>{children}</OrderedList>
				),
				[BLOCKS.LIST_ITEM]: (_node, children) => (
					<ListItem>{children}</ListItem>
				),
				[BLOCKS.HEADING_1]: (_node, children) => (
					<Heading1>{children}</Heading1>
				),
				[BLOCKS.HEADING_2]: (_node, children) => (
					<Heading2>{children}</Heading2>
				),
			},
		};

		return Object.assign(base, options);
	}, [options, color]);

	return (
		<>{document && documentToReactComponents(document, documentOptions)}</>
	);
};

export default Object.assign(Document, { Text });
