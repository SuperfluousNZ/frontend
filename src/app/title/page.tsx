"use client";

import styled from "styled-components";

import { Button } from "@/components/atomic";
import { TitleDto } from "@/dtos";

const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;

const TitleNameBlock = styled.div`
	display: flex;
	flex-direction: row;
	align-items: baseline;
	justify-content: center;
	gap: 1rem;

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
`;

const DependencyOrderBlock = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr;
	gap: 2rem;
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
	height: 100%;
	padding: 1rem;
	position: relative;

	p {
		bottom: 1rem;
		color: rgba(255, 255, 255, 0.6);
		font-size: 5rem;
		font-weight: bold;
		position: absolute;
		right: 1rem;
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
	max-width: 100%;
	margin-left: auto;
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

function DependencyTab() {
	return (
		<DependencyTabStyle>
			<p>must</p>
		</DependencyTabStyle>
	);
}

const DependencyOrder: React.FC<DependencyOrderProps> = ({ title }) => {
	return (
		<DependencyOrderBlock>
			<Poster src={title.smallPosterUrl} alt={title.name} />
			<DependencyTabs>
				<DependencyTab />
				<DependencyTab />
				<DependencyTab />
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
