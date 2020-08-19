import Knex from 'knex'

async function up (knex: Knex){
    await knex.schema.createTable('items', (table)=>{
        table.increments('id').primary()
        table.string('image').notNullable()
        table.string('title').notNullable()
    })
}

async function down(knex: Knex){
    await knex.schema.dropTable('items')
}

export = {up, down}