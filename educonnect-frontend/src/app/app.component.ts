import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'educonnect-frontend';


  isStartComponent: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current route path includes 'start'
        this.isStartComponent = this.activatedRoute.snapshot.firstChild?.routeConfig?.path?.includes('start') ?? false;
      }
    });
  }
}
