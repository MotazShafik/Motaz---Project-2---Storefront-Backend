import { User, UserModel } from '../../models/user';

const store: UserModel = new UserModel();
const user: User = { firstname: 'Motaz', lastname: 'Shafik', password: 'aloha from Motaz Server' };
const modUser: User = { firstname: 'Moetaz', lastname: 'Mohamed Shafik', password: 'bye from Motaz Server' };
let user_id: number;
let createdUser: User;
describe('User Model', () => {
	describe('Create() Method', () => {
		it('Should have an create method', () => {
			expect(store.create).toBeDefined();
		});

		it('Create method should add a user', async () => {
			const result = await store.create(user);
			user_id = Number(result.id);
			createdUser = result;
			expect({ firstname: result.firstname, lastname: result.lastname }).toEqual({
				firstname: user.firstname,
				lastname: user.lastname,
			});
		});

		describe('Index() method', () => {
			it('Should have an index method', () => {
				expect(store.index).toBeDefined();
			});

			it('Index method should return a list of users', async () => {
				const users = await store.index();
				user.id = user_id;
				expect(users).toContain(createdUser);
			});
		});

		describe('Show() method', () => {
			it('Should have a show method', () => {
				expect(store.show).toBeDefined();
			});
			it('Show method should return the user', async () => {
				const showUser = await store.show(user_id);
				expect(showUser).toEqual(createdUser);
			});
		});

		describe('Update() method', () => {
			it('should have a update method', () => {
				expect(store.update).toBeDefined();
			});
			it('Update method should return the updated user', async () => {
				modUser.id = user_id;
				const result = await store.update(modUser);
				expect({ firstname: result.firstname, lastname: result.lastname }).toEqual({
					firstname: modUser.firstname,
					lastname: modUser.lastname,
				});
			});
		});

		describe('Authenticate() method', () => {
			it('Should have a Authenticate method', () => {
				expect(store.authenticate).toBeDefined();
			});

			it('Authenticate method should provide user authintication', async () => {
				const result = await store.authenticate(user.firstname, user.lastname, user.password);
				expect(result).not.toBeNull;
			});
		});

		describe('Delete() method', () => {
			it('Should have a delete method', () => {
				expect(store.delete).toBeDefined();
			});

			it('Delete method should remove the user', async () => {
				const result = await store.delete(user_id);
				expect(result.id).toEqual(user_id);
			});
		});
	});
});
