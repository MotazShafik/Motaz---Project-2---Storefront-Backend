import app from '../server'; // Import app from index for testing
import supertest from 'supertest'; // Include supertest 3rd party test package to help test endpoints
const request = supertest(app); // Configure supertest to work on the obtained app

describe('Comprehensive tests for testing Storefront Backend API Project', () => {
	describe('Testing the endpoints', () => {
		it('checks Server Main page (root) endpoint', (done) => {
			async () => {
				request.get('/').expect(200);
			};
			done();
		});
		it('checks /api/V1 endpoint', (done) => {
			async () => {
				request.get('/api/V1').expect(200);
			};
			done();
		});
	});
});
