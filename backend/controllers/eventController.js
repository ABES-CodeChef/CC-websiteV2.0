import { prisma } from "../config/db.js";
const getAllEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      where: { status: 'active' },
      orderBy: { createdAt: 'desc' },
      include: {
        createdBy: {
          select: { email: true }
        }
      }
    });
          
    res.json({ events: events });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
};
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const event = await prisma.event.findUnique({
      where: { id: Number(id) },
      include: {
        createdBy: {
          select: { email: true }
        }
      }
    });
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ event: event });
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

    const event = await prisma.event.create({
      data: {
        title,
        description,
        date:date ? new Date(date) : null,
         max_team_size : maxTeamSize || 1,
        registration_fee: registrationFee || 0,
        qr_code_image: qrCodeImage,
        createdBy: { connect: { id: req.user.id } }
      } 
    }
    );

    res.status(201).json({ 
      message: 'Event created successfully', 
      event: event 
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

        const result = await prisma.event.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        date,
        maxTeamSize,
        registrationFee,
        qrCodeImage,
        status: status || 'active'
      }
        })

    if (!result) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ 
      message: 'Event updated successfully', 
      event: result
    });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ message: 'Failed to update event' });
  }
};
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await prisma.event.delete({
      where: { id: Number(id) }
    });
    
    if (!result) {
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