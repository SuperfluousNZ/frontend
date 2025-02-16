"use client";

import styled from "styled-components";

import { Button } from "@/components/atomic";
import { PageLayout } from "@/components/layout";
import {
	DependencyOrder,
	SequentialOrder,
} from "@/components/title-page-components";
import { useTitleContext } from "@/contexts";
import { DependencyOrderTitleDto, SequentialOrderTitleDto } from "@/dtos/title";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

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
	gap: 2rem;
	grid-template-columns: 2fr 5fr;
	max-width: 75rem;
`;

const ButtonsList = styled.div`
	align-items: flex-end;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const Description = styled.div`
	color: #a6a6a6;
	font-size: 1.2rem;
	line-height: 1.5;
`;

function Buttons() {
	return (
		<ButtonsList>
			<Button onClick={() => {}}>Where to watch</Button>
			<Button onClick={() => {}} icon={<FontAwesomeIcon icon={faEye} />}>
				Mark as watched
			</Button>
			<Button onClick={() => {}}>Something else idk</Button>
		</ButtonsList>
	);
}

export default function TitlePage({ titleId }: { titleId: number }) {
	console.log(titleId);

	const [orderType, setOrderType] = useState<"sequential" | "relational">(
		"relational",
	);

	const cycleOrderType = () => {
		setOrderType(orderType === "sequential" ? "relational" : "sequential");
	};

	const { title, setTitle, getRelations, getSequences } = useTitleContext();
	const [sequentialTitle, setSequentialTitle] =
		useState<SequentialOrderTitleDto | null>(null);
	const [relationalTitle, setRelationalTitle] =
		useState<DependencyOrderTitleDto | null>(null);

	useEffect(() => {
		setTitle(1);
	}, [setTitle]);

	useEffect(() => {
		if (orderType === "sequential") {
			getSequences().then(setSequentialTitle);
			// pass an orderId into getSequences for a specific order, otherwise it defaults to -1 (release order)
		} else if (orderType === "relational") {
			getRelations().then(setRelationalTitle);
		}
	}, [orderType, getSequences, getRelations]);

	return (
		<PageLayout>
			<TitleNameBlock>
				<h1>{title.name}</h1>
				<h2>{title.releasedAtUtc?.getFullYear()}</h2>
				<Button onClick={() => cycleOrderType()}>🔄️</Button>
				{/* temporary ^^ */}
			</TitleNameBlock>
			{orderType === "sequential" ?
				sequentialTitle ?
					<SequentialOrder title={sequentialTitle} />
				:	null
			: relationalTitle ?
				<DependencyOrder title={relationalTitle} />
			:	null}

			<DetailsBlock>
				<Buttons />
				<Description>{title.description}</Description>
			</DetailsBlock>
		</PageLayout>
	);
}
