using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjAbNew.Data.DTO;
using ProjAbNew.Data.Entities;
using ProjAbNew.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace ProjAbNew.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        //תקציר
        /////////
        //בנאי
        //הוספת תמונה
        //קבלת כל התמונות
        //קבלת כל התמונות לפי מזהה מודעה
        //קבלת תמונה בודדת 
        //מחיקת תמונה
        //הוספת תמונה ישירות לתיקיה
        //בדיקת תקינות התמונה

        //בנאי
        private readonly ImageService _service;

        public ImageController(ImageService service)
        {
            _service = service;
        }

        //הוספת תמונה חדשה
        [Route("AddImage")]
        [HttpPost]
        public ActionResult Add([FromBody] ImageDTO postImage)
        {
            bool Ok = _service.AddImageToDB(postImage);
            if (Ok)
            {
                return Created("", null);
            }
            return BadRequest();
        }

        //קבלת כל התמונות
        [AllowAnonymous]
        [Route("GetAllmages")]
        [HttpGet]
        public ActionResult GetAllImages()
        {
            List<Image> Limage = _service.GetAllImages();
            return Ok(Limage);
        }

        //קבלת כל התמונות לפי מזהה מודעה
        [AllowAnonymous]
        [Route("GetAllImageByPostId/{postid}")]
        [HttpGet]
        public ActionResult GetAllImageByPostId(int postid)
        {
            List<Image> Limage = _service.GetAllImagesByPostId(postid);
            return Ok(Limage);
        }

        //קבלת תמונה בודדת 
        [AllowAnonymous]
        [Route("GetSingleImage/{id}")]
        [HttpGet]
        public ActionResult GetSingleImage(int id)
        {
            Image Limage = _service.GetSingleImage(id);
            return Ok(Limage);
        }

        //מחיקת תמונה
        [Route("DeleteImage/{id}")]
        [HttpDelete]
        public ActionResult Delete(int id)
        {
            ResponseDTO res = _service.DeleteImage(id);
            if (res.Status == Data.DTO.StatusCode.Error)
            {
                return BadRequest(res);
            }
            else
            {
                return Ok(res);
            }
        }

        //הוספת תמונה ישירות לתיקיה
        [AllowAnonymous]
        [Route("AddImageToFolder")]
        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("StaticFiles", "AllImages");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"').Replace(" ", "");
                    var fullPath = Path.Combine(pathToSave, fileName);
                    string urlToDB = "https://localhost:44340/StaticFiles/AllImages/" + fileName.ToString();

                    if (IsAPhotoFile(fileName))
                    {
                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }

                        return Ok(new { urlToDB });
                    }
                    return BadRequest();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        //בדיקת תקינות התמונה
        private bool IsAPhotoFile(string fileName)
        {
            return fileName.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase)
                   || fileName.EndsWith(".jpeg", StringComparison.OrdinalIgnoreCase)
                   || fileName.EndsWith(".png", StringComparison.OrdinalIgnoreCase);
        }
    }
}
