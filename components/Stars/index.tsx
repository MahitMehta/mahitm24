"use client";

import { use, useCallback, useEffect, useRef } from "react";

class Star {
	private x: number;
	private y: number;
	private hexOpacity: number;
	private speed: number;
	private dimming: boolean;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.speed = Math.random() * 0.01;
		this.hexOpacity = 0x00;
		this.dimming = false;
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
		const r = Math.floor(-255 * (1 - this.hexOpacity) + 255);
		const g = Math.floor(-233 * (1 - this.hexOpacity) + 233);
		const b = Math.floor(-159 * (1 - this.hexOpacity) + 159);
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
		const adjustedHeight = height; // height > 300 ? height - 300 : height;

		canvas.width = width;
		canvas.height = adjustedHeight;

		for (let i = 0; i < 50; i++) {
			const x = Math.random() * width;
			const y = Math.random() * adjustedHeight;
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
