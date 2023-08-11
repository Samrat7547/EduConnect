import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css'],
})
export class ViewCategoriesComponent implements OnInit {
  categories!: any;

  // categories=[
  //   {
  //     cid:23,
  //     title:'Programming',
  //     description:"This is for testing category"
  //   },
  //   {
  //     cid:23,
  //     title:'Programming',
  //     description:"This is for testing category"
  //   },
  //   {
  //     cid:23,
  //     title:'Programming',
  //     description:"This is for testing category"
  //   }
  // ]

  constructor(
    private _category: CategoryService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this._category.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteCategory(cId: any) {
    // alert(qId);
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to delete?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        //delete
        this._category.deleteCategory(cId).subscribe(
          (data: any) => {
            this.categories = this.categories.filter(
              (category: any) => category.cid != cId
            );
            this.toastr.success('Success!', 'Quiz deleted successfully');
          },
          (error) => {
            console.log(error);
            this.toastr.error('Error', 'Delete all its quizzes first');
          }
        );
      }
    });
  }
}
