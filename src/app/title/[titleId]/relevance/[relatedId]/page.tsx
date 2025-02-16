import SummaryPage from "./summary";

export default async function Summary({
	params,
}: {
	params: Promise<{ titleId: number; relatedId: number }>;
}) {
	const { titleId, relatedId } = await params;
	return <SummaryPage titleId={titleId} relatedId={relatedId} />;
}
