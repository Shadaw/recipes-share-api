import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import './database';
import uploadConfig from './config/upload';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(cors());
app.use(routes);

app.listen(process.env.PORT || 3333, () => {
  console.log(`Server listen on port 3333`);
});
