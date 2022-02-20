import dbConnect from './dbConnect';

export type Order = {
	id?: number;
	status: string;
	user_id: number;
	items?: [] | [null];
};
export type AddedProduct = {
	id?: number;
	quantity: number;
	order_id: number | string;
	product_id: number | string;
};

export class OrderModel {
	sql = '';
	// CRUD Operations
	// Create
	async create(order: Order): Promise<Order> {
		this.sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
		const errMsg = `Could not create order: ${order}`;
		try {
			return await dbConnect(this.sql, [ order.status, order.user_id ], errMsg);
		} catch (err) {
			throw new Error(`${errMsg}. ${err}`);
		}
	}
	// Read
	async index(): Promise<Order[]> {
		this.sql = `SELECT orders.* ,array_agg(row_to_json(order_products)) AS items FROM orders FULL JOIN order_products ON orders.id = order_products.order_id GROUP BY orders.id ORDER BY orders.id ASC`;
		const errMsg = 'Could not get orders';
		try {
			return await dbConnect(this.sql, [], errMsg);
		} catch (err) {
			throw new Error(`${errMsg}. ${err}`);
		}
	}

	async show(id: number): Promise<Order> {
		this.sql =
			'SELECT orders.*,array_agg(row_to_json(order_products)) AS items FROM orders	FULL JOIN order_products ON orders.id = order_products.order_id	WHERE orders.id=($1) GROUP BY orders.id ';
		const errMsg = `Could not find order: ${id}`;
		try {
			return await dbConnect(this.sql, [ id ], errMsg);
		} catch (err) {
			throw new Error(`${errMsg}. ${err}`);
		}
	}

	// Update
	async update(order: Order): Promise<Order> {
		this.sql = 'UPDATE orders SET status=($2), user_id=($3) WHERE id=($1) RETURNING *';
		const errMsg = `Could not update order: ${order.id}`;
		try {
			return await dbConnect(this.sql, [ order.id, order.status, order.user_id ], errMsg);
		} catch (err) {
			throw new Error(`${errMsg}. ${err}`);
		}
	}

	// Delete
	async delete(id: number): Promise<Order> {
		this.sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
		const errMsg = `Could not delete order: ${id}`;
		try {
			return await dbConnect(this.sql, [ id ], errMsg);
		} catch (err) {
			throw new Error(`${errMsg}. ${err}`);
		}
	}
	//add product to order
	async addProduct(quantity: number, order_id: number, product_id: number): Promise<AddedProduct> {
		const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
		const errMsg = `Could not add product ${product_id} to order ${order_id}`;
		try {
			return await dbConnect(sql, [ quantity, order_id, product_id ], errMsg);
		} catch (err) {
			throw new Error(`${errMsg}. ${err}`);
		}
	}
}
export default OrderModel;
