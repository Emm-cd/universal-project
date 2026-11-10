import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuards } from './guards/auth.guards.service';
import { ListCreatorComponent } from './creator/list.creator.component';
import { ProfileComponent } from './profile/profile.component';
import { Component } from '@angular/core';
import { ListComponent } from './creator/list/list.component';
import { CanActivate } from '@angular/router/src/utils/preactivation';

export const routes = [
      { path: '', component: HomeComponent, pathMatch: 'full', CanActivate: {AuthGuards} },
      { path: 'login', component: LoginComponent },
      //{ path: 'register', component: RegisterComponent },
      { path: 'new', component: ListCreatorComponent, canActivate: [AuthGuards] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuards] },
      { path: 'lists/:id', component: ListComponent }
];
