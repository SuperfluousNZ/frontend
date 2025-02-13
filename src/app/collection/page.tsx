"use client";

import { CollectionTrack } from "@/components/CollectionTrack";
import { useCollectionContext } from "@/contexts";
import { useEffect } from "react";

export default function Collection() {
	const { collection, setCollection } = useCollectionContext();

	useEffect(() => {
		setCollection(1);
	}, [setCollection]);

	return (
		<div>
			<h1>{collection.name}</h1>
			<CollectionTrack collection={collection} />
		</div>
	);
}
