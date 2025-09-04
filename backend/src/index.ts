import express, { Request, Response } from "express";
import cors from 'cors';
import axios from 'axios';

const app = express();

const PORT = 3000;

app.use(cors());

// app.get('/hello', (req:Request, res:Response):void => {
//     res.json({'message':'Youre getting this from express!'})
// })

// app.get('/predict', (req:Request, res:Response) => {
//     try {
//         fetch('http://localhost:5000/predict')
//         .then(res => res.json())
//         .then(data => res.json(data.message))

//     } catch (error) {
//         res.status(500).json({error: 'Flask server error'});
//     }
// })


app.get('/stocks/apple', (req:Request, res:Response) => {
    try {
        fetch('http://127.0.0.1:5000/stocks/apple')
        .then(res => res.json())
        .then(data => res.json(data));
    } catch (error) {
        res.status(500).json({error: 'Flask server error'});
    }
})

app.listen(PORT, ():void => {
    console.log(`Listening on PORT ${PORT}`)
});