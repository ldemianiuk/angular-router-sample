import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrisisDetailComponent } from './crisis-detail/crisis-detail.component';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import {CrisisCenterComponent} from './crisis-center/crisis-center.component';
import {CrisisCenterHomeComponent} from './crisis-center-home/crisis-center-home.component';
import {CanDeactivateGuard} from '../can-deactivate.guard';


const routes: Routes = [
  {path: 'crisis-center', component: CrisisCenterComponent,
  children: [
    {path: '', component: CrisisListComponent,
    children: [
      {path: ':id', component: CrisisDetailComponent, canDeactivate: [CanDeactivateGuard]},
      {path: '', component: CrisisCenterHomeComponent}
    ]},
  ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrisisCenterRoutingModule { }
