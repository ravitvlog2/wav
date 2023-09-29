const fs = require('fs');
const bwipjs = require('bwip-js');


function generateRandomTextAndNumber(length) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset.charAt(randomIndex);
  }

  return randomString;
}



for (var i = 0; i < 500; i++) {
	

const barcodeData = generateRandomTextAndNumber(16);
console.log(barcodeData);


	const barcodeOptions = {
		bcid: 'code128',  
		text: barcodeData,  
		scale: 3,  
		height: 10,  
		includetext: true,  
		textxalign: 'center',  
	};


	bwipjs.toBuffer(barcodeOptions, function(err, png) {
		if (err) {
			console.error(err);
		} else {

			fs.writeFileSync(barcodeData+'.jpg', png);
			console.log('Barcode berhasil dibuat dan disimpan sebagai barcode.jpg');
		}
	});


}