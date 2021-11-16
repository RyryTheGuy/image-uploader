import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import config from '../utils/config';

const app = initializeApp(config.FIREBASE_CONFIG);
const storage = getStorage(app);

export default storage;