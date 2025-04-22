import { AppDataSource } from "./data-source"
import express, { NextFunction, Request, Response } from 'express';
import { User } from "./entities/user.entity";

AppDataSource.initialize().then(async () => {
    console.log("Data Source has been initialized!")
}).catch(error => console.log(error))

const app = express()
app.use(express.json())

// register routes
app.get("/users", async function (req: Request, res: Response) {
    const users = await AppDataSource.getRepository(User).find()
    res.json(users)
})

app.get("/users/:id", async function (req: Request, res: Response) {
    const results = await AppDataSource.getRepository(User).findOneBy({
        id: +req.params.id,
    })
    res.send(results)
})

app.post("/users", async function (req: Request, res: Response) {
    const user = AppDataSource.getRepository(User).create(req.body);
    const results = await AppDataSource.getRepository(User).save(user);
    res.send(results);
});

app.put("/users/:id", async function (req: Request, res: Response) {
    const user = await AppDataSource.getRepository(User).findOneBy({
        id: +req.params.id,
    })
    AppDataSource.getRepository(User).merge(user, req.body)
    const results = await AppDataSource.getRepository(User).save(user)
    res.send(results)
})

app.delete("/users/:id", async function (req: Request, res: Response) {
    const results = await AppDataSource.getRepository(User).delete(req.params.id)
    res.send(results)
})

// start express server
app.listen(8000)