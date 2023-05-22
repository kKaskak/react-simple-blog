import React, {useState } from 'react'
import './Contact.css'
import { Helmet } from 'react-helmet'
import { client } from '../../client';
import { MdEmail } from 'react-icons/md'
const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { username, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: formData.username,
      email: formData.email,
      message: formData.message,
    };

    client.create(contact)
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
      <meta property="og:url" content="https://curiositytakeover.com/contact" />
      <meta property="og:site_name" content="Curiosity Takeover" />
      <meta
        property="og:image"
        content="https://cdn.sanity.io/images/zeqqep1d/production/dc0af8ffed5f743ce3528579a2a79b17d1d0e77e-2086x1740.png"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="800" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@curiosity__takeover" />
      <meta name="twitter:site" content="@curiosity__takeover" />
      <meta name="twitter:image" content="https://cdn.sanity.io/images/zeqqep1d/production/dc0af8ffed5f743ce3528579a2a79b17d1d0e77e-2086x1740.png" />
    </Helmet>
    <div className='ct__contact'>
      <div className='ct__contact-head-text'>
        <h1>Connect</h1>
        <h4>with us 📞</h4>
      </div>
      <div className='ct__contact-contact'>
        <div className='ct__contact-card'>
          <MdEmail size={25} />
          <a href="mailto:curiositytakeoveer@gmail.com" className="">curiositytakeover@gmail.com</a>
        </div>
      </div>
      {!isFormSubmitted ? (
        <div className="ct__contact-form">
          <div className="">
            <input className="" type="text" placeholder="Your Name" name="username" value={username} onChange={handleChangeInput} />
          </div>
          <div className="">
            <input className="" type="email" placeholder={"Your Email"} name="email" value={email} onChange={handleChangeInput} />
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
          <button type="button" className="" onClick={handleSubmit}>{!loading ? 'Send Message' : 'Sending...'}</button>
        </div>
      ) : (
        <div className='ct__contact-response'>
          <h3 id='message' className="ct__contact-h3">
            Thank you for getting in touch!
          </h3>
        </div>
      )}
    </div>
    </>
  )
}

export default Contact