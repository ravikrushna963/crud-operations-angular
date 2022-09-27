import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormBuilder,Validators } from '@angular/forms';
import { FormserviceService } from '../shared/formservice.service'; 

@Component({
  selector: 'app-crudcomp',
  templateUrl: './crudcomp.component.html',
  styleUrls: ['./crudcomp.component.css']
})
export class CrudcompComponent implements OnInit {
  // formdata:any;
  isedit = false;
  indexselecetedto: any;

  
  ListofData:any = [];

 
  constructor(private fb:FormBuilder, public formservice:FormserviceService) { }

  formdata = new FormGroup({
    firstname:new FormControl ("", [Validators.required, Validators.pattern("^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$")]),
    lastname : new FormControl("",[Validators.required]),
    email : new FormControl("",[Validators.required]),
    age : new FormControl("",[Validators.required]),
    date : new FormControl("",[Validators.required]),
    place : new FormControl("",[Validators.required]),
    mobilenumber : new FormControl("",[Validators.required]),
    gender:new FormControl("",[Validators.required])
   });


  ngOnInit(): void {

     this.loadData();
  
  }

  loadData(){
    this.formservice.getData().subscribe(res=>{
      console.log("responce ",res);
    });
  }
  onsubmit(){
    console.log(this.formdata.value)
    this.ListofData.push(this.formdata.value);
    // this.formdata.reset();
    this.formservice.postData(this.formdata.value).subscribe(res=>{
      console.log("post response ",res);
      this.formdata.reset();
      
    })
    this.formdata.reset();
  }
  onCancel(){
    console.log(this.formdata.reset());
  }
  onedit(index: any){
    this.isedit = true;
    this.formdata.patchValue(this.ListofData[index])
    this.indexselecetedto = index;
    
  }
  onsave(){
    this.ListofData.splice(this.indexselecetedto,1);
    this.ListofData.push(this.formdata.value);
    this.formdata.reset();
  }
  ondelete(index: any){
    this.ListofData.splice(index,1);
  }
  get f() {
    return this.formdata.controls;
  }

}
