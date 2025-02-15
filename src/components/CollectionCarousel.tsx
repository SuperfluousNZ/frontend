"use client";

import { CollectionDto, PreviewTitleDto } from "@/dtos";
import { styled } from "styled-components";
import { MiniPoster } from "./title-page-components";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const Carousel = styled.div`
	overflow: hidden;
	--slide-size: 20%;
	--slide-spacing: 1rem;
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

const PosterContainer = styled.div``;

interface TrackItemProps {
	hyperlink: string;
	scale: number;
	title: PreviewTitleDto;
}

const TrackItem = ({ title, hyperlink, scale }: TrackItemProps) => {
	return (
		<SlideContainer $scale={scale}>
			<a href={hyperlink}>
				<PosterContainer>
					<MiniPoster src={title.smallPosterUrl} alt={title.name} />
				</PosterContainer>
			</a>
		</SlideContainer>
	);
};

interface CollectionCarouselProps {
	collection: CollectionDto;
	onSelectChange?: (Title: PreviewTitleDto) => void;
}

export const CollectionCarousel = ({
	collection,
	onSelectChange = () => {},
}: CollectionCarouselProps) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: "center",
		containScroll: false,
		loop: false,
	});

	const [_selectedIndex, setSelectedIndex] = useState(0);
	const [scales, setScales] = useState<number[]>([]);

	const titles = collection.titles;

	const calculateScales = useCallback(() => {
		if (!emblaApi) return;

		const slides = emblaApi.slideNodes();
		const scrollProgress = emblaApi.scrollProgress();

		const newScales = slides.map((_, index) => {
			const snapPoint = emblaApi.scrollSnapList()[index];
			const distance = Math.abs(scrollProgress - snapPoint);
			return Math.max(0.8, 1 - distance);
		});

		setScales(newScales);
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;

		emblaApi.on("scroll", calculateScales);
		emblaApi.on("select", () => {
			setSelectedIndex(emblaApi.selectedScrollSnap());
			onSelectChange(titles[emblaApi.selectedScrollSnap()]);
		});

		calculateScales();
	}, [emblaApi, calculateScales, onSelectChange, titles]);

	return (
		<Carousel ref={emblaRef}>
			<CarouselContainer>
				{titles.map((title, index) => (
					<TrackItem
						hyperlink="title"
						key={title.id}
						scale={scales[index] || 1}
						title={title}
					/>
				))}
			</CarouselContainer>
		</Carousel>
	);
};
