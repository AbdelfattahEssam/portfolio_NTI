import { Component, OnInit, signal } from '@angular/core';
import { Api } from '../services/api';
import { Experience as ExperienceItem } from '../interfaces/experience';

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience implements OnInit {
  experiences = signal<ExperienceItem[]>([]);

  constructor(private api: Api) {}

  ngOnInit() {
    this.api.getExperience().subscribe((data) => {
      this.experiences.set(data);
    });
  }
}