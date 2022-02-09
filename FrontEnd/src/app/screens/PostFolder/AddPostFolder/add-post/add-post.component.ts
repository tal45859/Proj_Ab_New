import { PostValidationService } from './../../../../services/PostValidation.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseValidation } from 'src/app/model/ResponseValidation';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/Post.service';
import { Post } from 'src/app/model/Post';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  @Output() StageOUT = new EventEmitter<number>();
  @Output() Id = new EventEmitter<number>();
  public Auth = this.HttpLogin.ShareAuth;
  public OpenAlert=false;
  public Response:Array<ResponseValidation>=[{Isok:true,Message:''},{Isok:true,Message:''},{}];
  public ObjToAddPost:Post={};
  public ObjToFindLastPost:Post={};
  constructor(private HttpLogin:LoginService,
    private ValidationPost:PostValidationService,
     private HttpPost:PostService) { }

  ngOnInit(): void {
  }

  async OnClickAddPost()
  {
    try
    {
      this.Response[0] = await this.ValidationPost.CheckHedaer(this.ObjToAddPost.Header);
      this.Response[1] = await this.ValidationPost.CheckAbout(this.ObjToAddPost.About);
      if(!this.Response[0].Isok || !this.Response[1].Isok)
      {
        return;
      }
      await this.HttpPost.AddPost(this.ObjToAddPost,this.Auth);
      this.ObjToFindLastPost = await this.HttpPost.GetLastPost(this.Auth);
      //אלרט שעלה בהצלחה
      //alert("המודעה עלתה בהצלחה");
      this.Response[2].Isok=false;
      this.Response[2].Message="המודעה עלתה בהצלחה";
      this.OpenAlert=true;
      // this.Id.emit(this.ObjToFindLastPost.Id);
      // this.StageOUT.emit(2);
    }
    catch
    {
      this.Response[2].Isok=true;
      this.Response[2].Message="לא הצלחנו לעלות את המודעה אנא נסה שוב מאוחר יותר!";
      this.OpenAlert=true;
    }
  }

  CloseAlert(close:boolean)
  {
    if(!this.Response[2].Isok)
    {
      this.Id.emit(this.ObjToFindLastPost.Id);
      this.StageOUT.emit(2);
    }
    this.OpenAlert=close;
    this.Response[2]={};
  }
}
