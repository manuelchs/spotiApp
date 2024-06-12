import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NumbersDuelComponent } from './components/numbers-duel/numbers-duel.component';
import { HomeComponent } from './components/home/home.component';
import { TrackAnalyzerComponent } from './components/track-analyzer/track-analyzer.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'duelo-de-numeros', component: NumbersDuelComponent },
    { path: 'analisis-de-tracks', component: TrackAnalyzerComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
