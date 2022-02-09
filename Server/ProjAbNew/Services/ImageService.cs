using ProjAbNew.Data;
using ProjAbNew.Data.DTO;
using ProjAbNew.Data.Entities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ProjAbNew.Services
{
    public class ImageService
    {
        //תקציר
        /////////
        //הוספת תמונה
        //קבלת כל התמונות
        //קבלת כל התמונות לפי מזהה מודעה
        //קבלת תמונה בודדת 
        //מחיקת תמונה
        private readonly ProjABDBCotext m_db;
        public ImageService(ProjABDBCotext db)
        {
            m_db = db;
        }

        //הוספת תמונה
        public bool AddImageToDB(ImageDTO ImageFromFront)
        {
            Image ImageToSave = new Image();
            ImageToSave.PostId = ImageFromFront.PostId;
            ImageToSave.Img = "https://localhost:44340/StaticFiles/AllImages/" + ImageFromFront.Img; 
            m_db.Image.Add(ImageToSave);
            int c = m_db.SaveChanges();
            return c > 0;
        }

        //קבלת כל התמונות
        public List<Image>GetAllImages()
        {
            return m_db.Image.ToList();
        }

        //קבלת כל התמונות לפי מזהה מודעה
        public List<Image>GetAllImagesByPostId(int postid)
        {
            return m_db.Image.Where(i => i.PostId == postid).ToList();
        }

        //קבלת תמונה בודדת 
        public Image GetSingleImage(int id)
        {
            return m_db.Image.Where(i => i.Id == id).FirstOrDefault();
        }

        //מחיקת תמונה
        public ResponseDTO DeleteImage(int id)
        {
            Image ImageToDelete = GetSingleImage(id);
            if(ImageToDelete == null)
            {
                return new ResponseDTO { Status = Data.DTO.StatusCode.Error, StatusText = $"לא נמצאה התמונה" };
            }
            string url = "https://localhost:44340/";
            string UrlToDelete = ImageToDelete.Img.Substring(url.Length, ImageToDelete.Img.Length - url.Length);
            var PathToDelete = Path.Combine(Directory.GetCurrentDirectory(), UrlToDelete);
            FileInfo file = new FileInfo(PathToDelete);
            try
            {
                file.Delete();
                m_db.Image.Remove(ImageToDelete);
                m_db.SaveChanges();
            }
            catch
            {
                return new ResponseDTO { Status = Data.DTO.StatusCode.Error, StatusText = $"לא הצלחנו למחוק את התמונה" };
            }
            return new ResponseDTO { Status = Data.DTO.StatusCode.Success, StatusText = "התמונה נמחקה בצהלחה" };
        }
    }
}
