import { Routes } from '@angular/router';
import { Home } from '#pages/home';
import { Word } from '#pages/word';

export const routes: Routes = [
	{path: '', component: Home},
	{path: 'words/:id', component: Word},
];
