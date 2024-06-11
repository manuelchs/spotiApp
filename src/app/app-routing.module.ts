import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NumbersDuelComponent } from './components/numbers-duel/numbers-duel.component';
import { WhyIsPopularComponent } from './components/why-is-popular/why-is-popular.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'duelo-de-numeros', component: NumbersDuelComponent },
    { path: 'por-que-es-popular', component: WhyIsPopularComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
