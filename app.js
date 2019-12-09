require("dotenv").config({path: __dirname + "/.env"})
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db_navn = "REST-API";


mongoose.connect(process.env.DATABASE_URL + db_navn + "?retryWrites=true&w=majority",
    { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const database = mongoose.connection;
database.on("error", (error) =>{
    console.log("kunne ikke koble til databasen");
    console.error(error);
})
database.once("open", () => console.log("koblet til databasen: " + db_navn));

app.use(express.json());


// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());


// importerer routes
app.use("/brukere", require("./routes/brukere"));



app.listen(1337, () => console.log("serveren har startet"));