const youtubedl = require('youtube-dl')
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const port = 3000 || process.env.PORT;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(bodyParser.json());

app.use(express.static('./public'));
app.use(cors());

app.get('/abc', (req,res) => {
     res.send('Hello There')
});

app.post('/download', async (req,res) => {
  let url = req.body.url;
  let quality = req.body.quality;
  let fileName = req.body.title;

  console.log('URL: ', url, 'quality: ', quality, 'filename: ', fileName);

  const video = youtubedl(url, [`--format=${quality}`], { cwd: __dirname });

  res.header("Content-Disposition", `attachment; filename=${fileName}`);

  video.pipe(res);
})

app.get('/download', async (req,res) => {
  let url = req.query.url;
  let quality = req.query.quality;
  let fileName = req.query.title;

  console.log('URL: ', url, 'quality: ', quality, 'filename: ', fileName);

  const video = youtubedl(url,
  // Optional arguments passed to youtube-dl.
  [`--format=${quality}`],
  { cwd: __dirname });

  res.header("Content-Disposition", `attachment; filename=${fileName}`);

  video.pipe(res);
})

app.post('/info', async (req,res) => {
  const url = req.body.url;
  console.log('URL: ', url);
  const options = ['--username=user', '--password=hunter2']
  youtubedl.getInfo(url, options, (err,info) => {
    if(err) {
      return res.status(404).send({err: 'Requested video not available to download'})
    }
      return res.status(200).send(info);
  });
})

app.listen(port, () => console.log('App started running on ', port));