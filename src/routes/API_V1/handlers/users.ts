import express, { Request, Response } from 'express';
import { verifyAuthToken, sign } from '../../../middleware/authorize';
import { Message, Messagetype } from '../../../Utilities/formater';
import { User, UserModel } from '../../../models/user';

const store: UserModel = new UserModel();

export const users = express.Router();

// create all CRUD Operations
const index = async (_req: Request, res: Response) => {
	// authorization
	try {
		// res.send(Message('this is the INDEX route'));
		const user = await store.index();
		res.status(200);
		res.json(user);
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
		const user = await store.show(id);
		if (user === undefined) {
			res.status(400);
			return res.send(Message(`User id: ${id} - doesn't exist`, Messagetype.error));
		} else {
			res.status(200);
			res.json(user);
		}
	} catch (err) {
		res.status(400);
		res.send(Message(err, Messagetype.error));
	}
};
const create = async (req: Request, res: Response) => {
	const { firstname, lastname, password } = req.body;
	if (firstname === undefined || lastname === undefined || password === undefined) {
		res.status(400);
		return res.send(
			Message(
				'Missing or invalid parameters, this endpoint requires : firstname, lastname, password',
				Messagetype.error
			)
		);
	}
	const user: User = { firstname: firstname, lastname: lastname, password: password };
	try {
		// res.send(Message('this is the CREATE route'));
		const newUser = await store.create(user);
		// if the user exist then send the token
		const token = sign(newUser.id, firstname, lastname);
		res.status(200);
		res.json(token);
	} catch (err) {
		res.status(400);
		res.send(Message(err, Messagetype.error));
	}
};
const update = async (req: Request, res: Response) => {
	const { id, firstname, lastname, password } = req.body;
	if (id === undefined || firstname === undefined || lastname === undefined || password === undefined) {
		res.status(400);
		return res.send(
			Message(
				'Missing or invalid parameters, this endpoint requires : id, firstname, lastname, password',
				Messagetype.error
			)
		);
	}
	const user: User = { id: id, firstname: firstname, lastname: lastname, password: password };
	try {
		// res.send(Message('this is the Update route'));
		const updatedUser = await store.update(user);
		if (updatedUser === undefined) {
			res.status(400);
			return res.send(Message(`User: ${firstname}, ${lastname} - doesn't exist`, Messagetype.error));
		} else {
			res.status(200);
			res.json(updatedUser);
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
		const deletedUser = await store.delete(id);
		if (deletedUser === undefined) {
			res.status(404);
			return res.send(Message(`User id: ${id} - doesn't exist`, Messagetype.error));
		} else res.send(Message(`User id:${id} - deleted successfully`, Messagetype.success));
		// res.send(Message('this is the DELETE route'));
	} catch (err) {
		res.status(400);
		res.send(Message(err, Messagetype.error));
	}
};

const authenticate = async (req: Request, res: Response) => {
	const { firstname, lastname, password } = req.body;
	if (firstname === undefined || lastname === undefined || password === undefined) {
		res.status(400);
		return res.send(
			Message(
				'Missing/Invalid parameters, the following parameter are required: firstname, lastname, password',
				Messagetype.error
			)
		);
	}
	const user: User = { firstname, lastname, password };
	try {
		const authen = await store.authenticate(user.firstname, user.lastname, user.password);
		if (authen === null) {
			res.status(401);
			res.send(Message('Incorrect user information', Messagetype.error));
		} else {
			const token = sign(authen.id, firstname, lastname);
			res.json(token);
		}
	} catch (error) {
		res.status(401);
		res.send(Message(error, Messagetype.error));
	}
};
// Create all the CRUD API endpoints
users.get('/', verifyAuthToken, index);
users.get('/:id', verifyAuthToken, show);
users.post('/', create);
users.put('/', verifyAuthToken, update);
users.delete('/', verifyAuthToken, del);
users.post('/login', authenticate);
export default users;
