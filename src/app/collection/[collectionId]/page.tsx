import CollectionPage from "./collection";

export default async function Collection({
	params,
}: {
	params: Promise<{ collectionId: number }>;
}) {
	const { collectionId } = await params;
	return <CollectionPage collectionId={collectionId} />;
}
