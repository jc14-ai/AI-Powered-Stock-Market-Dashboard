import express, { Request, Response } from "express";
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 3000;

const FLASK_URL = process.env.FLASK_URL || 'http://127.0.0.1:5000'

app.use(cors());

app.get('/stocks/apple', (req:Request, res:Response):void => {
    try {
        fetch(`${FLASK_URL}/stocks/apple`)
        .then(res => res.json()) 
        .then(data => res.json(data));
    } catch (error) {
        res.status(500).json({error: 'Flask server error'});
    }
})

app.get('/stocks/amazon', (req:Request, res:Response):void => {
    try {
        fetch(`${FLASK_URL}/stocks/amazon`)
        .then(res => res.json())
        .then(data => res.json(data));
    } catch (error) {
        res.status(500).json({error: 'Flask server error'});
    }
})

app.get('/stocks/microsoft', (req:Request, res:Response):void => {
    try {
        fetch(`${FLASK_URL}/stocks/microsoft`)
        .then(res => res.json())
        .then(data => res.json(data));
    } catch (error) {
        res.status(500).json({error: 'Flask server error'});
    }
})

app.get('/stocks/nvidia', (req:Request, res:Response):void => {
    try {
        fetch(`${FLASK_URL}/stocks/nvidia`)
        .then(res => res.json())
        .then(data => res.json(data));
    } catch (error) {
        res.status(500).json({error: 'Flask server error'});
    }
})

app.get('/analyze', (req:Request, res:Response):void =>{
    fetch(`${FLASK_URL}/analyze`)
})

app.listen(PORT, ():void => {
    console.log(`Listening on PORT ${PORT}`)
});