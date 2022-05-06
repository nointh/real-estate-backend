import express, {Application} from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Controller from '@/utils/interface/controller.interface'
import ErrorMiddleware from '@/middleware/error.middleware'
class App {
    public express: Application;
    public port: number;
    constructor(controllers: Controller[], port: number){
        this.express = express()
        this.port = port

        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers)
        this.initaliseErrorHandling()
    }
    
    private initialiseMiddleware(): void {
        //this.express.use(cors())
        this.express.use(express.json())
        this.express.use(express.urlencoded({ extended: false }));
    }
    private initialiseControllers(controllers: Controller[]): void{
        controllers.forEach((controller: Controller) =>{
            this.express.use('/api', controller.router)
        })
    }
    private initaliseErrorHandling() {
        this.express.use(ErrorMiddleware)
    }
    private initialiseDatabaseConnection(): void{
        const { MONGO_URL } = process.env
        mongoose.connect(`${MONGO_URL}`)
        .then(()=>{ console.log("connected to mongodb")},
        err => console.log(`There is error while connect to mongodb. Error: ${err}`))       

    }
    public listen(): void{
        this.express.listen(this.port || 3031, ()=>{
            console.log(`server is running on port ${this.port}`)
        })
    }
}
export default App