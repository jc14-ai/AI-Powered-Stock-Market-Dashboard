import express, { Request, Response } from "express";
import cors from 'cors';
import axios from 'axios';

const app = express();

const PORT = 3000;

app.use(cors());

app.get('/stocks/apple', (req:Request, res:Response):void => {
    try {
        fetch('http://127.0.0.1:5000/stocks/apple')
        .then(res => res.json()) 
        .then(data => res.json(data));
    } catch (error) {
        res.status(500).json({error: 'Flask server error'});
    }
})

app.get('/stocks/amazon', (req:Request, res:Response):void => {
    try {
        fetch('http://127.0.0.1:5000/stocks/amazon')
        .then(res => res.json())
        .then(data => res.json(data));
    } catch (error) {
        res.status(500).json({error: 'Flask server error'});
    }
})

app.get('/stocks/microsoft', (req:Request, res:Response):void => {
    try {
        fetch('http://127.0.0.1:5000/stocks/microsoft')
        .then(res => res.json())
        .then(data => res.json(data));
    } catch (error) {
        res.status(500).json({error: 'Flask server error'});
    }
})

app.get('/stocks/nvidia', (req:Request, res:Response):void => {
    try {
        fetch('http://127.0.0.1:5000/stocks/nvidia')
        .then(res => res.json())
        .then(data => res.json(data));
    } catch (error) {
        res.status(500).json({error: 'Flask server error'});
    }
})

app.get('/analyze', (req:Request, res:Response):void =>{
    fetch('http://127.0.0.1:5000/analyze')
})

app.listen(PORT, ():void => {
    console.log(`Listening on PORT ${PORT}`)
});