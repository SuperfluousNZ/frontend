"use client";

import {
	CommonTitleDto,
	DependencyOrderTitleDto,
	Relation,
	Sequence,
	SequentialOrderTitleDto,
	TitleDto,
} from "@/dtos";
import {
	dummyCommonTitles,
	dummyRelations,
	dummySequences,
} from "@/util/dummyData";
import { createContext, useCallback, useContext, useState } from "react";

interface TitleContextType {
	title: CommonTitleDto;
	setTitle: (titleId: TitleDto["id"]) => void;
	getRelations: () => Promise<DependencyOrderTitleDto>;
	getSequences: (orderId?: number) => Promise<SequentialOrderTitleDto>;
	getTitleById: (titleId: TitleDto["id"]) => void;
}

const placeholderTitle: CommonTitleDto = {
	id: -1,
	name: "",
	type: "movie",
};

export const TitleContext = createContext<TitleContextType>({
	title: placeholderTitle,
	setTitle: () => {},
	getRelations: async () => ({
		...placeholderTitle,
		order: "relational",
		relations: [],
	}),
	getSequences: async () => ({
		...placeholderTitle,
		order: "sequential",
		orderId: -1,
		previous: undefined,
		next: undefined,
	}),
	getTitleById: () => {},
});

export const TitleProvider = ({ children }: { children: React.ReactNode }) => {
	const [title, setTitle] = useState<CommonTitleDto>(placeholderTitle);

	const [relations, setRelations] = useState<Relation[] | null>(null);
	// An orderId of -1 is reserved for the release order
	const [sequences, setSequences] = useState<Record<number, Sequence>>({});

	const setTitleById = useCallback<TitleContextType["setTitle"]>(
		// biome-ignore lint/correctness/noUnusedVariables: TODO: implement
		async (titleId: TitleDto["id"]) => {
			// const response = await fetch(`/api/...`);
			// const title = (await response.json()) as CommonTitleDto;
			const title = dummyCommonTitles[5];
			setTitle(title);
		},
		[],
	);

	const getTitleById = useCallback<TitleContextType["setTitle"]>(
		// biome-ignore lint/correctness/noUnusedVariables: placeholder
		async (titleId: TitleDto["id"]) => {
			// const response = await fetch(`/api/...`);
			// const title = (await response.json()) as CommonTitleDto;
			const title = dummyCommonTitles[5];
			setTitle(title);
		},
		[],
	);

	const getRelations = useCallback<TitleContextType["getRelations"]>(
		async (titleId?: TitleDto["id"]) => {
			if (titleId && titleId !== title.id) {
				const fetchedRelations = dummyRelations[titleId];
				return { ...title, order: "relational", relations: fetchedRelations };
			}

			if (relations === null) {
				const fetchedRelations = dummyRelations[5];
				setRelations(fetchedRelations);
				setSequences({});
				return { ...title, order: "relational", relations: fetchedRelations };
			}

			return { ...title, order: "relational", relations: relations ?? [] };
		},
		[title, relations],
	);

	const getSequences = useCallback<TitleContextType["getSequences"]>(
		async (orderId = -1, titleId?: TitleDto["id"]) => {
			let fetchedSequences = sequences[orderId];
			if (titleId && titleId !== title.id) {
				fetchedSequences = dummySequences[titleId][orderId];
			} else if (!fetchedSequences) {
				fetchedSequences = dummySequences[5][orderId];
				setSequences((prev) => ({ ...prev, [orderId]: fetchedSequences }));
			}
			return {
				...title,
				order: "sequential",
				orderId,
				previous: fetchedSequences?.previous,
				next: fetchedSequences?.next,
			};
		},
		[title, sequences],
	);

	return (
		<TitleContext.Provider
			value={{
				title,
				setTitle: setTitleById,
				getRelations,
				getSequences,
				getTitleById,
			}}
		>
			{children}
		</TitleContext.Provider>
	);
};

export const useTitleContext = () => useContext(TitleContext);
