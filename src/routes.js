import { Router } from 'express';

const routes = new Router();

routes.get('/teste', (req, res) => res.json({ msg: 'ok' }));

export default routes;
