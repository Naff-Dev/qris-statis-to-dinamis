const QRCode = require('qrcode');
const Jimp = require('jimp');

function toCRC16(str) {
  let crc = 0xFFFF;
  for (let c = 0; c < str.length; c++) {
    crc ^= str.charCodeAt(c) << 8;
    for (let i = 0; i < 8; i++) {
      crc = (crc & 0x8000) ? (crc << 1) ^ 0x1021 : crc << 1;
    }
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, "0");
}

async function qrisDinamis(qris_string, nominal, { base64 = false, path = 'qris.png' } = {}) {
  try {
    if (!qris_string) throw new Error("QRIS string tidak boleh kosong");

    let qris2 = qris_string.slice(0, -4);
    let replaceQris = qris2.replace("010211", "010212");
    let pecahQris = replaceQris.split("5802ID");
    let uang = "54" + ("0" + nominal.length).slice(-2) + nominal + "5802ID";
    
    let output = pecahQris[0] + uang + pecahQris[1] + toCRC16(pecahQris[0] + uang + pecahQris[1]);

    // Generate QR Code dalam buffer
    const qrBuffer = await QRCode.toBuffer(output, { margin: 2, scale: 12 });
    const qrImage = await Jimp.read(qrBuffer);

    // Atur ukuran baru untuk padding dan border
    const borderSize = 15;
    const textHeight = 50; // Ruang untuk watermark
    const paddingAtas = 20; // Jarak antara teks dan bagian atas gambar
    const newWidth = qrImage.bitmap.width + borderSize * 2;
    const newHeight = qrImage.bitmap.height + borderSize * 2 + textHeight + paddingAtas;

    // Buat gambar baru dengan latar putih
    const image = new Jimp(newWidth, newHeight, 0xffffffff);

    // Tempatkan QR Code lebih ke bawah agar ada jarak dari watermark
    image.composite(qrImage, borderSize, borderSize + textHeight + paddingAtas);

    // Tambahkan garis hitam estetis sekeliling QR
    image.scan(0, 0, newWidth, newHeight, function (x, y, idx) {
      if (x < borderSize || x >= newWidth - borderSize || y < borderSize || y >= newHeight - borderSize) {
        this.bitmap.data[idx] = 0;     // R
        this.bitmap.data[idx + 1] = 0; // G
        this.bitmap.data[idx + 2] = 0; // B
      }
    });

    // Load font untuk watermark (bold & besar)
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    image.print(font, 0, borderSize + paddingAtas, {
      text: "QRIS DINAMIS BY NAFF-DEV",
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
    }, newWidth);

    if (base64) {
      return await image.getBase64Async(Jimp.MIME_JPEG);
    } else {
      await image.writeAsync(path);
      return path;
    }
  } catch (error) {
    throw new Error("Gagal membuat QRIS: " + error.message);
  }
}

module.exports = { qrisDinamis };
