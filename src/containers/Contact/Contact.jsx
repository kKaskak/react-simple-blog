import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { client } from "../../client";
import { MdEmail } from "react-icons/md";
import { AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import "./Contact.css";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { username, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (username === "" || email === "" || message === "") {
      setError("Please fill in all the fields!");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }
    setLoading(true);

    const contact = {
      _type: "contact",
      name: formData.username,
      email: formData.email,
      message: formData.message,
    };

    client
      .create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Helmet>
        <title>Curiosity Contact Page</title>
        <meta
          name="description"
          content="Connect with us through our Contact Page. Reach out to us for any inquiries, collaborations, or feedback. We value your input and look forward to hearing from you. Stay connected with Curiosity Takeover."
        />
        <meta
          name="keywords"
          content="contact, inquiries, collaborations, feedback, Curiosity Takeover"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Curiosity Contact Page" />
        <meta
          property="og:description"
          content="Connect with us through our Contact Page. Reach out to us for any inquiries, collaborations, or feedback. We value your input and look forward to hearing from you. Stay connected with Curiosity Takeover."
        />
        <meta
          property="og:url"
          content="https://curiositytakeover.com/contact"
        />
        <meta property="og:site_name" content="Curiosity Takeover" />
        <meta
          property="og:image"
          content="https://cdn.sanity.io/images/zeqqep1d/production/dc0af8ffed5f743ce3528579a2a79b17d1d0e77e-2086x1740.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="800" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@curiosity__blog" />
        <meta name="twitter:site" content="@curiosity__blog" />
        <meta
          name="twitter:image"
          content="https://cdn.sanity.io/images/zeqqep1d/production/dc0af8ffed5f743ce3528579a2a79b17d1d0e77e-2086x1740.png"
        />
      </Helmet>
      <div className="ct__contact">
        <div className="ct__contact-head-text">
          <h1>Connect</h1>
          <h4>with us 📞</h4>
        </div>
        <div className="ct__contact-contact">
          <div className="ct__contact-card">
            <MdEmail size={25} />
            <a href="mailto:curiositytakeover@gmail.com" className="">
              curiositytakeover@gmail.com
            </a>
          </div>
        </div>
        {!isFormSubmitted ? (
          <div className="ct__contact-form">
            <div className="">
              <input
                className=""
                type="text"
                placeholder="Your Name"
                name="username"
                value={username}
                onChange={handleChangeInput}
              />
            </div>
            <div className="">
              <input
                className=""
                type="email"
                placeholder={"Your Email"}
                name="email"
                value={email}
                onChange={handleChangeInput}
              />
            </div>
            <div>
              <textarea
                className=""
                placeholder={"Your Message"}
                value={message}
                name="message"
                onChange={handleChangeInput}
              />
            </div>
            <button type="button" className="" onClick={handleSubmit}>
              {!loading ? "Send Message" : "Sending..."}
            </button>
          </div>
        ) : (
          <div className="ct__contact-response">
            <h3 id="message" className="ct__contact-h3">
              Thank you for getting in touch!
            </h3>
          </div>
        )}
        <div
          style={error ? { visibility: "visible" } : { visibility: "hidden" }}
          className="error-message"
        >
          {error ? error : "Please fill in all the fields!"}
        </div>
        <hr className="hr-contact"></hr>
        <div className="ct__contact-waves">
          <a
            className="ct__contact-waves__twitter-in"
            href="https://www.twitter.com/curiosity__blog"
            rel="noreferrer"
            target="_blank"
          >
            <AiFillTwitterCircle size={60} />
          </a>
          <a
            className="ct__contact-waves__twitter-in"
            target="_blank"
            rel="noreferrer"
            href="https://www.facebook.com/curiosity.takeover/"
          >
            <BsFacebook size={53} style={{ minWidth: 47 }} />
          </a>
        </div>
        <div className="ct__contact-waves__rights">
          <h6>
            © 2023 Curiosity Takeover Offcial Blog • All rights reserved.
          </h6>
          <h6>
            Created with love ❤️ • by{" "}
            <a rel="noreferrer" target="_blank" href="https://kkaskak.com">
              kKaskak
            </a>
            .
          </h6>
        </div>
        <div className="ct__contact-waves-div">
          <svg
            className="ct__contact-waves__svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#000000"
              fillOpacity="1"
              d="M0,128L60,149.3C120,171,240,213,360,213.3C480,213,600,171,720,133.3C840,96,960,64,1080,58.7C1200,53,1320,75,1380,85.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
          <a
            className="ct__contact-waves__twitter"
            href="https://www.twitter.com/curiosity__blog"
            rel="noreferrer"
            target="_blank"
          >
            <AiFillTwitterCircle size={60} />
          </a>
          <a
            className="ct__contact-waves__twitter-2"
            href="https://www.facebook.com/curiosity.takeover/"
            rel="noreferrer"
            target="_blank"
          >
            <BsFacebook size={50} style={{ minWidth: 47 }} />
          </a>
          <div className="fill"></div>
        </div>
      </div>
    </>
  );
};

export default Contact;
