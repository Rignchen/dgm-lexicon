import { RenderMode, ServerRoute } from '@angular/ssr';

import { Data } from '#services/data';
import { inject } from '@angular/core';

export const serverRoutes: ServerRoute[] = [
	{
		path: 'words/:id',
		renderMode: RenderMode.Prerender,
		getPrerenderParams: async () => inject(Data).lexicon.map(word => ({
			id: word.id.toString(),
		})),
	},
	{
		path: '**',
		renderMode: RenderMode.Prerender,
	}
];
