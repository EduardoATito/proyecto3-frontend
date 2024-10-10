import { inject, Injectable, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private breakpointObserver = inject(BreakpointObserver);
  public isMobile = signal<boolean>(false);

  constructor() { 
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small, 
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      if (
        result.breakpoints[Breakpoints.XSmall] || 
        result.breakpoints[Breakpoints.Small]
      ) {
        this.isMobile.set(true);
      } else if (
        result.breakpoints[Breakpoints.Medium] ||
        result.breakpoints[Breakpoints.Large] || 
        result.breakpoints[Breakpoints.XLarge]
      ) {
        this.isMobile.set(false);
      }
    });
  }
}
