import express from "express";
import path from 'path'

const app = express()

app.use("/static", express.static(path.resolve("./front-end", "static")))

app.get("/*", (req, res)=>{
    res.sendFile(path.resolve("./front-end", "index.html"))
})


app.listen(8000, ()=>{
    console.log("Server is running on port 8000")
})