const youtubedl = require('youtube-dl');

const url = 'https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg';

const options = ['--username=user', '--password=hunter2'];

youtubedl.getInfo(url, options, function(err, info) {
     if (err) throw err
    
     console.log('id:', info.id)
     console.log('title:', info.title)
     console.log('url:', info.url)
     console.log('thumbnail:', info.thumbnail)
     console.log('description:', info.description)
     console.log('filename:', info._filename)
     console.log('format id:', info.format_id)
   })