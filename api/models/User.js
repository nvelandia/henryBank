const {Sequelize, DataTypes} = require("sequelize");		

module.exports = (sequelize) => {
	sequelize.define('User',{
		id: { // id must always exist
			type: DataTypes.UUID, // Uses uuidv4 by default (default value is recommended)
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4
		},
	
		name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
	
		surname: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
	
		avatar: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		doc_type: {
			type: DataTypes.ENUM(['dni','passport']),
			allowNull: true
		},
		doc_number: {
			type: DataTypes.STRING(10),
			allowNull: true
		},
		phone_number: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		role: {
			type: DataTypes.ENUM(['client','admin']),
			allowNull: false,
			defaultValue: 'client'
		},
		balance: {
			type: DataTypes.FLOAT(12,2),
			allowNull: false,
			defaultValue: 0
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique:true
		},
		address_street: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		address_number: {
			type: DataTypes.INTEGER(7),
			allowNull: true
		},
		locality: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		province: {
			type: DataTypes.STRING(60),
			allowNull: true
		},
		country: {
			type: DataTypes.STRING(80),
			allowNull: true
		},
		cvu: {
			type: DataTypes.STRING(22),
			allowNull: true
		},
		birthdate: {
			type: DataTypes.DATE,
			allowNull: true
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false
		}
	},{
		tableName: 'users'
	});
};