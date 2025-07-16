import { Routes } from '@angular/router';
import { Home } from '#pages/home';
import { Word } from '#pages/word';
import { Error404 } from './pages/error-404/error-404';

export const routes: Routes = [
	{path: '', component: Home},
	{path: 'words/', redirectTo: '/'},
	{path: 'words/:id', component: Word},
	{path: '**', component: Error404},
];
