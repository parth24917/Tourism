import express from 'express';
import cors from 'cors';
import Itineraryroutes from './Routes/itroutes.js';
import connect from './connectdb.js';

const app = express();
app.use(express.json())
app.use(cors());
app.use('/api/itinerary', Itineraryroutes);

connect();

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});





