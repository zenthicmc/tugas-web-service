async function index(req, res) {
	return res.json({ message: 'Hello World!' })
}


module.exports = {
	index
}