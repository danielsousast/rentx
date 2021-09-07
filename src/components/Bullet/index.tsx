import React from "react";
import { ImageIndex } from "./styles";

interface Props {
  active?: boolean;
}

export default function Bullet({ active = false }: Props) {
  return <ImageIndex active={active} />;
}
