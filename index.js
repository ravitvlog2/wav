const express = require('express');
const bodyParser = require('body-parser');
const chalk= require('chalk')
const fs = require('fs');
const fetch = require('node-fetch');
const FormData = require('form-data');
const path = require('path');


const app = express();
const port = 3000; 


app.use(bodyParser.json());





app.post('/callback', (req, res) => {
  try {
    const { date, device, from, message_id, source, type } = req.body;
    
    switch (type) {
      case 'message':
      console.log('callback')

      let pesanditerimabos=req.body.text
      let penerimavoucher=req.body.from
      pesanditerimabos=pesanditerimabos.toLowerCase();
      
      if(pesanditerimabos=='dapatkan kupon'){

        fs.readFile('laporan.json', 'utf8', (err, data) => {
          if (err) {
            console.error('Gagal membaca file laporan.json:', err);
            return;
          }

          try {
            const jsonData = JSON.parse(data);

            const targetNumber = penerimavoucher;
            let found = false;

            jsonData.data.forEach(item => {
              if (item.nowa === targetNumber) {
                found = true;
              }
            });

            if (found) {

              console.log(`Nomor ${targetNumber} ditemukan dalam JSON.`);
              console.log(chalk.red(`${targetNumber} Kamu sudah dapat voucher sebelumnya`))

            } else {

              console.log(`Nomor ${targetNumber} tidak ditemukan dalam JSON.`);
              console.log(chalk.green('SELAMAT KAMU DAPAT KUPON => '+penerimavoucher))



            }
          } catch (parseError) {
            console.error('Gagal parsing file laporan.json:', parseError);
          }
        });

        

      }




      break;

      case 'image':
        // Lakukan aksi untuk gambar
        console.log('Gambar Diterima:', req.body);
        break;

        case 'video':
        // Lakukan aksi untuk video
        // console.log('Video Diterima:', req.body);

        break;

        case 'document':
        // Lakukan aksi untuk dokumen
        // console.log('Dokumen Diterima:', req.body);
        break;

        case 'location':
        // Lakukan aksi untuk lokasi
        // console.log('Lokasi Diterima:', req.body);
        break;

        default:
        // console.error('Tipe pesan yang tidak dikenali:', type);
      }

    // Berikan respons OK ke pengirim
    res.status(200).send('OK');
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(400).send('Terjadi kesalahan');
  }
});




app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html><html><head>  <title></title></head><body><P>HALO SAYA RAVIT</P></body></html>`)

});




app.listen(port, () => {
  console.log(`Webhook berjalan di port ${port}`);
});


