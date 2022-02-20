import express, { Request, Response } from 'express';
import { verifyAuthToken } from '../../../middleware/authorize';
import { Message, Messagetype } from '../../../Utilities/formater';
import { Order, OrderModel } from '../../../models/order';

const store: OrderModel = new OrderModel();

export const orders = express.Router();

// create all CRUD Operations
const index = async (_req: Request, res: Response) => {
	// authorization
	try {
		// res.send(Message('this is the INDEX route'));
		const order = await store.index();
		res.status(200);
		res.json(order);
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
		const order = await store.show(id);
		if (order === undefined) {
			res.status(400);
			return res.send(Message(`order id: ${id} - doesn't exist`, Messagetype.error));
		} else {
			res.status(200);
			res.json(order);
		}
	} catch (err) {
		res.status(400);
		res.send(Message(err, Messagetype.error));
	}
};
const create = async (req: Request, res: Response) => {
	const { status, user_id } = req.body;
	if (status === undefined || user_id === undefined) {
		res.status(400);
		return res.send(
			Message('Missing or invalid parameters, this endpoint requires : status, user_id', Messagetype.error)
		);
	}
	const order: Order = { status: status, user_id: user_id };
	try {
		// res.send(Message('this is the CREATE route'));
		const neworder = await store.create(order);
		res.status(200);
		res.json(neworder);
	} catch (err) {
		res.status(400);
		res.send(Message(err, Messagetype.error));
	}
};
const update = async (req: Request, res: Response) => {
	const id = Number(req.body.id);
	const status = req.body.status;
	const user_id = Number(req.body.user_id);
	if (id == undefined || status === undefined || user_id === undefined) {
		res.status(400);
		return res.send(
			Message('Missing or invalid parameters, this endpoint requires : id, status, user_id', Messagetype.error)
		);
	}
	const order: Order = { id: id, status: status, user_id: user_id };
	try {
		// res.send(Message('this is the Update route'));
		const updatedorder = await store.update(order);
		if (updatedorder === undefined) {
			res.status(400);
			return res.send(Message(`order: ${id} - doesn't exist`, Messagetype.error));
		} else {
			res.status(200);
			res.json(updatedorder);
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
		const deletedorder = await store.delete(id);
		if (deletedorder === undefined) {
			res.status(404);
			return res.send(Message(`order id: ${id} - doesn't exist`, Messagetype.error));
		} else res.send(Message(`order id:${id} - deleted successfully`, Messagetype.success));
		// res.send(Message('this is the DELETE route'));
	} catch (err) {
		res.status(400);
		res.send(Message(err, Messagetype.error));
	}
};
const addProduct = async (req: Request, res: Response) => {
	const orderId = Number(req.params.id);
	const productId = Number(req.body.product_id);
	const quantity = Number(req.body.quantity);
	if (orderId == undefined || productId === undefined || quantity === undefined) {
		res.status(400);
		return res.send(
			Message(
				'Missing or invalid parameters, this endpoint requires : order_id, product_id, quantity',
				Messagetype.error
			)
		);
	}
	try {
		const addedProduct = await store.addProduct(quantity, orderId, productId);
		if (addedProduct === undefined) {
			res.status(400);
			return res.send(
				Message(`Either order: ${orderId} or product :${productId} - doesn't exist`, Messagetype.error)
			);
		} else {
			res.status(200);
			const order = await store.show(orderId);
			res.json(order);
		}
	} catch (err) {
		res.status(400);
		res.send(Message(err, Messagetype.error));
	}
};

// Create all the CRUD API endpoints
orders.get('/', verifyAuthToken, index);
orders.get('/:id', verifyAuthToken, show);
orders.post('/', verifyAuthToken, create);
orders.put('/', verifyAuthToken, update);
orders.delete('/', verifyAuthToken, del);
orders.post('/:id/products', verifyAuthToken, addProduct);

export default orders;
