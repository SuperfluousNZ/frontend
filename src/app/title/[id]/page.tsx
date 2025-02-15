import TitlePage from "./title";

export default async function Title({
	params,
}: {
	params: Promise<{ id: number }>;
}) {
	const { id } = await params;
	return <TitlePage id={id} />;
}
