import {uploadImage} from "@/server/actions/images";

export const nextAdminUploadImage = async (buffer, infos, context) => {
  return uploadImage(buffer, infos)
}