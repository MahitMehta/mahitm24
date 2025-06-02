import Footer from "@/components/Footer";
import Sky from "@/components/Sky";
import { getServiceConfig } from "@/helpers/serviceConfig";
import LoginForm from "./LoginForm";
import { Suspense } from "react";

export const revalidate = 3600;

const Login = () => {
	const serviceConfig = getServiceConfig();

	return (
		<div
			id="blog"
			className="flex flex-col items-center justify-center p-3 max-w-[100vw] overflow-hidden min-h-screen"
		>
			<Sky serviceConfig={{ ...serviceConfig }} />
			<div className="w-full h-[300px] fixed bottom-0 brightness-50 building-container" />
			<section className="building-flicker z-50 border-4 border-brand-blue-accent flex flex-col w-full max-w-screen-sm p-6 relative bg-brand-blue">
				<h1 className="text-2xl">
					Login to MahitM <span className="text-brand-yellow">SVC</span>.
				</h1>
				<h2>
					Create a <span className="text-orange-500">FREE</span> account to
					experiment with certain utilities.
				</h2>
				<Suspense>
					<LoginForm />
				</Suspense>
				<Footer className="z-50 max-w-screen-md" />
			</section>
		</div>
	);
};

export default Login;
