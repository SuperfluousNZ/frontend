"use client";

import { CollectionDto } from "@/dtos";
import { createContext, useCallback, useState } from "react";

interface CollectionContextType {
	collection: CollectionDto;
	setCollection: (collectionId: CollectionDto["id"]) => void;
}

const placeholderCollection: CollectionDto = {
	id: -1,
	isVerified: false,
	name: "",
	titles: [],
};

export const CollectionContext = createContext<CollectionContextType>({
	collection: placeholderCollection,
	setCollection: () => {},
});

export const CollectionProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [collection, setCollection] = useState<CollectionDto>(
		placeholderCollection,
	);

	const setCollectionById = useCallback<CollectionContextType["setCollection"]>(
		// biome-ignore lint/correctness/noUnusedVariables: TODO: implement
		async (collectionId: CollectionDto["id"]) => {
			// const response = await fetch();
			const collection = placeholderCollection;
			setCollection(collection);
		},
		[],
	);

	return (
		<CollectionContext.Provider
			value={{ collection, setCollection: setCollectionById }}
		>
			{children}
		</CollectionContext.Provider>
	);
};
