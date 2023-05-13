import React from 'react'
import './Contact.css'
import { Helmet } from 'react-helmet'
const Contact = () => {
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
        content=""
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="800" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@curiosity__takeover" />
      <meta name="twitter:site" content="@curiosity__takeover" />
    </Helmet>
    <div className='ct__contact'>Contact</div>
    </>
  )
}

export default Contact