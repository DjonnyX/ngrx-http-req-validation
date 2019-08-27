import { HttpRequest, HttpResponse } from '@angular/common/http';
import { timer, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

/**
 * Returns random timeout in ms
 */
const getTimeout = () => {
  return Math.random() * 1000;
};

/**
 * Simulate a mock request
 */
export function request<S = object, R = object>(
  req: HttpRequest<S>, mockHandler: (data: S) => R) {
  if (!req) {
    throw Error('What the f..k?) Request can not be null.');
  }
  return timer(getTimeout()).pipe(
    switchMap(_ => {
      return of(mockHandler(req.body)).pipe(
        map(resData => new HttpResponse({ status: 200, body: resData }))
      );
    }),
    // Not http-json api format.
    catchError(error => of(new HttpResponse<undefined>({ status: 400, statusText: error })))
  );
}
