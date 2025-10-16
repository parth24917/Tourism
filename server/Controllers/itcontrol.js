import { GoogleGenerativeAI } from '@google/generative-ai';
import Itinerary from '../Models/itmodel.js';
import dotenv from 'dotenv';
dotenv.config();


const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);
console.log('NEW: ',process.env.VITE_GEMINI_API_KEY)
export const createItinerary = async (req, res) => {
    try {
        const { destination, duration, hotel, location, transport,people } = req.body;

        if (!destination || !duration || !hotel || !location || !transport || !people) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required: destination, duration, hotel, location, transport'
            });
        }

        const prompt = `
        Create a detailed travel itinerary with the following specifications:
        
        Destination: ${destination}
        Duration: ${duration} days
        Hotel Preference: ${hotel}
        Location/Area: ${location}
        Transport Preference: ${transport}
        Number of people: ${people}
        
        Please provide:
        1. A day-by-day detailed itinerary
        2. Hotel recommendations with booking links (use actual booking sites like booking.com, expedia.com etc.)
        3. Transportation booking links and options
        4. Per person budget breakdown including:
           - Accommodation costs
           - Transportation costs
           - Food expenses
           - Activity/sightseeing costs
           - Total estimated cost
        
        Include practical tips and recommendations for the destination.
        `;

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const generatedItinerary = response.text();

        const newItinerary = new Itinerary({
            destination,
            duration: parseInt(duration),
            hotel,
            location,
            transport,
            people,
            generatedItinerary
        });

        const savedItinerary = await newItinerary.save();

        res.status(201).json({
            success: true,
            message: 'Itinerary created successfully',
            data: {
                id: savedItinerary._id,
                destination: savedItinerary.destination,
                duration: savedItinerary.duration,
                itinerary: generatedItinerary
            }
        });

    } catch (error) {
        console.error('Error creating itinerary:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create itinerary',
            error: error.message
        });
    }
};

export const getAllItineraries = async (req, res) => {
    try {
        const itineraries = await Itinerary.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: itineraries.length,
            data: itineraries
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch itineraries',
            error: error.message
        });
    }
};

export const getItinerary = async (req, res) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id);
        if (!itinerary) {
            return res.status(404).json({
                success: false,
                message: 'Itinerary not found'
            });
        }
        res.status(200).json({
            success: true,
            data: itinerary
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch itinerary',
            error: error.message
        });
    }
};
