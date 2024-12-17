import React from "react";
import { styled } from "styled-components";

const ButtonStyle = styled.button`
	background-color: rgba(255, 255, 255, 0.2);
	border-radius: 1rem;
	border: none;
	color: white;
	cursor: pointer;
	font-size: 1rem;
	padding-block: 0.75rem;
	padding-inline: 0.75rem;
	width: fit-content;
`;

interface ButtonProps {
	onClick: () => void;
	children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
	return (
		<ButtonStyle type="button" onClick={onClick}>
			{children}
		</ButtonStyle>
	);
};

export default Button;
