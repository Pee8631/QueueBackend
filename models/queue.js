import DataTypes from 'sequelize';
import sequelize from '../config.js';

const Queue = sequelize.define('Queue', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    QueueNumber: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: true, freezeTableName: true });

export default Queue;