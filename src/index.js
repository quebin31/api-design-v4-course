const app = require('./server')

const port = 5001
app.listen(port, () => {
    console.log(`Serving on http://localhost:${port}`)
})