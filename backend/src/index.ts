import express from "express";

const app = express();

const PORT = 3000;

app.listen(PORT, ():void => {
    console.log(`Listening on PORT ${PORT}`)
});