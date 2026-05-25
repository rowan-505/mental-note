import QRCode from "qrcode";

const demoUrl = "https://mental-note-psi.vercel.app/journal/analysis";

await QRCode.toFile("public/demo-qr.png", demoUrl, {
  width: 900,
  margin: 2,
  errorCorrectionLevel: "H",
});

console.log(`QR code generated for: ${demoUrl}`);