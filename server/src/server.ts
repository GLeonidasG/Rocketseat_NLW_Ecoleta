import express from 'express'
import cors from 'cors'
import path from 'path'
import routes from './routes'
class Server{

    constructor(){
        const app = express()
        app.use(cors())
        app.use(express.json())
        // app.get('/users', (request, response)=>{
        //     response.json({msg:"Hello world"})
        // })
        app.use('/',routes)
        app.use('/uploads', express.static(path.resolve(__dirname, './uploads')))
        app.listen(3333, ()=>{
            console.log("Listening on http://192.168.1.12:3333")
        })

    }

}
export default new Server()