import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../interfaces/project';
import { Experience } from '../interfaces/experience';
import { About } from '../interfaces/about';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProjects() {
    return this.http.get<Project[]>(this.baseUrl + '/projects');
  }

  addProject(project: Omit<Project, '_id'>) {
    return this.http.post<Project>(this.baseUrl + '/projects', project);
  }

  deleteProject(id: string) {
    return this.http.delete(this.baseUrl + '/projects/' + id);
  }

  getExperience() {
    return this.http.get<Experience[]>(this.baseUrl + '/experience');
  }

  getAbout() {
    return this.http.get<About[]>(this.baseUrl + '/about');
  }
    updateProject(id: string, project: Omit<Project, '_id'>) {
    return this.http.put<Project>(this.baseUrl + '/projects/' + id, project);
  }
}