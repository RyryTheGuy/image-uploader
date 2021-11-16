import express from 'express';
import { Formidable } from 'formidable';
import IncomingForm from 'formidable/Formidable';
import { uploadFile } from '../services/firebaseStorage';

const router = express.Router();

router.post('/', (request, response, next) => {
  const form: IncomingForm = new Formidable();

  form.parse(request, (error: Error, _fields, _files) => {
    if (error) {
      next(error);
    }
  });
  
  form.on('file', (_formname, file) => {
    uploadFile(file)
      .then(imageUrl => {
        return response.status(200).json(imageUrl);
      })
      .catch(error => next(error));
  });
});

export default router;