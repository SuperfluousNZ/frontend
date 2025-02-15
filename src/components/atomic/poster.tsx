import styled from "styled-components";

const PosterStyle = styled.img<{ $borderRadius?: string }>`
	${({ $borderRadius }) => $borderRadius && `border-radius: ${$borderRadius};`}
	max-height: 100%;
	object-fit: contain;
`;

interface PosterProps {
	alt: string;
	borderRadius?: string;
	className?: string;
	src?: string;
}

export const Poster: React.FC<PosterProps> = ({
	alt,
	borderRadius = "1rem",
	className,
	src,
}) => {
	if (!src) {
		return null;
	}

	return (
		<PosterStyle
			className={className}
			src={src}
			alt={alt}
			$borderRadius={borderRadius}
		/>
	);
};
