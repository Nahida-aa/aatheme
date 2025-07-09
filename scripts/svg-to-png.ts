// deno

import sharp from "sharp";
import * as fs from "node:fs";


async function convertSvgToPng() {
  try {
    const svgBuffer = fs.readFileSync('./icon.svg');
    
    await sharp(svgBuffer)
      .resize(128, 128)
      .png()
      .toFile('./icon.png');
    
    console.log('Icon converted successfully: icon.png');
  } catch (error) {
    console.error('Error converting SVG to PNG:', error);
  }
}

convertSvgToPng();