import Knex from 'knex'
import path from 'path'

const knex = Knex({
    client:"sqlite3",
    connection:{
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    migrations:{
        directory: path.resolve(__dirname, "migrations")
    },
    seeds:{
        directory: path.resolve(__dirname, "seeds")
    },
    useNullAsDefault: true

})
export default knex