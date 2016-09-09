import {Component, OnInit, Input} from '@angular/core';
import {TaskService} from "./task.service";
import {Task} from "./task";

@Component({
    selector: 'my-priority-app',
    //template: '<h1> {{title}} </h1>',
    template: `
      <div class="container">
          <h1> {{title}} </h1>
          <br />
          
          
           <!--
           <div class="container">
                <div class="row container">
                <input class="col-lg-10" type="text" #newTask
                    (keyup.enter)="addNewTask(newTask.value)"
                     (blur)="addNewTask(newTask.value); newTask.value='' ">
                <div class="col-lg-2">   
                    <button (click)=addNewTask(newTask.value)>Add New Task </button>  
                </div>
                </div>
          </div> -->

           <div class="container">
                <div class="row container">
                <input class="col-lg-10" type="text" #newTask
                    (keyup.enter)="addNewTask(newTask.value); newTask.value=''"
                     (blur)="addNewTask(newTask.value); newTask.value='' " placeholder="Enter your task!">
                <div class="col-lg-2">   
                    <button (click)=addNewTask(newTask.value)>Add New Task </button>  
                </div>
                </div>
          </div>
       
          
          <br />
          
            <div *ngFor="let task of tasks">          
              
              <div *ngIf="task.priority === 1 && task.iscompleted === false" class="container-fluid"> 
                  <button (click)="change_priority(task)" type="button" class="btn btn-danger btn-block">
                      <input (click)="mark_complete(task)" type="checkbox" value="" >
                       {{task.task}}
                   </button>
                </div>
          
             <div *ngIf="task.priority === 2 && task.iscompleted === false" class="container-fluid">
              <button (click)="change_priority(task)" type="button" class="btn btn-warning btn-block">
                  <input type="checkbox" value="">
                 {{task.task}}
              </button>
            </div>
            
             <div *ngIf="task.priority === 3 && task.iscompleted === false" class="container-fluid">
              <button (click)="change_priority(task)" type="button" class="btn btn-info btn-block">
                  <input type="checkbox" value="">
                 {{task.task}}
              </button>
            </div>
            
             <div *ngIf="task.priority === 4 && task.iscompleted === false" class="container-fluid">
              <button (click)="change_priority(task)" type="button" class="btn btn-success btn-block">
                  <input type="checkbox" value="">
                 {{task.task}}
              </button>
            </div>
            
             <div *ngIf="task.priority === 5 && task.iscompleted === false" class="container-fluid">
              <button (click)="change_priority(task)" type="button" class="btn btn-default btn-block">
                  <input type="checkbox" value="">
                 {{task.task}}
              </button>
            </div>
            
          </div>
      </div>
    `,
    providers: [TaskService]
})
export class AppComponent implements OnInit{
  title = "Prioritize Everything!!!";


  @Input() tasks: Task[];
  error: any;

  new_task: Task;
  newly_added_task: Task;

  constructor(private taskService: TaskService) { }

  getTasks() {
    this.taskService
      .getTasks()
      .then(tasks => this.tasks = tasks)
      .catch(error => this.error = error);
  }

  ngOnInit() {
    this.getTasks();
  }


  change_priority(task: Task) {
    console.log('Chaning priority');
    console.log(task);
    task.priority = task.priority % 5 + 1;
    console.log(task);

    //call service to update priority
    //Refresh this component once task is successfully added to mongo db
    this.taskService.updateTask(task)
      .then( newly_updated_task => this.getTasks())
      .catch(error => this.error = error);

  }

  mark_complete(task: Task) {
    console.log(task);
    console.log('marking complete');
    task.iscompleted = true;
    console.log(task);

    //Update database to mark task complete
    //Refresh this component once task is successfully added to mongo db
    this.taskService.updateTask(task)
      .then( newly_updated_task => this.getTasks())
      .catch(error => this.error = error);

  }

  addNewTask(newTask_task: string) {

    if (newTask_task) {

      let newly_added_task = {};

      this.new_task = {
        _id: null, //Just to be in sync with Task class definition
        task: newTask_task,
        user: 'kd',
        priority: 1,
        iscompleted: false
      };

      console.log('adding new task');
      console.log(this.new_task);

      //Add this.new_task to database using http post
      //call service to add new task

      console.log('current value of tasks');
      console.log(this.tasks);

      //Refresh this component once task is successfully added to mongo db
      this.taskService.addTask(this.new_task)
        .then( newly_added_task => this.getTasks())
        .catch(error => this.error = error);


    }

  }

}
