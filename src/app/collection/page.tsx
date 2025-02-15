"use client";

import { CollectionCarousel } from "@/components/CollectionCarousel";
import { useCollectionContext } from "@/contexts";
import { useEffect } from "react";

export default function Collection() {
	const { collection, setCollection } = useCollectionContext();

	useEffect(() => {
		setCollection(1);
	}, [setCollection]);

	return (
		<div>
			<h1 style={{ textAlign: "center", marginBlock: "1rem" }}>
				{collection.name}
			</h1>
			<CollectionCarousel collection={collection} />
		</div>
	);
}
