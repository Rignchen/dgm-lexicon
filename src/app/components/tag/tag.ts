import TagType from '#types/tag';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-tag',
	imports: [],
	templateUrl: './tag.html',
	styleUrl: './tag.css'
})
export class Tag {
	@Input({ required: true }) tag!: TagType;
}
