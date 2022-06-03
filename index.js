const express = require('express')
const app = express()
require('./config/db').connect();
require('./middlewares/middleware').useMiddlewares(express, app)
const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server listening on ${port}`))