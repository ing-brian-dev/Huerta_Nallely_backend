import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from "cors";
import { connectDB } from '@/db';
import { corsConfig } from '@/lib';
import { authenticate, errorHandler, notFoundHandler } from '@/middlewares';
import { authRouter, countryRoute, customerRoute, customerTypeRoute, supplierRoute } from '@/routes';

connectDB();
export const app: Express = express();

app.use(cors(corsConfig));
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/auth', authRouter);

app.use(authenticate);
app.use('/api/v1/suppliers', supplierRoute);
app.use('/api/v1/customers', customerRoute);
app.use('/api/v1/customer-types', customerTypeRoute);
app.use('/api/v1/countries', countryRoute);

app.use(notFoundHandler);
app.use(errorHandler);
