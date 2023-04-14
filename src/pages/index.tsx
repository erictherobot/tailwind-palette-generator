import { useState } from "react";
import { generatePalette } from "@/utils/palette";
import Header from "@/components/Header";
import Head from "next/head";

const IndexPage = () => {
  const [baseColor, setBaseColor] = useState("#000000");
  const [palette, setPalette] = useState(generatePalette(baseColor));

  const handleBaseColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newBaseColor = event.target.value;
    setBaseColor(newBaseColor);
    setPalette(generatePalette(newBaseColor));
  };

  const handleExport = () => {
    const config = {
      theme: {
        extend: {
          colors: {
            ...palette,
          },
        },
      },
    };
    const data = `module.exports = ${JSON.stringify(config, null, 2)}`;
    const blob = new Blob([data], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tailwind.config.js";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Head>
        <title>Tailwind Color Palette Generator</title>
        <meta
          name="description"
          content="Generate beautiful color palettes for your Tailwind CSS projects with ease. Use the color picker to select your base color, and the palette generator will generate a variety of colors for your project. Export your palette as a tailwind.config.js file with just one click. Try it out now!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-8">Tailwind Palette Generator</h1>
        <div className="w-64 mb-4">
          <label className="block font-bold mb-2" htmlFor="baseColor">
            Base Color
          </label>
          <div className="flex items-center">
            <input
              className="block w-full h-12 px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
              id="baseColor"
              type="color"
              value={baseColor}
              onChange={handleBaseColorChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-4 place-items-center">
          {Object.entries(palette).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col items-center justify-center space-y-2 p-2 border bg-gray-200 border-gray-200 rounded-lg"
            >
              <div
                className={`w-16 h-16 rounded-md bg-${key}00`}
                style={{ backgroundColor: value }}
              ></div>
              <span className="text-sm font-bold text-gray-700">{`#${value}`}</span>
            </div>
          ))}
        </div>
        <button
          className="bg-black text-white font-bold py-2 px-4 rounded mt-8"
          onClick={handleExport}
        >
          Export Tailwind Configuration
        </button>
      </div>
    </>
  );
};

export default IndexPage;
