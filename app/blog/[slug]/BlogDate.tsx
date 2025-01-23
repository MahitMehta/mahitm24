"use client";

import { getFormattedDate } from "@/utils/common";
import { useMemo, useState } from "react";

interface BlogDateProps {
	published: string;
}

const BlogDate: React.FC<BlogDateProps> = ({ published }) => {
	const formattedDate = useMemo(() => {
		return getFormattedDate(new Date(published));
	}, [published]);

	return <span>{formattedDate}</span>;
};

export default BlogDate;
