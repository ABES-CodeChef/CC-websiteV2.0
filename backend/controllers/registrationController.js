import { prisma } from "../config/db.js";
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
    const eventCheck = await prisma.event.findUnique({
      where: { id: Number(eventId) }
    });
    if (!eventCheck) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const event = eventCheck;
    if (event.registrationFee > 0) {
      if (!paymentScreenshot) {
        return res.status(400).json({ message: 'Payment screenshot is required for this event' });
      }
      if (!transactionId) {
        return res.status(400).json({ message: 'Transaction ID is required' });
      }
    }
    const existingReg = await prisma.registration.findFirst({
      where: {
        event_id: Number(eventId),
        user_id: req.user.id
      }
    });

    if (existingReg) {
      return res.status(400).json({ message: 'You have already registered for this event' });
    }
    const result = await prisma.registration.create({
      data: {
        event_id: Number(eventId),
        user_id: req.user.id,
         team_size: teamSize,
        team_leader_name: teamLeaderName,
        team_leader_email: teamLeaderEmail,
        team_leader_contact: teamLeaderContact,
        team_members: teamMembers || null,
        payment_screenshot: paymentScreenshot,
        transaction_id: transactionId || null,
        status: 'pending'
      }
    });
        

    res.status(201).json({
      message: 'Registration submitted successfully! Await admin approval.',
      registration: result
    });
  } catch (error) {
    console.error('Create registration error:', error);
    res.status(500).json({ message: 'Server error during registration. Please try again.' });
  }
};
const getUserRegistrations = async (req, res) => {
  try {
    const result = await prisma.registration.findMany({
      where: { user_id: req.user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        event: {
          select: { title: true, date: true }
        }
      }
    });

    res.json({ registrations: result });
  } catch (error) {
    console.error('Get user registrations error:', error);
    res.status(500).json({ message: 'Failed to fetch registrations' });
  }
};
const getRegistrationById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await prisma.registration.findUnique({
      where: { id: Number(id) },
      include: {
        event: {
          select: { title: true, date: true }
        },
        user: {
          select: { email: true }
        }
      }
    });

    if (!result) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    if (result.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ registration: result });
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