import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/model/Image';
import { ImageService } from 'src/app/services/Image.service';

@Component({
  selector: 'app-image-run',
  templateUrl: './image-run.component.html',
  styleUrls: ['./image-run.component.css']
})
export class ImageRunComponent implements OnInit {
  public ImageArr:Array<Image>=[];

  public index=0;
  public Situation="עצור";

  //interval
  public handle:any;
  public startOrStopFlag = true;

  constructor(private HttpImage:ImageService) { }

  async ngOnInit(): Promise<void>
  {
    await this.GetAllImage();
    this.startInterval();
  }

  async GetAllImage()
  {
    this.ImageArr = await this.HttpImage.GetAllImages();
  }

  public startInterval()
  {
    this.startOrStopFlag=true;
    this.handle = setInterval(()=> {
      if(this.index<this.ImageArr.length-1)
      {
        this.index++;
      }
      else
      {
        this.index=0;
      }},3000);
  }

  public stopInterval()
  {
    this.startOrStopFlag=false;
    clearInterval(this.handle);
  }

  public OnFront()
  {
    if(this.index<this.ImageArr.length-1)
      {
        this.index++;
      }
      else
      {
        this.index=0;
      }
  }

  public OnBack()
  {
    if(this.index>0)
      {
        this.index--;
      }
      else
      {
        this.index=this.ImageArr.length-1;;
      }
  }
}
