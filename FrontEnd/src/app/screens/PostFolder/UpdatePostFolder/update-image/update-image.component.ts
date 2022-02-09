import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Image } from 'src/app/model/Image';
import { Post } from 'src/app/model/Post';
import { ResponseValidation } from 'src/app/model/ResponseValidation';
import { ImageService } from 'src/app/services/Image.service';
import { ImageValidationService } from 'src/app/services/ImageValidation.service';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/Post.service';

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.css']
})
export class UpdateImageComponent implements OnInit {
  @Input() postObj:Post={};
  public Auth = this.HttpLogin.ShareAuth;
  public ImageArr:Array<Image>=[];
  public formData = new FormData();
  public ObjToAddImage:Image={};
  public Response:Array<ResponseValidation>=[{Isok:true,Message:''},{}];
  public OpenAlert=false;
  constructor(private router:Router,private HttpImage:ImageService,private HttpPost:PostService,private HttpLogin:LoginService ,private ImageValidation:ImageValidationService) { }

  async ngOnInit(): Promise<void> {
    await this.GetAllImageByPostId();
  }

  async GetAllImageByPostId()
  {
    this.ImageArr = await this.HttpImage.GetAllImageByPostId(this.postObj.Id);
  }


  async OnClickDeleteImage(id:number)
  {
    try
    {
      await this.HttpImage.DeleteImage(id,this.Auth);
      await this.GetAllImageByPostId();
    }
    catch
    {
      // alert("לא הצלחנו למחוק את התמונה אנא נסה שנית מאוחר יותר");
      this.Response[1].Isok=true;
      this.Response[1].Message="לא הצלחנו למחוק את התמונה אנא נסה שנית מאוחר יותר!";
      this.OpenAlert=true;
    }
  }


  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    this.formData = new FormData();
    this.formData.append('file', fileToUpload,this.postObj.Id+fileToUpload.name);

    this.Response[0] = this.ImageValidation.CheckImage(fileToUpload.name);
    if(!this.Response[0].Isok)
    {
      return
    }
     this.AddImageNew(this.postObj.Id+fileToUpload.name);
  }

  async AddImageNew(filename:string)
  {
    //this.Response[1].Isok=true;
    try{
      this.ObjToAddImage.Img=filename;
      this.ObjToAddImage.PostId=this.postObj.Id;
      await this.HttpImage.AddImageToFolder(this.formData,this.Auth);
      await this.HttpImage.AddImage(this.ObjToAddImage,this.Auth);
      await this.GetAllImageByPostId();
    }
    catch
    {
      this.Response[1].Isok=true;
      this.Response[1].Message="לא הצלחנו לעלות את התמונה אנא נסה שוב מאוחר יותר!";
      this.OpenAlert=true;
    }
  }

  async OnClickFinish()
  {
      await this.HttpPost.UpdatePost(this.postObj,this.Auth);
      this.Response[1].Isok=false;
      this.Response[1].Message="השינוים בוצעו בהצלחה";
      this.OpenAlert=true;
      //alert("השינוים בוצעו בהצלחה");
      // window.location.reload();
      // this.router.navigate(['/Post/AllPosts']).then(() => {
      //   window.location.reload();
      // });
  }


  CloseAlert(close:boolean)
  {
    if(!this.Response[1].Isok)
    {
     // window.location.reload();
      this.router.navigate(['/Post/AllPosts']).then(() => {
        window.location.reload();
      });
    }
    this.OpenAlert=close
    this.Response[1]={};
  }
}
