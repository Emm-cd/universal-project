import { Component, Input, OnInit } from '@angular/core';
import { ITodo, TStatus } from '../../structures/todos';
import { TodoService } from '../../services/todos.service';

@Component({
  selector: 'todo-creator',
  templateUrl: 'todos.creator.component.html',
  
})
export class TodoCreatorComponent implements OnInit {
  @Input() public id: string = '';
  public todo: ITodo = {content: '',status: TStatus.Created};
  
  constructor(private todoS : TodoService) { }
  ngOnInit(): void {

  }
  save(){
    this.todoS.add(this.id,this.todo);
  }

}