import express from "express"
import cors from "cors"

import { download } from "./download.js"

const app = express()
app.use(cors())

app.get("/summary/:id", (request, response) => {
    download(request.params.id)

    response.json({
        result: "Download do video realizado com sucesso!",
    })
})

app.listen(3333, () => {
    console.log("Server started on port 3333")
})