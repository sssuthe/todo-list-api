var express = require('express');
var router = express.Router();
var TodoService = require('../services/service.todo');

/* GET todo listing. */
router.get('/', async function(req, res, next)
{
	res.json({error: "Invalid Todo UID."});
});

/* adds a new todo item to the list */
router.post('/', async (req, res, next) =>
{
	const body = req.body;

	try
	{
		const todo = await TodoService.create(body);

		if(body.guid != null)
		{
			todo.guid = body.guid;
		}

		res.cookie('guid', todo.guid, { maxAge: 900000, httpOnly: true });

		// created the todo! 
		return res.status(201).json({ todo: todo });
	}
	catch(err)
	{
		if (err.name === 'ValidationError')
		{
        	return res.status(400).json({ error: err.message });
		}

		// unexpected error
		return next(err);
	}
});

/* retrieves a todo by uid */
router.get('/:id', async (req, res, next) =>
{
	try
	{
		const todo = await TodoService.retrieve(req.params.id);

		return res.json({ todo: todo });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* updates the todo by uid */
router.put('/:id', async (req, res, next) =>
{
	try
	{
		const todo = await TodoService.update(req.params.id, req.body);

		return res.json({ todo: todo });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* removes the todo from the todo list by uid */
router.delete('/:id', async (req, res, next) =>
{
	try
	{
		const todo = await TodoService.delete(req.params.id);

		return res.json({success: true});
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

module.exports = router;