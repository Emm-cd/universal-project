import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './base/app.component';
import { HomeComponent } from './home/home.component';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { environment } from '../environments/environment';
import { routes } from './routers';
import { AngularFireModule } from 'angularfire2';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthGuards } from './guards/auth.guards.service';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './Register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthServices } from './services/auth.services';
import { ListCreatorComponent } from './creator/list.creator.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { ListService } from './services/lists.service';
import { ProfileComponent } from './profile/profile.component';
import { ListComponent } from './creator/list/list.component';
import { TodoCreatorComponent } from './todo/creator/todos.creator.component';
import { TodoService } from './services/todos.service';
import { TodoCardComponent } from './todo/card/todo.card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ListCreatorComponent,
    ListComponent,
    ProfileComponent,
    TodoCreatorComponent,
    TodoCardComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    RouterModule.forRoot(routes),
    TransferHttpCacheModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [AuthServices, AuthGuards, UserService, ListService, TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
