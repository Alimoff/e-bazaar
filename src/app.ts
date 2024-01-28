import express, { Application } from 'express';
import cors from 'cors';
import cokierPreser from 'cookie-parser';
import morgan from 'morgan';
import { router } from './routes';
const LocalStrategy = require("passport-local").Strategy;
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();



import { UserModel } from './database/models/user';

const app: Application = express();

const secret_key:any = process.env.SECRET_KEY;
//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(session({secret: secret_key, resave: true, saveUninitialized: true}));


// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
//registretion router
app.use(router);

//regiteriation cokies
app.use(cokierPreser());


export { app }
