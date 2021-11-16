import firebaseStorage from '../utils/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { File } from 'formidable';
import fs from 'fs';
import { randomUUID } from 'crypto';
import { FirebaseError } from '@firebase/util';

const storage = firebaseStorage;

export const uploadFile = async (file: File) => {  
  // Save the image to the storage with a random UUID
  const imageRef = ref(storage, randomUUID());

  // Get the image contents
  const rawFile: Buffer = fs.readFileSync(file.filepath);

  try {
    // Upload the image telling firebase what kind of image it is
    await uploadBytes(imageRef, rawFile, { contentType: file.mimetype ?? undefined });
    return getDownloadURL(imageRef)
      .then(url => url)
      .catch(error => new FirebaseError('500', `Unable to get the url for the image: ${error}`)); 
  } catch (error: any) {
    throw new FirebaseError('400', `Unable to upload image to storage: ${error}`);
  }
};