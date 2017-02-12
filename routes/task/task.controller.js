var Task = require('../../models/task.model');
var Test = require('../../models/test.model');
var Work = require('../../models/work.model');

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;
module.exports.getTests = getTests;
module.exports.getWorks = getWorks;

function getAll(req, res) {
	Task.find(function (err, courses) {
		if (err) {
			res.json({success: false, message: 'Cannot find tasks ' + err});
		} else {
			res.json(courses);
		}
	})
}

function get(req, res) {
	Task.findById(req.params.id, function (err, course) {
		if (err) {
			res.json({success: false, message: 'Cannot find task ' + err});
		} else {
			res.json(course);
		}
	})
}

function create(req, res) {
	var tas = new Task(req.body);
	tas.save(function (err) {
		if (err) {
			res.json({success: false, message: 'Cannot create task ' + err});
		} else {
			res.json({success: true, message: 'Task created'})	
		}
	})
}

function update(req, res) {
	Task.findByIdAndUpdate(req.params.id, req.body, function(arr) {
		if (err) {
			res.json({success: false, message: 'Cannot update task ' + err});
		} else {
			res.json({success: true, message: 'Task updated'});
		}
	})
}

function remove (req, res) {
	Task.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			res.json({success: false, message: 'Cannot remove task ' + err});
		} else {
			res.json({success: true, items: 'Task removed'});
		}
	})
}

function getTests (req, res) {
	Test
	.find({_task: req.params.id})
	.exec( function (err, items) {
		if (err) {
			res.json({success: false, message: 'Cannot find tests ' + err});
		} else {
			res.json({success: true, items: items});
		}
	})
}

function getWorks (req, res) {
	Work
	.find({_task: req.params.id})
	.exec( function (err, items) {
		if (err) {
			res.json({success: false, message: 'Cannot find works ' + err});
		} else {
			res.json({success: true, items: items});
		}
	})
}


