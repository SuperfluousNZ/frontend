"use client";

import styled from "styled-components";

import { Button } from "@/components/atomic";
import { TitleDto } from "@/dtos";
import { RelationRelevance } from "@/schemas";

const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	margin-inline: 3rem;
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
	const relationsMap: Record<RelationRelevance, TitleDto[]> = {
		must: [],
		should: [],
		could: [],
	};

	const relations = title.relations || [];
	relations.sort((a, b) => {
		if (a.title.releasedAtUtc && b.title.releasedAtUtc) {
			return a.title.releasedAtUtc.getTime() - b.title.releasedAtUtc.getTime();
		}
		if (a.title.releasedAtUtc) {
			return -1;
		}
		if (b.title.releasedAtUtc) {
			return 1;
		}
		return 0;
	});

	for (const relation of relations) {
		relationsMap[relation.relevance].push(relation.title);
	}

	return (
		<DependencyOrderBlock>
			<LeadPoster src={title.smallPosterUrl} alt={title.name} />
			<DependencyTabs>
				<DependencyTab titles={relationsMap.must} relevance="must" />
				<DependencyTab titles={relationsMap.should} relevance="should" />
				<DependencyTab titles={relationsMap.could} relevance="could" />
			</DependencyTabs>
		</DependencyOrderBlock>
	);
};

export default function Title() {
	const dummyTitle: TitleDto = {
		id: 0,
		name: "The Avengers",
		type: "movie",
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
					type: "movie",
					smallPosterUrl:
						"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gKzYx79y0AQTL4UAk1cBQJ3nvrm.jpg",
					releasedAtUtc: new Date("2008-06-12"),
				},
				relevance: "could",
			},
			{
				title: {
					id: 2,
					name: "Iron Man 2",
					type: "movie",
					smallPosterUrl:
						"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg",
					releasedAtUtc: new Date("2010-05-07"),
				},
				relevance: "must",
			},
			{
				title: {
					id: 3,
					name: "Thor",
					type: "movie",
					smallPosterUrl:
						"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/prSfAi1xGrhLQNxVSUFh61xQ4Qy.jpg",
					releasedAtUtc: new Date("2011-05-06"),
				},
				relevance: "should",
			},
			{
				title: {
					id: 4,
					name: "Captain America: The First Avenger",
					type: "movie",
					smallPosterUrl:
						"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg",
					releasedAtUtc: new Date("2011-07-22"),
				},
				relevance: "should",
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
