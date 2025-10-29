import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';


const Itinerary = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://tourism-m161.onrender.com/api/itinerary/all')
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData.data[0].generatedItinerary);
        console.log(jsonData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
      
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <div>
      <h1>Travel Itinerary</h1>
      <ReactMarkdown>
  {data}
</ReactMarkdown>
    </div>
  );
};

export default Itinerary;
