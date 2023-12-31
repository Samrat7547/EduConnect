import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShareddataService } from 'src/app/services/sharedData/shared-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user!: any;

  constructor(
    private sharedDataService: ShareddataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.sharedDataService.userDetailsObservable.subscribe((userDetails) => {
      this.user = userDetails;
    });
  }
}
