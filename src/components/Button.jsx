import React from "react";
import styled from "styled-components";

const Btn = styled.button`
  background-color: var(--global-button-color);
  border-radius: var(--global-radius);
  border: var(--global-border);
  color: #ffffff;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  justify-content: center;
  transition: all 0.3s ease-out;
  &:hover {
    background-color: var(--global-button-color-hover);
    border: var(--global-border-hover);
  }
  &:active {
    background-color: var(--global-button-color-active);
  }
`;

export default function Button({ text }) {
  return <Btn>{text}</Btn>;
}
