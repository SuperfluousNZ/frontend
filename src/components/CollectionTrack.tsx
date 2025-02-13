"use client";

import { CollectionDto, PreviewTitleDto } from "@/dtos";
import { styled } from "styled-components";
import { MiniPoster } from "./title-page-components";

const TrackContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1rem;
`;

const PosterContainer = styled.div`
	width: 10rem;
`;

interface TrackItemProps {
	title: PreviewTitleDto;
}

const TrackItem = ({ title }: TrackItemProps) => {
	return (
		<div>
			<h2>{title.name}</h2>
			<PosterContainer>
				<MiniPoster src={title.smallPosterUrl} alt={title.name} />
			</PosterContainer>
		</div>
	);
};

interface CollectionTrackProps {
	collection: CollectionDto;
	// order: ???
}

export const CollectionTrack = ({ collection }: CollectionTrackProps) => {
	const titles = collection.titles;

	return (
		<TrackContainer>
			{titles.map((title) => (
				<TrackItem key={title.id} title={title} />
			))}
		</TrackContainer>
	);
};
