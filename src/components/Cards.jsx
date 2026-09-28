import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

// Data lives in one array, so adding a destination is one new object, not new JSX.
const destinations = [
  {
    id: 1,
    src: './images/wwaterfall.webp',
    text: 'Explore the hidden waterfall deep inside the Amazon Jungle',
    label: 'Adventure',
    path: '/services',
  },
  {
    id: 2,
    src: './images/bali.webp',
    text: 'Travel through the Islands of Bali in a Private Cruise',
    label: 'Luxury',
    path: '/services',
  },
  {
    id: 3,
    src: './images/waters.webp',
    text: 'Set Sail in the Atlantic Ocean visiting Uncharted Waters',
    label: 'Mystery',
    path: '/services',
  },
  {
    id: 4,
    src: './images/football.webp',
    text: 'Experience Football on Top of the Himalayan Mountains',
    label: 'Adventure',
    path: '/services',
  },
  {
    id: 5,
    src: './images/desert.webp',
    text: 'Ride through the Sahara Desert on a guided camel tour',
    label: 'Adrenaline',
    path: '/services',
  },
];

function Cards() {
  return (
    <section className="cards" id="destinations">
      <div className="cards__container">
        <header className="cards__header">
          <h2 className="cards__title">Popular destinations</h2>
          <p className="cards__subtitle">
            Pick a style of trip and we will take care of the rest.
          </p>
        </header>

        <ul className="cards__items">
          {destinations.map((d) => (
            <CardItem key={d.id} {...d} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Cards;