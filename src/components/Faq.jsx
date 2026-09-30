import { useState } from "react";
import { Plus, MessageCircle } from "lucide-react";
import "./FAQ.css";

const categories = ["Booking", "Payments", "Cancellation", "Travel & safety"];

const faqs = [
  {
    category: "Booking",
    q: "How do I book a trip?",
    a: "Choose a package, pick your dates and number of travellers, and send the booking request. We confirm availability within a few hours and share the itinerary by email and WhatsApp.",
  },
  {
    category: "Booking",
    q: "Can I customise a package?",
    a: "Yes. You can change hotels, add days, or swap activities. Send us your plan through the enquiry form and we will share a revised quote.",
  },
  {
    category: "Payments",
    q: "How much do I pay to confirm my booking?",
    a: "A part payment confirms your booking. The balance is due before departure. The exact amounts are shown on your quote.",
  },
  {
    category: "Payments",
    q: "Which payment methods do you accept?",
    a: "UPI, debit and credit cards, net banking, and bank transfer. You receive a receipt for every payment.",
  },
  {
    category: "Cancellation",
    q: "Can I cancel or change my dates?",
    a: "You can cancel or reschedule up to 7 days before departure. After that, charges depend on what we have already paid to hotels and transport.",
  },
  {
    category: "Cancellation",
    q: "How long do refunds take?",
    a: "Refunds go back to your original payment method within 7 to 10 working days after your cancellation is confirmed.",
  },
  {
    category: "Travel & safety",
    q: "Do I need any documents for domestic trips?",
    a: "Carry a valid photo ID for every traveller. Some regions, such as Spiti or the North East, may need extra permits. We tell you in advance and help with them.",
  },
  {
    category: "Travel & safety",
    q: "Is it safe to travel solo or with family?",
    a: "Yes. Our guides and drivers are verified, and you can reach our support team at any hour during your trip.",
  },
];

// Replace with your real WhatsApp number in international format, no + or spaces
const WHATSAPP_URL = "https://wa.me/910000000000";

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [openIndex, setOpenIndex] = useState(0);

  const visible = faqs.filter((f) => f.category === activeCategory);

  const changeCategory = (c) => {
    setActiveCategory(c);
    setOpenIndex(0);
  };

  return (
    <section className="faq">
      <div className="faq__inner">
        <aside className="faq__panel">
          <h2 className="faq__title">Questions before you book?</h2>
          <p className="faq__lead">
            Quick answers on booking, payments, cancellations and safety. Can't find yours? Message us and a real person will reply.
          </p>
          <a className="faq__cta" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            <MessageCircle size={20} aria-hidden="true" />
            Chat on WhatsApp
          </a>
        </aside>

        <div className="faq__main">
          <div className="faq__tabs" role="tablist" aria-label="FAQ categories">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={c === activeCategory}
                className={c === activeCategory ? "faq__tab faq__tab--active" : "faq__tab"}
                onClick={() => changeCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <ul className="faq__list">
            {visible.map((item, i) => {
              const open = openIndex === i;
              return (
                <li key={item.q} className={open ? "faq__item faq__item--open" : "faq__item"}>
                  <button
                    type="button"
                    className="faq__question"
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpenIndex(open ? -1 : i)}
                  >
                    <span>{item.q}</span>
                    <span className="faq__toggle">
                      <Plus size={18} aria-hidden="true" />
                    </span>
                  </button>
                  <div id={`faq-panel-${i}`} className="faq__answer" role="region">
                    <div className="faq__answer-inner">
                      <p>{item.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}