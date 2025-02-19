"use client";

import { CollectionCarousel } from "@/components/CollectionCarousel";
import { PageLayout } from "@/components/layout";
import { useCollectionContext } from "@/contexts";
import { PreviewTitleDto } from "@/dtos";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

// This container is needed to extend the width to the edges of the screen, outside the PageLayout.
// TODO: Update page layout to use grid.
const CarouselContainer = styled.div` 
	width: 100vw;
	margin-left: calc(-50vw + 50%);
`;

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
		<PageLayout>
			<h1 style={{ textAlign: "center", marginBlock: "1rem" }}>
				{collection.name}
			</h1>
			<CarouselContainer>
				<CollectionCarousel
					collection={collection}
					selectedIndex={selectedIndex}
					setSelectedIndex={setSelectedIndex}
				/>
			</CarouselContainer>
			<h3 style={{ textAlign: "center", marginBlock: "1rem" }}>
				{selectedTitle?.name}
			</h3>
		</PageLayout>
	);
}
