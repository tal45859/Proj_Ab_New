using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjAbNew.Data.Entities
{
    [Table("Post")]
    public class Post
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Column("Header")]
        public string Header { get; set; }

        [Column("About")]
        public string About { get; set; }
    }
}
