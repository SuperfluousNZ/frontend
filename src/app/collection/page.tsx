"use client";

import { CollectionCarousel } from "@/components/CollectionCarousel";
import { useCollectionContext } from "@/contexts";
import { PreviewTitleDto } from "@/dtos";
import { useEffect, useState } from "react";

export default function Collection() {
	const { collection, setCollection } = useCollectionContext();
	const [selectedTitle, setSelectedTitle] = useState<PreviewTitleDto | null>(
		null,
	);

	useEffect(() => {
		setCollection(1);
	}, [setCollection]);

	return (
		<div>
			<h1 style={{ textAlign: "center", marginBlock: "1rem" }}>
				{collection.name}
			</h1>
			<CollectionCarousel
				collection={collection}
				onSelectChange={setSelectedTitle}
			/>
			<h3 style={{ textAlign: "center", marginBlock: "1rem" }}>
				{selectedTitle?.name}
			</h3>
		</div>
	);
}
