import { Request, Response, NextFunction } from 'express';
import { tokenSecret } from '../config';
import { Message, Messagetype } from '../Utilities/formater';
import jwt from 'jsonwebtoken';

//define verifyAuthrization endpoint parameters validator middleware
export const verifyAuthToken = function (req: Request, res: Response, next: NextFunction) {
	try {
		let userId: string | null = null;
		if (req.body.firstName) userId = req.body.id;
		else userId = null;
		const authorizationHeader = req.headers.authorization;
		const token = String(authorizationHeader).split(' ')[1];
		const decoded = jwt.verify(String(token), String(tokenSecret)) as jwt.JwtPayload;
		if (userId && decoded.user.id !== userId) {
			throw new Error('User id does not match!');
		} else next();
	} catch (error) {
		res.status(401);
		return res.send(Message('Not Authorized to access', Messagetype.error));
	}
};
// define sign function to return token
export const sign = function (id: number | undefined, firstname: string, lastname: string): string {
	return jwt.sign({ user: { id, firstname, lastname } }, String(tokenSecret));
};
export default { verifyAuthToken, sign };
