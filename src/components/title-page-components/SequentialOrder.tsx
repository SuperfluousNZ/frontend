import { SequentialOrderTitleDto } from "@/dtos";
import styled, { css } from "styled-components";
import { Poster } from "../atomic";

const SequentialOrderBlock = styled.div`
	align-items: center;
	display: flex;
	flex-direction: row;
	gap: 8rem;
	height: 30rem;
	max-width: 150rem;
`;

const SequentialItem = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	height: 100%;
	justify-content: center;

	img {
		max-height: 100%;
		object-fit: contain;
	}

	h2 {
		font-size: 2rem;
		font-weight: bold;
		opacity: 0.8;
	}

	h3 {
		font-size: 1.5rem;
		font-weight: normal;
		opacity: 0.6;
	}
`;

const SequentialAdjacent = styled(SequentialItem)<{ $alignRight?: boolean }>`
	${({ $alignRight }) =>
		$alignRight ?
			css`
				margin-left: auto;
			`
		:	css`
				margin-right: auto;
			`};

	height: 100%;

	img {
		max-height: 50%;
	}
`;

interface SequentialOrderProps {
	title: SequentialOrderTitleDto;
}

export const SequentialOrder: React.FC<SequentialOrderProps> = ({ title }) => {
	const { previous, next } = title;

	return (
		<SequentialOrderBlock>
			<SequentialAdjacent $alignRight={true}>
				{previous && (
					<>
						<h2>previous</h2>
						<Poster src={previous.smallPosterUrl} alt={previous.name} />
						<h3>{previous.releasedAtUtc?.getFullYear()}</h3>
					</>
				)}
			</SequentialAdjacent>
			<SequentialItem>
				<Poster src={title.largePosterUrl} alt={title.name} />
			</SequentialItem>
			<SequentialAdjacent $alignRight={false}>
				{next && (
					<>
						<h2>next</h2>
						<Poster src={next.smallPosterUrl} alt={next.name} />
						<h3>{next.releasedAtUtc?.getFullYear()}</h3>
					</>
				)}
			</SequentialAdjacent>
		</SequentialOrderBlock>
	);
};
