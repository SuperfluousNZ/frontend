"use client";

import { Poster } from "@/components/atomic";
import { PageLayout } from "@/components/layout";
import { useTitleContext } from "@/contexts";
import { CommonTitleDto, FactoidDto } from "@/dtos";
import { useEffect, useState } from "react";
import styled from "styled-components";

const HeaderBox = styled.div`
	align-items: center;
	display: grid;
	gap: 2rem;
	grid-template-columns: auto 1fr auto;
	justify-items: center;
`;

const StyledPoster = styled(Poster)<{ $rightAlign?: boolean }>`
	width: 7rem;
	${({ $rightAlign }) => $rightAlign && "justify-self: end"};
`;

const Description = styled.div`
	color: #a6a6a6;
	font-size: 1.2rem;
	line-height: 1.5;
`;

const FilmName = styled.span`
	color: #ffffff;
	font-weight: bold;
`;

const FilmYear = styled.span`
	color: #ffffff;
	font-style: italic;
`;

const CardStyle = styled.div`
	background-color: rgb(255 255 255 / 0.1);
	border-radius: 1rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	max-width: 100%;
	padding: 1rem;
`;

// const CardFooter = styled.div`
// 	display: flex;
// 	flex-direction: row;
// 	gap: 1rem;
// 	max-height: 5rem;
// 	max-width: 100%;

// 	img {
// 		height: inherit;
// 		width: 1rem;
// 	}
// `;

const CardContainer = styled.div`
	display: grid;
	gap: 1rem;
	grid-template-columns: repeat(3, 1fr);
`;

const FactoidContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

interface CardProps {
	factoids: FactoidDto[];
}

const Card: React.FC<CardProps> = ({ factoids }) => {
	return (
		<CardStyle>
			<FactoidContainer>
				{factoids.map((factoid) => (
					<p key={factoid.id}>{factoid.description}</p>
				))}
			</FactoidContainer>
			{/* <CardFooter>
				<Poster src={title.smallPosterUrl} alt={"Poster"} />
				<p>
					<FilmName>{title.name}</FilmName>{" "}
					<FilmYear>({title.releasedAtUtc?.getFullYear() || "XXXX"})</FilmYear>
				</p>
			</CardFooter> */}
		</CardStyle>
	);
};

export default function SummaryPage({
	titleId,
	relatedId,
}: {
	titleId: number;
	relatedId: number;
}) {
	console.log(titleId);
	console.log(relatedId);

	const {
		title: selectedFilm,
		setTitle,
		getFactoids,
		getTitleById,
	} = useTitleContext();
	const [requiredFilm, setRequiredFilm] = useState<CommonTitleDto | null>(null);
	const [factoids, setFactoids] = useState<FactoidDto[]>([]);

	useEffect(() => {
		setTitle(1);
		getFactoids(1).then(setFactoids);
		getTitleById(2).then(setRequiredFilm);
	}, [setTitle, getTitleById, getFactoids]);
	// TODO: group factoids by topic, make each card per topic

	if (!requiredFilm) {
		return <div>Loading...</div>;
	}

	return (
		<PageLayout>
			<HeaderBox>
				<StyledPoster
					src={requiredFilm.smallPosterUrl}
					alt={requiredFilm.name}
					$rightAlign={true}
				/>

				<Description>
					What to know about <FilmName>{requiredFilm.name} </FilmName>
					<FilmYear>
						({requiredFilm.releasedAtUtc?.getFullYear() || "XXXX"})
					</FilmYear>{" "}
					for <FilmName>{selectedFilm.name} </FilmName>
					<FilmYear>
						({selectedFilm.releasedAtUtc?.getFullYear() || "XXXX"})
					</FilmYear>
				</Description>

				<StyledPoster
					src={selectedFilm.smallPosterUrl}
					alt={selectedFilm.name}
				/>
			</HeaderBox>
			<CardContainer>
				{factoids.map((factoid) => (
					<Card key={factoid.id} factoids={[factoid]} />
				))}
			</CardContainer>
		</PageLayout>
	);
}
