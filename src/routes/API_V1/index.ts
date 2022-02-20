// Route to handle API endpoints
import users from './handlers/users';
import products from './handlers/products';
import orders from './handlers/orders';

import express, { Request, Response } from 'express';
import { formatPage } from '../../Utilities/formater';
const API_V1 = express.Router();
const pageMessage = 'Welcome to API Section </h1> <p> Available APIs :<ul><li>  </li></ul>';
API_V1.get('/', (request: Request, response: Response) => {
	response.send(formatPage(pageMessage));
});
API_V1.use('/user', users);
API_V1.use('/product', products);
API_V1.use('/order', orders);

export default API_V1;
