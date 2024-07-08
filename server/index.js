const { obtenerPosts, agregarPost, modificarPost, eliminarPost } = require('./consultas')


const express = require("express")


const app = express()


const cors = require("cors")

app.listen(3000, () => console.log("servidor corriendo"))

app.use(cors())

app.use(express.json())


app.get("/posts", async (req, res) => {
    try {
        const posts = await obtenerPosts()
        if (!posts) {
            res.send(console.log("posts no encontrados"))
        }
        res.json(posts)
    } catch (error) {
        console.log("Hay un error".error.message)
    }
})


app.post("/posts", async (req, res) => {

    try {
        const { titulo, url, descripcion } = req.body
        if (!titulo || !url || !descripcion) {
            res.send(console.log("debe completar todos los campos"));
        }
        else {
            await agregarPost(titulo, url, descripcion)
            res.send("post creado con éxito")
        }
    } catch (error) {
        console.log("Hay un error".error.message)
    }
})


app.put("/posts/like/:id", async (req, res) => {
    try {
        const { id } = req.params
        await modificarPost(id)
        res.send("Post modificado con éxito")
    } catch (error) {
        console.log(error)
    }
})


app.delete("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params
        await eliminarPost(id)
        if(eliminarPost.rowCount===0){
            throw{
                code:404,
                message:`no se encontró el id: ${id}`
            }
        }
        res.send("Post eliminado con éxito")
    } catch (error) {
        res.status(error.code).json(error.message)
    }
})

