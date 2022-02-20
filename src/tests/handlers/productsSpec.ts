import { Product } from '../../models/product';
import app from '../../server';
import supertest from 'supertest';
import { verify, JwtPayload } from 'jsonwebtoken';
const request = supertest(app); // Configure supertest to work on the obtained app

let token = '';
let product_id: number;
let user_id: number;
const product: Product = {
	name: 'Test Product',
	price: 10,
	category: 'Category 1',
};
const modproduct: Product = {
	name: 'Test Product 2',
	price: 20,
	category: 'Category 2',
};

beforeAll(async () => {
	await request
		.post('/api/v1/user')
		.send({ firstname: 'Motaz', lastname: 'Shafik', password: 'Password' })
		.expect(200)
		.then((res) => {
			token = res.body;
			const decoded = verify(token as string, process.env.TOKEN_SECRET as string) as JwtPayload;
			user_id = Number(decoded.user.id);
		});
});
describe('Comprehensive Testing for all PRODUCT endpoint', () => {
	describe('Testing create endpoint', () => {
		it('testing the response', (done) => {
			async () => {
				request
					.post('/api/v1/product/')
					.send({ name: product.name, price: product.price, category: product.category })
					.set('Authorization', `Bearer ${token}`)
					.expect(200)
					.then((res) => {
						product_id = Number(res.body.id);
					});
			};
			done();
		});
	});

	describe('Testing index() endpoint', () => {
		it('testing the response', (done) => {
			async () => {
				request.get('/api/v1/product').set('Authorization', `Bearer ${token}`).expect(200);
			};
			done();
		});
	});

	describe('Testing show(id) endpoint', () => {
		it('testing the response', (done) => {
			async () => {
				request.get(`/api/v1/product/${product_id}`).set('Authorization', `Bearer ${token}`).expect(200);
			};
			done();
		});
	});

	describe('Testing update endpoint', () => {
		it('testing the response', (done) => {
			async () => {
				request
					.put('/api/v1/product/')
					.send({
						id: product_id,
						name: modproduct.name,
						price: modproduct.price,
						category: modproduct.category,
					})
					.set('Authorization', `Bearer ${token}`)
					.expect(200);
			};
			done();
		});
	});

	describe('Testing Delete endpoint', () => {
		it('testing the response', (done) => {
			async () => {
				request
					.delete('/api/v1/product/')
					.send({ id: product_id })
					.set('Authorization', `Bearer ${token}`)
					.expect(200);
			};
			done();
		});
	});
});

afterAll(async () => {
	await request.delete('/api/v1/user').set('Authorization', `Bearer ${token}`).send({ id: user_id }).expect(200);
});
