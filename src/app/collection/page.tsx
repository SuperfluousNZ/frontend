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
			<h1>Collection</h1>
			<CollectionTrack collection={collection} />
		</div>
	);
}
