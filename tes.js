const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

// Fungsi untuk mendapatkan daftar file dalam folder "data"
function getRandomImageFile() {
  const dataFolder = './data';
  const files = fs.readdirSync(dataFolder);
  const randomIndex = Math.floor(Math.random() * files.length);
  return path.join(dataFolder, files[randomIndex]);
}

// Fungsi untuk mengirim gambar ke waapisender.id
async function sendImageToApi(imagePath) {
  const url = 'https://waapisender.id/api/upload';
  const imageBuffer = fs.readFileSync(imagePath);
  const imageBase64 = imageBuffer.toString('base64');
  const data = {
    api_key: 'jafZOL7IkrKzfqzUXLcX43HiFJwGqC1L',
    device_key: 'qfc2oj',
    destination: destinationOrGroupId,
    image: imageBase64,
    filename: filename,
    caption: caption,
  };

  try {


    const response = await fetch(url, {
      method: 'POST',
      body: form,
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY', // Ganti dengan API key Anda
      },
    });

    if (response.status === 200) {
      console.log('Gambar berhasil terkirim ke waapisender.id');
      return true;
    } else {
      console.error('Gagal mengirim gambar ke waapisender.id');
      return false;
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    return false;
  }
}

// Fungsi untuk memindahkan gambar ke folder "report"
function moveImageToReportFolder(imagePath) {
  const reportFolder = './report';
  const fileName = path.basename(imagePath);
  const newPath = path.join(reportFolder, fileName);
  fs.renameSync(imagePath, newPath);
  console.log(`Gambar dipindahkan ke folder "report" dengan nama ${fileName}`);
}





function addToReport(data) {
  const reportPath = './laporan.json';
  let reportData = { data: [] };

  try {
    // Coba baca data laporan jika sudah ada
    const existingData = fs.readFileSync(reportPath, 'utf8');
    reportData = JSON.parse(existingData);
  } catch (error) {
    // File "laporan.json" belum ada atau terdapat kesalahan saat membaca
  }

  reportData.data.push(data);

  fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
  console.log('Data berhasil ditambahkan ke laporan.json');
}












// Langkah utama
const randomImageFile = getRandomImageFile();
if (randomImageFile) {
  sendImageToApi(randomImageFile)
  .then((success) => {
    if (success) {
      const dataToAdd = {
        kodevoucher: 'gdfhjsfg6sdfugs', 
        nowa: '0812312312', 
        tanggal: '', 
        status: 'sukses',
      };
      addToReport(dataToAdd);
      moveImageToReportFolder(randomImageFile);
    }

  });
} else {

  const dataToAdd = {
    kodevoucher: 'gdfhjsfg6sdfugs', 
    nowa: '0812312312', 
    tanggal: '', 
    status: 'Voucher Habis',
  };
  addToReport(dataToAdd);

  console.log('Voucher Sudah Habis')
  console.error('Folder "data" tidak berisi gambar.');
}
