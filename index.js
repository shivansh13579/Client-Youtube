
import { createRequire } from 'module'
const require = createRequire(
    import.meta.url);
const express = require('express')
const ytdl = require('ytdl-core')
const cors = require('cors')

require("dotenv").config();

const port = process.env.PORT || 4000;

const app = express()
app.use(express.static('dist'))
app.use(cors())



app.get("/download", async(req, res) => {
    const videoURL =  req.query.url;
    console.log(videoURL)
    if (!videoURL) {
        return res.status(400).json({ error: 'Missing video URL' });
      }

    try {
        const videoId =await ytdl.getURLVideoID(videoURL);
        console.log(videoId);
        const metaInfo = await ytdl.getInfo(videoURL);

        let data = {
            url: "https://www.youtube.com/embed/" + videoId,
            info: metaInfo.formats
        }

        return res.send(data)
    } catch (error) {
        return res.status(500)
    }
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})