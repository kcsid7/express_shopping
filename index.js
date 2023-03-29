const express = require("express");


const ExpressError = require("./expressError.js")
const itemsRoute = require("./routes/items.js")

const app = express();


app.use(express.json());

app.use("/items", itemsRoute);

app.get("/", function(req, res, next) {
    res.send({
        result: "Hello World!"
    })
})


// General Error Handlers
app.use(function(req, res, next) {
    return new ExpressError("Page Not Found!", 404)
})

app.use((err, req, res, next) => {
    res.status( err.status || 500);
    return res.json({
        error: err.message
    })
})

module.exports = app;