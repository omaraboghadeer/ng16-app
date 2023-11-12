import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'user-search',
        loadComponent: () => import('./features/user-search/user-search.component').then(c => c.UserSearchComponent),
    },
    {
        path: 'user-details/:username',
        loadComponent: () => import('./features/user-details/user-details.component').then(c => c.UserDetailsComponent),
    },
    {
        path: 'xlsx-converting',
        loadComponent: () => import('./features/converting-xlsx/converting-xlsx.component').then(c => c.ConvertingXlsxComponent)
    },
    {
        path: 'request',
        loadComponent: () => import('./features/request-actions-view/request-actions-view.component').then(c => c.RequestActionsViewComponent)
    },
    {
        path: '',
        redirectTo: 'request',
        pathMatch: 'full'
    }
];
