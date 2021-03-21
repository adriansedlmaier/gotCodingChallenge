import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { HouseComponent } from './house/house.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/house', pathMatch: 'full'},
  {path: 'house', component: HouseComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
