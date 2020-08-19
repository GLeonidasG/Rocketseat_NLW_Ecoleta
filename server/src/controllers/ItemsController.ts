import { Request, Response } from 'express'
import knex from '../database/connection'

class ItemsController{
    constructor(){}

    async index(req: Request, res:Response){
        
        const items = await knex('items').select("*")
        return res.json(items)

    }
    async show( req: Request, res:Response ){

    }
    async store( req: Request, res:Response ){
        const data = req.body
        const item = await knex('items').insert(data)
        return res.json(item)

    }
    async update( req: Request, res:Response ){

    }
    async destroy( req: Request, res:Response ){
        const { id } = req.params;
        const point_items = await knex('point_items') 
            .delete()
            .where('items_id', id)
        const items = await knex('items') 
            .delete()
            .where('id', id)
        return res.json({msg:"ok"})
    }

}

export default new ItemsController()