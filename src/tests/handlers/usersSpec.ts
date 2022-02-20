import { User } from '../../models/user';
import app from '../../server';
import supertest from 'supertest';
import { verify, JwtPayload } from 'jsonwebtoken';
const request = supertest(app); // Configure supertest to work on the obtained app

let token = '';
let user_id: number;

const user: User = { firstname: 'Motaz', lastname: 'Shafik', password: 'aloha from Motaz Server' };
const modUser: User = { firstname: 'Moetaz', lastname: 'Mohamed Shafik', password: 'bye from Motaz Server' };

describe('Comprehensive Testing for all USER endpoint', () => {
	describe('Testing create endpoint', () => {
		it('testing the response', (done) => {
			async () => {
				request
					.post('/api/v1/user/')
					.send({ firstname: user.firstname, lastname: user.lastname, password: user.password })
					.expect(200)
					.then((res) => {
						token = res.body;
						const decoded = verify(token as string, process.env.TOKEN_SECRET as string) as JwtPayload;
						user_id = Number(decoded.user.id);
					});
			};
			done();
		});
	});

	describe('Testing index() endpoint', () => {
		it('testing the response', (done) => {
			async () => {
				request.get('/api/v1/user').set('Authorization', `Bearer ${token}`).expect(200);
			};
			done();
		});
	});

	describe('Testing show(id) endpoint', () => {
		it('testing the response', (done) => {
			async () => {
				request.get(`/api/v1/user/${user_id}`).set('Authorization', `Bearer ${token}`).expect(200);
			};
			done();
		});
	});

	describe('Testing update endpoint', () => {
		it('testing the response', (done) => {
			async () => {
				request
					.put('/api/v1/user/')
					.send({
						id: user_id,
						firstname: modUser.firstname,
						lastname: modUser.lastname,
						password: modUser.password
					})
					.set('Authorization', `Bearer ${token}`)
					.expect(200);
			};
			done();
		});
	});

	describe('Testing authenticate endpoint', () => {
		it('testing the response', (done) => {
			async () => {
				request
					.post('/api/v1/user/')
					.send({ firstname: user.firstname, lastname: user.lastname, password: user.password })
					.expect(200);
			};
			done();
		});
	});

	describe('Testing Delete endpoint', () => {
		it('testing the response', (done) => {
			async () => {
				request
					.delete('/api/v1/user/')
					.send({ id: user_id })
					.set('Authorization', `Bearer ${token}`)
					.expect(200);
			};
			done();
		});
	});
});
