import {User} from '../Models/User';
import {HttpClient} from '@angular/common/http';
import {HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/throw';
@Injectable()
export class UserService {
  public user: User;
  private static handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      if (error.status === 404) {
        errMsg = `Resource ${error.url} was not found`;
      } else {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    return Observable.throw(errMsg);
  }

  constructor(private http: Http) {}

  getUsers(): Observable<User[]> {

    return this.http.get("http://localhost:8080/users")
      .map(response => response.json() as User[])
      .catch(UserService.handleError);
  }

      createUser(user: User): Observable<User> {
          return this.http.post('http://localhost:8080/users', user)
              .map(response => response.json() as User)
              .catch(UserService.handleError);
      }

      updateUser(user: User): Observable<any> {
          return this.http.put('http://localhost:8080/users', user)
              .map(response => response.json())
              .catch(UserService.handleError);
      }

      deleteUser(id: string): Observable<any> {
          return this.http.delete('http://localhost:8080/users/' + id)
              .map(response => response.json())
              .catch(UserService.handleError);
  }

  getUser(id: string): Observable<User[]> {

    return this.http.get('http://localhost:8080/users/' + id)
      .switchMap(response => {
        if (response.json().Response === 'False') {
          console.log('hola2');
          return Observable.throw('The movie does not exist');
        } else {
          console.log('hola');
          return Observable.of(response.json() as User[]);
        }
      });
  }

}
