import api1 from './API_V1/index';
import express, { Request, Response } from 'express';
import { formatPage } from '../Utilities/formater';
const routes = express.Router();
const pageMessage = 'Welcome to Motaz Storefront Backend Server';
routes.get('/', (request: Request, response: Response) => {
	response.send(formatPage(pageMessage)).status(200).end();
});
// prepare for Api Versions
routes.use('/api/V1', api1);

export default routes;
