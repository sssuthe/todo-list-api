SHA=$(git rev-parse HEAD)

docker build -t sssuthe/todo-list-server:latest -t sssuthe/todo-list-server:$SHA .

docker push sssuthe/todo-list-server:latest

docker push sssuthe/todo-list-server:$SHA
