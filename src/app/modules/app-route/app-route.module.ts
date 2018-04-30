
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {LoginViewComponent} from '../../components/login-view/login-view.component';
import {PageNotFoundComponent} from '../../components/page-not-found/page-not-found.component';
import {VentanaPrincipalComponent} from '../../components/ventana-principal/ventana-principal.component';
const routes: Routes = [
  {path: 'login', component: LoginViewComponent},
  {path: 'mainview', component: VentanaPrincipalComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRouteModule {}
