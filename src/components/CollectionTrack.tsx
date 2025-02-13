"use client";

import { CollectionDto, PreviewTitleDto } from "@/dtos";
import { styled } from "styled-components";
import { MiniPoster } from "./title-page-components";

const TrackContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1rem;
`;

const ItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 10rem;
`;

const PosterContainer = styled.div`
	width: 10rem;
`;

interface TrackItemProps {
	title: PreviewTitleDto;
}

const TrackItem = ({ title }: TrackItemProps) => {
	return (
		<ItemContainer>
			<PosterContainer>
				<MiniPoster src={title.smallPosterUrl} alt={title.name} />
			</PosterContainer>
			<h3>{title.name}</h3>
		</ItemContainer>
	);
};

interface CollectionTrackProps {
	collection: CollectionDto;
	// order: ???
}

export const CollectionTrack = ({ collection }: CollectionTrackProps) => {
	const titles = collection.titles;
	// TODO: implement ordering

	return (
		<TrackContainer>
			{titles.map((title) => (
				<TrackItem key={title.id} title={title} />
			))}
		</TrackContainer>
	);
};
