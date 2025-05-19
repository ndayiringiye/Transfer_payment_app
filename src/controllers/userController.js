import User from "../models/userModel.js";
export const userController = async (req, res) => {
    const { name, balance } = req.body;

    try {
        const user = new User({ name, balance });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};
