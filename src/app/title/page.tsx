"use client";

import styled from "styled-components";

import { Button } from "@/components/atomic";
import { TitleDto } from "@/dtos";

const TitleNameBlock = styled.div``;

const DetailsBlock = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr;
`;

const DependencyOrderBlock = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr;
`;

const DependencyTabs = styled.div`
	display: flex;
	flex-direction: column;
`;

const ButtonsList = styled.div`
	display: flex;
	flex-direction: column;
`;

const Description = styled.div``;

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
	return <div>must</div>;
}

const DependencyOrder: React.FC<DependencyOrderProps> = ({ title }) => {
	return (
		<DependencyOrderBlock>
			<img src={title.smallPosterUrl} alt={title.name} />
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
		<>
			<TitleNameBlock>{dummyTitle.name}</TitleNameBlock>
			<DependencyOrder title={dummyTitle} />
			<DetailsBlock>
				<Buttons />
				<Description>{dummyTitle.description}</Description>
			</DetailsBlock>
		</>
	);
}
