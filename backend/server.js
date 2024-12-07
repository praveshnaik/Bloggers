const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api/auth',authRoutes);
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log('mongodb connected'))
.catch((err)=>console.log(err));

app.listen(PORT,()=>console.log(`Server is listening on ${PORT}`));

