import { CommonTitleDto, DependencyOrderTitleDto, SequentialOrderTitleDto } from "@/dtos";
import { dummyCommonTitles, dummyRelations, dummySequences } from "@/util/dummyData";

export async function fetchTitle(titleId: CommonTitleDto["id"]): Promise<CommonTitleDto> {
	// const response = await fetch(`/api/...`);
	// const title = (await response.json()) as CommonTitleDto;

	const fetchedTitle = dummyCommonTitles[titleId];

	return fetchedTitle;
}

export async function fetchRelations(title: CommonTitleDto): Promise<DependencyOrderTitleDto> {
	const fetchedRelations = dummyRelations[title.id];
	return { ...title, order: "relational", relations: fetchedRelations };
}

export async function fetchSequences(title: CommonTitleDto, orderId = -1): Promise<SequentialOrderTitleDto> {
	const fetchedSequences = dummySequences[title.id][orderId];

	return {
		...title,
		order: "sequential",
		orderId,
		previous: fetchedSequences?.previous,
		next: fetchedSequences?.next,
	};
}
