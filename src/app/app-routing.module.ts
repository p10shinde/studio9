import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
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
  },
  { path: 'users',
    loadChildren: () => import('./starter/center-container/center-container.module').then(mod => mod.CenterContainerModule)
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
