const Contact = require("../Models/contactmodel")

const contactcontrol = async(req,res) => {
 try {
    const {name,email,message} = req.body;
    const newContact = new Contact({
        name,
        email,
        message
        });
        await newContact.save();
        res.status(201).json({message: 'Contact saved successfully'});
        

 } catch (error) {
    console.log("Can't send form data", error)
    
 }
};

module.exports = contactcontrol