import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  imgUpload(img) {
      return this.http.post(`${environment.domain}/api/files/img/upload`, img, {
          reportProgress: true,
          observe: 'events'
      })
  }
}


