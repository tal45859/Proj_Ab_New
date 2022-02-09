using ProjAbNew.Data;
using ProjAbNew.Data.DTO;
using ProjAbNew.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace ProjAbNew.Services
{
    public class UserService
    {

        //תקציר
        ///////
        //בנאי
        //JWT קבלת משתמש על פי
        //קבלת משתמש לפי מזהה לשימוש פנימי
        //הוספת משתמש
        //בדיקה האם קיים מייל במערכת
        //מחזיר רשימת משתמשים
        //מחזיר משתמש לפי מייל
        //JWT עדכון משתמש על פי
        //JWT מחיקת משתמש על פי
        //מחיקת משתמש מוגבל למנהל
        //הצפנה MD5 
        //בדיקת הזדאות

        private readonly ProjABDBCotext m_db;
        private readonly JwtService _JwtService;

        //בנאי
        public UserService(ProjABDBCotext db, JwtService jwtService)
        {
            m_db = db;
            _JwtService = jwtService;
        }


        //JWT קבלת משתמש על פי
        public User GetUserByJWT()
        {
            int UserId =int.Parse(_JwtService.GetTokenClaims());
            User user = m_db.User.Where(u => u.Id == UserId).FirstOrDefault();
            return user;
        }

        //קבלת משתמש לפי מזהה לשימוש פנימי
        public User GetUserById(int id)
        {
            User user = m_db.User.Where(u => u.Id == id).FirstOrDefault();
            return user;
        }

        //הוספת משתמש
        public bool AddUser(UserDTO userDTO)
        {
            User newUser = new User();
            newUser.FirstName = userDTO.FirstName;
            newUser.LastName = userDTO.LastName;
            newUser.Email = userDTO.Email;
            newUser.Role = userDTO.Role;
            newUser.Password = GetMD5(userDTO.Password);
            m_db.User.Add(newUser);
            int c = m_db.SaveChanges();
            return c > 0;
        }

        //בדיקה האם קיים מייל במערכת
        public bool CheckEmail(string Email)
        {
            int count = 0;
            try
            {
                count = m_db.User.Where(u => u.Email == Email).Count();
            }
            catch
            {
                return false;
            }
            return count == 1;
        }


        //מחזיר רשימת משתמשים
        public List<User> GetAllUsers()
        {
            return m_db.User.ToList();
        }

        
        //מחזיר משתמש לפי מייל
        public User GetSingleUserByMail(string mail)
        {

            return m_db.User.Where(user => user.Email == mail).FirstOrDefault();
        }
       
        //JWT עדכון משתמש על פי
        public ResponseDTO UpdateUser(UserDTO userToUpdate)
        {
            User UserFromDB = GetUserByJWT();
            if (UserFromDB == null)
            {
                return new ResponseDTO{ Status=StatusCode.Error,StatusText=$"User {userToUpdate.FirstName+" "+userToUpdate.LastName} not found in DB"};
            }
            UserFromDB.FirstName = userToUpdate.FirstName;
            UserFromDB.LastName = userToUpdate.LastName;
            UserFromDB.Email = userToUpdate.Email;
            UserFromDB.Role = userToUpdate.Role;
            if (UserFromDB.Password != userToUpdate.Password && userToUpdate.Password != null)
            {
                UserFromDB.Password = GetMD5(userToUpdate.Password);
            }
            int c = m_db.SaveChanges();
            if (c > 0)
            {
                return new ResponseDTO{Status = StatusCode.Success};
            }
            return new ResponseDTO{ Status=StatusCode.Error,StatusText = $"Failed when trying save changes"};
        }

        //JWT מחיקת משתמש על פי
        public ResponseDTO DeleteUser()
        {
            User UserToDelete = GetUserByJWT();
            if (UserToDelete==null)
            {
                return new ResponseDTO {Status = StatusCode.Error,StatusText = $"User not found in DB"};
            }
            m_db.User.Remove(UserToDelete);
            int c = m_db.SaveChanges();
            if (c > 0)
            {
                return new ResponseDTO{Status = StatusCode.Success};
            }
            return new ResponseDTO{Status = StatusCode.Error,StatusText = $"Failed when trying save changes"};
        }

        //מחיקת משתמש מוגבל למנהל
        public ResponseDTO DeleteUserForAdmin(int id)
        {
            User UserToDelete = GetUserById(id);
            if (UserToDelete == null)
            {
                return new ResponseDTO { Status = StatusCode.Error, StatusText = $"User not found in DB" };
            }
            m_db.User.Remove(UserToDelete);
            int c = m_db.SaveChanges();
            if (c > 0)
            {
                return new ResponseDTO { Status = StatusCode.Success };
            }
            return new ResponseDTO { Status = StatusCode.Error, StatusText = $"Failed when trying save changes" };
        }


        //הצפנה MD5 
        private string GetMD5(string input) 
        {
            using (var md5 = MD5.Create())
            {
                var result = md5.ComputeHash(Encoding.ASCII.GetBytes(input));
                var strResult = BitConverter.ToString(result);
                return strResult.Replace("-", "");
            }
        }

        //בדיקת הזדאות
        public User GetUser(string email, string password)
        {
            string passwordAfterMD5 = GetMD5(password);
            return m_db.User.Where(user => user.Email.ToLower() == email.ToLower() && user.Password == passwordAfterMD5).FirstOrDefault();
        }
    }
}
