import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { first, Observable } from 'rxjs';
import { coursesResponse } from '../../login/components/login/types/courses-response.Types';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'http://localhost:8080/api/courses';

  constructor(readonly httpClient: HttpClient) {}
 /*
  list() {
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      first(),
    );
  } */

    listByUser(user_id:number) {
    const url = `${this.API}/find/${user_id}`;
    return this.httpClient.get<Course[]>(url).pipe(first());
  }


  loadById(id: string){
    return this.httpClient.get<Course>(`${this.API}/${id}`);

  }

  save(record: Partial<Course>): Observable<Course>{
    if(record._id){
      return this.update(record);
    }
      return this.create(record);

  }

  private create(record: Partial<Course>) {
    return this.httpClient.post<coursesResponse>(this.API ,record);
  }

  private update(record: Partial<Course>){
    console.log(record._id);
    return this.httpClient.put<Course>(`${this.API}/${record._id}`, record).pipe(first());

  }

  public delete(id: string){
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }

  logout() {
    // Limpa o sessionStorage
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("username");
  }
}
