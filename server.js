import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import { handleProfile } from './controllers/profile.js';
import { handleRegister } from './controllers/register.js';
import { handleSignin } from './controllers/signin.js';


const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_DB,
    port: process.env.DATABASE_PORT
  }
});



const app = express();


app.use(express.json());
app.use(cors({
  origin: '*'
}))



app.get('/', (req, res,) => {
  res.send('sucesso');
})

app.post('/entrar', (req, res) => {
  { handleSignin(req, res, db, bcrypt) }
})

app.post('/registrar', (req, res) => {
  { handleRegister(req, res, db, bcrypt) }
})

app.get('/perfil/:id', (req, res) => {
  { handleProfile(req, res, db) }
})

app.listen(process.env.DATABASE_PORT || 3000, () => {
  console.log(`app is running on port ${process.env.DATABASE_PORT}`);
})