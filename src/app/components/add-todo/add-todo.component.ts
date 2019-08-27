import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TODO_NAME_MIN_LENGTH } from '@app/interceptors/validators/http-todo.validators';

@Component({
  selector: 'add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  @Output('add') private _addTodoEvnt = new EventEmitter<string>();

  addTodoForm: FormGroup;

  todoNameFormControl: FormControl;

  constructor(private _formBuilder: FormBuilder) {
    this._createTodoFormGroup();
  }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.addTodoForm.valid) {
      return;
    }
    this._addTodo();

    this.addTodoForm.reset();
  }

  private _addTodo() {
    this._addTodoEvnt.emit(this.addTodoForm.value);
  }

  private _createTodoFormGroup() {
    this.todoNameFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(TODO_NAME_MIN_LENGTH),
    ]);

    this.addTodoForm = new FormGroup({
      name: this.todoNameFormControl
    });
  }
}
