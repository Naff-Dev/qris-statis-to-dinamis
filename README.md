# qris-dinamis

**qris-dinamis** adalah modul Node.js untuk membuat QRIS Dinamis secara otomatis dengan perhitungan **CRC16**. Modul ini juga menambahkan watermark **"QRIS DINAMIS BY NAFF-DEV"** di atas QR Code dengan garis hitam estetis di sekelilingnya.

## 📦 Instalasi

Gunakan npm untuk menginstal modul ini:

```sh
npm install qris-statis-to-dinamis
```

## 🚀 Penggunaan

### Import Modul

```javascript
const { qrisDinamis } = require('qris-statis-to-dinamis');
```

### 🔹 Generate QRIS Dinamis

#### 📌 1. Menyimpan QR Code ke File

```javascript
(async () => {
    try {
        let qrisString = "000201010211..."; // Gantilah dengan string QRIS yang valid
        let nominal = "10000"; // Nominal dalam Rupiah
        let filePath = "./qris_output.png";

        let result = await qrisDinamis(qrisString, nominal, { path: filePath });
        console.log("QRIS berhasil dibuat di:", result);
    } catch (error) {
        console.error(error);
    }
})();
```

#### 📌 2. Menghasilkan QR Code dalam Format Base64

```javascript
(async () => {
    try {
        let qrisString = "000201010211..."; // Gantilah dengan string QRIS yang valid
        let nominal = "50000";

        let base64String = await qrisDinamis(qrisString, nominal, { base64: true });
        console.log("Base64 QRIS:", base64String);
    } catch (error) {
        console.error(error);
    }
})();
```

## ⚙️ Opsi Konfigurasi

| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `qris_string` | `string` | String QRIS yang valid. |
| `nominal` | `string` | Nominal dalam format string, contoh: "10000". |
| `path` | `string` *(opsional)* | Lokasi penyimpanan file QR Code. Default: `qris.png`. |
| `base64` | `boolean` *(opsional)* | Jika `true`, mengembalikan string Base64 dari QR Code. Default: `false`. |

## 🎯 Fitur Utama

✅ **QRIS Dinamis dengan CRC16**  
✅ **Watermark "QRIS DINAMIS BY NAFF-DEV" dengan garis hitam estetis**  
✅ **Mendukung format file dan Base64**  
✅ **Padding untuk menjaga jarak watermark dari bagian atas gambar**  

## 📜 Lisensi

Proyek ini dirilis di bawah lisensi **MIT**.

---

**Dibuat oleh: NAFF-DEV** 🚀
