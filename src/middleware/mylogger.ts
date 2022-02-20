import { Request, Response, NextFunction } from 'express';
const today: Date = new Date();
const todayDate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
const todayTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

//define  mylogger middleware
const mylogger = function (request: Request, response: Response, next: NextFunction) {
	console.log(`${request.url} - visited on ${todayDate} @${todayTime}`);
	next();
};
export default mylogger;
