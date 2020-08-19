import Knex from 'knex'

async function up (knex: Knex){
    await knex.schema.createTable('point_items', (table)=>{
        table.increments('id').primary()
        table.integer('points_id').notNullable()
        table.integer('items_id').notNullable()
    })
}

async function down(knex: Knex){
    await knex.schema.dropTable('point_items')
}

export = {up, down}