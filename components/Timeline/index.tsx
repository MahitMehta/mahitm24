"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { IEventCollection } from "@/interfaces/contentful";
import useEmblaCarousel from "embla-carousel-react";
import Event from "./Event";
import {
	ArrowPathIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { getEventsPreview } from "@/utils/contentful/events";

interface TimelineProps {
	events: IEventCollection;
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [total, setTotal] = useState(events.eventCollection.total);
	const [slides, setSlides] = useState(events.eventCollection.items);
	const [canMoveRight, setCanMoveRight] = useState(false);
	const [canMoveLeft, setCanMoveLeft] = useState(false);

	const [emblaRef, emblaApi] = useEmblaCarousel({
		slidesToScroll: 1,
		direction: "rtl",
	});

	const loadMoreEvents = useCallback(() => {
		setIsLoading(true);
		getEventsPreview({ limit: 2, skip: slides.length }).then((res) => {
			setSlides([...slides, ...res.eventCollection.items]);
			if (res.eventCollection.total) {
				setTotal(res.eventCollection.total);
			}
			setIsLoading(false);
		});
	}, [slides]);

	useEffect(() => {
		if (!emblaApi) return;

		const onResize = () => emblaApi.reInit();
		window.addEventListener("resize", onResize);
		emblaApi.on("destroy", () =>
			window.removeEventListener("resize", onResize),
		);
	}, [emblaApi]);

	const outOfEvents = useMemo(() => slides.length >= total, [slides, total]);

	const onLeftButtonClick = useCallback(() => {
		if (!emblaApi) return;

		if (emblaApi.canScrollNext()) {
			emblaApi.scrollNext();

			setCanMoveLeft(emblaApi.canScrollNext());
			setCanMoveRight(emblaApi.canScrollPrev());
			return;
		}

		if (outOfEvents) return;

		loadMoreEvents();
	}, [emblaApi, loadMoreEvents, outOfEvents]);

	const onRightButtonClick = useCallback(() => {
		if (!emblaApi) return;

		if (emblaApi.canScrollPrev()) {
			emblaApi.scrollPrev();

			setCanMoveLeft(emblaApi.canScrollNext());
			setCanMoveRight(emblaApi.canScrollPrev());
		}
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;

		setCanMoveLeft(emblaApi.canScrollNext());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;

		emblaApi.on("slidesChanged", () => {
			if (emblaApi.canScrollNext()) {
				emblaApi.scrollNext();
			}

			setCanMoveLeft(emblaApi.canScrollNext());
			setCanMoveRight(emblaApi.canScrollPrev());
		});
	}, [emblaApi]);

	return (
		<div className="z-50 flex items-center justify-center h-[290px] pb-2">
			<div
				className="relative h-full max-w-[385px] md:max-w-screen-md"
				dir="rtl"
			>
				<div className="embla__viewport h-full" ref={emblaRef}>
					<div className="flex h-full">
						{slides.map((slide) => (
							<Event
								className="pl-14 pr-14 pt-6"
								key={slide.slug}
								event={slide}
							/>
						))}
					</div>
					<div
						onKeyDown={() => {}}
						onClick={onLeftButtonClick}
						className={clsx(
							"absolute left-0 top-1/2 -translate-y-1/2 z-50 transition-opacity",
							isLoading ? "" : "hover:opacity-75",
							outOfEvents && !canMoveLeft
								? "opacity-75 cursor-not-allowed"
								: "opacity-100 cursor-pointer",
						)}
					>
						{isLoading ? (
							<ArrowPathIcon className="spin text-brand-yellow" width={28} />
						) : (
							<ChevronLeftIcon width={28} color="white" />
						)}
					</div>
					<div
						onKeyDown={() => {}}
						onClick={onRightButtonClick}
						className={clsx(
							"absolute right-0 top-1/2 -translate-y-1/2 z-50 hover:opacity-75 transition-opacity",
							canMoveRight
								? "opacity-100 cursor-pointer "
								: "opacity-75 cursor-not-allowed",
						)}
					>
						<ChevronRightIcon width={28} color="white" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Timeline;
