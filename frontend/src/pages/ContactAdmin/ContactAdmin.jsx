import React, { useState } from 'react';
import './ContactAdmin.css';
import { toast } from 'react-toastify'
import api from '../../lib/axios.js'


const ContactAdmin = () => {
  const [formData, setFormData] = useState({
    name: '',
    registrationNo: '',
    faculty: '',
    reason: '',
    recommendation: '',
    scholarships: [],
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === 'scholarships') {
      if (checked) {

        setFormData((prev) => ({
          ...prev,
          scholarships: [...prev.scholarships, value],
        }));
      } else {

        setFormData((prev) => ({
          ...prev,
          scholarships: prev.scholarships.filter((item) => item !== value),
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

 const payload = {
  name: formData.name,
  registration: formData.registrationNo,
  faculty: formData.faculty,
  reason: formData.reason,
  recomendation: formData.recommendation, 
  scholership: formData.scholarships,
};

  try {
    const response = await api.post('/api/contact/addto', payload);

    if (response.data.success) {
      setFormData({
        name: '',
        registrationNo: '',
        faculty: '',
        reason: '',
        recommendation: '',
        scholarships: [],
      });
      toast.success("Your request was sent to the admin");
    } else {
      toast.error("Your request was not sent");
    }
  } catch (error) {
    toast.error("An error occurred while sending your request");
    console.error(error);
  }
};


  return (
    <div className="contact-admin-container">
      <h2>Contact Admin for Financial Aid</h2>
      <form className="contact-admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder='Name should be as your username'
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Registration No:
            <input
              type="text"
              name="registrationNo"
              value={formData.registrationNo}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Faculty:
            <input
              type="text"
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Reason for Applying:
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Recommendation from Welfare:
            <input
              type="text"
              name="recommendation"
              value={formData.recommendation}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-group">
          <label>Select any scholarships you currently have:</label>
          <div className="checkbox-group">
            {['None', 'Mahapola', 'Bursary'].map((option) => (
              <label key={option} className="checkbox-pill">
                <input
                  type="checkbox"
                  name="scholarships"
                  value={option}
                  checked={formData.scholarships.includes(option)}
                  onChange={handleChange}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactAdmin;
