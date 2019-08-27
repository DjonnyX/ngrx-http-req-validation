import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITodo } from '@app/models';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Input() data: ITodo;
  @Output('update') private _updateEmtr = new EventEmitter<ITodo>();
  @Output('delete') private _deleteEmtr = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  delete() {
    this._deleteEmtr.emit(this.data.id);
  }

  update() {
    this._updateEmtr.emit(this.data);
  }
}
