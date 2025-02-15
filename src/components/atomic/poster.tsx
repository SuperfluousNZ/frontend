import styled from "styled-components";

const PosterContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: center;
`;

const PosterStyle = styled.img<{ $borderRadius?: string }>`
	${({ $borderRadius }) => $borderRadius && `border-radius: ${$borderRadius};`}
	max-height: 100%;
	max-width: 100%;
	object-fit: contain;
`;

interface PosterProps {
	alt: string;
	borderRadius?: string;
	src?: string;
}

export const Poster: React.FC<PosterProps> = ({
	src,
	alt,
	borderRadius = "1rem",
}) => {
	if (!src) {
		return null;
	}

	return (
		<PosterContainer>
			<PosterStyle src={src} alt={alt} $borderRadius={borderRadius} />
		</PosterContainer>
	);
};
