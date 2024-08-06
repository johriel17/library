import User from '../models/User.js';
import Role from '../models/Role.js';


export const createUser = async (req, res) => {
  try {
    const { username, email, password, role_id } = req.body;
    const role = await Role.findByPk(role_id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    const user = await User.create({ username, email, password, role_id });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: Role });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, { include: Role });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, role_id } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const role = await Role.findByPk(role_id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    user.username = username;
    user.email = email;
    user.password = password;
    user.role_id = role_id;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
