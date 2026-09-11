import ImageKit from "@imagekit/nodejs";
import fs from "fs";

export const client = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export const uploadOnImageKit = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await client.files.upload({
            file: fs.createReadStream(localFilePath),
            fileName: localFilePath.split("/").pop(),
        });

        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        console.error("ImageKit Upload Error:", error);
        return null;
    }
};