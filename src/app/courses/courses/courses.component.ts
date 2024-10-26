import { Component } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {

  courses: Course[] = [
    {_id: '1', name: 'angular', category: 'Front-End'},
    {_id: '2', name: 'spring', category: 'Back-End'}
  ];
  displayedColumns = ['name','category'];

  constructor(){
    //this.courses = [];
  }

}
