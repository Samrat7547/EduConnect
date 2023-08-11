import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';
import { ViewUserComponent } from '../view-user/view-user.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  users!: any;

  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.auth.getAllUsers().subscribe(
      (data: any) => {
        this.users = data;
        console.log(this.users);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteUser(Id: any) {
    // alert(qId);
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to delete?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        //delete
        this.auth.deleteUser(Id).subscribe(
          (data: any) => {
            this.users = this.users.filter((user: any) => user.id != Id);
            this.toastr.success('Success!', 'User deleted successfully');
          },
          (error) => {
            // console.log(error);
            // this.toastr.error('Error','Error in deleting quiz');
            if (error.error.text === 'User was deleted successfully') {
              this.users = this.users.filter((user: any) => user.id != Id);
              this.toastr.success('Success!', 'User deleted successfully');
            } else {
              this.toastr.error('Error', 'Error in deleting user');
            }
          }
        );
      }
    });
  }

  openDialog(
    id: any,
    userName: any,
    firstName: any,
    lastName: any,
    email: any,
    phone: any,
    status: any
  ) {
    const dialogRef = this.dialog.open(ViewUserComponent, {
      data: {
        id: id,
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        status: status,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
