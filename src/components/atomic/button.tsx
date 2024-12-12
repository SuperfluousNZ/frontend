import React from "react";
import { styled } from "styled-components";

const ButtonStyle = styled.button``;

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
