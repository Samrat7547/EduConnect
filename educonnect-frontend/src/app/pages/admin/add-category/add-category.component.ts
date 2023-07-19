import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent  implements OnInit {
  category={
    title:'',
    description:''
  }

  constructor(private _category:CategoryService,private toastr: ToastrService,private router: Router,){}

  ngOnInit(): void {
    
  }

  formSubmit(){
    if(this.category.title.trim()=='' || this.category.title==null){
      this.toastr.error('Title required!');
      return;
    }

    this._category.addCategory(this.category).subscribe(
      (data:any)=>{
        this.category.title='';
        this.category.description='';
        // this.router.navigate(['/admin/categories']);
        this.toastr.success('Success!','Category added successfully');
      },
      (error)=>{
        console.log(error);
        this.toastr.error('Error','Server error');
      }
    )

  }

}
