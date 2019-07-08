const TodoModel = require("../models/model.todo");
let Validator = require('fastest-validator');


let todos = {};
let counter = 0;

/* create an instance of the validator */
let todoValidator = new Validator();

/* use the same patterns as on the client to validate the request */
let namePattern = /([A-Za-z\-\’])*/;
// let zipCodePattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
// let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;

/* todo validator shema */
const todoVSchema = {
		guid: {type: "string", min: 3},
		
		userName: { type: "string", min: 1, max: 50, pattern: namePattern},
		// last_name: { type: "string", min: 1, max: 50, pattern: namePattern},
		// email: { type: "email", max: 75 },
		// zipcode: { type: "string", max: 5, pattern: zipCodePattern},

		// password: { type: "string", min: 2, max: 50, pattern: passwordPattern}
	};

/* static todo service class */
class TodoService
{
	static create(data)
	{
		var vres = todoValidator.validate(data, todoVSchema);
		
		/* validation failed */
		if(!(vres === true))
		{
			let errors = {}, item;

			for(const index in vres)
			{
				item = vres[index];

				errors[item.field] = item.message;
			}
			
			throw {
			    name: "ValidationError",
			    message: errors
			};
		}

        //hard code these for now
        data.isDone = 'true';
        data.hasAttachment = 'true';

		let todo = new TodoModel(data.userName, data.todo, data.isDone, data.hasAttachment);

		todo.uid = 'c' + counter++;

		todos[todo.uid] = todo;

		return todo;
	}

	static retrieve(uid)
	{
		if(todos[uid] != null)
		{
			return todos[uid];
		}
		else
		{
			throw new Error('Unable to retrieve a todo by (uid:'+ uid +')');
		}
	}

	static update(uid, data)
	{
		if(todos[uid] != null)
		{
			const todo = todos[uid];
			
			Object.assign(todo, data);
		}
		else
		{
			throw new Error('Unable to retrieve a todo by (uid:'+ cuid +')');
		}
	}

	static delete(uid)
	{
		if(todos[uid] != null)
		{
			delete todos[uid];
		}
		else
		{
			throw new Error('Unable to retrieve a todo by (uid:'+ cuid +')');
		}
	}
}

module.exports = TodoService;
