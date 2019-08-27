import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpMockInterceptor } from '@app/interceptors';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpValidationInterceptor } from './interceptors/http-validation.interceptor';
import { StoreModule } from '@ngrx/store';
import rootReducer from './store/reducers';
import { TodoComponent } from './components/todo/todo.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodoListContainer } from './containers/todo-list/todo-list.container';
import { EffectsModule } from '@ngrx/effects';
import rootEffects from './store/effects';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

const providers: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpValidationInterceptor,
    multi: true
  }
];

if (environment.useMock) {
  providers.push({
    provide: HTTP_INTERCEPTORS,
    useClass: HttpMockInterceptor,
    multi: true
  });
}

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    AddTodoComponent,
    TodoListContainer,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    StoreModule.forRoot(rootReducer),
    EffectsModule.forRoot(rootEffects)
  ],
  providers,
  bootstrap: [AppComponent]
})
export class AppModule { }
