import Knex from 'knex'

async function up (knex: Knex){
    await knex.schema.createTable('points', (table)=>{
        table.increments('id').primary()
        table.string('image').notNullable()
        table.string('name').notNullable()
        table.string('endereco').notNullable()
        table.string('whatsapp').notNullable()
        table.integer('latitude').notNullable()
        table.integer('longitude').notNullable()
        table.string('city').notNullable()
        table.string('uf', 2).notNullable()
    })
}

async function down(knex: Knex){
    await knex.schema.dropTable('points')
}

export = {up, down}