import { pool } from '../config/db.js';
import bcrypt from 'bcryptjs';

const getDashboardStats = async (req, res) => {
  try {
    const usersCount = await pool.query('SELECT COUNT(*) FROM users WHERE role = $1', ['user']);
    const eventsCount = await pool.query('SELECT COUNT(*) FROM events');
    const registrationsCount = await pool.query('SELECT COUNT(*) FROM registrations');
    const pendingCount = await pool.query(
      'SELECT COUNT(*) FROM registrations WHERE status = $1', 
      ['pending']
    );

    res.json({
      stats: {
        totalUsers: parseInt(usersCount.rows[0].count),
        totalEvents: parseInt(eventsCount.rows[0].count),
        totalRegistrations: parseInt(registrationsCount.rows[0].count),
        pendingRegistrations: parseInt(pendingCount.rows[0].count)
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, role, created_at FROM users ORDER BY created_at DESC'
    );

    res.json({ users: result.rows });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role, password } = req.body;

    let query = 'UPDATE users SET email = $1, role = $2';
    let params = [email, role];

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += ', password = $3';
      params.push(hashedPassword);
    }

    query += ` WHERE id = $${params.length + 1} RETURNING id, email, role, created_at`;
    params.push(id);

    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ 
      message: 'User updated successfully', 
      user: result.rows[0] 
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await pool.query('SELECT role FROM users WHERE id = $1', [id]);
    if (user.rows.length > 0 && user.rows[0].role === 'admin') {
      return res.status(403).json({ message: 'Cannot delete admin account' });
    }

    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllRegistrations = async (req, res) => {
  try {
    const { eventId } = req.query;

    let query = `
      SELECT r.*, e.title as event_title, e.date as event_date, 
             u.email as user_email
      FROM registrations r
      JOIN events e ON r.event_id = e.id
      JOIN users u ON r.user_id = u.id
    `;

    const params = [];
    if (eventId) {
      query += ' WHERE r.event_id = $1';
      params.push(eventId);
    }

    query += ' ORDER BY r.created_at DESC';

    const result = await pool.query(query, params);

    res.json({ registrations: result.rows });
  } catch (error) {
    console.error('Get all registrations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateRegistrationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const result = await pool.query(
      'UPDATE registrations SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    res.json({ 
      message: 'Registration status updated successfully', 
      registration: result.rows[0] 
    });
  } catch (error) {
    console.error('Update registration status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      teamSize, 
      teamLeaderName, 
      teamLeaderEmail, 
      teamLeaderContact, 
      teamMembers,
      transactionId,
      status
    } = req.body;

    const result = await pool.query(
      `UPDATE registrations 
       SET team_size = $1, team_leader_name = $2, team_leader_email = $3,
           team_leader_contact = $4, team_members = $5, transaction_id = $6, status = $7
       WHERE id = $8 RETURNING *`,
      [teamSize, teamLeaderName, teamLeaderEmail, teamLeaderContact, 
       teamMembers, transactionId, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    res.json({ 
      message: 'Registration updated successfully', 
      registration: result.rows[0] 
    });
  } catch (error) {
    console.error('Update registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM registrations WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    res.json({ message: 'Registration deleted successfully' });
  } catch (error) {
    console.error('Delete registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export {
  getDashboardStats,
  getAllUsers,
  updateUser,
  deleteUser,
  getAllRegistrations,
  updateRegistrationStatus,
  updateRegistration,
  deleteRegistration
};