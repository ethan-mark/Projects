import React, { useState } from "react";
import "./assets/css/app.css";
// Assuming you separate CSS into a file
import bookCover from "./assets/images/book-cover.jpg";
import formPNG from "./assets/images/form.png";
import authorPhoto from "./assets/images/author-photo.jpg";
import greenButton from "./assets/images/green-button.png";
import { useCalendlyEventListener, InlineWidget } from "react-calendly";

const App = () => {
  const [isPopupActive, setPopupActive] = useState(false);
  const [isCalendlyActive, setCalendlyActive] = useState(false);
  const openPopup = () => setPopupActive(true);
  const closePopup = () => setPopupActive(false);

  const openCalendly = () => setCalendlyActive(true);
  const closeCalendly = () => setCalendlyActive(false);

  const bigButtonStyle = {
    margin: "0 auto",
    background: "#003366",
  };

  // const authenticate = async (e) => {
  //   try {
  //     const response = await fetch(
  //       "https://crm.redtailtechnology.com/api/public/v1/authentication",
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `${API_KEY}`,
  //         },
  //       },
  //     );
  //
  //     const data = await response.json();
  //     console.log(data);
  //     if (response.ok) {
  //       console.log(data);
  //     } else {
  //       console.error("Redtail CRM Error:", data);
  //       alert(
  //         "There was an error retrieving your authentication. Please try again.",
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Submission Error:", error);
  //     alert("Something went wrong. Please try again.");
  //   }
  // };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission

    if (isSubmitting) return;
    setIsSubmitting(true);
    const payload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      company_name: formData.company_name,
      emails: [
        { email_type: "Work", address: formData.work_email },
        { email_type: "Other", address: formData.alt_email },
      ],
      phones: [
        {
          phone_type: "Mobile",
          number: formData.cell_phone,
          country_code: "1",
        },
      ],
      addresses: [
        {
          address_type: 1,
          street_address: formData.street_address + " " + formData.suite,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
        },
      ],
      important_information: formData.biggest_challenge,
      source: "Internet Lead",
      status: "Prospect",
    };

    try {
      const response = await fetch(
        "https://retirement-back-end.vercel.app/api/user/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("Your information has been submitted successfully!");
        openCalendly(); // Open Calendly popup after submission
        closePopup(); // Close form popup
      } else {
        console.error("Redtail CRM Error:", data);
        alert(
          "There was an error submitting your information. Please try again.",
        );
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    company_name: "",
    cell_phone: "",
    work_email: "",
    alt_email: "",
    street_address: "",
    suite: "",
    city: "",
    state: "",
    zip: "",
    biggest_challenge: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <header>
        <h1>
          Free Book For Professional Women In Chicago Looking To Feel Confident,
          Comfortable And In Control Of Their Financial Future
        </h1>
        <p>
          Order your complimentary new book{" "}
          <strong>“Retire With Simplicity & Clarity”</strong> below and{" "}
          <strong>get a free Financial Retirement Consultation</strong> (value
          $595.00).
        </p>
      </header>

      <div className="main-content">
        <section className="book-section">
          <img src={bookCover} alt="Retire With Simplicity & Clarity Book" />
          <div className="details">
            <ul>
              <li>
                How to develop a comprehensive retirement plan that ensures
                financial stability and peace of mind throughout your retirement
                years.
              </li>
              <li>
                Methods to prepare for and manage the financial burden of
                long-term medical care, so you can protect your savings and
                maintain your quality of life.
              </li>
              <li>
                How potential increases in tax rates could impact your
                retirement savings and discover strategies to mitigate these
                effects.
              </li>
              <li>
                Insights into how to adjust your financial plan in response to
                life changes and economic shifts, ensuring your retirement plan
                remains effective and relevant.
              </li>
            </ul>
            <button className="cta-image-button" onClick={openPopup}>
              <img src={greenButton} alt="Yes! Mail Me The Free Book!" />
            </button>
          </div>
        </section>

        <section className="author-section">
          <h2>Meet The Author</h2>
          <img src={authorPhoto} alt="Ron Mark" />
          <p>
            Ron Mark is a best-selling author and an experienced financial
            advisor with over three decades in the finance industry. He has
            developed a profound understanding of the financial challenges and
            opportunities that individuals face, particularly professional women
            as they work to secure the retirement they've always envisioned.
          </p>
          <p>
            Ron recognizes the unique challenges women face in planning for
            their later years, from balancing career and family to navigating
            financial markets. He is committed to providing clear, actionable
            strategies that allow his clients to build a solid financial
            foundation, ensuring they can enjoy a more comfortable and confident
            retirement.
          </p>
          <p>
            What sets Ron apart is his ability to create personalized financial
            plans that are comprehensive and adaptable to life's unexpected
            twists and turns. His extensive financial background is not simply
            rooted in advising clients but also in educating the next generation
            of financial professionals. For the past 12 years, Ron has been a
            finance instructor at a local university, where he shares his
            in-depth knowledge and practical insights, helping students grasp
            the complexities of financial planning.
          </p>
        </section>
      </div>

      <footer>
        <button
          className="cta-image-button"
          style={bigButtonStyle}
          onClick={openPopup}
        >
          <img src={greenButton} alt="Yes! Mail Me The Free Book!" />
        </button>
      </footer>

      {/* Popup Overlay */}
      {isPopupActive && (
        <>
          <div className="popup-overlay active" onClick={closePopup}></div>
          <div className="popup-form active">
            <button className="close-popup" onClick={closePopup}>
              &times;
            </button>
            <h3>
              YES! I want to schedule my complimentary consultation and please
              mail me Ron's 2 books ASAP!
            </h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="first_name"
                placeholder="First Name*"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name*"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="company_name"
                placeholder="Company Name*"
                required
                onChange={handleChange}
              />
              <input
                type="tel"
                name="cell_phone"
                placeholder="Cell Phone*"
                required
                onChange={handleChange}
              />
              <input
                type="email"
                name="work_email"
                placeholder="Work Email*"
                required
                onChange={handleChange}
              />
              <input
                type="email"
                name="alt_email"
                placeholder="Alternative Email"
                onChange={handleChange}
              />
              <input
                type="text"
                name="street_address"
                placeholder="Street Address*"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="suite"
                placeholder="Suite #"
                onChange={handleChange}
              />
              <input
                type="text"
                name="city"
                placeholder="City*"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="state"
                placeholder="State*"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="zip"
                placeholder="Zip Code*"
                required
                onChange={handleChange}
              />
              <textarea
                className="challengeTextArea"
                name="biggest_challenge"
                placeholder="What is your biggest financial challenge?"
                onChange={handleChange}
              />
              <button type="submit">
                Mail Me The Books & Show Me The Calendar To Schedule!
              </button>
            </form>
          </div>
        </>
      )}

      {/* Calendly Popup */}
      {isCalendlyActive && (
        <div className="popup-overlay active" onClick={closePopup}>
          <div id="calendly-popup" style={{ display: "block" }}>
            <button className="close-calendly-popup" onClick={closeCalendly}>
              &times;
            </button>
            {/*<div*/}
            {/*  className="calendly-inline-widget"*/}
            {/*  data-url="https://calendly.com/ronmark/30min?hide_gdpr_banner=1"*/}
            {/*  style={{minWidth: '320px', height: '700px' }}*/}
            {/*>*/}
            {/*</div>*/}
            <InlineWidget
              url={"https://calendly.com/ronmark/30min?hide_gdpr_banner=1"}
            ></InlineWidget>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
