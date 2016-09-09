import {Injectable} from "@angular/core";
import {TASKS} from "./mock-tasks";
import {Headers, Http, RequestOptions, Response} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import {Task} from "./task";
import {Observable} from "rxjs/Rx";
import 'rxjs/Rx';


@Injectable()
export class TaskService {

  private baseUrl = 'http://52.91.206.99:3000';
  private tasksUrl = 'http://52.91.206.99:3000/tasks/kd';
  private taskUrl = 'http://52.91.206.99:3000/task';

  //private baseUrl = 'http://priority_taskmanager:3000';
  //private tasksUrl = 'http://priority_taskmanager:3000/tasks/kd';
  //private taskUrl = 'http://priority_taskmanager:3000/task';

  constructor(private http: Http) { }

  getTasks() {
    return this.http.get(this.tasksUrl)
      .toPromise()
      .then(response => response.json() as Task[])
      .catch(this.handleError);

    //Either limit here to show only iscompleted === false tasks or limit at API level itself

  }


  addTask(task: Task) : Promise<Task> {
    console.log('task service to add new task');

    let prepared_task = {
      "user": "kd",
      "task": task.task,
      "priority": 1,
      "iscompleted": false
    };

    let body = JSON.stringify(prepared_task);
    console.log(body);

    let headers = new Headers({ 'Content-Type' : 'application/json' });
    let options = new RequestOptions({ headers: headers, method: "post" });

    return this.http
      .post(this.taskUrl, body, options)
      .toPromise()
      .then(res => res.json() as Task)
      .catch(this.handleError);

  }


  //Update task using http put request
  updateTask(task: Task) : Promise<Task> {
    console.log('task service to update task');
    console.log(task);

    let prepared_task = {
      "id": task._id,
      "user": "kd",
      "task": task.task,
      "priority": task.priority,
      "iscompleted": task.iscompleted
    };

    let body = JSON.stringify(prepared_task);
    console.log(body);

    let headers = new Headers({ 'Content-Type' : 'application/json' });
    let options = new RequestOptions({ headers: headers, method: "put" });

    return this.http
      .put(this.taskUrl, body, options)
      .toPromise()
      .then(res => res.json() as Task)
      .catch(this.handleError);

  }


  private handleError(error: any) {
    console.error('An error occurred: ', error);
    return Promise.reject(error.message || error);
  }
}
