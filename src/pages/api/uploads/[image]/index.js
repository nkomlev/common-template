import fs from 'fs';
import path from 'path';

// роут для получения изображения
export default function handler(req, res) {
  try {
    const { image } = req.query;
    const filePath = path.join('uploads/' + image)

    const imageBuffer = fs.readFileSync(filePath)
    res.setHeader('Content-Type', 'image/jpg')
    res.send(imageBuffer)
  } catch (e) {
    console.log(e);
  }
}