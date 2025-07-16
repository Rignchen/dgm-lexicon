import TagType from '#types/tag';
import { Component, Input } from '@angular/core';
import { Bubble } from '#components/bubble';

@Component({
	selector: 'app-tag',
	imports: [Bubble],
	templateUrl: './tag.html',
	styleUrl: './tag.css'
})
export class Tag {
	@Input({ required: true }) tag!: TagType;
	@Input() icon: boolean = false;
}
