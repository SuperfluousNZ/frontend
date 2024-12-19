"use client";

import { CommonTitleDto, TitleDto } from "@/dtos";
import { createContext, useCallback, useContext, useState } from "react";

const dummyTitle: CommonTitleDto = {
	id: 0,
	name: "The Avengers",
	type: "movie",
	smallPosterUrl:
		"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
	releasedAtUtc: new Date("2012-04-25"),
	largePosterUrl:
		"https://image.tmdb.org/t/p/original/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
	description:
		"When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins!",
	tmdbId: 24428,
};

interface TitleContextType {
	orderId?: number | null;
	orderType: "sequential" | "relational";
	title: CommonTitleDto;
	setOrderId?: (orderId: number | null) => void;
	setOrderType: (orderType: "sequential" | "relational") => void;
	setTitle: (titleId: TitleDto["id"]) => void;
}

export const TitleContext = createContext<TitleContextType>({
	title: {
		id: -1,
		name: "",
		type: "movie",
	},
	setTitle: () => {},
	orderType: "relational",
	setOrderType: () => {},
});

export const TitleProvider = ({ children }: { children: React.ReactNode }) => {
	const [title, setTitle] = useState<CommonTitleDto>({
		id: -1,
		name: "",
		type: "movie",
	});

	const [orderType, setOrderType] = useState<"sequential" | "relational">(
		"relational",
	);
	const [orderId, setOrderId] = useState<number | null>(null);

	const setTitleById = useCallback<TitleContextType["setTitle"]>(
		// biome-ignore lint/correctness/noUnusedVariables: TODO: implement
		async (titleId: TitleDto["id"]) => {
			// const response = await fetch(`/api/title/${titleId}`);
			// const title = (await response.json()) as CommonTitleDto;
			const title = dummyTitle;
			setTitle(title);
		},
		[],
	);

	return (
		<TitleContext.Provider
			value={{
				title,
				setTitle: setTitleById,
				orderType,
				setOrderType,
				orderId,
				setOrderId,
			}}
		>
			{children}
		</TitleContext.Provider>
	);
};

export const useTitleContext = () => useContext(TitleContext);
