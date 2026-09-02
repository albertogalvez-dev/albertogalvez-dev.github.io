const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const root = path.resolve(__dirname, "..");
const brandAssets = "C:/Users/zoque/AppData/Local/Temp/convive-profile-review/docs/brand/assets";
const corridor =
  "C:/Users/zoque/AppData/Local/Temp/convive-profile-review/apps/api/resources/fictional-demo-evidence/fictional-empty-corridor.png";
const output = path.join(root, "assets", "linkedin", "convive-featured-thumbnail.png");

const width = 1200;
const height = 627;

const overlay = Buffer.from(`
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#172B57" fill-opacity="0.78"/>
</svg>`);

async function build() {
  fs.mkdirSync(path.dirname(output), { recursive: true });
  const [background, logo, mark] = await Promise.all([
    sharp(corridor).resize(width, height, { fit: "cover", position: "centre" }).png().toBuffer(),
    sharp(path.join(brandAssets, "convive-logo-reversed.svg")).resize({ width: 220 }).png().toBuffer(),
    sharp(path.join(brandAssets, "convive-mark.svg")).resize({ width: 106, height: 106 }).png().toBuffer(),
  ]);

  await sharp(background)
    .composite([
      { input: overlay, left: 0, top: 0 },
      { input: logo, left: 86, top: 72 },
      { input: mark, left: 547, top: 260 },
    ])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(output);

  console.log(output);
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
