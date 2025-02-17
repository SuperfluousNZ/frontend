"use client";

import { CollectionCarousel } from "@/components/CollectionCarousel";
import { useCollectionContext } from "@/contexts";
import { PreviewTitleDto } from "@/dtos";
import { useEffect, useState } from "react";

export default function CollectionPage({
	collectionId,
}: {
	collectionId: number;
}) {
	const { collection, setCollection } = useCollectionContext();
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [selectedTitle, setSelectedTitle] = useState<PreviewTitleDto>(
		collection.titles[0],
	);

	useEffect(() => {
		setCollection(collectionId);
	}, [setCollection, collectionId]);

	useEffect(() => {
		setSelectedTitle(collection.titles[selectedIndex]);
	}, [collection.titles, selectedIndex]);

	return (
		<div>
			<h1 style={{ textAlign: "center", marginBlock: "1rem" }}>
				{collection.name}
			</h1>
			<CollectionCarousel
				collection={collection}
				selectedIndex={selectedIndex}
				setSelectedIndex={setSelectedIndex}
			/>
			<h3 style={{ textAlign: "center", marginBlock: "1rem" }}>
				{selectedTitle?.name}
			</h3>
		</div>
	);
}
