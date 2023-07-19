import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css'],
  
})
export class ViewCategoriesComponent implements OnInit {
   categories!:any;

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

  constructor( private category:CategoryService){}
 ngOnInit(): void {
    this.category.categories().subscribe((data:any)=>{
      this.categories=data;
      console.log(this.categories);
      
    },
    (error)=>{
      console.log(error);
      
    })
  }

}
