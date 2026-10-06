import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { Experience } from '../experience/experience';
import { Projects } from '../projects/projects';
import { About } from '../about/about';

@Component({
  selector: 'app-home',
  imports: [Hero, Experience, Projects, About],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}