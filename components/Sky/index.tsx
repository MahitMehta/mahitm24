"use client";

import { useCallback, useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";

const STAR_COUNT = 75;
const MAX_DROPLETS = 100;
const MAX_SNOWFLAKES = 100;

class Star {
	private x: number;
	private y: number;
	private hexOpacity: number;
	private speed: number;
	private dimming: boolean;
	private color: number[];

	private static COLORS = [
		[255, 233, 159],
		[255, 255, 255],
	];

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.speed = Math.random() * 0.01;
		this.hexOpacity = 0x00;
		this.dimming = false;
		this.color = Star.COLORS[Math.floor(Math.random() * Star.COLORS.length)];
	}

	update(ctx: CanvasRenderingContext2D) {
		if (this.dimming) {
			this.hexOpacity -= this.speed;
		} else {
			this.hexOpacity += this.speed;
		}

		if (!this.dimming && this.hexOpacity >= 1) {
			this.dimming = true;
		} else if (this.dimming && this.hexOpacity <= 0) {
			this.dimming = false;
		}

		this.draw(ctx);
	}

	draw(ctx: CanvasRenderingContext2D) {
		const r = Math.floor(
			-this.color[0] * (1 - this.hexOpacity) + this.color[0],
		);
		const g = Math.floor(
			-this.color[1] * (1 - this.hexOpacity) + this.color[1],
		);
		const b = Math.floor(
			-this.color[2] * (1 - this.hexOpacity) + this.color[2],
		);
		ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
		ctx.font = "10px Arial";
		ctx.fillText("✦", this.x, this.y);
	}
}

class Snowflake {
	private x: number;
	private y: number;
	private size: number;
	private speed: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.size = Math.floor(1 + Math.random() * 3);
		this.speed = Math.floor(1 + Math.random() * 2);
	}

	update(ctx: CanvasRenderingContext2D) {
		this.y += this.speed;
		this.draw(ctx);

		if (this.y >= window.innerHeight) {
			this.y = -this.size;
		}
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = "white";
		ctx.fillRect(this.x, this.y, this.size, this.size);
	}
}

class Droplet {
	private static MAX_SPEED = 15;
	private static MIN_SPEED = 5;
	private static MAX_HEIGHT = 5 * (Droplet.MAX_SPEED - Droplet.MIN_SPEED);

	private x: number;
	private y: number;
	private width: number;
	private height: number;
	private speed: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.width = Math.floor(1 + Math.random() * 2);
		this.speed =
			Math.floor(Math.random() * (Droplet.MAX_SPEED - Droplet.MIN_SPEED + 1)) +
			Droplet.MIN_SPEED;
		this.height = 5 * (Droplet.MAX_SPEED - this.speed);
	}

	update(ctx: CanvasRenderingContext2D) {
		this.y += this.speed;
		this.draw(ctx);

		if (this.y >= window.innerHeight) {
			this.y = -this.height;
		}
	}

	draw(ctx: CanvasRenderingContext2D) {
		const r = 55;
		const g = 105;
		const b = 111;
		const a = Math.max(this.height / Droplet.MAX_HEIGHT + 0.1, 1);

		ctx.fillStyle = `rgb(${r}, ${g}, ${b}, ${a})`;
		// if (this.y >= window.innerHeight) {
		// 	ctx.fillRect(this.x - 15, window.innerHeight - 2, 30, 2);
		// 	return;
		// }

		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

interface SkyProps {
	seasons?: boolean;
}

const Sky: React.FC<SkyProps> = ({ seasons = false }) => {
	const skyCanvasRef = useRef<HTMLCanvasElement | null>(null);
	const precipCanvasRef = useRef<HTMLCanvasElement | null>(null);
	const frameId = useRef<number | null>(null);

	const stars = useRef<Star[]>([]);
	const droplets = useRef<Droplet[]>([]);
	const snowflakes = useRef<Snowflake[]>([]);

	const render = useCallback(
		(
			skyCanvas: HTMLCanvasElement,
			skyCtx: CanvasRenderingContext2D,
			precipCanvas: HTMLCanvasElement,
			precipCtx: CanvasRenderingContext2D,
		) => {
			skyCtx.clearRect(0, 0, skyCanvas.width, skyCanvas.height);
			precipCtx.clearRect(0, 0, precipCanvas.width, precipCanvas.height);
			frameId.current = requestAnimationFrame(
				render.bind(undefined, skyCanvas, skyCtx, precipCanvas, precipCtx),
			);

			for (const star of stars.current) {
				star.update(skyCtx);
			}

			if (!seasons) return;

			for (const droplet of droplets.current) {
				droplet.update(precipCtx);
			}

			for (const snowflake of snowflakes.current) {
				snowflake.update(precipCtx);
			}
		},
		[seasons],
	);

	const resetElements = useCallback(() => {
		stars.current = [];
		droplets.current = [];
		snowflakes.current = [];
	}, []);

	const populateCanvasElements = useCallback(
		(skyCanvas: HTMLCanvasElement, precipCanvas: HTMLCanvasElement) => {
			if (frameId.current) {
				cancelAnimationFrame(frameId.current);
			}

			resetElements();

			const skyCtx = skyCanvas.getContext("2d");
			const precipCtx = precipCanvas.getContext("2d");

			if (!skyCtx || !precipCtx) return;
			const width = window.innerWidth;
			const height = window.innerHeight;

			skyCanvas.width = width;
			skyCanvas.height = height;

			precipCanvas.width = width;
			precipCanvas.height = height;

			for (let i = 0; i < STAR_COUNT; i++) {
				const x = Math.random() * width;
				const y = Math.random() * height;
				stars.current.push(new Star(x, y));
			}

			if (seasons) {
				// for (let i = 0; i < MAX_DROPLETS; i++) {
				// 	const x = Math.random() * width;
				// 	const y = Math.random() * height;
				// 	droplets.current.push(new Droplet(x, y));
				// }

				for (let i = 0; i < MAX_SNOWFLAKES; i++) {
					const x = Math.random() * width;
					const y = Math.random() * height;
					snowflakes.current.push(new Snowflake(x, y));
				}
			}

			render(skyCanvas, skyCtx, precipCanvas, precipCtx);
		},
		[render, resetElements, seasons],
	);

	useEffect(() => {
		const skyCanvas = skyCanvasRef.current;
		const precipCanvas = precipCanvasRef.current;

		if (!skyCanvas || !precipCanvas) return;
		if (stars.current.length !== 0) return;

		populateCanvasElements(skyCanvas, precipCanvas);
	}, [populateCanvasElements]);

	const handleResize = useDebouncedCallback(() => {
		const skyCanvas = skyCanvasRef.current;
		const precipCanvas = precipCanvasRef.current;

		if (!skyCanvas || !precipCanvas) return;
		populateCanvasElements(skyCanvas, precipCanvas);
	}, 500);

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [handleResize]);

	return (
		<>
			<canvas
				ref={skyCanvasRef}
				className="fixed -z-10 top-0 left-0 w-full"
				id="sky"
			/>
			<canvas
				ref={precipCanvasRef}
				className="fixed z-10 top-0 left-0 w-full"
				id="precipitation"
			/>
		</>
	);
};

export default Sky;
