import express from 'express';
import connectDB from './config/dbConfig.js';
import { createPost } from './controllers/postController.js';


const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res)=>{
    return res.send('HOME PAGE');
})

app.get('/ping', (req,res)=>{
    return res.json({message: 'pong'});
})

function m1(req,res,next){
    console.log('m1');
    next();
}

function m2(req,res,next){
    console.log('m2');
    next();
}

function m3(req,res,next){
    console.log('m3');
    next();
}

app.post('/post',m1,m2,m3, createPost);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});

