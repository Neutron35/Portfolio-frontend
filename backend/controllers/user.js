import 'dotenv/config';

import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  try {
    const { email } = req.body;
    const emailRegex =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    if (!emailRegex.test(email))
      return res
        .status(400)
        .json({ message: `Format de l'adresse email invalide.` });
    const password = await bcrypt.hash(req.body.password, 10);
    try {
      const user = new User({
        email,
        password,
      });
      await user.save();
      res.status(201).json({ message: 'Utilisateur crée !' });
    } catch (error) {
      res.status(400).json({ error });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: 'Paire identifiant/mot de passe incorrecte' });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res
        .status(401)
        .json({ message: 'Paire identifiant/mot de passe incorrecte' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.TOKEN, {
      expiresIn: '24h',
    });

    res.status(200).json({
      userId: user._id,
      token,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
