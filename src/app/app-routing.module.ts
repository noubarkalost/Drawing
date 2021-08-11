import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"", loadChildren: ()=>import('./register/register.module').then(mod=>mod.RegisterModule),
  },{
    path:"Draw", loadChildren: ()=>import('./paint/paint.module').then(mod=>mod.PaintModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
