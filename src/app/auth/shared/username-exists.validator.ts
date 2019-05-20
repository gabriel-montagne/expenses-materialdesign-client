import { FormControl } from '@angular/forms';
import { switchMap, map } from 'rxjs/operators';
import { timer } from 'rxjs/observable/timer';

import { AuthenticationService } from './authentication.service';

export const registerAsyncValidator = (authService: AuthenticationService, time = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => {
        // tslint:disable-next-line:no-console
        console.log(input.value);
        return authService.isUsernameAvailable(input.value);
      }),
      map(res => {
        // tslint:disable-next-line:no-console
        console.log(res);
        return res.isLoginAvailable ? null : { loginExist: true };
      })
    );
  };
};
