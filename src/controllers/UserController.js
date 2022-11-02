require('../config/database')
const User = require('../models/User')
const bcrypt = require('bcrypt')

async function show(req, res) {
	try {
		const data = await User.find()
		if(data.length <= 0) {
			return res.status(404).json({
				success: false,
				message: 'No data found'
			})
		}

		return res.json({
			succes: true,
			message: "Users fetched successfully",
			data: data
		})

	} catch (err) {
		return res.status(500).json({
			success: false,
			message: err.message
		})
	}
}

async function detail(req, res) {
	try {
		const data = await User.findById(req.params.id)
      return res.json({
			success: true,
			message: "User Detail fetched successfully",
			data: data
      })

	} catch (err) {
		return res.status(404).json({
			success: false,
			message: "User not found with that id"
		})
	}
}

async function store(req, res) {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10)
		const data = {
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		}

		User.create(data, (err, user) => {
			if(err) {
				return res.status(500).json({
					success: false,
					message: err.message
				})
			}

			return res.json({
				success: true,
				message: "User created successfully",
				data: user
			})
		})

	} catch (err) {
		return res.status(500).json({
			success: false,
			message: err.message
		})
	}
}

async function update(req, res) {
	try {
		const oldData = await User.findById(req.params.id)
		const data = {
			username: req.body.username || oldData.username,
			email: req.body.email || oldData.email,
			password: req.body.password || oldData.password,
		}

		User.findByIdAndUpdate(req.params.id, data, {new: true}, (err, user) => {
			if(err) {
				return res.status(500).json({
					success: false,
					message: err.message
				})
			}

			return res.json({
				success: true,
				message: "User updated successfully",
				data: user
			})
		})
	} catch (err) {
		return res.status(404).json({
			success: false,
			message: "User not found with that id"
		})
	}
}

async function destroy(req, res) {
	try {
		User.findByIdAndDelete(req.params.id, (err, user) => {
			if(err) {
				return res.status(500).json({
					success: false,
					message: err.message
				})
			}
			
			return res.json({
				success: true,
				message: "User deleted successfully",
				data: user
			})
		})

	} catch (err) {
		return res.status(404).json({
			success: false,
			message: "User not found with that id"
		})
	}
}


module.exports = {
	show,
	detail,
	store,
	update,
	destroy
}