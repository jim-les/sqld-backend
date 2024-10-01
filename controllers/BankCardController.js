const BankCard = require('../models/BankCard');

// Create a new bank card
exports.createBankCard = async (req, res) => {
    const { cardNumber, cardHolderName, expirationDate, cvv, billingAddress } = req.body;
    const userId = req.user.id; // Assuming you're using middleware to get user ID from token/session

    try {
        const newCard = await BankCard.create({
            cardNumber,
            cardHolderName,
            expirationDate,
            cvv,
            billingAddress,
            userId
        });
        res.status(201).json(newCard);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all bank cards for a user
exports.getUserBankCards = async (req, res) => {
    const userId = req.user.id;

    try {
        const cards = await BankCard.findAll({ where: { userId } });
        res.status(200).json(cards);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a specific bank card by ID
exports.getBankCardById = async (req, res) => {
    const { id } = req.params;

    try {
        const card = await BankCard.findOne({ where: { id } });
        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }
        res.status(200).json(card);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a bank card
exports.updateBankCard = async (req, res) => {
    const { id } = req.params;
    const { cardNumber, cardHolderName, expirationDate, cvv, billingAddress } = req.body;

    try {
        const card = await BankCard.findOne({ where: { id } });
        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }

        // Update card fields
        await card.update({
            cardNumber,
            cardHolderName,
            expirationDate,
            cvv,
            billingAddress
        });

        res.status(200).json(card);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a bank card
exports.deleteBankCard = async (req, res) => {
    const { id } = req.params;

    try {
        const card = await BankCard.findOne({ where: { id } });
        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }

        await card.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
