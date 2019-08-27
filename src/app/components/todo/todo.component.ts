import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ITodo } from '@app/models';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {

  @Input() public set data(v: ITodo) {
    if (this._data === v) {
      return;
    }

    this._data = v;

    this.name = v ? v.name : '';

    this._cdr.markForCheck();
  }
  public get data() { return this._data; }
  private _data: ITodo;

  @Output('update') private _updateEmtr = new EventEmitter<Update<ITodo>>();
  @Output('delete') private _deleteEmtr = new EventEmitter<number>();

  public name: string;

  public isEditing = false;


  constructor(private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  edit() {
    this.name = this.data.name;
    this.isEditing = true;
  }

  delete() {
    this._deleteEmtr.emit(this.data.id);
  }

  update() {
    this._updateEmtr.emit({ id: this.data.id, changes: { name: this.name } });
    this.isEditing = false;
  }
}
