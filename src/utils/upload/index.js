import path, { dirname, extname, join } from "path";

import { fileURLToPath } from "url";

import fs from "fs";

import multer from "multer";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

export const authorsFilePath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../services/authors/authors.json"
);

export const blogsFilePath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../services/blogs/blogs.json"
);

const publicDirectory = path.join(__dirname, "../../../public");

export const parseFile = multer();

export const uploadFile = (req, res, next) => {
  try {
    const { originalname, buffer } = req.file;
    const extension = extname(originalname);
    const fileName = `${req.params.id}${extension}`;
    const pathToFile = path.join(publicDirectory, fileName);
    fs.writeFileSync(pathToFile, buffer);
    const link = `http://localhost:3001/${fileName}`;
    req.file = link;
    next();
  } catch (error) {
    next(error);
  }
};
