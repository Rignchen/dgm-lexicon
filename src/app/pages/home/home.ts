import { Data } from '#services/data';
import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Card } from '../../components/card/card';

@Component({
  selector: 'app-home',
  imports: [NgFor, Card],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
	public JSON = JSON;
	public data = inject(Data);
}
