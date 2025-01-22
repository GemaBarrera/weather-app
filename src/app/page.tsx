"use client";

import { GlobalStyles } from "./styles/GlobalStyles";
import WeatherTool from "./components/WeatherTool";

export default function Home() {
  return (
    <>
      <GlobalStyles />
      <WeatherTool />
    </>
  );
}
