const https = require('https');
const baseUrl = 'https://raw.githubusercontent.com/developerY/LunaSea/main/';

function get(path) {
  return new Promise((resolve) => {
    https.get(baseUrl + path, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

async function main() {
  const files = [
    'src/data/products.ts',
    'src/components/HeroSection.tsx',
    'src/components/HarmoniousCategories.tsx',
    'src/components/Header.tsx',
    'src/components/Footer.tsx',
    'src/components/ScienceMatrixSection.tsx',
    'src/components/PressAndReviewsSection.tsx',
    'src/components/TidalPrescriptionQuiz.tsx',
    'src/screens/AboutUsScreen.tsx',
    'src/screens/SkincareScreen.tsx',
    'src/screens/LunarMakeupScreen.tsx',
    'src/screens/TidalRitualsScreen.tsx',
    'src/screens/AlgaeScienceScreen.tsx'
  ];

  for (const f of files) {
    const text = await get(f);
    const urls = text.match(/https:\/\/[^\s"'`)]+/g) || [];
    const localAssets = text.match(/\/assets\/[^\s"'`)]+/g) || [];
    console.log('=== ' + f + ' ===');
    const all = [...new Set([...urls, ...localAssets])];
    console.log(all);
  }
}

main();
