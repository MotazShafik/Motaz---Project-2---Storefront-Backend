import express from 'express';
import { port } from './config';
import mylogger from './middleware/mylogger';
import routes from './routes';

// Configure express server
const app: express.Application = express();
app.locals.title = 'Motaz Server';
app.locals.appname = 'Udacity - Storefront Backend API project';
// Configure express middleware
app.use(express.json());
app.use(mylogger);

//Configure express routes
app.use('/', routes);

//start server
app.listen(port, function() {
	console.log(app.locals.title);
	console.log(app.locals.appname);
	console.log(`Server listening on http://localhost:${port}`);
});

export default app;
