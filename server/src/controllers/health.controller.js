class HealthController {
 
  check(req, res) {
    res.status(200).json({
      success: true,
      status: 'ok',
      message: 'Server is running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  }
}

export default new HealthController();
