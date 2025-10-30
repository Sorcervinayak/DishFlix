const ImageKit = require('imagekit'); // ✅ lowercase 'k'
//here we need not to directly wirte these for a safety purpose
const imageKit = new ImageKit({
  publicKey: "process.env.IMAGE_KIT_PUBLIC_KEY",
  privateKey: "process.env.IMAGE_KIT_PRIVATE_KEY",
  urlEndpoint: "process.env.IMAGE_KIT_URL_ENDPOINT",
});

async function uploadFile(file, fileName) {
  try {
    const result = await imageKit.upload({
      file: file, // file buffer (Base64 string or URL)
      fileName: fileName,
    });

    return result.url;
  } catch (error) {
    console.error("Error uploading to ImageKit:", error.message);
    throw error;
  }
}

module.exports = { uploadFile };
