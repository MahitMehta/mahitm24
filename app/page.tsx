import Card from "@/components/Card";
import ProjectCard from "@/components/Card/Project";
import Footer from "@/components/Footer";
import HighlightPopUp from "@/components/Popup";
import Stars from "@/components/Stars";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col items-center p-3">
			<Stars />
			<div className="w-full h-[300px] fixed bottom-0 brightness-50 building-container" />
			<div className="mt-[15vh] sm:mt-[25vh] w-full overflow-visible max-w-screen-md h-[300px] relative">
				<div className="left-0 absolute bottom-0 w-[calc(109%)] billboard flex items-end">
					<img
						className="w-full"
						src="/svg/billboard.svg"
						alt="Building"
						loading="eager"
					/>
				</div>
			</div>
			<section className="z-10 flex flex-col w-full max-w-screen-md p-6 building bg-brand-blue">
				<h1 className="text-2xl">Welcome,</h1>
				<Card>
					<span className="text-base">
						Hi, I’m{" "}
						<Link href="/" className="text-brand-yellow highlighted">
							Mahit Mehta
						</Link>
						! Big fan of the city vibe. I’m originally from New Jersey, USA, but
						currently I’m an undergraduate at Purdue University studying
						Computer Science. In my free time I love to program, play table
						tennis, and watch{" "}
						<HighlightPopUp highlight="K-dramas">
							<ul className="w-[175px] list-disc pl-4">
								<li>Crash Landing on You</li>
								<li>It's Okay to not be Okay</li>
								<li>Twinkling Watermelon</li>
							</ul>
						</HighlightPopUp>
						.
					</span>
				</Card>
				<Card className="mt-6">
					<p className="text-base">
						Over the years, I’ve accumulated experience in the various aspects
						of software development. I began my journey working with web
						technologies such as React, node.js HTTP servers, and No-SQL
						databases. Later, I transitioned to building mobile applications in
						Flutter and React Native. Recently, I’ve been working with ⚙{" "}
						<span className="text-red-400">Rust</span> to develop a remote
						desktop application, a VPN, and other cool stuff!
					</p>
				</Card>
				<div className="flex justify-around mt-8 gap-6">
					<Image
						src="/svg/rubik_window.svg"
						alt="Rubik's Cube Window"
						width={175}
						height={300}
					/>
					<Image
						src="/svg/window.svg"
						alt="Window"
						className="window-disappear-one"
						width={175}
						height={300}
					/>
					<Image
						src="/svg/trumpet_window.svg"
						alt="Trumpet Cube Window"
						width={175}
						height={300}
					/>
				</div>
				<h1 className="text-2xl mt-6">Projects</h1>
				<div className="flex gap-3 md:flex-row flex-col">
					<ProjectCard
						title="Mrial"
						isMahitMSVC
						description="A remote desktop application with a server optimized for ARM-based linux and player optimized for ARM64 MacOS."
					/>
					<ProjectCard
						title="MahitM VPN"
						isMahitMSVC
						description="A complete VPN service with deployable dockerized WireGuard nodes, control plane (for managing nodes), and a Flutter mobile app as a client."
					/>
				</div>
				<Footer />
			</section>
		</div>
	);
}
