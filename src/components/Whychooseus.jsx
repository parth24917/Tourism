import { BadgePercent, Compass, Headset, CalendarCheck } from "lucide-react";
import "./Whychooseus.css";

const features = [
  {
    icon: BadgePercent,
    title: "Best price guarantee",
    text: "Found the same trip cheaper elsewhere? Show us and we will match it.",
  },
  {
    icon: Compass,
    title: "Local guides",
    text: "Every trip is led by someone who lives in the region and knows it well.",
  },
  {
    icon: Headset,
    title: "24/7 support",
    text: "Call or WhatsApp us at any hour, before and during your trip.",
  },
  {
    icon: CalendarCheck,
    title: "Flexible cancellation",
    text: "Change your dates or cancel up to 7 days before departure.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="why">
      <div className="why__inner">
        <div className="why__intro">
          <h2 className="why__title">Why travellers book with us</h2>
          <p className="why__subtitle">
            Fair prices, people who know the place, and help when plans change.
          </p>
        </div>

        <ul className="why__list">
          {features.map(({ icon: Icon, title, text }) => (
            <li key={title} className="why__item">
              <span className="why__icon">
                <Icon size={22} aria-hidden="true" />
              </span>
              <div>
                <h3 className="why__item-title">{title}</h3>
                <p className="why__item-text">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}