import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")
const resumo = document.querySelector("#resumo")

form.addEventListener("submit", async (event) => {
    event.preventDefault()
    content.classList.add("placeholder")
    resumo.classList.add("placeholder")
    resumo.textContent = ""

    const videoURL = input.value
    if (!videoURL.includes("shorts")) {
        return (content.textContent = "Esse vídeo não parece ser um short.")
    }

    const [_, params] = videoURL.split("/shorts/")
    const [videoID] = params.split("?si")

    content.textContent = "Obtendo o texto do áudio..."
    const transcription = await server.get("/summary/" + videoID)

    content.textContent = "Transcrição: " + transcription.data.result
    resumo.textContent = "Realizando o resumo..."

    const summary = await server.post("/summary", {
        text: transcription.data.result,
    })

    resumo.textContent = "Resumo: " + summary.data.result
    resumo.classList.remove("placeholder")
    content.classList.remove("placeholder")
})
