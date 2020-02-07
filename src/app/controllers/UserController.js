import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { email } = await User.create(req.body);

    return res.json({
      email,
    });
  }
}

export default new UserController();
