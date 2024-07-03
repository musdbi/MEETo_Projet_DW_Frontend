import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header.component';
import { NavbarComponent } from './common/navbar.component';
import { EventService } from './services/EventService';
import { HomePageComponent } from './home/HomePage.component';
import { LoginFormComponent } from './login/LoginForm.component';
import { AuthService } from './services/AuthService';
import { UserService } from './services/UserService';
import { AppRoutingModule } from './app-routing.module';
import { RegisterFormComponent } from './register/RegisterForm.component';
import { ProfileFormComponent } from './profile/ProfileForm.component'
import { CommonModule } from '@angular/common';
import { OrganizeEventFormComponent } from "./organize/OrganizeEventForm.component"
import { EventListComponent } from "./event-list/EventList.component"
import { EventListItemComponent } from "./event-list/EventListItem.component"
import { RegistrationService } from './services/RegistrationService';
import { EventRatingComponent } from './event-rating/EventRating.component';
import { EventRatingItemComponent } from './event-rating/EventRatingItem.component';
import { FeedbackService } from './services/FeedbackService';
import { StarRatingComponent } from './event-rating/star-rating/StarRating.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginFormComponent},
  { path : 'register', component : RegisterFormComponent},
  { path : 'profile', component : ProfileFormComponent},
  { path : 'organize', component : OrganizeEventFormComponent},
  { path : 'events', component : EventListComponent},
  { path : 'feedbacks', component : EventRatingComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    HomePageComponent,
    RegisterFormComponent,
    LoginFormComponent,
    ProfileFormComponent,
    OrganizeEventFormComponent,
    EventListComponent,
    EventListItemComponent,
    EventRatingComponent,
    EventRatingItemComponent,
    StarRatingComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [EventService, AuthService, UserService, RegistrationService, FeedbackService],
  bootstrap: [AppComponent]
})
export class AppModule { }