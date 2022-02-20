import express, { Request, Response } from 'express';
import { verifyAuthToken } from '../../../middleware/authorize';
import { Message, Messagetype } from '../../../Utilities/formater';
import { Product, ProductModel } from '../../../models/product';

const store: ProductModel = new ProductModel();

export const products = express.Router();

// create all CRUD Operations
const index = async (_req: Request, res: Response) => {
	// authorization
	try {
		// res.send(Message('this is the INDEX route'));
		const product = await store.index();
		res.status(200);
		res.json(product);
	} catch (err) {
		res.status(400);
		res.send(Message(err, Messagetype.error));
	}
};

const show = async (req: Request, res: Response) => {
	// authorization
	const id = Number(req.params.id);
	if (id === undefined) {
		res.status(400);
		return res.send(
			Message(
				'Missing or invalid parameter, this endpoint requires the following parameter: id',
				Messagetype.error
			)
		);
	}
	try {
		// res.send(Message('this is the Show route'));
		const product = await store.show(id);
		if (product === undefined) {
			res.status(400);
			return res.send(Message(`product id: ${id} - doesn't exist`, Messagetype.error));
		} else {
			res.status(200);
			res.json(product);
		}
	} catch (err) {
		res.status(400);
		res.send(Message(err, Messagetype.error));
	}
};
const create = async (req: Request, res: Response) => {
	const { name, category } = req.body;
	const price = Number(req.body.price);
	if (name === undefined || price === undefined || category === undefined) {
		res.status(400);
		return res.send(
			Message('Missing or invalid parameters, this endpoint requires : name, price, category', Messagetype.error)
		);
	}
	const product: Product = { name: name, price: price, category: category };
	try {
		// res.send(Message('this is the CREATE route'));
		const newProduct = await store.create(product);
		res.status(200);
		res.json(newProduct);
	} catch (err) {
		res.status(400);
		res.send(Message(err, Messagetype.error));
	}
};
const update = async (req: Request, res: Response) => {
	const { name, category } = req.body;
	const id = Number(req.body.id);
	const price = Number(req.body.price);
	if (id === undefined || name === undefined || price === undefined || category === undefined) {
		res.status(400);
		return res.send(
			Message(
				'Missing or invalid parameters, this endpoint requires : id, name, price, category',
				Messagetype.error
			)
		);
	}
	const product: Product = { id: id, name: name, price: price, category: category };
	try {
		// res.send(Message('this is the Update route'));
		const updatedproduct = await store.update(product);
		if (updatedproduct === undefined) {
			res.status(400);
			return res.send(Message(`product: ${name} - doesn't exist`, Messagetype.error));
		} else {
			res.status(200);
			res.json(updatedproduct);
		}
	} catch (err) {
		res.status(400);
		res.send(Message(err, Messagetype.error));
	}
};
const del = async (req: Request, res: Response) => {
	const id = Number(req.body.id);
	if (id === undefined) {
		res.status(400);
		return res.send(
			Message(
				'Missing or invalid parameter, this endpoint requires the following parameter: id',
				Messagetype.error
			)
		);
	}

	try {
		const deletedproduct = await store.delete(id);
		if (deletedproduct === undefined) {
			res.status(404);
			return res.send(Message(`product id: ${id} - doesn't exist`, Messagetype.error));
		} else res.send(Message(`product id:${id} - deleted successfully`, Messagetype.success));
		// res.send(Message('this is the DELETE route'));
	} catch (err) {
		res.status(400);
		res.send(Message(err, Messagetype.error));
	}
};

// Create all the CRUD API endpoints
products.get('/', index);
products.get('/:id', show);
products.post('/', verifyAuthToken, create);
products.put('/', verifyAuthToken, update);
products.delete('/', verifyAuthToken, del);

export default products;
