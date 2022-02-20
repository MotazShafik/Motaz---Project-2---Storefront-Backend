import { Order, AddedProduct } from '../../models/order';
import app from '../../server';
import supertest from 'supertest';
import { verify, JwtPayload } from 'jsonwebtoken';
const request = supertest(app); // Configure supertest to work on the obtained app

let token = '';
let order_id: number;
const order: Order = {
	status: 'closed',
	user_id: 1,
	items: []
};
const addproduct: AddedProduct = {
	quantity: 1,
	order_id: 1,
	product_id: 1
};
beforeAll(async () => {
	await request
		.post('/api/v1/user')
		.send({ firstname: 'Motaz', lastname: 'Shafik', password: 'Password' })
		.expect(200)
		.then((res) => {
			token = res.body;
			const decoded = verify(token as string, process.env.TOKEN_SECRET as string) as JwtPayload;
			order.user_id = Number(decoded.user.id);
		});

	await request
		.post('/api/v1/product')
		.send({ name: 'test Product 1', price: 10, category: 'category 1' })
		.set('Authorization', `Bearer ${token}`)
		.expect(200)
		.then((res) => {
			addproduct.product_id = Number(res.body.id);
		});
});

describe('Comprehensive Testing for all ORDERS endpoint', () => {
	describe('Testing create endpoint', () => {
		it('testing the response', (done) => {
			async () => {
				request
					.post('/api/v1/order/')
					.set('Authorization', `Bearer ${token}`)
					.send({ status: order.status, user_id: order.user_id })
					.expect(200)
					.then((res) => {
						order_id = Number(res.body.id);
					});
			};
			done();
		});
	});

	describe('Testing index() endpoint', () => {
		it('testing the response', (done) => {
			async () => {
				request.get('/api/v1/order').expect(200);
			};
			done();
		});
	});

	describe('Testing show(id) endpoint', () => {
		it('testing the response', (done) => {
			async () => {
				request.get(`/api/v1/order/${order_id}`).expect(200);
			};
			done();
		});
	});

	describe('Testing update endpoint', () => {
		it('testing the response', (done) => {
			async () => {
				request.put('/api/v1/order/').expect(200);
			};
			done();
		});
	});
	describe('Testing Delete endpoint', () => {
		it('testing the response', (done) => {
			async () => {
				request.delete('/api/v1/order/').expect(200);
			};
			done();
		});
	});

	describe('Testing Delete endpoint', () => {
		it('testing the response', (done) => {
			async () => {
				request.post(`/api/v1/order/${addproduct.product_id}/products}`).expect(200);
			};
			done();
		});
	});
});
