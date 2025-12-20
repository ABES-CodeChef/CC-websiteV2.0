const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateContactRequest = (req, res, next) => {
  const { name, email, subject, message } = req.body;

  const requiredFields = { name, email, subject, message };
  const missingFields = Object.entries(requiredFields)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields',
      fields: missingFields,
    });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email address',
    });
  }

  if (name.length < 2 || name.length > 100) {
    return res.status(400).json({
      success: false,
      message: 'Name must be between 2 and 100 characters',
    });
  }

  if (subject.length < 3 || subject.length > 200) {
    return res.status(400).json({
      success: false,
      message: 'Subject must be between 3 and 200 characters',
    });
  }

  if (message.length < 10 || message.length > 5000) {
    return res.status(400).json({
      success: false,
      message: 'Message must be between 10 and 5000 characters',
    });
  }

  req.body.name = sanitizeInput(name);
  req.body.email = sanitizeInput(email);
  req.body.subject = sanitizeInput(subject);
  req.body.message = sanitizeInput(message);

  next();
};

const sanitizeInput = (input) => {
  return input
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 5000);
};
