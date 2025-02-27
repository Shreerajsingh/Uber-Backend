const express = require('express');
const dotenv = require('dotenv');

const authRouter = require('./routes/authRoutes');
const connectToDB = require('./config/dbConfig');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/auth', authRouter); 

app.listen(process.env.PORT, async () => {
    console.log(`Server is running on port ${process.env.PORT}`);

    await connectToDB();
})