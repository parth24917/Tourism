import { useEffect, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import "./Testimonials.css";

const testimonials = [
  {
    name: "Ananya Sharma",
    trip: "Manali & Kasol, 5 days",
    rating: 5,
    photo: "", // add an image URL, e.g. "/images/ananya.jpg". Leave empty to show initials.
    quote:
      "Everything was arranged for us, from pickups to homestays. Our guide knew every quiet spot the tourists miss.",
  },
  {
    name: "Rohit Verma",
    trip: "Jaipur & Udaipur, 6 days",
    rating: 5,
    photo: "",
    quote:
      "The itinerary was relaxed and well paced. When our train was delayed, support rebooked our cab within minutes.",
  },
  {
    name: "Simran Kaur",
    trip: "Spiti Valley, 8 days",
    rating: 4,
    photo: "",
    quote:
      "Great value for a remote trip. Rooms were basic in a few places, but the team told us that upfront.",
  },
  {
    name: "Karan Mehta",
    trip: "Rishikesh, 3 days",
    rating: 5,
    photo: "",
    quote:
      "Booked last minute and still got a good riverside stay. The rafting operator was safe and well organised.",
  },
  {
    name: "Neha Gupta",
    trip: "Kerala backwaters, 7 days",
    rating: 5,
    photo: "",
    quote:
      "Our family of six travelled comfortably. The houseboat night was the highlight, and the driver was excellent.",
  },
  {
    name: "Aman Singh",
    trip: "Shimla & Kufri, 4 days",
    rating: 4,
    photo: "",
    quote:
      "Smooth trip overall. Sightseeing stops were a bit rushed on day two, but support adjusted the plan quickly.",
  },
];

function Stars({ rating }) {
  return (
    <div className="testi__stars" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={18}
          aria-hidden="true"
          className={n <= rating ? "testi__star testi__star--on" : "testi__star"}
        />
      ))}
    </div>
  );
}

function Avatar({ name, photo }) {
  if (photo) {
    return <img className="testi__avatar" src={photo} alt={name} loading="lazy" />;
  }
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="testi__avatar testi__avatar--initials" aria-hidden="true">
      {initials}
    </div>
  );
}

export default function Testimonials() {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, []);

  // Scroll by one visible "page" (3 cards on desktop, 2 on tablet, 1 on mobile)
  const scrollByPage = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: direction * (el.clientWidth + gap), behavior: "smooth" });
  };

  return (
    <section className="testi">
      <div className="testi__inner">
        <div className="testi__header">
          <h2 className="testi__title">What our travellers say</h2>
          <div className="testi__controls">
            <button
              type="button"
              className="testi__btn"
              onClick={() => scrollByPage(-1)}
              disabled={atStart}
              aria-label="Previous reviews"
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="testi__btn"
              onClick={() => scrollByPage(1)}
              disabled={atEnd}
              aria-label="Next reviews"
            >
              <ChevronRight size={22} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className="testi__track"
          ref={trackRef}
          onScroll={updateEdges}
          tabIndex={0}
          role="region"
          aria-label="Traveller reviews, scroll horizontally"
        >
          {testimonials.map((t) => (
            <figure key={t.name} className="testi__card">
              <Stars rating={t.rating} />
              <blockquote className="testi__quote">{t.quote}</blockquote>
              <figcaption className="testi__author">
                <Avatar name={t.name} photo={t.photo} />
                <div>
                  <div className="testi__name">{t.name}</div>
                  <div className="testi__trip">{t.trip}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}