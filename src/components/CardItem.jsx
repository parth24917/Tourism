import React from 'react';
import { Link } from 'react-router-dom';

function CardItem({ src, text, label, path }) {
  return (
    <li className="cards__item">
      <Link className="cards__item__link" to={path}>
        <figure className="cards__item__pic-wrap">
          <img className="cards__item__img" src={src} alt={text} loading="lazy" />
          <span className="cards__item__label">{label}</span>
        </figure>
        <div className="cards__item__info">
          <h3 className="cards__item__text">{text}</h3>
          <span className="cards__item__cta">View trip</span>
        </div>
      </Link>
    </li>
  );
}

export default CardItem;