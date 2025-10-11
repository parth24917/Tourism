import mongoose from 'mongoose'

const itSchema = new mongoose.Schema({
    destination: { type: String, required: true },
    duration: { type: Number, required: true},
    hotel: { type: Number, required: true },
    location: { type: String, required: true },
    transport: { type: String, required: true }, 
    generatedItinerary: { type: String, required: false }
}, {
    timestamps: true
});

const Itinerary = mongoose.model('Itinerary', itSchema);
export default Itinerary