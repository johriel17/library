import Role from '../models/Role.js';


export const createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const role = await Role.create({ name });
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    role.name = name;
    await role.save();
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    await role.destroy();
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
