using ProjAbNew.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjAbNew.Data.DTO
{
    public class ImageDTO
    {
        public int Id { get; set; }
        public string Img { get; set; }
        public int PostId { get; set; }
    }
}
