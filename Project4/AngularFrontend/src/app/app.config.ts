import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { backendInterceptor } from './shared/backend.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([backendInterceptor])),
  ],
};
