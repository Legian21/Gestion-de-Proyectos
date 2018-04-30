import {USERS} from './Users';
import {Injectable} from '@angular/core';
import {ResponseOptions, Response} from '@angular/http';
import {MockConnection} from '@angular/http/testing';
import {MockBackend} from '@angular/http/testing';

@Injectable()
export class MockBackendService {

  constructor(
    private backend: MockBackend
  ) {}

  start(): void {
    console.log('MockBackendService start');
    this.backend.connections.subscribe((c: MockConnection) => {
      console.log('mockConnection url:: ' + c.request.url);
      const URL = "http://localhost:8080/users";
      let heroesIdRegex = /\/users\/([0-9]+)/i;


      if (c.request.url === URL && c.request.method === 0) {
        console.log(JSON.stringify(USERS));
        c.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(USERS)
        })));
      } else if (c.request.url.match(heroesIdRegex) && c.request.method === 0) {
        let matches = USERS.filter((user) => {
          console.log(user.id + " " + c.request.url.match(heroesIdRegex)[1]);

          if (c.request.url.match(heroesIdRegex)[1] === user.id) {
            return user;
          }

          //                    return user.id ===(c.request.url.match(heroesIdRegex)[1]);
        });
        console.log(matches);
        console.log(JSON.stringify(matches));
        c.mockRespond(new Response(new ResponseOptions({

          body: matches
        })));
      }
    });
  }
  //  close(): void {
  //    this.backend.connections.unsubscribe;
  //  }
}
