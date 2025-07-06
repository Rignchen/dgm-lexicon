import { Data } from '#services/data';
import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [NgFor],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
	public JSON = JSON;
	public data = inject(Data);
}
