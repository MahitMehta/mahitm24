import Billboard from "@/components/Billboard";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Sky from "@/components/Sky";
import { getServiceConfig } from "@/helpers/serviceConfig";

export const metadata = {
	title: "Privacy Policy | MahitM SVC",
	description: "Read the privacy policy for Mahit Mehta's services",
};

const PrivacyPolicyPage = () => {
	const serviceConfig = getServiceConfig();

	return (
		<div className="flex flex-col items-center p-3 max-w-[100vw] overflow-hidden min-h-screen">
			<Sky />
			<div className="w-full h-[300px] fixed bottom-0 brightness-50 building-container" />
			<Billboard svc serviceConfig={serviceConfig} />
			<section className="building-flicker z-50 flex flex-col w-full max-w-screen-md p-6 building relative bg-brand-blue">
				<h1 className="text-3xl">Privacy Policy</h1>
				<h2 style={{ lineHeight: 1.0 }} className="text-sm text-gray-500">
					Last Updated: June 4, 2025
				</h2>

				<div className="flex flex-col gap-4 py-4">
					{/* 1. Introduction */}
					<Card>
						<h2 className="text-2xl">1. Introduction</h2>
						<p>
							This Privacy Policy describes how Mahit Mehta ("we," "us," "our")
							collects, uses, and protects your personal information when you
							use mahitm.com and related services ("Services"). By using the
							Services, you consent to the data practices described here.
						</p>
					</Card>

					{/* 2. Information We Collect */}
					<Card>
						<h2 className="text-2xl">2. Information We Collect</h2>
						<ul className="list-disc list-inside space-y-2">
							<li>
								<span className="text-brand-yellow">Personal Information:</span>{" "}
								Such as your name, email address, and account details when you
								register.
							</li>
							<li>
								<span className="text-brand-yellow">Usage Data:</span>{" "}
								Information about how you use the Services, including IP
								address, device type, and cookies.
							</li>
							<li>
								<span className="text-brand-yellow">Generated Content:</span>{" "}
								Images or materials you create using our Services.
							</li>
						</ul>
					</Card>

					{/* 3. How We Use Your Information */}
					<Card>
						<h2 className="text-2xl">3. How We Use Your Information</h2>
						<ul className="list-disc list-inside space-y-2">
							<li>To provide, maintain, and improve the Services.</li>
							<li>
								To communicate with you, including sending service updates and
								support messages.
							</li>
							<li>To enforce our Terms and prevent misuse.</li>
							<li>To comply with legal obligations.</li>
						</ul>
					</Card>

					{/* 4. Cookies and Tracking Technologies */}
					<Card>
						<h2 className="text-2xl">4. Cookies and Tracking Technologies</h2>
						<p>
							We use cookies and similar technologies to enhance your
							experience, analyze usage, and provide essential functionality.
							You can manage cookie preferences through your browser settings.
						</p>
					</Card>

					{/* 5. Data Sharing and Disclosure */}
					<Card>
						<h2 className="text-2xl">5. Data Sharing and Disclosure</h2>
						<p>
							We do not sell your personal data. We may share information with
							trusted service providers who help us operate the Services, under
							confidentiality agreements. We may also disclose information to
							comply with legal requests or protect rights.
						</p>
					</Card>

					{/* 6. Data Retention */}
					<Card>
						<h2 className="text-2xl">6. Data Retention</h2>
						<p>
							We retain your personal data only as long as necessary to provide
							the Services and comply with legal requirements. For example,
							generated headshots are stored securely for up to{" "}
							<span className="text-brand-yellow">24 hours</span>.
						</p>
					</Card>

					{/* 7. Your Rights */}
					<Card>
						<h2 className="text-2xl">7. Your Rights</h2>
						<ul className="list-disc list-inside space-y-2">
							<li>Access, correct, or delete your personal information.</li>
							<li>Opt out of marketing communications.</li>
							<li>
								Request deletion of stored images at any time; we will delete as
								soon as possible.
							</li>
							<li>Withdraw consent where applicable.</li>
						</ul>
					</Card>

					{/* 8. Security */}
					<Card>
						<h2 className="text-2xl">8. Security</h2>
						<p>
							We implement reasonable technical and organizational measures to
							protect your personal data from unauthorized access, loss, or
							misuse.
						</p>
					</Card>

					{/* 9. Children's Privacy */}
					<Card>
						<h2 className="text-2xl">9. Children's Privacy</h2>
						<p>
							Our Services are intended for users aged{" "}
							<span className="text-brand-yellow">13 and older</span>. We do not
							knowingly collect personal data from children under 13. If you
							believe we have collected such data, please contact us for
							deletion.
						</p>
					</Card>

					{/* 10. International Users */}
					<Card>
						<h2 className="text-2xl">10. International Users</h2>
						<p>
							If you access our Services from outside the United States, please
							be aware that your information may be transferred to, stored, and
							processed in the U.S.
						</p>
					</Card>

					{/* 11. Changes to This Privacy Policy */}
					<Card>
						<h2 className="text-2xl">11. Changes to This Privacy Policy</h2>
						<p>
							We may update this Privacy Policy occasionally. Changes will be
							posted with a new “Last Updated” date. Continued use after changes
							constitutes acceptance.
						</p>
					</Card>

					{/* 12. Contact Information */}
					<Card>
						<h2 className="text-2xl">12. Contact Information</h2>
						<p>
							For questions or concerns about this Privacy Policy, email us at{" "}
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

export default PrivacyPolicyPage;
