import { Component, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Api } from '../services/api';
import { Project } from '../interfaces/project';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  projects = signal<Project[]>([]);
  editingId = signal<string | null>(null);

  constructor(private api: Api) {}

  ngOnInit() {
    this.api.getProjects().subscribe((data) => {
      this.projects.set(data);
    });
  }

  startEdit(project: Project, form: NgForm) {
    this.editingId.set(project._id);
    form.form.patchValue({
      name: project.name,
      summary: project.summary,
      linkSource: project.linkSource ?? '',
      linkPreview: project.linkPreview ?? '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit(form: NgForm) {
    this.editingId.set(null);
    form.reset();
  }

  saveProject(form: NgForm) {
    if (form.invalid) return;

    const data: Omit<Project, '_id'> = form.value;
    const id = this.editingId();

    if (id) {
      this.api.updateProject(id, data).subscribe((updated) => {
        this.projects.update((list) => list.map((p) => (p._id === id ? updated : p)));
        this.cancelEdit(form);
      });
    } else {
      this.api.addProject(data).subscribe((created) => {
        this.projects.update((list) => [...list, created]);
        form.reset();
      });
    }
  }

  deleteProject(id: string) {
    if (!confirm('Delete this project?')) return;

    this.api.deleteProject(id).subscribe(() => {
      this.projects.update((list) => list.filter((p) => p._id !== id));
    });
  }
}