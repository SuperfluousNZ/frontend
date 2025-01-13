import { styled } from 'styled-components';

export { DependencyOrder } from './DependencyOrder';
export { SequentialOrder } from './SequentialOrder';

export const Poster = styled.img`
	border-radius: 1rem;
`;

export const LeadPoster = styled(Poster)`
	margin-left: auto;
	max-width: 100%;
`;

export const MiniPoster = styled(Poster)`
	border-radius: 0.5rem;
	height: 100%;
	object-fit: contain;
	width: 100%;
`;
