import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (locaFilePath) => {
  try {
    if (!locaFilePath) return null;
    // upload the file cloudinary
    const response = await cloudinary.uploader.upload(locaFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfully
    console.log("file is uploaded on cloudinary", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(locaFilePath); // remove the locally saved temporary file as the upload operation failed
    return null;
  }
};

export { uploadOnCloudinary };
