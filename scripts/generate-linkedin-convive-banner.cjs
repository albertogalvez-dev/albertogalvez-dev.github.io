const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const root = path.resolve(__dirname, "..");
const sourceRoot = "C:/Users/zoque/AppData/Local/Temp/convive-profile-review/docs/brand/assets";
const technicalReportBackground =
  "C:/Users/zoque/AppData/Local/Temp/convive-profile-review/apps/api/resources/fictional-demo-evidence/fictional-empty-corridor.png";
const output = path.join(root, "assets", "linkedin", "alberto-galvez-convive-banner.png");

const width = 1584;
const height = 396;

const overlay = Buffer.from(`
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#172B57" fill-opacity="0.79"/>
</svg>`);

async function build() {
  fs.mkdirSync(path.dirname(output), { recursive: true });

  const [background, logo, mark] = await Promise.all([
    sharp(technicalReportBackground).resize(width, height, { fit: "cover", position: "centre" }).png().toBuffer(),
    sharp(path.join(sourceRoot, "convive-logo-reversed.svg")).resize({ width: 185 }).png().toBuffer(),
    sharp(path.join(sourceRoot, "convive-mark.svg")).resize({ width: 80, height: 80 }).png().toBuffer(),
  ]);

  await sharp(background)
    .composite([
      { input: overlay, left: 0, top: 0 },
      { input: logo, left: 1308, top: 42 },
      { input: mark, left: 752, top: 158 },
    ])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(output);

  console.log(output);
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
