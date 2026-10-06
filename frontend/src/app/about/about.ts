import { Component, OnInit, signal } from '@angular/core';
import { Api } from '../services/api';
import { About as AboutData } from '../interfaces/about';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
  name = 'Abdelfattah Essam';
  imagesUrl = 'http://localhost:3000/uploads/';
  about = signal<AboutData | null>(null);

  constructor(private api: Api) {}

  ngOnInit() {
    this.api.getAbout().subscribe((data) => {
      this.about.set(data[0]);
    });
  }
}