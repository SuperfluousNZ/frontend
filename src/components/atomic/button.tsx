import React from "react";
import { styled } from "styled-components";

const ButtonStyle = styled.button`
	align-items: center;
	background-color: rgba(255, 255, 255, 0.2);
	border-radius: 1rem;
	border: none;
	color: white;
	cursor: pointer;
	display: flex;
	flex-direction: row;
	font-size: 1rem;
	gap: 0.5rem;
	padding-block: 0.75rem;
	padding-inline: 0.75rem;
	width: fit-content;

	// TODO: make the icon the same size as the text
`;

interface ButtonProps {
	onClick: () => void;
	icon?: React.ReactNode;
	children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, icon, children }) => {
	return (
		<ButtonStyle type="button" onClick={onClick}>
			{icon}
			{children}
		</ButtonStyle>
	);
};

export default Button;
