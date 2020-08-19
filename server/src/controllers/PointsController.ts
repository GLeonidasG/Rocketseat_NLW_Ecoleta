import { Request, Response } from 'express'
import knex from '../database/connection'
class PointsController {
    async index(req: Request, res: Response) {
        const { city, uf, items } = req.query
        const parsedItems = String(items)
            .split(',')
            .map((item) =>{
                return Number(item.trim())
            })
        const point = await knex('points')
            .join('point_items', 'point_items.points_id', 'points.id')
            .whereIn('point_items.items_id', parsedItems)
            .where('points.city', String(city))
            .where('points.uf', String(uf))
            .distinct()
            .select("points.*")
        return res.json(point)
     }

    async show(req: Request, res: Response) {

        const { id } = req.params;

        const points = await knex('points')
            .select("*")
            .where("points.id", "=", id)
        if (!points) return res.status(400).json({
            msg:"Error: point not found"
        })

        const items  = await knex("items")
            .join('point_items','point_items.items_id', 'items.id')
            .where('point_items.points_id', id)
            .select('items.*')
        
        return res.json({points, items})


     }

    async store(req: Request, res: Response) {
        const {
            image,
            name,
            endereco,
            whatsapp,
            city,
            uf,
            longitude,
            latitude,
            items
        } = req.body;
        // Using trx as a transaction object:
        const trx = await knex.transaction();

        const result = await trx('points')
            .insert({
                image,
                name,
                endereco,
                whatsapp,
                city,
                uf,
                longitude,
                latitude
            })
        const points_id = result[0]
        const pointItems = items.map((items_id:number) =>{
            return {
                points_id,
                items_id
            }
        })
        await trx('point_items')
            .insert(pointItems)
        await trx.commit()
        return res.json({succ:true})

    }

    async update(req: Request, res: Response) { }

    async destroy(req: Request, res: Response) { 
        const { id } = req.params

        await knex('point_items')
            .delete()
            .where("point_items.points_id",id)

        await knex('points')
            .delete()
            .where('id', id)
        return res.json({msg:'ok'})

    }

}

export default new PointsController()