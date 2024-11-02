import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httpClient: HttpClient) {}

  list(): Course[] {
    return [
      {_id: '1', name: 'angular', category: 'Front-End'},
      {_id: '2', name: 'spring', category: 'Back-End'}
    ];
  }

}
