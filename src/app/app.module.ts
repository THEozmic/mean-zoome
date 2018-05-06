import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { DatePipe } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


// classes
import { User } from './classes/user';

// service
import { XlsxComperService } from './services/xlsx-comper.service';
import {DataAppService} from "./services/data-app.service";



import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login-page/login/login.component';
import { SignupComponent } from './pages/login-page/signup/signup.component';
import { UsersComponent } from './pages/userPage/users/users.component';
import { UserCreateComponent } from './pages/userPage/user-create/user-create.component';
import { UserEditComponent } from './pages/userPage/user-edit/user-edit.component';

import {FileUploadModule, CardModule} from 'primeng/primeng';
//import { UserInfroComponent } from './pages/account-page/user-infro/user-infro.component';
import { UserAssetsComponent } from './pages/account-page/user-assets/user-assets.component';
import { AssetsEditComponent } from './pages/assets-page/assets-edit/assets-edit.component';
import { AssetsCreateComponent } from './pages/assets-page/assets-create/assets-create.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AssetsComponent } from './pages/assets-page/assets/assets.component';
import { LoadingAnimationComponent } from './components/loading-animation/loading-animation.component';


const appRoutes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    data: { title: 'User List' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { title: 'Sign Up' }
  },
  {
    path: 'user-create',
    component: UserCreateComponent,
    data: { title: 'Create User' }
  },
  {
    path: 'user-edit/:id',
    component: UserEditComponent,
    data: { title: 'User Edit' }
  },
  /*{
    path: 'user-infro/:id',
    component: UserInfroComponent,
    data: { title: 'User Infro' }
  },*/
  {
    path: 'user-assets/:id/:retPage',
    component: UserAssetsComponent,
    data: { title: 'User assets' }
  },
  {
    path: 'assets-edit/:id/:retPage',
    component: AssetsEditComponent,
    data: { title: 'assets edit' }
  },
  {
    path: 'assets-create/:id',
    component: AssetsCreateComponent,
    data: { title: 'assets create' }
  },
  {
    path: 'assets-list',
    component: AssetsComponent,
    data: { title: 'Assets' }
  },
  {
    path: 'welcomeMLZ',
    component: WelcomeComponent,
    data: { title: 'welcome MLZ' }
  },
  { path: '',
    redirectTo: '/welcomeMLZ',
    pathMatch: 'full'
  }
];

const NGA_SERVICES = [
  XlsxComperService,
  DataAppService
];
const NGA_CLASSES = [
  User
];
const NGA_PIPE = [
  DatePipe
];

@NgModule({
  exports: [
    DatePipe
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    UsersComponent,
    UserCreateComponent,
    UserEditComponent,
    //UserInfroComponent,
    UserAssetsComponent,
    AssetsEditComponent,
    AssetsCreateComponent,
    WelcomeComponent,
    AssetsComponent,
    LoadingAnimationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FileUploadModule,
    CardModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [...NGA_SERVICES, ...NGA_CLASSES, ...NGA_PIPE],
  bootstrap: [AppComponent]
})
export class AppModule { }
