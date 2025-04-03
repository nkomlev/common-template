import fs from "fs";

const GET_IMAGE_API_ROUTE = '/api/uploads/';
const UPLOAD_FOLDER = 'uploads';

export const nextAdminUploadImage = async (buffer, infos, context) => {
  try {
    const url = `${GET_IMAGE_API_ROUTE}${Date.now()}-${infos.name}`;
    fs.writeFileSync(`./${UPLOAD_FOLDER}/${Date.now()}-${infos.name}`, buffer);
    console.log(`Uploaded image: ${UPLOAD_FOLDER}/${Date.now()}-${infos.name}`)
    return url;
  } catch (e) {
    console.log(e);
  }
}