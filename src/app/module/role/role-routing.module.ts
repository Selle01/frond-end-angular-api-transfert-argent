import { RoleComponent } from './role.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // { path: 'roles', component: RoleComponent}
  {
		path:'roles',
		children:[
			// { path: 'all', component: ListPokemonComponent },
			// { path: 'edit/:id', component: EditPokemonComponent},
			// { path: ':id', component: DetailPokemonComponent }
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule {}
