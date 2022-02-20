import { client } from '../database';

const dbConnect = async (sql: string, parameters: (string | number | undefined)[], errorMsg: string) => {
	// console.log(`environment is ${process.env.ENV}`);
	let whereExist = false;
	const sqlCommand = sql.split(' ').map((value) => {
		if (value.toUpperCase() == 'WHERE') whereExist = true;
		return value.toUpperCase();
	});
	const checkIndex =
		(sqlCommand[0] + ' ' + sqlCommand[1] == 'SELECT *' ||
			sqlCommand[0] + ' ' + sqlCommand[1] == 'SELECT ORDERS.*') &&
		!whereExist;
	// console.log(checkIndex, sqlCommand[0] + ' ' + sqlCommand[1]);
	// const checkIndex = (sqlCommand[0] + ' ' + sqlCommand[1] == 'SELECT *' && sqlCommand[4] != 'WHERE');
	// const checkauth = (sqlCommand[0] + ' ' + sqlCommand[1] == 'SELECT *' && sqlCommand[4] == 'WHERE' && sqlCommand[6] == 'AND' );

	try {
		const conn = await client.connect();
		const result = await conn.query(sql, parameters);
		conn.release();
		if (checkIndex) return result.rows;
		else return result.rows[0];
	} catch (err) {
		throw new Error(`${errorMsg}. ${err}`);
	}
};
export default dbConnect;
