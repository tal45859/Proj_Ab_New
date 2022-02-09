import { Image } from './../model/Image';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  endPointApi="https://localhost:44340/api/Image";

      //תקציר
      /////////
      //בנאי
      //הוספת תמונה
      //הוספת תמונה ישירות לתיקיה
      //קבלת כל התמונות
      //קבלת כל התמונות לפי מזהה מודעה
      //קבלת תמונה בודדת
      //מחיקת תמונה


    //בנאי
    constructor(private http:HttpClient) { }

    //הוספת תמונה
    async AddImage(Obj:Image,header:any)
    {
      return await this.http.post(this.endPointApi+"/AddImage",Obj, {
        headers: new HttpHeaders().set('Authorization', header),
      }).toPromise<any>();
    }

    //הוספת תמונה ישירות לתיקיה
    async AddImageToFolder(File:FormData,header:any)
    {
      return await this.http.post(this.endPointApi+"/AddImageToFolder",File, {
        headers: new HttpHeaders().set('Authorization', header),
      }).toPromise<any>();
    }

    //קבלת כל התמונות
    async GetAllImages()
    {
      return await this.http.get(this.endPointApi+"/GetAllmages").toPromise<any>();
    }

    //קבלת כל התמונות לפי מזהה מודעה
    async GetAllImageByPostId(postid:number)
    {
      return await this.http.get(this.endPointApi+"/GetAllImageByPostId/"+postid).toPromise<any>();
    }

    //קבלת תמונה בודדת
    async GetSingleImage(id:number)
    {
      return await this.http.get(this.endPointApi+"/GetSingleImage/"+id).toPromise<any>();
    }

    //מחיקת תמונה
    async DeleteImage(id:number,header:any)
    {
      return await this.http.delete(this.endPointApi+"/DeleteImage/"+id,{
        headers: new HttpHeaders().set('Authorization', header),
      }).toPromise<any>();
    }

}
