import { Injectable } from '@angular/core';

@Injectable()
export class LogInService {

  constructor() { }

  public ValidateUser(username: string, pass: string): boolean {
    if (username === 'Naigel' && pass === '123') {
      return true;
    }
    return false;
  }
}
