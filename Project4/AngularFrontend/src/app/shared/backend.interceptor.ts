import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { environment } from '../../environments/environment';

export const backendInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const modReq = req.clone({url: environment.apiUrl + req.urlWithParams})
  return next(modReq);
};
