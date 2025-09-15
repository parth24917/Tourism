
import Cards from "../Cards";
import CardItem from "../CardItem";
import "./Services.css" 
const services = [
  {
    id: 1, 
    image: "images/Mountain.jpg",
    title: "Adventure",
    description: "Experience the thrill of mountain climbing.",
    price: "$199",
  },
  {
    id: 2,
    image: "images/Beach.jpg",
    title: "Beach",
    description: "Relax on the sunny beaches with crystal-clear waters.",
    price: "$149",
  },
  {
    id: 2,
    image: "images/Safari.jpg",
    title: "Wildlife",
    description: "Explore the exotic wildlife in the heart of nature.",
    price: "$149",
  },
  {
    id: 2,
    image: "images/City.jpg",
    title: "City",
    description: "Discover the vibrant life of metropolitan cities.",
    price: "$249",
  },
  {
    id: 2,
    image: "images/Cruise.jpg",
    title: "Luxury",
    description: "Sail across the ocean in a luxury cruise with scenic views.",
    price: "$399",
  },
  {
    id: 2,
    image: "images/Skiing.jpg",
    title: "Adventure",
    description: "Enjoy skiing on the best snowy slopes.",
    price: "$249",
  },
];
const Services = () => {
  return (
    <>
    <h1 className="h1">Checkout our Packages!</h1>
    <div className="cards">
      {services.map((service) => (
        <div key={service.id} className="card-container">
          <CardItem 
            src={service.image} 
            text={service.description} 
            label={service.title} 
            path="/services" 
          />
          <h2 className="card-price">{service.price}</h2>
          <button className="book-now">Book Now</button>
        </div>
      ))}
    </div>
    </>
  );
};


export default Services;
