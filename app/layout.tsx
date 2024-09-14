import type { Metadata } from "next";
import { Jersey_15 } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
	title: "MahitM 24",
	description: "Mahit Mahit's 2024 Personal Website.",
};

const Jersey15 = Jersey_15({
	weight: ["400"],
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${Jersey15.className} antialiased`}>{children}</body>
		</html>
	);
}
