

from http.client import OK
from random import randint, random
from flask import Flask, jsonify, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin


# db/ flask initilization

app = Flask(__name__, static_url_path="",
            template_folder="../build", static_folder="../build")

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://username:password@localhost:5432/default_database'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)


# model
class Task(db.Model):
    __tablename__ = 'Tasks'
    id = db.Column(db.Integer, primary_key=True)
    task_name = db. Column(db.String(100), nullable=False)

    def __init__(self, id, task_name):
        self.id = id
        self.task_name = task_name

    def __repr__(self):
        return '<Tasks %r>' % self.task_name


db.create_all()
db.session.commit()


# index routing

@app.route("/")
def index():
    return render_template("index.html")


# post routing for todos
@cross_origin()
@app.route("/postTodo", methods=["POST"])
def post_todo():
    todo_data = request.json
    task_name = todo_data['task']
    task = Task(id=randint(1, 10000), task_name=task_name)
    db.session.add(task)
    db.session.commit()
    return (jsonify(OK))


# get routing for todos
@cross_origin()
@app.route("/getTodo", methods=["GET"])
def get_todo():
    all_todos = []
    todos = Task.query.all()
    for task in todos:
        results = {
            "task_id": task.id,
            "task_task_name": task.task_name,
        }
        all_todos.append(results)

    return jsonify({
        "success": True,
        "tasks": all_todos,
        "total_tasks": len(todos)
    })


# delete routing for todos
@cross_origin()
@app.route("/deleteTodo/<id>", methods=["DELETE"])
def delete_todo(id):
    task = Task.query.get(id)
    db.session.delete(task)
    db.session.commit()

    return jsonify(OK)


if __name__ == "__main__":
    app.run(debug=True)
