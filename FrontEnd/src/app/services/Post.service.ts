import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../model/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  endPointApi="https://localhost:44340/api/Post";
constructor(private http:HttpClient) { }

      //תקציר
      /////////
      //הוספת מודעה
      //קבלת המודעה האחרונה שהועלתה
      //קבלת כל המודעות
      //קבלת מודעה פי מזהה מודעה
      //עדכון מודעה לפי מזהה מודעה
      //מחיקת מודעה לפי מזהה מודעה

      //הוספת מודעה
      async AddPost(post:Post,header:any)
      {
        return await this.http.post(this.endPointApi+"/AddPost",post, {
          headers: new HttpHeaders().set('Authorization', header),
        }).toPromise<any>();
      }

      //קבלת המודעה האחרונה שהועלתה
      async GetLastPost(header:any)
      {
        return await this.http.get(this.endPointApi+"/GetLastPost", {
          headers: new HttpHeaders().set('Authorization', header),
        }).toPromise<any>();
      }

      //קבלת כל המודעות
      async GetAllPost()
      {
        return await this.http.get(this.endPointApi+"/GetAllPost").toPromise<any>();
      }

      //קבלת מודעה פי מזהה מודעה
      async GetPostById(id:number)
      {
        return await this.http.get(this.endPointApi+"/GetPostById/"+id).toPromise<any>();
      }

      //עדכון מודעה לפי מזהה מודעה
      async UpdatePost(PostObj:Post,header:any)
      {
        return await this.http.put(this.endPointApi+"/UpdatePost/"+PostObj.Id,PostObj, {
          headers: new HttpHeaders().set('Authorization', header),
        }).toPromise<any>();
      }

      //מחיקת מודעה לפי מזהה מודעה
      async DeletePost(id:number,header:any)
      {
        return await this.http.delete(this.endPointApi+"/DeletePostById/"+id, {
          headers: new HttpHeaders().set('Authorization', header),
        }).toPromise<any>();
      }
}
