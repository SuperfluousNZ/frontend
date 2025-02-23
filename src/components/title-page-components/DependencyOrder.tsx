import {
	DependencyOrderTitleDto,
	PreviewTitleDto,
	RelationRelevance,
} from "@/dtos";
import { usePathname } from "next/navigation";
import { styled } from "styled-components";
import { Poster } from "../atomic";

const DependencyOrderBlock = styled.div`
	display: grid;
	gap: 2rem;
	grid-template-columns: 2fr 5fr;
`;

const PrimaryPoster = styled(Poster)`
	max-width: 100%;
`;

const DependencyPoster = styled(Poster)`
	width: 4.5rem;
	border-radius: 0.5rem;
`;

const DependencyTabs = styled.div`
	display: grid;
	grid-template-rows: 1fr 1fr 1fr;
	row-gap: 1rem;
`;

const DependencyTabStyle = styled.div`
	background-color: rgba(255, 255, 255, 0.2);
	border-radius: 1rem;
	display: flex;
	flex-direction: row;
	gap: 1rem;
	padding: 0.75rem;
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

interface DependencyOrderProps {
	title: DependencyOrderTitleDto;
}

interface DependencyTabProps {
	titles: PreviewTitleDto[];
	relevance: RelationRelevance;
	currentPath: string;
}

function DependencyTab({ titles, relevance, currentPath }: DependencyTabProps) {
	return (
		<DependencyTabStyle>
			{titles.map((title) => (
				<DependencyPoster
					key={title.id}
					src={title.smallPosterUrl}
					alt={title.name}
					href={`${currentPath}/relevance/${title.id}`}
				/>
			))}
			<p>{relevance}</p>
		</DependencyTabStyle>
	);
}

export const DependencyOrder: React.FC<DependencyOrderProps> = ({ title }) => {
	const currentPath = usePathname();

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
			<PrimaryPoster
				src={title.largePosterUrl}
				alt={title.name}
				borderRadius="1rem"
			/>
			<DependencyTabs>
				{[
					{ titles: relationsMap.must, relevance: "must" },
					{ titles: relationsMap.should, relevance: "should" },
					{ titles: relationsMap.could, relevance: "could" },
				].map((props) => (
					<DependencyTab
						key={props.relevance}
						titles={props.titles}
						relevance={props.relevance as RelationRelevance}
						currentPath={currentPath}
					/>
				))}
			</DependencyTabs>
		</DependencyOrderBlock>
	);
};
