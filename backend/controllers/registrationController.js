import { pool } from '../config/db.js';
const createRegistration = async (req, res) => {
  try {
    const { 
      eventId, 
      teamSize, 
      teamLeaderName, 
      teamLeaderEmail, 
      teamLeaderContact, 
      teamMembers, 
      transactionId 
    } = req.body;

    const paymentScreenshot = req.file ? req.file.path : null;

    if (!eventId || !teamSize || !teamLeaderName || !teamLeaderEmail || !teamLeaderContact) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }
    if (!teamLeaderEmail.endsWith('@abes.ac.in')) {
      return res.status(400).json({ message: 'Team leader email must be @abes.ac.in' });
    }
    if (teamMembers) {
      const members = JSON.parse(teamMembers);
      for (let member of members) {
        if (!member.email || !member.email.endsWith('@abes.ac.in')) {
          return res.status(400).json({ 
            message: `All team member emails must be @abes.ac.in. Invalid: ${member.email || 'empty email'}` 
          });
        }
        if (!member.name || !member.contact) {
          return res.status(400).json({ 
            message: 'All team members must have name, email, and contact number' 
          });
        }
      }
    }
    const eventCheck = await pool.query('SELECT * FROM events WHERE id = $1', [eventId]);
    if (eventCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const event = eventCheck.rows[0];
    if (event.registration_fee > 0) {
      if (!paymentScreenshot) {
        return res.status(400).json({ message: 'Payment screenshot is required for this event' });
      }
      if (!transactionId) {
        return res.status(400).json({ message: 'Transaction ID is required' });
      }
    }
    const existingReg = await pool.query(
      'SELECT * FROM registrations WHERE event_id = $1 AND user_id = $2',
      [eventId, req.user.id]
    );

    if (existingReg.rows.length > 0) {
      return res.status(400).json({ message: 'You have already registered for this event' });
    }
    const result = await pool.query(
      `INSERT INTO registrations 
       (event_id, user_id, team_size, team_leader_name, team_leader_email, 
        team_leader_contact, team_members, payment_screenshot, transaction_id, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        eventId, 
        req.user.id, 
        teamSize, 
        teamLeaderName, 
        teamLeaderEmail, 
        teamLeaderContact,
        teamMembers || null,
        paymentScreenshot,
        transactionId || null,
        'pending'
      ]
    );

    res.status(201).json({
      message: 'Registration submitted successfully! Await admin approval.',
      registration: result.rows[0]
    });
  } catch (error) {
    console.error('Create registration error:', error);
    res.status(500).json({ message: 'Server error during registration. Please try again.' });
  }
};
const getUserRegistrations = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT r.*, e.title as event_title, e.date as event_date
       FROM registrations r
       JOIN events e ON r.event_id = e.id
       WHERE r.user_id = $1
       ORDER BY r.created_at DESC`,
      [req.user.id]
    );

    res.json({ registrations: result.rows });
  } catch (error) {
    console.error('Get user registrations error:', error);
    res.status(500).json({ message: 'Failed to fetch registrations' });
  }
};
const getRegistrationById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      `SELECT r.*, e.title as event_title, e.date as event_date, u.email as user_email
       FROM registrations r
       JOIN events e ON r.event_id = e.id
       JOIN users u ON r.user_id = u.id
       WHERE r.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    if (result.rows[0].user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ registration: result.rows[0] });
  } catch (error) {
    console.error('Get registration error:', error);
    res.status(500).json({ message: 'Failed to fetch registration' });
  }
};

export {
  createRegistration,
  getUserRegistrations,
  getRegistrationById
};