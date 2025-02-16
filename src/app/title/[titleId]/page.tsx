import TitlePage from "./title";

export default async function Title({
	params,
}: {
	params: Promise<{ titleId: number }>;
}) {
	const { titleId } = await params;
	return <TitlePage titleId={titleId} />;
}
