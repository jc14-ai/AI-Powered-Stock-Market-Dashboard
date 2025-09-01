import express, { Request, Response } from "express";
import cors from 'cors';
import axios from 'axios';

const app = express();

const PORT = 3000;

app.use(cors());

app.get('/hello', (req:Request, res:Response):void => {
    res.json({'message':'Youre getting this from express!'})
})

app.get('/predict', async (req:Request, res:Response) => {
    try {
        const response = await axios.get('http://localhost:5000/predict');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({error: 'Flask server error'});
    }
})

app.listen(PORT, ():void => {
    console.log(`Listening on PORT ${PORT}`)
});