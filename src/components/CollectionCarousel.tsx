"use client";

import { CollectionDto, PreviewTitleDto } from "@/dtos";
import { styled } from "styled-components";
import { MiniPoster } from "./title-page-components";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";

const Carousel = styled.div`
	overflow: hidden;
	--slide-size: 20%;
	--slide-spacing: 2rem;
`;

const CarouselContainer = styled.div`
	display: flex;
	// margin-left: calc(var(--slide-spacing) * -1);
	// gap: 1rem;
`;

const SlideContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	min-width: 0;
	flex: 0 0 var(--slide-size);
	max-width: 100%;
	margin-inline: var(--slide-spacing);
`;

const PosterContainer = styled.div`
	// width: 100%;
	// height: 20rem;
`;

interface TrackItemProps {
	title: PreviewTitleDto;
	hyperlink: string;
}

const TrackItem = ({ title, hyperlink }: TrackItemProps) => {
	return (
		<SlideContainer>
			<a href={hyperlink}>
				<PosterContainer>
					<MiniPoster src={title.smallPosterUrl} alt={title.name} />
				</PosterContainer>
				<h3>{title.name}</h3>
			</a>
		</SlideContainer>
	);
};

interface CollectionCarouselProps {
	collection: CollectionDto;
	// order: ???
}

export const CollectionCarousel = ({ collection }: CollectionCarouselProps) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		containScroll: false,
		loop: false,
	});

	const titles = collection.titles;
	// TODO: implement ordering

	useEffect(() => {
		if (emblaApi) {
			console.log(emblaApi.slideNodes());
		}
	}, [emblaApi]);

	return (
		<Carousel ref={emblaRef}>
			<CarouselContainer>
				{titles.map((title) => (
					<TrackItem key={title.id} title={title} hyperlink="title" />
				))}
			</CarouselContainer>
		</Carousel>
	);
};
