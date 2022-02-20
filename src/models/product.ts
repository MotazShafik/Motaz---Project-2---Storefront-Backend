import dbConnect from './dbConnect';

export type Product = {
	id?: number;
	name: string;
	price: number;
	category: string;
};

export class ProductModel {
	sql = '';
	// CRUD Operations
	// Create
	async create(product: Product): Promise<Product> {
		this.sql = 'INSERT INTO products (name, price,category) VALUES($1, $2, $3) RETURNING *';
		const errMsg = `Could not create product: ${product.name}`;
		try {
			return await dbConnect(this.sql, [ product.name, product.price, product.category ], errMsg);
		} catch (err) {
			throw new Error(`${errMsg}. ${err}`);
		}
	}
	// Read
	async index(): Promise<Product[]> {
		this.sql = 'SELECT * FROM products ORDER BY id ASC';
		const errMsg = 'Could not get products';
		try {
			return await dbConnect(this.sql, [], errMsg);
		} catch (err) {
			throw new Error(`${errMsg}. ${err}`);
		}
	}

	async show(id: number): Promise<Product> {
		this.sql = 'SELECT * FROM products WHERE id=($1)';
		const errMsg = `Could not find product: ${id}`;
		try {
			return await dbConnect(this.sql, [ id ], errMsg);
		} catch (err) {
			throw new Error(`${errMsg}. ${err}`);
		}
	}

	// Update
	async update(product: Product): Promise<Product> {
		this.sql = 'UPDATE products SET name=($2), price=($3), category=($4) WHERE id=($1) RETURNING *';
		const errMsg = `Could not update product: ${product.id}`;
		try {
			return await dbConnect(this.sql, [ product.id, product.name, product.price, product.category ], errMsg);
		} catch (err) {
			throw new Error(`${errMsg}. ${err}`);
		}
	}

	// Delete
	async delete(id: number): Promise<Product> {
		this.sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
		const errMsg = `Could not delete product: ${id}`;
		try {
			return await dbConnect(this.sql, [ id ], errMsg);
		} catch (err) {
			throw new Error(`${errMsg}. ${err}`);
		}
	}
}
export default ProductModel;
