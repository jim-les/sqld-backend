const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path as needed

const BankCard = sequelize.define('BankCard', {
    cardNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [16, 16], // Assuming a standard 16-digit card number
            isNumeric: true // Ensures the card number is numeric
        }
    },
    cardHolderName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expirationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true // Ensures a valid date
        }
    },
    cvv: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 4], // Assuming CVV is 3 or 4 digits
            isNumeric: true
        }
    },
    billingAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true
});

// Associations
BankCard.associate = (models) => {
    BankCard.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
};

// Export the model
module.exports = BankCard;
