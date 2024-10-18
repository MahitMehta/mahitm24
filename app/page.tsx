import Card from "@/components/Card";
import ExpandableCard from "@/components/Card/Expandable";
import ProjectCard from "@/components/Card/Project";
import Footer from "@/components/Footer";
import GoArrow from "@/components/GoArrow";
import HighlightPopUp from "@/components/Popup";
import Stars from "@/components/Stars";
import { faExpand, faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
			<section className="z-10 flex flex-col w-full max-w-screen-md p-6 building relative bg-brand-blue">
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
						desktop application, a mesh VPN, and other cool stuff!
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
				<section className="mt-6">
					<h1 className="text-2xl">Projects</h1>
					<div className="grid gap-3 md:grid-cols-2">
						<ProjectCard
							title="Mrial"
							isMahitMSVC
							projectURL="https://github.com/MahitMehta/mrial?tab=readme-ov-file#description"
							description="A remote desktop application with a server optimized for ARM-based linux and player optimized for ARM64 MacOS."
						/>
						<ProjectCard
							title="MahitM VPN"
							isMahitMSVC
							projectURL="https://github.com/MahitMehta/mahitm_vpn_node?tab=readme-ov-file#mahitm-vpn-node"
							description="A complete VPN service with deployable dockerized WireGuard nodes, control plane (for managing nodes), and a Flutter mobile app as a client."
						/>
						<ProjectCard
							title="C4T-Web"
							projectURL="https://github.com/code4tomorrow/c4t-web"
							description="A web application for Code4Tomorrow, a non-profit organization that teaches computer science to underprivileged students."
						/>
						<ProjectCard
							title="Genesus"
							projectURL="https://github.com/gradebook-app"
							description="A mobile gradebook application for school's who used Genesis parent portal. Over 3,000 students have used this app over it's lifetime."
						/>
					</div>
					<h2 className="my-1 px-2">
						*MahitM-SVC = A Service part of the MahitM Suite of Productivity
						Enhancing Products
					</h2>
					<div className="mt-3">
						<a
							rel="noopener noreferrer"
							target="_blank"
							href="https://github.com/MahitMehta"
						>
							<Card className="flex justify-center items-center">
								<span className="go-arrow-container cursor-pointer inline-flex items-center highlighted">
									<span>
										View <span className="text-brand-yellow">More</span>{" "}
										Projects
									</span>
									<GoArrow className="ml-1" />
								</span>
							</Card>
						</a>
					</div>
				</section>
				<section className="mt-6">
					<h1 className="text-2xl">Career</h1>
					<ExpandableCard
						rightIcon={
							<div className="flex gap-3">
								<a
									download
									href="/resume"
									className="hover:text-brand-yellow transition-colors"
								>
									<FontAwesomeIcon icon={faFileDownload} />
								</a>
								<Link
									rel="noopener noreferrer"
									target="_blank"
									href="/cdn/resume"
									className="hover:text-brand-yellow transition-colors"
								>
									<FontAwesomeIcon icon={faExpand} />
								</Link>
							</div>
						}
						label={"Resume [2024]"}
					>
						<Image
							draggable={false}
							sizes="100vw"
							quality={100}
							width={0}
							height={0}
							style={{ width: "100%", height: "auto" }}
							src="/cdn/resume.webp"
							alt={"Resume"}
						/>
					</ExpandableCard>
				</section>
				<div className="p-4" />
				<Footer />
			</section>
		</div>
	);
}
