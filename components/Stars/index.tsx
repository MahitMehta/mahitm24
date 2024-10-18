"use client";

import { useCallback, useEffect, useRef } from "react";

const STAR_COUNT = 100;

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

const Stars = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const stars = useRef<Star[]>([]);

	const render = useCallback(
		(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			requestAnimationFrame(render.bind(undefined, canvas, ctx));
			for (const star of stars.current) {
				star.update(ctx);
			}
		},
		[],
	);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas || stars.current.length) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const { width, height } = window.screen;

		canvas.width = width;
		canvas.height = height;

		for (let i = 0; i < STAR_COUNT; i++) {
			const x = Math.random() * width;
			const y = Math.random() * height;
			stars.current.push(new Star(x, y));
		}

		render(canvas, ctx);
	}, [render]);

	return (
		<canvas
			ref={canvasRef}
			className="fixed -z-10 top-0 left-0 w-full"
			id="stars"
		/>
	);
};

export default Stars;
