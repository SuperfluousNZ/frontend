"use client";

import styled from "styled-components";

import { Button } from "@/components/atomic";
import { TitleDto } from "@/dtos";
import { RelationRelevance } from "@/schemas";

const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	margin-inline: 15rem;
	align-items: center;
`;

const TitleNameBlock = styled.div`
	align-items: baseline;
	display: flex;
	flex-direction: row;
	gap: 1rem;
	justify-content: center;

	h1 {
		font-size: 3rem;
		font-weight: bold;
	}

	h2 {
		color: rgba(255, 255, 255, 0.6);
		font-size: 1.5rem;
		font-weight: normal;
	}
`;

const DetailsBlock = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr;
	gap: 2rem;
	max-width: 150rem;
`;

const DependencyOrderBlock = styled.div`
	display: grid;
	gap: 2rem;
	grid-template-columns: 1fr 3fr;
	max-width: 150rem;
`;

const DependencyTabs = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	height: 100%;
`;

const DependencyTabStyle = styled.div`
	background-color: rgba(255, 255, 255, 0.2);
	border-radius: 1rem;
	display: flex;
	flex-direction: row;
	gap: 1rem;
	height: 100%;
	max-height: 100%;
	padding: 1rem;
	position: relative;

	p {
		bottom: 1rem;
		color: rgba(255, 255, 255, 0.6);
		font-size: 5rem;
		font-weight: bold;
		position: absolute;
		right: 2rem;
	}
`;

const ButtonsList = styled.div`
	align-items: flex-end;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const Description = styled.div``;

const Poster = styled.img`
	border-radius: 1rem;
`;

const LeadPoster = styled(Poster)`
	margin-left: auto;
	max-width: 100%;
`;

const MiniPoster = styled(Poster)`
	border-radius: 0.5rem;
	height: 9rem;
`;

interface DependencyOrderProps {
	title: TitleDto;
}

function Buttons() {
	return (
		<ButtonsList>
			<Button onClick={() => {}}>Where to watch</Button>
			<Button onClick={() => {}}>Mark as watched</Button>
			<Button onClick={() => {}}>Something else idk</Button>
		</ButtonsList>
	);
}

interface DependencyTabProps {
	titles: TitleDto[];
	relevance: RelationRelevance;
}

function DependencyTab({ titles, relevance }: DependencyTabProps) {
	return (
		<DependencyTabStyle>
			{titles.map((title) => (
				<MiniPoster
					key={title.id}
					src={title.smallPosterUrl}
					alt={title.name}
				/>
			))}
			<p>{relevance}</p>
		</DependencyTabStyle>
	);
}

const DependencyOrder: React.FC<DependencyOrderProps> = ({ title }) => {
	const relations = title.relations || [];
	const must = relations
		.filter((relation) => relation.relevance === "Must")
		.map((relation) => relation.title);
	const should = relations
		.filter((relation) => relation.relevance === "Should")
		.map((relation) => relation.title);
	const could = relations
		.filter((relation) => relation.relevance === "Could")
		.map((relation) => relation.title);

	return (
		<DependencyOrderBlock>
			<LeadPoster src={title.smallPosterUrl} alt={title.name} />
			<DependencyTabs>
				<DependencyTab titles={must} relevance="Must" />
				<DependencyTab titles={should} relevance="Should" />
				<DependencyTab titles={could} relevance="Could" />
			</DependencyTabs>
		</DependencyOrderBlock>
	);
};

export default function Title() {
	const dummyTitle: TitleDto = {
		id: 0,
		name: "The Avengers",
		type: "Movie",
		largePosterUrl:
			"https://image.tmdb.org/t/p/original/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
		smallPosterUrl:
			"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
		releasedAtUtc: new Date("2012-04-25"),
		description:
			"When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins!",
		tmdbId: 24428,
		relations: [
			{
				title: {
					id: 1,
					name: "The Incredible Hulk",
					type: "Movie",
					smallPosterUrl:
						"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gKzYx79y0AQTL4UAk1cBQJ3nvrm.jpg",
					releasedAtUtc: new Date("2008-06-12"),
				},
				relevance: "Could",
			},
			{
				title: {
					id: 2,
					name: "Iron Man 2",
					type: "Movie",
					smallPosterUrl:
						"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg",
					releasedAtUtc: new Date("2010-05-07"),
				},
				relevance: "Must",
			},
			{
				title: {
					id: 3,
					name: "Thor",
					type: "Movie",
					smallPosterUrl:
						"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/prSfAi1xGrhLQNxVSUFh61xQ4Qy.jpg",
					releasedAtUtc: new Date("2011-05-06"),
				},
				relevance: "Should",
			},
			{
				title: {
					id: 4,
					name: "Captain America: The First Avenger",
					type: "Movie",
					smallPosterUrl:
						"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg",
					releasedAtUtc: new Date("2011-07-22"),
				},
				relevance: "Should",
			},
		],
		sequences: [],
	};

	return (
		<PageContainer>
			<TitleNameBlock>
				<h1>{dummyTitle.name}</h1>
				<h2>{dummyTitle.releasedAtUtc?.getFullYear()}</h2>
			</TitleNameBlock>
			<DependencyOrder title={dummyTitle} />
			<DetailsBlock>
				<Buttons />
				<Description>{dummyTitle.description}</Description>
			</DetailsBlock>
		</PageContainer>
	);
}
