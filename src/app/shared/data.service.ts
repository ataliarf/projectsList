// book.service.ts

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserEmailService {
  private userEmail: string = 'omer@gmail.com';

  getUserEmail() {
    return this.userEmail;
  }

  setUserEmail(newUserEmail: string) {
    return this.userEmail = newUserEmail;
  }

}