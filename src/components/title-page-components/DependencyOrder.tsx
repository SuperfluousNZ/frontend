import {
	DependencyOrderTitleDto,
	PreviewTitleDto,
	RelationRelevance,
} from "@/dtos";
import { styled } from "styled-components";
import { LeadPoster, MiniPoster } from ".";

const DependencyOrderBlock = styled.div`
	display: grid;
	gap: 2rem;
	grid-template-columns: 2fr 5fr;
	height: 30rem;
	max-width: 75rem;
	width: 100%;
`;

const DependencyPosterContainer = styled.div`
	align-items: center;
	contain: size;
	display: flex;
	flex-direction: column;
	justify-content: center;

	img {
		max-height: 100%;
		object-fit: contain;
	}
`;

const DependencyTabs = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	height: inherit;
	justify-content: space-between;
	align-items: stretch;
`;

const DependencyTabStyle = styled.div`
	background-color: rgba(255, 255, 255, 0.2);
	border-radius: 1rem;
	display: flex;
	flex-direction: row;
	flex: 1;
	gap: 1rem;
	height: 100%;
	overflow: hidden;
	padding: 1rem;
	position: relative;

	p {
		bottom: 1rem;
		color: rgba(255, 255, 255, 0.6);
		font-size: 5rem;
		font-weight: bold;
		position: absolute;
		right: 2rem;
	}
`;

const DependencyTabPosterContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

interface DependencyOrderProps {
	title: DependencyOrderTitleDto;
}

interface DependencyTabProps {
	titles: PreviewTitleDto[];
	relevance: RelationRelevance;
}

function DependencyTab({ titles, relevance }: DependencyTabProps) {
	return (
		<DependencyTabStyle>
			{titles.map((title) => (
				<DependencyTabPosterContainer key={title.id}>
					<MiniPoster src={title.smallPosterUrl} alt={title.name} />
				</DependencyTabPosterContainer>
			))}
			{titles.length === 0 && <DependencyTabPosterContainer />}
			{/* ^^ Spacer in case the list is empty */}
			<p>{relevance}</p>
		</DependencyTabStyle>
	);
}

export const DependencyOrder: React.FC<DependencyOrderProps> = ({ title }) => {
	const relationsMap: Record<RelationRelevance, PreviewTitleDto[]> = {
		must: [],
		should: [],
		could: [],
	};

	const relations = title.relations || [];
	relations.sort((a, b) => {
		if (a.title.releasedAtUtc && b.title.releasedAtUtc) {
			return a.title.releasedAtUtc.getTime() - b.title.releasedAtUtc.getTime();
		}
		if (a.title.releasedAtUtc) {
			return -1;
		}
		if (b.title.releasedAtUtc) {
			return 1;
		}
		return 0;
	});

	for (const relation of relations) {
		relationsMap[relation.relevance].push(relation.title);
	}

	return (
		<DependencyOrderBlock>
			<DependencyPosterContainer>
				<LeadPoster src={title.largePosterUrl} alt={title.name} />
			</DependencyPosterContainer>
			<DependencyTabs>
				<DependencyTab titles={relationsMap.must} relevance="must" />
				<DependencyTab titles={relationsMap.should} relevance="should" />
				<DependencyTab titles={relationsMap.could} relevance="could" />
			</DependencyTabs>
		</DependencyOrderBlock>
	);
};
