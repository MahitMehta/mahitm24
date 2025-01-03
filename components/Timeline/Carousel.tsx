"use client";

import { useCallback, useEffect } from "react";
import type {
	EmblaCarouselType,
	EmblaEventType,
	EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { usePrevNextButtons } from "./CarouselButtons";
import Event from "./Event";
import type { IEvent } from "@/interfaces/contentful";

type PropType = {
	slides: IEvent[];
	options?: EmblaOptionsType;
};

const Carousel: React.FC<PropType> = ({ options, slides }) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		dragFree: true,
		slidesToScroll: 1,
		containScroll: false,
		...options,
	});

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi);

	useEffect(() => {
		if (!emblaApi) return;

		const onResize = () => emblaApi.reInit();
		window.addEventListener("resize", onResize);
		emblaApi.on("destroy", () =>
			window.removeEventListener("resize", onResize),
		);
	}, [emblaApi]);

	const flyState = useCallback(
		(emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
			const slidesInView = emblaApi.slidesInView();
			const slidesNotInView = emblaApi.slidesNotInView();

			// for (const i of slidesInView) {
			// 	emblaApi.slideNodes()[i].classList.add("fly-in");
			// }

			// for (const i of slidesNotInView) {
			// 	emblaApi.slideNodes()[i].classList.remove("fly-in");
			// }
		},
		[],
	);

	useEffect(() => {
		if (!emblaApi) return;

		flyState(emblaApi);
		emblaApi.on("reInit", flyState).on("slidesInView", flyState);
	}, [emblaApi, flyState]);

	return (
		<div className="embla h-full max-w-[385px] md:max-w-screen-md" dir="rtl">
			<div className="embla__viewport h-full" ref={emblaRef}>
				<div className="embla__container flex h-full">
					{slides.map((slide) => (
						<div
							className="embla__slide pl-14 pr-14 pt-6"
							dir="ltr"
							key={slide.slug}
						>
							<Event event={slide} />
						</div>
					))}
					{/* {hasMoreToLoad && (
						<div
							className={"embla-infinite-scroll".concat(
								loadingMore ? " embla-infinite-scroll--loading-more" : "",
							)}
						>
							<span className="embla-infinite-scroll__spinner" />
						</div>
					)} */}
				</div>
			</div>
			{/* <div className="embla__controls">
				<div className="embla__buttons">
					<button
						type="button"
						onClick={onPrevButtonClick}
						disabled={prevBtnDisabled}
					>
						prev
					</button>
					<button
						type="button"
						onClick={onNextButtonClick}
						disabled={nextBtnDisabled}
					>
						next
					</button>
				</div>
			</div> */}
		</div>
	);
};

export default Carousel;
