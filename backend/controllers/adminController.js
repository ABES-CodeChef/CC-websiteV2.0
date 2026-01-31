import { prisma } from '../config/db.js';
import bcrypt from 'bcryptjs';

const getDashboardStats = async (req, res) => {
  try {
    const [usersCount, eventsCount, registrationsCount, pendingCount] = await Promise.all([
  prisma.user.count({
    where: { role: 'user' }
  }),
  prisma.event.count(),
  prisma.registration.count(),
  prisma.registration.count({
    where: { status: 'pending' }
  })
]);

res.json({
  stats: {
    totalUsers: usersCount,
    totalEvents: eventsCount,
    totalRegistrations: registrationsCount,
    pendingRegistrations: pendingCount
  }
});
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const result = await prisma.user.findMany({
      select: {
        id: true, 
        email: true,
        role: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({ users: result });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role, password } = req.body;

  const updateData = {
  email,
  role,
};
    if (password) {
  updateData.password = await bcrypt.hash(password, 10);
}
const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) }, 
    data: updateData,
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
    res.json({ 
      message: 'User updated successfully', 
      user: updatedUser 
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: { role: true }
    });
    if (user && user.role === 'admin') {
      return res.status(403).json({ message: 'Cannot delete admin account' });
    }

    const result = await prisma.user.delete({
      where: { id: parseInt(id) }
    });
    if (!result) {
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

   const registrations = await prisma.registration.findMany({
      where: eventId ? { eventId: Number(eventId) } : {},
      orderBy: { createdAt: 'desc' },
      include: {
        event: {
          select: { title: true, date: true }
        },
        user: {
          select: { email: true }
        }
      }
    });

    res.json({ registrations: registrations });
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

    const updatedRegistration = await prisma.registration.update({
      where: { id: parseInt(id) },
      data: { status: status }
    });

    if (!updatedRegistration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    res.json({ 
      message: 'Registration status updated successfully', 
      registration: updatedRegistration
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

    const updatedRegistration = await prisma.registration.update({
      where: { id: parseInt(id) },
      data: {
        teamSize,
        teamLeaderName,
        teamLeaderEmail,
        teamLeaderContact,
        teamMembers,
        transactionId,
        status
      }
    }); 

    if (!updatedRegistration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    res.json({ 
      message: 'Registration updated successfully', 
      registration: updatedRegistration
    });
  } catch (error) {
    console.error('Update registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRegistration = await prisma.registration.delete({
      where: { id: parseInt(id) }
    });
    if (!deletedRegistration) {
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