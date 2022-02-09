import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/model/Image';
import { Post } from 'src/app/model/Post';
import { ResponseValidation } from 'src/app/model/ResponseValidation';
import { ImageService } from 'src/app/services/Image.service';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/Post.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {
  public Auth = this.HttpLogin.ShareAuth;
  public PostArr:Array<Post>=[];
  public ImagetArr:Array<Image>=[];
  public ToAlert:ResponseValidation={};
  public OpenAlert=false;
  public Stage=1;
  public PostIdForChildren:number;
  constructor(private HttpLogin :LoginService , private HttpPost:PostService ,private HttpImage:ImageService) { }

  async ngOnInit(): Promise<void> {
    await this.GetAllPost();
    await this.GetAllImage();
  }

  async GetAllPost()
  {
    this.PostArr = await this.HttpPost.GetAllPost();
  }

  async GetAllImage()
  {
    this.ImagetArr = await this.HttpImage.GetAllImages();
  }

  public GetImageByPostId(postid:number)
  {
   for(let i=0;i<this.ImagetArr.length;i++)
   {
     if(this.ImagetArr[i].PostId==postid)
     {
       return this.ImagetArr[i].Img;
     }
   }
   return "assets\\default.jpg"
  }

  async OnClickDeletePost(postid:number)
  {
    try
    {
      for(let i=0;i<this.ImagetArr.length;i++)
      {
        if(this.ImagetArr[i].PostId==postid)
        {
          await this.HttpImage.DeleteImage(this.ImagetArr[i].Id,this.Auth);
        }
      }
      await this.HttpPost.DeletePost(postid,this.Auth);
      await this.GetAllPost();
      await this.GetAllImage();
      //לשלןח הודעה שהמודעה נמחקה בהצלחה
      this.ToAlert.Isok=false;
      this.ToAlert.Message ="המודעה נמחקה בהצלחה";
      this.OpenAlert=true;
    }
    catch
    {
      this.ToAlert.Isok=true;
      this.ToAlert.Message ="לא הצלחנו למחוק את התמונה אנא נסה שנית מאוחר יותר!";
      this.OpenAlert=true;
    }
  }

  ChangeStage(stg:number)
  {
    this.Stage=stg;
  }
  
  CloseAlert(close:boolean)
  {
    this.OpenAlert=close
    this.ToAlert={};
  }
}

