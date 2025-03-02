import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: 'dashboard', 
        redirectTo: '/signin',
        pathMatch: 'full'  // redirect to /signin if no other path matches
    },
    { 
        path: '', 
        component: UserComponent,
        children: [
            {path: 'signup', component: RegistrationComponent},
            {path: 'signin', component: LoginComponent},
            
        ],
    },
    {
        path: 'dashboard', 
        component: DashboardComponent
    },
];
