import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { MainComponent } from './components/main.component';
import { ItemComponent } from './components/item.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { RegisterComponent } from './components/register.component';
import { RegisterSuccessfulComponent } from './components/register-successful.component';
import { NotesService } from './notes.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

const ROUTES: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/successful', component: RegisterSuccessfulComponent },
  { path: 'main', component: MainComponent },
  { path: 'note', component: ItemComponent },
  { path: 'note/:id', component: ItemComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ItemComponent,
    RegisterComponent,
    RegisterSuccessfulComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    HttpClientModule,
    NoopAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule
  ],
  providers: [AuthService, NotesService, MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
