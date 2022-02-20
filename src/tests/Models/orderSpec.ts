import { Order, OrderModel, AddedProduct } from '../../models/order';
import { User, UserModel } from '../../models/user';
import { Product, ProductModel } from '../../models/product';

const productModel: ProductModel = new ProductModel();
const product: Product = {
	name: 'Test Product',
	price: 10,
	category: 'Category 1',
};

const userModel: UserModel = new UserModel();
const user: User = {
	firstname: 'Motaz',
	lastname: 'Shafik',
	password: 'Motaz Server',
};

let createdOrder: Order;
const store: OrderModel = new OrderModel();

const addproduct: AddedProduct = {
	quantity: 10,
	order_id: 0,
	product_id: 0,
};

const order: Order = {
	status: 'open',
	user_id: 1,
};

const mod_Order: Order = {
	status: 'close',
	user_id: 1,
};

beforeAll(async () => {
	const productResult = await productModel.create(product);
	const userResult = await userModel.create(user);
	order.user_id = Number(userResult.id);
	addproduct.product_id = Number(productResult.id);
});

describe('Order Model', () => {
	describe('Create() Method', () => {
		it('Should have an create method', () => {
			expect(store.create).toBeDefined();
		});
		it('Create method should add an order', async () => {
			createdOrder = await store.create({ status: order.status, user_id: order.user_id });
			// console.log(createdOrder);
			order.id = Number(createdOrder.id);
			addproduct.order_id = Number(createdOrder.id);
			expect({ status: createdOrder.status, user_id: Number(createdOrder.user_id) }).toEqual({
				status: order.status,
				user_id: order.user_id,
			});
		});
	});

	describe('Index() method', () => {
		it('Should have an index method', () => {
			expect(store.index).toBeDefined();
		});

		it('Index method should return a list of orders', async () => {
			const orders = await store.index();
			expect(orders).toContain(jasmine.objectContaining(createdOrder));
		});
	});

	describe('Show() method', () => {
		it('Should have a show method', () => {
			expect(store.show).toBeDefined();
		});
		it('Show method should return the order', async () => {
			const result = await store.show(Number(createdOrder.id));
			expect(result).toEqual(jasmine.objectContaining(createdOrder));
		});
	});

	describe('Update() method', () => {
		it('should have a update method', () => {
			expect(store.update).toBeDefined();
		});
		it('Update method should return the updated order', async () => {
			mod_Order.id = Number(createdOrder.id);
			const result = await store.update({
				id: mod_Order.id,
				status: mod_Order.status,
				user_id: Number(mod_Order.user_id),
			});
			expect({ status: result.status, user_id: Number(result.user_id) }).toEqual({
				status: mod_Order.status,
				user_id: Number(mod_Order.user_id),
			});
		});
	});

	describe('Delete() method', () => {
		it('Should have a delete method', () => {
			expect(store.delete).toBeDefined();
		});

		it('Delete method should remove the order', async () => {
			const createdOrderforDelete = await store.create({ status: order.status, user_id: order.user_id });
			const result = await store.delete(Number(createdOrderforDelete.id));
			expect(result.id).toEqual(createdOrderforDelete.id);
		});
	});

	describe('addProduct() Method', () => {
		it('Should have an addProduct method', () => {
			expect(store.addProduct).toBeDefined();
		});
		it('addProduct method should add a product to an order', async () => {
			const result = await store.addProduct(
				addproduct.quantity,
				Number(createdOrder.id),
				Number(addproduct.product_id)
			);
			addproduct.id = result.id;
			expect(result).toEqual({
				id: Number(addproduct.id),
				quantity: addproduct.quantity,
				order_id: String(addproduct.order_id),
				product_id: String(addproduct.product_id),
			});
		});
	});
});
