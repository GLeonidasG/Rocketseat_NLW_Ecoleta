import express from 'express'

import ItemsController from './controllers/ItemsController'
import PointsController from './controllers/PointsController'

const routes = express.Router()

routes.get('/items', ItemsController.index)
routes.post('/items', ItemsController.store)
routes.delete('/items/:id', ItemsController.destroy)

routes.get('/points', PointsController.index)
routes.get('/points/:id', PointsController.show)
routes.post('/points', PointsController.store)
routes.delete('/points/:id', PointsController.destroy)

export default routes