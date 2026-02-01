import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api';

export default function EventRegistration() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [teamSize, setTeamSize] = useState(1);
  const [formData, setFormData] = useState({
    teamLeaderName: '',
    teamLeaderEmail: '',
    teamLeaderContact: '',
    transactionId: ''
  });
  const [teamMembers, setTeamMembers] = useState([]);
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`${API_URL}/events/${eventId}`);
      setEvent(response.data.event);
    } catch (err) {
      setError('Failed to load event details');
    }
  };

  const handleTeamSizeChange = (size) => {
    setTeamSize(size);
    if (size > 1) {
      setTeamMembers(Array(size - 1).fill({ name: '', email: '', contact: '' }));
    } else {
      setTeamMembers([]);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleMemberChange = (index, field, value) => {
    const updated = [...teamMembers];
    updated[index] = { ...updated[index], [field]: value };
    setTeamMembers(updated);
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setError('Only image files (JPEG, JPG, PNG) are allowed. PDFs are not accepted.');
        e.target.value = '';
        return;
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size too large. Maximum size allowed is 5MB.');
        e.target.value = '';
        return;
      }
      
      setPaymentScreenshot(file);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate email
    if (!formData.teamLeaderEmail.endsWith('@abes.ac.in')) {
      setError('Team leader email must end with @abes.ac.in');
      setLoading(false);
      return;
    }

    // Validate contact number (10 digits)
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(formData.teamLeaderContact)) {
      setError('Team leader contact must be a valid 10-digit number');
      setLoading(false);
      return;
    }

    // Validate team members
    for (let i = 0; i < teamMembers.length; i++) {
      const member = teamMembers[i];
      
      if (!member.name || !member.email || !member.contact) {
        setError(`Please fill all details for Team Member ${i + 1}`);
        setLoading(false);
        return;
      }
      
      if (!member.email.endsWith('@abes.ac.in')) {
        setError(`Team Member ${i + 1} email must end with @abes.ac.in`);
        setLoading(false);
        return;
      }
      
      if (!contactRegex.test(member.contact)) {
        setError(`Team Member ${i + 1} contact must be a valid 10-digit number`);
        setLoading(false);
        return;
      }
    }

    // Validate payment for paid events
    if (event.registration_fee > 0) {
      if (!paymentScreenshot) {
        setError('Payment screenshot is required for this event');
        setLoading(false);
        return;
      }
      if (!formData.transactionId.trim()) {
        setError('Transaction ID is required');
        setLoading(false);
        return;
      }
    }

    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      
      formDataToSend.append('eventId', eventId);
      formDataToSend.append('teamSize', teamSize);
      formDataToSend.append('teamLeaderName', formData.teamLeaderName);
      formDataToSend.append('teamLeaderEmail', formData.teamLeaderEmail);
      formDataToSend.append('teamLeaderContact', formData.teamLeaderContact);
      formDataToSend.append('transactionId', formData.transactionId);
      
      if (teamMembers.length > 0) {
        formDataToSend.append('teamMembers', JSON.stringify(teamMembers));
      }
      
      if (paymentScreenshot) {
        formDataToSend.append('paymentScreenshot', paymentScreenshot);
      }

      await axios.post(`${API_URL}/registrations`, formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Registration submitted successfully! Await admin approval.');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
          <p className="text-gray-600 mb-6">{event.description}</p>
          
          {event.registration_fee > 0 && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-900 font-semibold">
                Registration Fee: ₹{event.registration_fee}
              </p>
              {event.qr_code_image && (
                <div className="mt-4">
                  <p className="text-sm text-blue-700 mb-2">Scan to pay:</p>
                  <img 
                    src={event.qr_code_image} 
                    alt="Payment QR Code" 
                    className="w-48 h-48 object-contain bg-white rounded-lg border"
                  />
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Size (Max: {event.max_team_size})
              </label>
              <select
                value={teamSize}
                onChange={(e) => handleTeamSizeChange(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                required
              >
                {Array.from({ length: event.max_team_size }, (_, i) => i + 1).map((size) => (
                  <option key={size} value={size}>
                    {size} {size === 1 ? 'Member (Solo)' : 'Members'}
                  </option>
                ))}
              </select>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Leader Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="teamLeaderName"
                    value={formData.teamLeaderName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email (@abes.ac.in) *
                  </label>
                  <input
                    type="email"
                    name="teamLeaderEmail"
                    value={formData.teamLeaderEmail}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="your.email@abes.ac.in"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number (10 digits) *
                  </label>
                  <input
                    type="tel"
                    name="teamLeaderContact"
                    value={formData.teamLeaderContact}
                    onChange={handleChange}
                    required
                    pattern="\d{10}"
                    maxLength="10"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="9876543210"
                  />
                </div>
              </div>
            </div>

            {teamMembers.length > 0 && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h3>
                
                {teamMembers.map((member, index) => (
                  <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-3">Member {index + 1}</h4>
                    
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Full Name *"
                        value={member.name}
                        onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                      />
                      
                      <input
                        type="email"
                        placeholder="Email (@abes.ac.in) *"
                        value={member.email}
                        onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                      />
                      
                      <input
                        type="tel"
                        placeholder="Contact Number (10 digits) *"
                        value={member.contact}
                        onChange={(e) => handleMemberChange(index, 'contact', e.target.value)}
                        required
                        pattern="\d{10}"
                        maxLength="10"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {event.registration_fee > 0 && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Screenshot (Images Only) *
                    </label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="image/jpeg,image/jpg,image/png"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Only JPEG, JPG, PNG images allowed. Max size: 5MB. PDFs are not accepted.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transaction ID *
                    </label>
                    <input
                      type="text"
                      name="transactionId"
                      value={formData.transactionId}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                      placeholder="Enter UPI Transaction ID"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Registration'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}