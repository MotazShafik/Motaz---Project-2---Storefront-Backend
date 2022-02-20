import { Product, ProductModel } from '../../models/product';

const store: ProductModel = new ProductModel();
let createdProduct: Product;
let product_id: number;
const product: Product = {
	name: 'Test Product',
	price: 10,
	category: 'Category 1'
};
const modproduct: Product = {
	name: 'Test Product 2',
	price: 20,
	category: 'Category 2'
};

describe('Product Model', () => {
	describe('Create() Method', () => {
		it('Should have an create method', () => {
			expect(store.create).toBeDefined();
		});

		it('Create method should add a product', async () => {
			const result = await store.create(product);
			createdProduct = result;
			product_id = Number(result.id);
			expect({ name: product.name, price: product.price, category: product.category }).toEqual({
				name: product.name,
				price: product.price,
				category: product.category
			});
		});
	});

	describe('Index() method', () => {
		it('Should have an index method', () => {
			expect(store.index).toBeDefined();
		});

		it('Index method should return a list of products', async () => {
			const products = await store.index();
			expect(products).toContain(createdProduct);
		});
	});

	describe('Show() method', () => {
		it('Should have a show method', () => {
			expect(store.show).toBeDefined();
		});
		it('Show method should return the product', async () => {
			const showproduct = await store.show(product_id);
			expect(showproduct).toEqual(createdProduct);
		});
	});

	describe('Update() method', () => {
		it('should have a update method', () => {
			expect(store.update).toBeDefined();
		});
		it('Update method should return the updated product', async () => {
			modproduct.id = product_id;
			const result = await store.update(modproduct);
			expect(result).toEqual(modproduct);
		});
	});

	describe('Delete() method', () => {
		it('Should have a delete method', () => {
			expect(store.delete).toBeDefined();
		});

		it('Delete method should remove the product', async () => {
			const result = await store.delete(product_id);
			expect(result.id).toEqual(product_id);
		});
	});
});
