import User from "../models/userModel.js";

export const transfering = async (req, res) => {
    const { fromUserId, toUserId, amount } = req.body;
    if (!fromUserId || !toUserId || !amount) return res.status(404).json({ message: "all field should be required" });
    if (amount < 0) return res.status(500).json({ message: "amount of balance should be above 0" });
    try {
        const session = await User.startSession();
        session.startTransaction();
        const sender = await User.findById(fromUserId).session(session);
        const reciever = await User.findById(toUserId).session(session);
        if (!sender || !reciever) {
            await session.abortTransaction()
            return res.status(404).json({ message: 'Sender or receiver not found' });
        }
        if (sender.balance < amount) {
            await session.abortTransaction();
            session.endSession()
            res.status.json({ message: "insifienct balance" });
        };
        sender.balance -= amount;
        reciever.balance += amount;
        await sender.save({ session });
        await reciever.save({ session });

        await session.commitTransaction();
        session.endSession();
        res.status(200).json({ success: true, message: "transaction went well" });
    } catch (error) {
        res.status(200).json({ success: false, message: "transaction went failure", error });

    }
}