"use client";

import { CollectionDto, PreviewTitleDto } from "@/dtos";
import { styled } from "styled-components";

import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { Poster } from "./atomic";

const CarouselParent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
`;

const Carousel = styled.div`
	overflow: hidden;
	--slide-size: 20%;
	--slide-spacing: 1rem;
	--thumb-size: 2rem;
	--thumb-spacing: 0.3rem;
`;

const CarouselContainer = styled.div`
	display: flex;
`;

const SlideContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 0 0 var(--slide-size);
	gap: 1rem;
	margin-inline: var(--slide-spacing);
	max-width: 100%;
	min-width: 0;
`;

const StyledPoster = styled(Poster)`
	width: 100%;
`;

const SlidePoster = styled(StyledPoster)``;

const ThumbCarousel = styled(Carousel)`
	width: 25%;

	mask-image: linear-gradient(
		to right,
		transparent,
		black 10%,
		black 90%,
		transparent
	);
`;

const ThumbContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 0 0 var(--thumb-size);
	gap: 1rem;
	margin-inline: var(--thumb-spacing);
	max-width: 100%;
	min-width: 0;
`;

const ThumbPoster = styled(StyledPoster)<{ $selected: boolean }>`
	border-radius: 0.5rem;
	${({ $selected }) => $selected && "border: 1px solid #888;"}
`;

const ThumbButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	padding: 0;
`;

interface SlideProps {
	hyperlink: string;
	title: PreviewTitleDto;
}

const Slide = ({ title, hyperlink }: SlideProps) => {
	return (
		<SlideContainer>
			<Link href={hyperlink}>
				<SlidePoster src={title.smallPosterUrl} alt={title.name} />
			</Link>
		</SlideContainer>
	);
};

interface ThumbProps {
	onClick: () => void;
	selected: boolean;
	title: PreviewTitleDto;
}

const Thumb = ({ title, onClick, selected }: ThumbProps) => {
	return (
		<ThumbContainer>
			<ThumbButton onClick={onClick} type="button">
				<ThumbPoster
					src={title.smallPosterUrl}
					alt={title.name}
					$selected={selected}
				/>
			</ThumbButton>
		</ThumbContainer>
	);
};

interface CollectionCarouselProps {
	collection: CollectionDto;
	selectedIndex: number;
	setSelectedIndex: (index: number) => void;
}

const mainCarouselOptions: EmblaOptionsType = {
	align: "center",
	containScroll: false,
};

const thumbCarouselOptions: EmblaOptionsType = {
	align: "center",
	containScroll: false,
	dragFree: true,
};

export const CollectionCarousel = ({
	collection,
	selectedIndex,
	setSelectedIndex,
}: CollectionCarouselProps) => {
	const [emblaMainRef, emblaMainApi] = useEmblaCarousel(mainCarouselOptions, [
		WheelGesturesPlugin({ forceWheelAxis: "y" }),
	]);
	const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel(
		thumbCarouselOptions,
		[WheelGesturesPlugin({ forceWheelAxis: "y" })],
	);

	const titles = collection.titles;
	const slides = useRef<HTMLElement[]>([]);

	const setSlides = useCallback((emblaApi: EmblaCarouselType) => {
		slides.current = emblaApi.slideNodes();
	}, []);

	const calculateScales = useCallback((emblaApi: EmblaCarouselType) => {
		const slides = emblaApi.slideNodes();
		const scrollProgress = emblaApi.scrollProgress();

		const newScales = slides.map((_, index) => {
			const snapPoint = emblaApi.scrollSnapList()[index];
			const distance = Math.abs(scrollProgress - snapPoint);
			return Math.max(0.8, 1 - distance * 1.2);
		});

		slides.forEach((slide, index) => {
			slide.style.transform = `scale(${newScales[index]})`;
		});
	}, []);

	const onSelect = useCallback(() => {
		if (!emblaMainApi || !emblaThumbsApi) return;
		const index = emblaMainApi.selectedScrollSnap();
		setIndex(index);
	}, [emblaMainApi, emblaThumbsApi]);

	function setIndex(index: number) {
		setSelectedIndex(index);
		if (!emblaMainApi || !emblaThumbsApi) return;
		emblaThumbsApi.scrollTo(index);
	}

	const onThumbClick = useCallback(
		(index: number) => {
			if (!emblaMainApi || !emblaThumbsApi) return;
			emblaMainApi.scrollTo(index);
		},
		[emblaMainApi, emblaThumbsApi],
	);

	useEffect(() => {
		if (!emblaMainApi || !emblaThumbsApi) return;

		setSlides(emblaMainApi);
		calculateScales(emblaMainApi);

		emblaMainApi
			.on("reInit", setSlides)
			.on("reInit", calculateScales)
			.on("scroll", calculateScales)
			.on("select", onSelect)
			.on("reInit", onSelect);
	}, [emblaMainApi, emblaThumbsApi, calculateScales, onSelect, setSlides]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: Only runs once
	useEffect(() => {
		if (!emblaMainApi || !emblaThumbsApi) return;
		emblaMainApi.scrollTo(selectedIndex, true);
		emblaThumbsApi.scrollTo(selectedIndex, true);
	}, [emblaMainApi]);

	return (
		<CarouselParent>
			<Carousel ref={emblaMainRef}>
				<CarouselContainer>
					{titles.map((title) => (
						<Slide
							hyperlink={`/title/${title.id}`}
							key={title.id}
							title={title}
						/>
					))}
				</CarouselContainer>
			</Carousel>
			<ThumbCarousel ref={emblaThumbsRef}>
				<CarouselContainer>
					{titles.map((title, index) => (
						<Thumb
							key={title.id}
							onClick={() => onThumbClick(index)}
							selected={index === selectedIndex}
							title={title}
						/>
					))}
				</CarouselContainer>
			</ThumbCarousel>
		</CarouselParent>
	);
};
