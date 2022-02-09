import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ContentComponent } from './layout/content/content.component';
import { FoterComponent } from './layout/foter/foter.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './screens/home/home.component';
import { LoginComponent } from './screens/login/login.component';
import { UserDetailsComponent } from './screens/UserFolder/user-details/user-details.component';
import { AllUsersComponent } from './screens/UserFolder/all-users/all-users.component';
import { UserComponent } from './screens/UserFolder/user/user.component';
import { UpdateUserComponent } from './screens/UserFolder/update-user/update-user.component';
import { AddUserComponent } from './screens/UserFolder/add-user/add-user.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AddImageComponent } from './screens/PostFolder/AddPostFolder/add-image/add-image.component';
import { AllMessageComponent } from './screens/MessageFolder/all-message/all-message.component';
import { AddMessageComponent } from './screens/MessageFolder/add-message/add-message.component';
import { ImageRunComponent } from './screens/ImageFolder/image-run/image-run.component';
import { AboutComponent } from './screens/AboutFolder/about/about.component';
import { PostComponent } from './screens/PostFolder/post/post.component';
import { AllPostComponent } from './screens/PostFolder/all-post/all-post.component';
import { AddPostComponent } from './screens/PostFolder/AddPostFolder/add-post/add-post.component';
import { UpdatePostComponent } from './screens/PostFolder/UpdatePostFolder/update-post/update-post.component';
import { PostDetailsComponent } from './screens/PostFolder/post-details/post-details.component';
import { AddPosthomeComponent } from './screens/PostFolder/AddPostFolder/add-posthome/add-posthome.component';
import { UpdatePostHomeComponent } from './screens/PostFolder/UpdatePostFolder/update-post-home/update-post-home.component';
import { UpdateImageComponent } from './screens/PostFolder/UpdatePostFolder/update-image/update-image.component';
import { AlertErrorComponent } from './screens/ErrorFolder/alert-error/alert-error.component';


@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    FoterComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    UserDetailsComponent,
    AllUsersComponent,
    UserComponent,
    UpdateUserComponent,
    AddUserComponent,
    AddImageComponent,
    AllMessageComponent,
    AddMessageComponent,
    ImageRunComponent,
    AboutComponent,
    PostComponent,
    AllPostComponent,
    AddPostComponent,
    UpdatePostComponent,
    PostDetailsComponent,
    AddPosthomeComponent,
    UpdatePostHomeComponent,
    UpdateImageComponent,
    AlertErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
