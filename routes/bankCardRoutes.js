const express = require('express');
const router = express.Router();
const BankCardController = require('../controllers/BankCardController');
// const { authenticate } = require('../middleware/auth'); // Assuming you have some authentication middleware

// Create a new bank card
router.post('/', BankCardController.createBankCard);

// Get all bank cards for a user
router.get('/', BankCardController.getUserBankCards);

// Get a specific bank card by ID
router.get('/:id', BankCardController.getBankCardById);

// Update a bank card
router.put('/:id', BankCardController.updateBankCard);

// Delete a bank card
router.delete('/:id', BankCardController.deleteBankCard);

module.exports = router;
