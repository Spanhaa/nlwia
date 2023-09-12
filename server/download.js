import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) => {
    const videoUrl = "https://www.youtube.com/shorts/" + videoId
    console.log("Downloading video with ID " + videoId)
    ytdl(videoUrl, { quality: "lowestaudio", filter: "audioonly" })
        .on("info", (info) => {
            const seconds = info.formats[0].approxDurationMs / 1000
            if (seconds > 60) {
                throw new Error("Video tem duração maior do que 60 segundos")
            }
        })
        .on("end", () => {
            console.log("Download do video finalizado")
        })
        .on("error", () => {
            console.log("Erro ao fazer download do video. Detalhes:", error)
        })
        .pipe(fs.createWriteStream("./tmp/audio.mp4"))
}
