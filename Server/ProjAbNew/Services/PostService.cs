using ProjAbNew.Data;
using ProjAbNew.Data.DTO;
using ProjAbNew.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjAbNew.Services
{
    public class PostService
    {

        //תקציר
        /////////
        //הוספת מודעה
        //קבלת המודעה האחרונה שהועלתה
        //קבלת כל המודעות
        //קבלת מודעה פי מזהה מודעה
        //עדכון מודעה לפי מזהה מודעה
        //מחיקת מודעה לפי מזהה מודעה
        private readonly ProjABDBCotext m_db;
        public PostService(ProjABDBCotext db)
        {
            m_db = db;
        }

        //הוספת מודעה
        public bool AddPost(PostDTO PostFromUser)
        {
            Post PostToSave = new Post();
            PostToSave.Header = PostFromUser.Header;
            PostToSave.About = PostFromUser.About;
            m_db.Post.Add(PostToSave);
            int c = m_db.SaveChanges();
            return c > 0;
        }

        //קבלת המודעה האחרונה שהועלתה
        public Post GetLastPost()
        {
            return m_db.Post.ToList().Last();
        }

        //קבלת כל המודעות
        public List<Post>GetAllPost()
        {
            return m_db.Post.ToList();
        }

        //קבלת מודעה פי מזהה מודעה
        public Post GetPostById(int id)
        {
            return m_db.Post.Where(p => p.Id == id).FirstOrDefault();
        }

        //עדכון מודעה לפי מזהה מודעה
        public ResponseDTO UpdatePost (PostDTO PostFromUser, int id)
        {
            Post PostToUpdate = GetPostById(id);
            if (PostToUpdate == null || PostToUpdate.Id != id)
            {
                return new ResponseDTO
                {
                    Status = Data.DTO.StatusCode.Error,
                    StatusText = $"מודעה בעלת מזהה זה לא נמצאה במאגר הנתונים"
                };
            }
            PostToUpdate.Header = PostFromUser.Header;
            PostToUpdate.About = PostFromUser.About;
            int c = m_db.SaveChanges();
            if (c > 0)
            {
                return new ResponseDTO
                {
                    Status = Data.DTO.StatusCode.Success
                };
            }
            return new ResponseDTO
            {
                Status = Data.DTO.StatusCode.Error,
                StatusText = "לא הצלחנו לשמור את השינוים"
            };
        }


        //מחיקת מודעה לפי מזהה מודעה
        public ResponseDTO DeletePost(int id)
        {
            Post PostToDelete = GetPostById(id);
            if(PostToDelete==null || PostToDelete.Id!=id)
            {
                return new ResponseDTO
                {
                    Status = Data.DTO.StatusCode.Error,
                    StatusText = $"מודעה בעלת מזהה זה לא נמצאה במאגר הנתונים"
                };
            }
            m_db.Post.Remove(PostToDelete);
            int c = m_db.SaveChanges();
            if (c > 0)
            {
                return new ResponseDTO
                {
                    Status = Data.DTO.StatusCode.Success
                };
            }
            return new ResponseDTO
            {
                Status = Data.DTO.StatusCode.Error,
                StatusText = "לא הצלחנו לשמור את השינוים"
            };
        }

    }
}
