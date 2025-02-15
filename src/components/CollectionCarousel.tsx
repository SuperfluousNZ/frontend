"use client";

import { CollectionDto, PreviewTitleDto } from "@/dtos";
import { styled } from "styled-components";

import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { useCallback, useEffect, useState } from "react";
import { Poster } from "./atomic";

const CarouselParent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
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

const SlideContainer = styled.div<{ $scale: number }>`
	display: flex;
	flex-direction: column;
	flex: 0 0 var(--slide-size);
	gap: 1rem;
	margin-inline: var(--slide-spacing);
	max-width: 100%;
	min-width: 0;
	transform: scale(${(props) => props.$scale});
`;

const StyledPoster = styled(Poster)`
	width: 100%;
`;

const SlidePoster = styled(StyledPoster)``;

const ThumbContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 0 0 var(--thumb-size);
	gap: 1rem;
	margin-inline: var(--thumb-spacing);
	max-width: 100%;
	min-width: 0;
`;

const ThumbPoster = styled(StyledPoster)`
	border-radius: 0.5rem;
`;

const ThumbButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	padding: 0;
`;

interface SlideProps {
	hyperlink: string;
	scale: number;
	title: PreviewTitleDto;
}

const Slide = ({ title, hyperlink, scale }: SlideProps) => {
	return (
		<SlideContainer $scale={scale}>
			<a href={hyperlink}>
				<SlidePoster src={title.smallPosterUrl} alt={title.name} />
			</a>
		</SlideContainer>
	);
};

interface ThumbProps {
	title: PreviewTitleDto;
	onClick: () => void;
}

const Thumb = ({ title, onClick }: ThumbProps) => {
	return (
		<ThumbContainer>
			<ThumbButton onClick={onClick} type="button">
				<ThumbPoster src={title.smallPosterUrl} alt={title.name} />
			</ThumbButton>
		</ThumbContainer>
	);
};

interface CollectionCarouselProps {
	collection: CollectionDto;
	onSelectChange?: (Title: PreviewTitleDto) => void;
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
	onSelectChange = () => {},
}: CollectionCarouselProps) => {
	const [emblaMainRef, emblaMainApi] = useEmblaCarousel(mainCarouselOptions, [
		WheelGesturesPlugin({ forceWheelAxis: "y" }),
	]);
	const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel(
		thumbCarouselOptions,
		[WheelGesturesPlugin({ forceWheelAxis: "y" })],
	);

	const [_selectedIndex, setSelectedIndex] = useState(0);
	const [scales, setScales] = useState<number[]>([]);

	const titles = collection.titles;

	const calculateScales = useCallback(() => {
		if (!emblaMainApi) return;

		const slides = emblaMainApi.slideNodes();
		const scrollProgress = emblaMainApi.scrollProgress();

		const newScales = slides.map((_, index) => {
			const snapPoint = emblaMainApi.scrollSnapList()[index];
			const distance = Math.abs(scrollProgress - snapPoint);
			return Math.max(0.8, 1 - distance * 1.2);
		});

		setScales(newScales);
	}, [emblaMainApi]);

	const onSelect = useCallback(() => {
		if (!emblaMainApi || !emblaThumbsApi) return;
		const index = emblaMainApi.selectedScrollSnap();
		setSelectedIndex(index);
		emblaThumbsApi.scrollTo(index);
		onSelectChange(titles[index]);
	}, [emblaMainApi, emblaThumbsApi, onSelectChange, titles]);

	const onThumbClick = useCallback(
		(index: number) => {
			if (!emblaMainApi || !emblaThumbsApi) return;
			emblaMainApi.scrollTo(index);
		},
		[emblaMainApi, emblaThumbsApi],
	);

	useEffect(() => {
		if (!emblaMainApi || !emblaThumbsApi) return;

		emblaMainApi.on("scroll", calculateScales);
		emblaMainApi.on("select", onSelect).on("reInit", onSelect);

		calculateScales();
	}, [emblaMainApi, emblaThumbsApi, calculateScales, onSelect]);

	return (
		<CarouselParent>
			<Carousel ref={emblaMainRef}>
				<CarouselContainer>
					{titles.map((title, index) => (
						<Slide
							hyperlink="title"
							key={title.id}
							scale={scales[index] || 1}
							title={title}
						/>
					))}
				</CarouselContainer>
			</Carousel>
			<Carousel ref={emblaThumbsRef}>
				<CarouselContainer>
					{titles.map((title, index) => (
						<Thumb
							key={title.id}
							title={title}
							onClick={() => onThumbClick(index)}
						/>
					))}
				</CarouselContainer>
			</Carousel>
		</CarouselParent>
	);
};
