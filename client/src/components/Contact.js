import React, { useState, useEffect } from 'react'
import { useProductContext } from './common/api/provider'
import { contactmessageService } from '../services/contactmessageService'
import { useSelector } from 'react-redux';

export const Contact = () => {
  const { contactMessageURL } = useProductContext();
  const stateUser = useSelector((state) => state.userHandler.user);

  const [userData, setUserData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Prefill form data when component mounts
  useEffect(() => {
    if (stateUser) {
      setUserData({
        name: stateUser.name || '',
        email: stateUser.email || '',
        phone: stateUser.phone || '',
        message: ''
      });
    }
  }, [stateUser]);

  // data send to backend
  const contactForm = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData;

    try {
      const data = await contactmessageService.sendMessage(contactMessageURL, userData);
      if (!data) {
        swal('error!', 'Message Not Sent', 'error');
      } else {
        swal('success!', 'Message Sent', 'success');
        setUserData({ ...userData, message: '' })
      }
    } catch (error) {
      swal('error!', 'Failed to send message', 'error');
    }
  };


  return (
    <>
      <section className="contact my-5">
        <div className="container">
          <div className="row">
            <h1 className="text-center mb-4">Contact Us</h1>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-md-12">
                  <div className="info-box">
                    <h3>Our Address</h3>
                    <p>A108 Adam Street, New York, NY 535022</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info-box">
                    <h3>Email Us</h3>
                    <p>info@example.com<br />contact@example.com</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info-box">
                    <h3>Call Us</h3>
                    <p>+1 5589 55488 55<br />+1 6678 254445 41</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <form onSubmit={contactForm}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input type="text"
                      className="form-control"
                      name='name'
                      onChange={handleInputs}
                      value={userData.name}
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="email"
                      className="form-control"
                      name='email'
                      onChange={handleInputs}
                      value={userData.email}
                      placeholder="Your Email"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <input type="number"
                    className="form-control"
                    name='phone'
                    onChange={handleInputs}
                    value={userData.phone}
                    placeholder="Your Phone"
                  />
                </div>
                <div className="mb-3">
                  <textarea className="form-control"
                    onChange={handleInputs}
                    value={userData.message}
                    name="message"
                    rows="5"
                    placeholder="Message">
                  </textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className='btn btn-primary'>Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}