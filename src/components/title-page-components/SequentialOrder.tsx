import { SequentialOrderTitleDto } from "@/dtos";
import styled from "styled-components";
import { Poster } from "../atomic";

const PrimaryPoster = styled(Poster)`
	width: 16rem;
`;

const AdjacentPoster = styled(Poster)`
	width: 10rem;
`;

const SequentialOrderBlock = styled.div`
	align-items: center;
	display: flex;
	flex-direction: row;
	gap: 1rem;
	justify-content: space-evenly;
`;

const SequentialItem = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	gap: 1rem;

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

interface SequentialOrderProps {
	title: SequentialOrderTitleDto;
}

export const SequentialOrder: React.FC<SequentialOrderProps> = ({ title }) => {
	const { previous, next } = title;

	return (
		<SequentialOrderBlock>
			<SequentialItem>
				{previous && (
					<>
						<h2>previous</h2>
						<AdjacentPoster src={previous.smallPosterUrl} alt={previous.name} />
						<h3>{previous.releasedAtUtc?.getFullYear()}</h3>
					</>
				)}
			</SequentialItem>
			<PrimaryPoster src={title.largePosterUrl} alt={title.name} />
			<SequentialItem>
				{next && (
					<>
						<h2>next</h2>
						<AdjacentPoster src={next.smallPosterUrl} alt={next.name} />
						<h3>{next.releasedAtUtc?.getFullYear()}</h3>
					</>
				)}
			</SequentialItem>
		</SequentialOrderBlock>
	);
};
