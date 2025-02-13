"use client";

import { CollectionDto } from "@/dtos";

interface CollectionTrackProps {
	collection: CollectionDto;
	// order: ???
}

export const CollectionTrack = ({ collection }: CollectionTrackProps) => {
	return (
		<div>
			<h1>{collection.name}</h1>
			<ul>
				{collection.titles.map((title) => (
					<li key={title.id}>{title.name}</li>
				))}
			</ul>
		</div>
	);
};
