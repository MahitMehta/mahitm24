/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: "/resume",
				destination: "/api/resume",
			},
			{
				source: "/cdn/v1/t/:transformations/:slug*",
				destination:
					"https://res.cloudinary.com/mahitm-cdn/image/upload/:transformations/mahitm/:slug*",
			},
			{
				source: "/cdn/v1/:slug*",
				destination:
					"https://res.cloudinary.com/mahitm-cdn/image/upload/mahitm/:slug*",
			},
		];
	},
	webpack(conf) {
		conf.module.rules.push({
			test: /\.svg$/i,
			issuer: { and: [/\.(js|ts|md)x?$/] },
			use: [
				{
					loader: "@svgr/webpack",
					options: {
						prettier: false,
						svgo: true,
						svgoConfig: {
							plugins: [
								{
									name: "removeViewBox",
									active: false,
								},
								{
									name: "prefixIds",
									active: false,
								},
							],
						},
						titleProp: true,
					},
				},
			],
		});
		return conf;
	},
};

export default nextConfig;
