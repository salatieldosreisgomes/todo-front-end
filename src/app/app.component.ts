import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Todo } from './todo';
import { TodoService } from './todo.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  todos : Todo[] = []

  ngOnInit(){
    this.listar();
  }

  listar(){
    this.service
    .listar()
    .subscribe(todoList => this.todos = todoList)
  }

  form : FormGroup = new FormGroup({
    description : new FormControl('', [Validators.required, Validators.minLength(4)])
  })

  constructor(
    private service : TodoService
  ){}

  submit(){
    const todo: Todo = { ... this.form.value } 
    this.service
      .salvar(todo)
      .subscribe(savedTodo => 
        {
          this.todos.push(savedTodo)
          this.form.reset();
        })
  }

  delete(todo : Todo){
    this.service
    .delete(todo.id)
    .subscribe({
      next: (response) => this.listar()
    })
  }

  done(todo: Todo){
    this.service.marcarComoConcluido(todo.id).subscribe({
        next: (todoAtualizado) => {
          todo.done = todoAtualizado.done
          todo.doneDate = todoAtualizado.doneDate
        }
      }
    )
  }
}
