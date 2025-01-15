"use client";

import { MiniPoster, Poster } from "@/components/title-page-components";
import { dummyFilms } from "@/contexts/TitleContext";
import { CommonTitleDto, PreviewTitleDto } from "@/dtos";
import styled from "styled-components";

const PageContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	gap: 2rem;
	margin-inline: 3rem;
`;

const HeaderBox = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1rem;
	height: 10rem;
`;

const CardStyle = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	background-color: rgba(255, 255, 255, 0.1);
	border-radius: 1rem;
	padding: 1rem;
	max-width: 100%;
`;

const CardFooter = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1rem;
	max-height: 5rem;
	max-width: 100%;

	img {
		height: inherit;
		width: 1rem;
	}
`;

const CardContainer = styled.div`
	display: grid;
	gap: 1rem;
	grid-template-columns: repeat(3, 1fr);
`;

interface CardProps {
	title: PreviewTitleDto;
}

const Card: React.FC<CardProps> = ({ title }) => {
	return (
		<CardStyle>
			<p>
				Tony Stark is Iron Man - genius, billionaire, playboy, philanthropist.
			</p>
			<CardFooter>
				<MiniPoster src={title.smallPosterUrl} alt={"Poster"} />
				<p>
					{title.name} (
					{title.releasedAtUtc ? title.releasedAtUtc.getFullYear() : "XXXX"})
				</p>
			</CardFooter>
		</CardStyle>
	);
};

export default function Summary() {
	return (
		<PageContainer>
			<HeaderBox>
				<MiniPoster
					src={
						"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg"
					}
					alt={"Poster"}
				/>
				<p>What to know about Iron Man 2 (2010) for The Avengers (2012)</p>
				<MiniPoster
					src={
						"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gKzYx79y0AQTL4UAk1cBQJ3nvrm.jpg"
					}
					alt={"Poster"}
				/>
			</HeaderBox>
			<CardContainer>
				<Card title={dummyFilms[1]} />
				<Card title={dummyFilms[2]} />
				<Card title={dummyFilms[3]} />
			</CardContainer>
		</PageContainer>
	);
}
