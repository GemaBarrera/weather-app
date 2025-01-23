"use client";

import { GlobalStyles } from "./styles/GlobalStyles";
import { WeatherTool } from "./components";

export default function Home() {
  return (
    <>
      <GlobalStyles />
      <WeatherTool />
    </>
  );
}
