import { Router } from '@angular/router';
import { ResponseValidation } from 'src/app/model/ResponseValidation';
import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/Image.service';
import { LoginService } from 'src/app/services/login.service';
import { ImageValidationService } from 'src/app/services/ImageValidation.service';
import { Image } from 'src/app/model/Image';


@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {
  @Input() Id:number;
  public Auth = this.HttpLogin.ShareAuth;
  public formData = new FormData();
  public OpenAlert=false;
  public Response:Array<ResponseValidation>=[{Isok:true,Message:''},{Isok:true,Message:''}];
  public ObjToAddImage:Image={};
  public ArrImageByPost:Array<Image>=[];
  constructor( private router:Router,private HttpImage:ImageService, private HttpLogin:LoginService,private ValidationImage:ImageValidationService) { }


  ngOnInit(): void {
  }


  async GetAllImagePerPost()
  {
    this.ArrImageByPost = await this.HttpImage.GetAllImageByPostId(this.Id);
  }

  async OnClickDeleteImage(id:number)
  {
    try
    {
      await this.HttpImage.DeleteImage(id,this.Auth);
      await this.GetAllImagePerPost();
    }
    catch
    {
      alert("לא הצלחנו למחוק את התמונה אנא נסה שנית מאוחר יותר");
    }

  }


  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    this.formData = new FormData();
    this.formData.append('file', fileToUpload,this.Id+fileToUpload.name);

    this.Response[0] = this.ValidationImage.CheckImage(fileToUpload.name);
    if(!this.Response[0].Isok)
    {
      return
    }
     this.OnClickAddImageNew(this.Id+fileToUpload.name);
  }

  async OnClickAddImageNew(filename:string)
  {
    this.Response[1].Isok=true;
    try{
      this.ObjToAddImage.Img=filename;
      this.ObjToAddImage.PostId=this.Id;
      await this.HttpImage.AddImageToFolder(this.formData,this.Auth);
      await this.HttpImage.AddImage(this.ObjToAddImage,this.Auth);
      await this.GetAllImagePerPost();
    }
    catch
    {
      this.Response[1].Isok=true;
      this.Response[1].Message="לא הצלחנו לעלות את התמונה אנא נסה שוב מאוחר יותר!";
      this.OpenAlert=true;
    }
  }

  public OnClickFinish()
  {
      window.location.reload();
      this.router.navigate(['/Post/AllPosts']).then(() => {
        window.location.reload();
      });
  }

  CloseAlert(close:boolean)
  {
    this.OpenAlert=close;
    this.Response[2]={};
  }

}
