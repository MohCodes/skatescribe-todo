

from http.client import OK
from random import randint
from flask import Flask, jsonify, render_template, request,abort
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO
from datetime import datetime




# db/ flask initilization

app = Flask(__name__, static_url_path="",
            template_folder="../build", static_folder="../build")
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://username:password@localhost:5432/default_database'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'secret!'
db = SQLAlchemy(app)
socketio = SocketIO(app, cors_allowed_origins="*")



# model
class Task(db.Model):
    __tablename__ = 'Tasks'
    id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.String(100), nullable=False)
    edit = db.Column(db.Boolean, unique=False, default=False)
    date = db.Column(db.DateTime, nullable = False)

    def __init__(self, id, task_name,edit,date):
        self.id = id
        self.task_name = task_name
        self.edit = edit
        self.date= date


db.create_all()
db.session.commit()


# index routing

@app.route("/")
def index():
    return render_template("index.html")


# post routing for todos
@cross_origin()
@app.route("/todos", methods=["POST"])
def post_todo():
    task_name = request.json['task']
    task = Task(id=randint(1, 10000), task_name=task_name,edit=False,date=datetime.now())
    db.session.add(task)
    db.session.commit()
    return jsonify({"success": True,"response":"Task added","code":OK})


# get routing for todos
@cross_origin()
@app.route("/todos", methods=["GET"])
def get_todo():
    all_todos = []
    todos = Task.query.all()
    for task in todos:
        results = {
            "task_id": task.id,
            "task_task_name": task.task_name,
            "task_edit":task.edit,
            "task_date":task.date
        }
        all_todos.append(results)
    sorted_results = all_todos.sort(key=lambda item:item["task_date"],reverse=True)

    # socketio.emit('some event',all_todos,broadcast=True)
    return jsonify({
        "success": True,
        "tasks": all_todos,
        "total_tasks": len(todos)
    })



#PATCH routing for todos
@cross_origin()
@app.route("/todos/<id>", methods=["PATCH"])
def patch_todo(id):
    task = Task.query.get(id)
    task_name = request.json["task_name"]

    if task is None:
        abort(404)
    else:
        task.task_name = task_name
        db.session.add(task)
        db.session.commit()
        return jsonify ({"code":OK, "response":"Task details Updated"})



# delete routing for todos
@cross_origin()
@app.route("/todos/<id>", methods=["DELETE"])
def delete_todo(id):
    task = Task.query.get(id)
    db.session.delete(task)
    db.session.commit()
    

    return jsonify({"success": True, "response": "Task Deleted"})








if __name__ == "__main__":
    # app.run(debug=True)
    socketio.run(app,debug=True)
