import type { Metadata } from "next";
import { Jersey_15 } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
	title: "Home | Mahit Mehta",
	keywords: ["Mahit Mehta", "MahitM", "Mahit", "Portfolio", "Personal"],
	description: "Mahit Mahit's Personal Website.",
	openGraph: {
		title: "Home | Mahit Mehta",
		description: "Mahit Mahit's Personal Website.",
		url: "https://mahitm.com",
		type: "website",
		locale: "en_US",
		images: [
			{
				url: "./images/logo.png",
				width: 512,
				height: 512,
				alt: "MahitM's Logo",
				type: "image/png",
			},
		],
	},
	twitter: {
		site: "https://www.mahitm.com/",
		card: "summary_large_image",
		images: [
			{
				url: "./images/logo.png",
				width: 512,
				height: 512,
				alt: "MahitM's Logo",
			},
		],
	},
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
