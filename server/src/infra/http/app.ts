import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { router } from '@infra/http/routes'

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

export { app };
