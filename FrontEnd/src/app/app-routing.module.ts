import { PostComponent } from './screens/PostFolder/post/post.component';
import { UserComponent } from './screens/UserFolder/user/user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
import { LoginComponent } from './screens/login/login.component';
import { UserDetailsComponent } from './screens/UserFolder/user-details/user-details.component';
import { UserGuardService } from './services/UserGuard.service';
import { AdminGuardService } from './services/AdminGuard.service';
import { UpdateUserComponent } from './screens/UserFolder/update-user/update-user.component';
import { AddUserComponent } from './screens/UserFolder/add-user/add-user.component';
import { AllUsersComponent } from './screens/UserFolder/all-users/all-users.component';
import { AllMessageComponent } from './screens/MessageFolder/all-message/all-message.component';
import { AllPostComponent } from './screens/PostFolder/all-post/all-post.component';
import { AddPosthomeComponent } from './screens/PostFolder/AddPostFolder/add-posthome/add-posthome.component';


const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'User', component: UserComponent ,canActivate:[UserGuardService]
  ,children:[
  {path: 'Details', component: UserDetailsComponent ,canActivate:[UserGuardService]},
  {path: 'Update', component: UpdateUserComponent ,canActivate:[UserGuardService]},
  {path: 'AddUser', component: AddUserComponent ,canActivate:[UserGuardService,AdminGuardService]},
  {path: 'AllUser', component: AllUsersComponent ,canActivate:[UserGuardService,AdminGuardService]}
  ]},
  {path: 'AllMessage', component: AllMessageComponent ,canActivate:[UserGuardService]},
  { path: 'Post', component: PostComponent
  ,children:[
    {path: 'AllPosts', component: AllPostComponent},
    {path: 'AddPostHome', component: AddPosthomeComponent ,canActivate:[UserGuardService]},
   ]},
  { path: '**', component:  HomeComponent}
];
//AddPostComponent AllPostComponent
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

