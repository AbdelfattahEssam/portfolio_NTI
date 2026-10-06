import { Component, OnInit, signal } from '@angular/core';
import { Api } from '../services/api';
import { Project } from '../interfaces/project';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  projects = signal<Project[]>([]);

  constructor(private api: Api) {}

  ngOnInit() {
    this.api.getProjects().subscribe((data) => {
      this.projects.set(data);
    });
  }
}