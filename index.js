const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Ganti dengan port yang sesuai

// Middleware untuk mengurai body dari permintaan HTTP sebagai JSON
app.use(bodyParser.json());




// Endpoint untuk menerima pesan melalui webhook
app.post('/callback', (req, res) => {
  console.log('callback')
  try {
    const { date, device, from, message_id, source, type } = req.body;

    // Lakukan aksi berdasarkan parameter yang diterima
    switch (type) {
      case 'message':
        // Lakukan aksi untuk pesan teks
        console.log('Pesan Teks Diterima:', req.body);
        break;

      case 'image':
        // Lakukan aksi untuk gambar
        console.log('Gambar Diterima:', req.body);
        break;

      case 'video':
        // Lakukan aksi untuk video
        console.log('Video Diterima:', req.body);
        break;

      case 'document':
        // Lakukan aksi untuk dokumen
        console.log('Dokumen Diterima:', req.body);
        break;

      case 'location':
        // Lakukan aksi untuk lokasi
        console.log('Lokasi Diterima:', req.body);
        break;

      default:
        console.error('Tipe pesan yang tidak dikenali:', type);
    }

    // Berikan respons OK ke pengirim
    res.status(200).send('OK');
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(400).send('Terjadi kesalahan');
  }
});




app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html>
<head>
  <title></title>
</head>
<body>

<P>HALO SAYA RAVIT</P>
</body>
</html>`)

});

app.listen(port, () => {
  console.log(`Webhook berjalan di port ${port}`);
});



