import { useState } from 'react';
import { client } from '../../client';
import { MdEmail } from 'react-icons/md';
import { BsFacebook } from 'react-icons/bs';
import { xcorp, xcorpwhite } from '../../assets/imgs';
import { PageLayout } from '../../components';
import ContactHelmet from './ContactHelmet';
import './Contact.css';

const Contact = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
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
		if (username === '' || email === '' || message === '') {
			setError('Please fill in all the fields!');
			setTimeout(() => setError(null), 3000);
			return;
		}
		setLoading(true);

		const contact = {
			_type: 'contact',
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
			.catch((err) => {
				// eslint-disable-next-line no-console
				console.log(err);
			});
	};
	return (
		<PageLayout>
			<ContactHelmet />
			<div className='contact'>
				<div className='contact-head-text'>
					<h1>Connect</h1>
					<h4>with us 📞</h4>
				</div>
				<div className='contact-contact'>
					<div className='contact-card'>
						<MdEmail size={25} />
						<a href='mailto:curiositytakeover@gmail.com' className=''>
							curiositytakeover@gmail.com
						</a>
					</div>
				</div>
				{!isFormSubmitted ? (
					<div className='contact-form'>
						<div className=''>
							<input className='' type='text' placeholder='Your Name' name='username' value={username} onChange={handleChangeInput} />
						</div>
						<div className=''>
							<input className='' type='email' placeholder={'Your Email'} name='email' value={email} onChange={handleChangeInput} />
						</div>
						<div>
							<textarea className='' placeholder={'Your Message'} value={message} name='message' onChange={handleChangeInput} />
						</div>
						<button type='button' className='' onClick={handleSubmit}>
							{!loading ? 'Send Message' : 'Sending...'}
						</button>
					</div>
				) : (
					<div className='contact-response'>
						<h3 id='message' className='contact-h3'>
							Thank you for getting in touch!
						</h3>
					</div>
				)}
				<div style={error ? { visibility: 'visible' } : { visibility: 'hidden' }} className='error-message'>
					{error ? error : 'Please fill in all the fields!'}
				</div>
				<hr className='hr-contact'></hr>
				<div className='contact-waves'>
					<a className='contact-waves__twitter-in' href='https://www.twitter.com/curiosity__blog' rel='noreferrer' target='_blank'>
						<img src={xcorp} alt='xcorp' style={{ width: '66px' }} />
					</a>
					<a className='contact-waves__twitter-in' target='_blank' rel='noreferrer' href='https://www.facebook.com/curiosity.takeover/'>
						<BsFacebook size={53} style={{ minWidth: 47 }} />
					</a>
				</div>
				<div className='contact-waves__rights'>
					<h6>© 2025 Curiosity Takeover Offcial Blog • All rights reserved.</h6>
					<h6>
						Created with love ❤️ • by{' '}
						<a rel='noreferrer' target='_blank' href='https://timothy-z.xyz'>
							kKaskak
						</a>
						.
					</h6>
					<h6>
						Copyright Disclaimer under section 107 of the Copyright Act 1976, allowance is made for “fair use” for purposes such as
						criticism, comment, news reporting, teaching, scholarship, education and research. Fair use is a use permitted by copyright
						statute that might otherwise be infringing. Non-profit, educational or personal use tips the balance in favor of fair use.
					</h6>
				</div>
				<div className='contact-waves-div'>
					<svg className='contact-waves__svg' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
						<path
							fill='#000000'
							fillOpacity='1'
							d='M0,128L60,149.3C120,171,240,213,360,213.3C480,213,600,171,720,133.3C840,96,960,64,1080,58.7C1200,53,1320,75,1380,85.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z'
						></path>
					</svg>
					<a className='contact-waves__twitter' href='https://www.twitter.com/curiosity__blog' rel='noreferrer' target='_blank'>
						<img alt='xcorp' src={xcorpwhite} style={{ width: '60px' }} />
					</a>
					<a className='contact-waves__twitter-2' href='https://www.facebook.com/curiosity.takeover/' rel='noreferrer' target='_blank'>
						<BsFacebook size={50} style={{ minWidth: 47 }} />
					</a>
					<div className='fill'></div>
				</div>
			</div>
		</PageLayout>
	);
};

export default Contact;
