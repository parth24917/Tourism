import express from 'express';
import { createItinerary, getAllItineraries, getItinerary } from '../Controllers/itcontrol.js';

const router = express.Router();

router.post('/create', createItinerary);

router.get('/all', getAllItineraries);

router.get('/:id', getItinerary);

export default router;
