import Billboard from "@/components/Billboard";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Sky from "@/components/Sky";
import { getServiceConfig } from "@/helpers/serviceConfig";

export const metadata = {
	title: "Terms & Conditions | MahitM SVC",
	description: "Read the terms and conditions for using Mahit Mehta's services",
};

const TermsAndConditionsPage = () => {
	const serviceConfig = getServiceConfig();

	return (
		<div className="flex flex-col items-center p-3 max-w-[100vw] overflow-hidden min-h-screen">
			<Sky />
			<div className="w-full h-[300px] fixed bottom-0 brightness-50 building-container" />
			<Billboard svc serviceConfig={serviceConfig} />
			<section className="building-flicker z-50 flex flex-col w-full max-w-screen-md p-6 building relative bg-brand-blue">
				<h1 className="text-3xl">Terms &amp; Conditions</h1>
				<h2 style={{ lineHeight: 1.0 }} className="text-sm text-gray-500">
					Last Updated: June 4, 2025
				</h2>

				<div className="flex flex-col gap-4 py-4">
					{/* 1. Introduction */}
					<Card>
						<h2 className="text-2xl">1. Introduction</h2>
						<p>
							Welcome to mahitm.com, operated by Mahit Mehta (“we,” “us,”
							“our”). By accessing or using our website and services
							(“Services”), you agree to these Terms. If you disagree, please
							cease using the Services.
						</p>
					</Card>

					{/* 2. Definitions */}
					<Card>
						<h2 className="text-2xl ">2. Definitions</h2>
						<p>
							<span className="text-brand-yellow">User</span> - anyone accessing
							or using our Services.
							<br />
							<span className="text-brand-yellow">Account</span> - your
							registered access.
							<br />
							<span className="text-brand-yellow">Content</span> - text, images,
							or generated materials from the Services.
							<br />
							<span className="text-brand-yellow">Headshots SVC</span> - our
							free AI headshot generator.
						</p>
					</Card>

					{/* 3. Acceptance of Terms */}
					<Card>
						<h2 className="text-2xl ">3. Acceptance of Terms</h2>
						<p>
							By registering, clicking “Agree,” or using any Service, you
							confirm you've read, understood, and accepted these Terms.
						</p>
					</Card>

					{/* 4. User Accounts */}
					<Card>
						<h2 className="text-2xl ">4. User Accounts</h2>
						<p>
							You must provide accurate information and keep credentials secure.
							You’re responsible for all activity under your account. Notify us
							immediately of any unauthorized access.
						</p>
					</Card>

					{/* 5. Acceptable Use & Prohibited Content */}
					<Card>
						<h2 className="text-2xl ">
							5. Acceptable Use &amp; Prohibited Activities
						</h2>
						<p>You agree not to:</p>
						<ul className="list-disc list-inside space-y-1">
							<li>Violate laws or third-party rights.</li>
							<li>
								Generate or upload illegal, harmful, threatening,
								discriminatory, or sexual content.
							</li>
							<li>
								Distribute malware or engage in hacking, scraping, or disruptive
								behaviors.
							</li>
							<li>Bypass usage limits or security measures.</li>
						</ul>
					</Card>

					{/* 6. Headshots SVC */}
					<Card>
						<h2 className="text-2xl ">
							6. Headshots SVC: Free Service, Coin-Based Usage Limits
						</h2>
						<ul className="list-disc list-inside space-y-2">
							<li>Headshots SVC is a free, AI-powered headshot generator.</li>
							<li>
								On signup, users receive{" "}
								<span className="text-brand-yellow">5 coins</span> by default;
								each headshot costs 1 coin.
							</li>
							<li>Additional coins may be allocated at our discretion.</li>
							<li>
								Do not exceed your coin balance using automation, scripts, or
								multi-accounting.
							</li>
							<li>
								Abuse may result in throttling, suspension, or termination of
								access.
							</li>
						</ul>
					</Card>

					{/* 7. Storage, Privacy & Retention */}
					<Card>
						<h2 className="text-2xl ">7. Storage, Privacy &amp; Retention</h2>
						<ul className="list-disc list-inside space-y-2">
							<li>
								Generated headshots are stored on secure servers for up to{" "}
								<span className="text-brand-yellow">24 hours</span> after
								creation.
							</li>
							<li>
								Images are <span className="text-brand-yellow">not public</span>
								; only the authenticated user can view them.
							</li>
							<li>
								You may request deletion at any time; we will delete the image
								as soon as possible.
							</li>
							<li>
								Stored images are used solely to provide the service (e.g.,
								preview/download) and will never be shared or sold.
							</li>
							<li>
								We implement reasonable security safeguards during the retention
								period.
							</li>
						</ul>
					</Card>

					{/* 8. Intellectual Property */}
					<Card>
						<h2 className="text-2xl ">8. Intellectual Property</h2>
						<p>
							We retain all IP rights in the Services and original content. You
							retain ownership of your uploaded/generated content but grant us a
							non-exclusive, worldwide, royalty-free license to use it for
							service delivery and improvement.
						</p>
					</Card>

					{/* 9. Content Moderation */}
					<Card>
						<h2 className="text-2xl ">9. Content Moderation</h2>
						<p>
							We (and/or our automated systems) review content to ensure
							compliance with our rules and legal obligations. Non-compliant
							content may be removed, and users may be warned, suspended, or
							terminated.
						</p>
					</Card>

					{/* 10. Termination & Suspension */}
					<Card>
						<h2 className="text-2xl ">10. Termination &amp; Suspension</h2>
						<p>
							We may suspend or terminate your account or access if you violate
							these Terms. Upon termination, your rights to use the Services end
							immediately. Licenses granted to us survive termination.
						</p>
					</Card>

					{/* 11. Disclaimers & Limitation of Liability */}
					<Card>
						<h2 className="text-2xl ">
							11. Disclaimers &amp; Limitation of Liability
						</h2>
						<p>
							Services are provided “AS IS” and “AS AVAILABLE”; we make no
							promise of uptime, accuracy, or fitness for any specific purpose.
							We are not liable for any damages arising from your use of (or
							inability to use) the Services. Our total liability is limited as
							far as the law allows.
						</p>
					</Card>

					{/* 12. Governing Law & Dispute Resolution */}
					<Card>
						<h2 className="text-2xl ">
							12. Governing Law &amp; Dispute Resolution
						</h2>
						<p>
							These Terms are governed by the laws of{" "}
							<span className="text-brand-yellow">New Jersey, USA</span>. Any
							disputes will be resolved in the courts located there.
						</p>
					</Card>

					{/* 13. Changes to Terms */}
					<Card>
						<h2 className="text-2xl ">13. Changes to Terms</h2>
						<p>
							We may update these Terms. Updates are posted with a new “Last
							Updated” date. Continued use after publication constitutes
							acceptance.
						</p>
					</Card>

					{/* 14. Contact Information */}
					<Card>
						<h2 className="text-2xl ">14. Contact Information</h2>
						<p>
							For questions or concerns, email us at{" "}
							<a
								href="mailto:contact@mahitm.com"
								className="text-brand-yellow hover:underline"
							>
								contact@mahitm.com
							</a>
							.
						</p>
					</Card>
				</div>
				<Footer />
			</section>
		</div>
	);
};

export default TermsAndConditionsPage;
