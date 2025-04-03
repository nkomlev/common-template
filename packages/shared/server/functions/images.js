'use server';
import fs from "fs";
import path from "path";

const GET_IMAGE_API_ROUTE = '/api/uploads/';
const UPLOAD_FOLDER = 'uploads';

export const uploadImage = async (buffer, infos, context) => {
  try {
    const url = `${GET_IMAGE_API_ROUTE}${Date.now()}-${infos.name}`;
    fs.writeFileSync(`./../../${UPLOAD_FOLDER}/${Date.now()}-${infos.name}`, buffer);
    console.log(`Uploaded image: ${UPLOAD_FOLDER}/${Date.now()}-${infos.name}`)
    return url;
  } catch (e) {
    console.log(e);
  }
}

export const deleteImage = async (url) => {
  try {
    const image = url.replace('/api/', '');
    const filePath = path.join(`./../../${image}`);
    fs.unlinkSync(filePath);
    console.log('Deleted image: ', image)
    return true;
  } catch (e) {
    console.log(e);
    return false
  }
}