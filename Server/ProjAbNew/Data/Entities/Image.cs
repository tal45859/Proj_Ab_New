using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjAbNew.Data.Entities
{
    [Table("Image")]
    public class Image
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Column("Img")]
        public string Img { get; set; }

        [Column("PostId")]
        public int PostId { get; set; }
    }
}
