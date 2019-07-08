    
class TodoModel
{
	constructor(userName, todo, isDone, hasAttachment)
	{
		this.userName = userName;
		this.todo = todo;
		this.isDone = isDone;
		this.hasAttachment = hasAttachment;
		this.uid = null;
	}
}

module.exports = TodoModel;