import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/report/dashboard', pathMatch: 'full', },
  { path: 'login',
  loadChildren: () => import('./starter/starter.module').then(mod => mod.StarterModule)
  },
  { path: 'report',
    loadChildren: () => import('./starter/center-container/center-container.module').then(mod => mod.CenterContainerModule)
  },
  { path: 'customers',
    loadChildren: () => import('./starter/center-container/center-container.module').then(mod => mod.CenterContainerModule)
  },
  { path: 'bill',
    loadChildren: () => import('./starter/center-container/center-container.module').then(mod => mod.CenterContainerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
