import styled from "styled-components";

const PosterStyle = styled.img<{ $borderRadius?: string }>`
	${({ $borderRadius }) => $borderRadius && `border-radius: ${$borderRadius};`}
	display: block;
	max-height: 100%;
	object-fit: contain;
`;

const PosterLink = styled.a`
	display: block;
`;

interface PosterProps {
	alt: string;
	borderRadius?: string;
	className?: string;
	href?: string;
	src?: string;
}

export const Poster: React.FC<PosterProps> = ({
	alt,
	borderRadius = "1rem",
	className,
	href,
	src,
}) => {
	if (!src) {
		return null;
	}

	if (href) {
		return (
			<PosterLink href={href} rel="noreferrer">
				<PosterStyle
					className={className}
					src={src}
					alt={alt}
					$borderRadius={borderRadius}
				/>
			</PosterLink>
		);
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
