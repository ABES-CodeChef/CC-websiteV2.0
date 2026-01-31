import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FloatingNav } from '../components/FloatingNavbar';
import {
  IconHome,
  IconCalendar,
  IconUsers,
  IconMail,
  IconTrophy,
  IconLogout,
  IconDashboard,
} from "@tabler/icons-react";

const API_URL = 'http://localhost:5000/api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/');
  };

  const navLinks = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/",
      onClick: () => navigate("/"),
    },
    {
      title: "Events",
      icon: <IconCalendar className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/events",
      onClick: () => navigate("/events"),
    },
    {
      title: "Team",
      icon: <IconUsers className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/team",
      onClick: () => navigate("/team"),
    },
    {
      title: "Achievements",
      icon: <IconTrophy className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/achievements",
      onClick: () => navigate("/achievements"),
    },
    {
      title: "Contact",
      icon: <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/contact",
      onClick: () => navigate("/contact"),
    },
    {
      title: "Admin  Dashboard",
      icon: <IconDashboard className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/admin",
      onClick: () => navigate("/admin"),
    },
    {
      title: "Logout",
      icon: <IconLogout className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#",
      onClick: handleLogout,
    }
  ];

  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

  const fetchData = async () => {
    try {
      const [statsRes, usersRes, eventsRes, regsRes] = await Promise.all([
        axios.get(`${API_URL}/admin/stats`, getAuthHeader()),
        axios.get(`${API_URL}/admin/users`, getAuthHeader()),
        axios.get(`${API_URL}/events`, getAuthHeader()),
        axios.get(`${API_URL}/admin/registrations`, getAuthHeader())
      ]);

      setStats(statsRes.data.stats);
      setUsers(usersRes.data.users);
      setEvents(eventsRes.data.events);
      setRegistrations(regsRes.data.registrations);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await axios.delete(`${API_URL}/admin/users/${id}`, getAuthHeader());
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete user');
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    
    try {
      await axios.delete(`${API_URL}/events/${id}`, getAuthHeader());
      fetchData();
    } catch (error) {
      alert('Failed to delete event');
    }
  };

  const updateRegistrationStatus = async (id, status) => {
    try {
      await axios.put(`${API_URL}/admin/registrations/${id}/status`, { status }, getAuthHeader());
      fetchData();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const deleteRegistration = async (id) => {
    if (!window.confirm('Are you sure you want to delete this registration?')) return;
    
    try {
      await axios.delete(`${API_URL}/admin/registrations/${id}`, getAuthHeader());
      fetchData();
    } catch (error) {
      alert('Failed to delete registration');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <FloatingNav navItems={navLinks} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="mb-6 flex gap-4 border-b">
          {['stats', 'users', 'events', 'registrations'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold capitalize ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'stats' && stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Users" value={stats.totalUsers} color="blue" />
            <StatCard title="Total Events" value={stats.totalEvents} color="green" />
            <StatCard title="Total Registrations" value={stats.totalRegistrations} color="purple" />
            <StatCard title="Pending Approvals" value={stats.pendingRegistrations} color="orange" />
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Users</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {user.role !== 'admin' && (
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Events</h2>
              <button
                onClick={() => setShowCreateEvent(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Event
              </button>
            </div>
            
            {showCreateEvent && (
              <CreateEventModal 
                onClose={() => {
                  setShowCreateEvent(false);
                  fetchData();
                }} 
              />
            )}

            <div className="divide-y divide-gray-200">
              {events.map((event) => (
                <div key={event.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                      <p className="text-gray-600 mt-1">{event.description}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Date: {new Date(event.date).toLocaleDateString()} | 
                        Max Team Size: {event.max_team_size} | 
                        Fee: ₹{event.registration_fee || 0}
                      </p>
                      {event.qr_code_image && (
                        <div className="mt-3">
                          <img 
                            src={event.qr_code_image} 
                            alt="QR Code" 
                            className="w-32 h-32 object-contain border rounded"
                          />
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="text-red-600 hover:text-red-800 font-medium ml-4"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'registrations' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Registrations</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Leader</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Team Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {registrations.map((reg) => (
                    <tr key={reg.id}>
                      <td className="px-6 py-4 text-sm text-gray-900">{reg.event_title}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="text-gray-900">{reg.team_leader_name}</div>
                        <div className="text-gray-500 text-xs">{reg.team_leader_email}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{reg.team_size}</td>
                      <td className="px-6 py-4 text-sm">
                        {reg.payment_screenshot ? (
                          <a 
                            href={reg.payment_screenshot} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            View Screenshot
                          </a>
                        ) : (
                          <span className="text-gray-400">No payment</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <select
                          value={reg.status}
                          onChange={(e) => updateRegistrationStatus(reg.id, e.target.value)}
                          className={`px-2 py-1 rounded text-xs border ${
                            reg.status === 'approved' ? 'bg-green-100 text-green-800 border-green-300' :
                            reg.status === 'rejected' ? 'bg-red-100 text-red-800 border-red-300' :
                            'bg-yellow-100 text-yellow-800 border-yellow-300'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => deleteRegistration(reg.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
  };

  return (
    <div className={`p-6 rounded-lg border-2 ${colorClasses[color]}`}>
      <h3 className="text-sm font-medium opacity-75">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

function CreateEventModal({ onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    maxTeamSize: 1,
    registrationFee: 0
  });
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (qrCode) {
      // Validate file type
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(qrCode.type)) {
        setError('Only JPEG, JPG, and PNG images are allowed. PDFs are not accepted.');
        setLoading(false);
        return;
      }
      data.append('qrCode', qrCode);
    }

    try {
      await axios.post(`${API_URL}/events`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Event created successfully!');
      onClose();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Create New Event</h3>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Event Title *"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg text-gray-900"
            required
          />
          
          <textarea
            placeholder="Description *"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg text-gray-900"
            rows="3"
            required
          />
          
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg text-gray-900"
            required
          />
          
          <input
            type="number"
            placeholder="Max Team Size *"
            value={formData.maxTeamSize}
            onChange={(e) => setFormData({...formData, maxTeamSize: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg text-gray-900"
            min="1"
            required
          />
          
          <input
            type="number"
            placeholder="Registration Fee (₹)"
            value={formData.registrationFee}
            onChange={(e) => setFormData({...formData, registrationFee: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg text-gray-900"
            min="0"
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment QR Code (Only Images - JPG, JPEG, PNG)
            </label>
            <input
              type="file"
              onChange={(e) => setQrCode(e.target.files[0])}
              accept="image/jpeg,image/jpg,image/png"
              className="w-full px-4 py-3 border rounded-lg text-gray-900"
            />
            <p className="mt-1 text-xs text-gray-500">Maximum file size: 5MB. PDFs are not allowed.</p>
          </div>
          
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}