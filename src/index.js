const http = require('http')

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.end()
    }
})


const port = 5001
server.listen(port, () => {
    console.log(`Serving on http://localhost:${port}`)
})