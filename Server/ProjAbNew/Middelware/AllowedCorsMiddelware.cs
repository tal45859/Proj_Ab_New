using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjAbNew.Middelware
{
    public class AllowedCorsMiddelware
    {
        private readonly RequestDelegate _next;
        public AllowedCorsMiddelware(RequestDelegate next)
        {
            _next = next;
        }
        //אני אקבל את הבקשה מהלקוח עם כל המידע של הבקשה
        public async Task Invoke(HttpContext context)
        {
            //פתרון לבעית ה CORS
            //אחראי לשמות השרתים שמותר להם לעבור דרכי
            //אחראי לשמות השרתים שמותר להם לעבור דרכי
            context.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
            //HEADERS שהשרת יוכל לקבל את כל סוגי ה 
            //HEADERS אם לא נרצה  מסווים אז לא נכתוב אותו בסוגרים
            context.Response.Headers.Add("Access-Control-Allow-Headers", new[] { "*" });

            //אנחנו נחליט בסוגרים איזה מטודה אנחנו רוצים *זה כל המתודות
            //  {"Put"}, {"Post"},{"GET"}מתודוץ
            //או כמה ביחד בלי אחד 
            context.Response.Headers.Add("Access-Control-Allow-Origin-Methods", new[] { "*" });

            //לכיוןן השרת אבל לפני השרת
            //BEFORE SERVER
            await _next(context);
            //חזרה מהשרת AFTER SERVER
        }
    }
}
