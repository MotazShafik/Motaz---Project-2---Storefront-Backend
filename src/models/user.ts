import dbConnect from './dbConnect';
import bcrypt from 'bcrypt';
import { saltRounds, pepper } from '../config';

export type User = {
	id?: number;
	firstname: string;
	lastname: string;
	password: string;
};
export class UserModel {
	sql = '';
	// CRUD Operations
	// Create
	async create(user: User): Promise<User> {
		this.sql = 'INSERT INTO users (firstname, lastname,password_digest) VALUES($1, $2, $3) RETURNING *';
		const errMsg = `Could not create User: ${user.firstname}`;
		const codedPassword = bcrypt.hashSync(user.password + pepper, Number(saltRounds));
		try {
			return await dbConnect(this.sql, [ user.firstname, user.lastname, codedPassword ], errMsg);
		} catch (err) {
			throw new Error(`${errMsg}. ${err}`);
		}
	}

	// Read
	async index(): Promise<User[]> {
		this.sql = `SELECT * FROM users ORDER BY id ASC`;
		const errMsg = 'Could not get Users';
		try {
			return await dbConnect(this.sql, [], errMsg);
		} catch (err) {
			throw new Error(`${errMsg}. ${err}`);
		}
	}

	async show(id: number): Promise<User> {
		this.sql = 'SELECT * FROM users WHERE id=($1)';
		const errMsg = `Could not find User: ${id}`;
		try {
			return await dbConnect(this.sql, [ id ], errMsg);
		} catch (err) {
			throw new Error(`${errMsg}. ${err}`);
		}
	}

	// Update
	async update(user: User): Promise<User> {
		this.sql = 'UPDATE users SET firstname=($2), lastname=($3), password_digest=($4) WHERE id=($1) RETURNING *';
		const errMsg = `Could not update User: ${user.id}`;
		const codedPassword = bcrypt.hashSync(user.password + pepper, Number(saltRounds));
		try {
			return await dbConnect(this.sql, [ user.id, user.firstname, user.lastname, codedPassword ], errMsg);
		} catch (err) {
			throw new Error(`${errMsg}. ${err}`);
		}
	}

	// Delete
	async delete(id: number): Promise<User> {
		this.sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
		const errMsg = `Could not delete User: ${id}`;
		try {
			return await dbConnect(this.sql, [ id ], errMsg);
		} catch (err) {
			throw new Error(`${errMsg}. ${err}`);
		}
	}
	// Authenticate
	async authenticate(firstname: string, lastname: string, password: string): Promise<User | null> {
		const sql = 'SELECT * FROM users WHERE (firstname=($1) AND lastname=($2))';
		const errMsg = '';
		// const codedPassword = bcrypt.hashSync(password + pepper, Number(saltRounds));
		try {
			const result = await dbConnect(sql, [ firstname, lastname ], errMsg);
			if (result) {
				// 	for (const row of result.rows) {
				// console.log(result.password_digest);
				if (bcrypt.compareSync(password + pepper, result.password_digest)) {
					return result;
				}
			}

			return null;
		} catch (err) {
			throw new Error(`${errMsg}. ${err}`);
		}
	}
}
export default UserModel;
