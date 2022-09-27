import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormserviceService {
  postdata(value: any) {
    throw new Error('Method not implemented.');
  }

  constructor(public http:HttpClient) { }

  getData(){
      return this.http.get('http://localhost:3000/getdata');
  }

  postData(bodydata: any){
    var headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*'
    })
    return this.http.post('http://localhost:3000/postdata',bodydata,{headers:headers});
}

}
