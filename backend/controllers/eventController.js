import { pool } from '../config/db.js';
const getAllEvents = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.*, u.email as created_by_email 
      FROM events e 
      LEFT JOIN users u ON e.created_by = u.id 
      WHERE e.status = 'active'
      ORDER BY e.created_at DESC
    `);
    
    res.json({ events: result.rows });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
};
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(`
      SELECT e.*, u.email as created_by_email 
      FROM events e 
      LEFT JOIN users u ON e.created_by = u.id 
      WHERE e.id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ event: result.rows[0] });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ message: 'Failed to fetch event' });
  }
};

const createEvent = async (req, res) => {
  try {
    const { title, description, date, maxTeamSize, registrationFee } = req.body;
    
    const qrCodeImage = req.file ? req.file.path : null;

    if (!title || !description || !date) {
      return res.status(400).json({ message: 'Title, description, and date are required' });
    }

    const result = await pool.query(
      `INSERT INTO events (title, description, date, max_team_size, registration_fee, qr_code_image, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [title, description, date, maxTeamSize || 1, registrationFee || 0, qrCodeImage, req.user.id]
    );

    res.status(201).json({ 
      message: 'Event created successfully', 
      event: result.rows[0] 
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ message: 'Failed to create event' });
  }
};
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, maxTeamSize, registrationFee, status } = req.body;
        const qrCodeImage = req.file ? req.file.path : req.body.existingQrCode;

    const result = await pool.query(
      `UPDATE events 
       SET title = $1, description = $2, date = $3, max_team_size = $4, 
           registration_fee = $5, qr_code_image = $6, status = $7
       WHERE id = $8 RETURNING *`,
      [title, description, date, maxTeamSize, registrationFee, qrCodeImage, status || 'active', id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ 
      message: 'Event updated successfully', 
      event: result.rows[0] 
    });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ message: 'Failed to update event' });
  }
};
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM events WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ message: 'Failed to delete event' });
  }
};

export {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};