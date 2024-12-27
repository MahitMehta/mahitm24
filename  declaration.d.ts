declare namespace JSX {
	interface IntrinsicElements {
		"lottie-player": {
			autoplay?: boolean;
			loop?: boolean;
			style?: { height?: string; width?: string; transform?: string };
			speed?: number;
			mode?: string;
			src?: string;
		};
	}
}
