using pia_server_side_app.Models.common;
using System;
using System.ComponentModel.DataAnnotations;

namespace pia_server_side_app.Models
{
    public class Brand : BaseEntity
    {
        public int Id { get; set; }
        public int AccountLedgerId { get; set; }

        [StringLength(200)]
        [Required]
        public string BrandName { get; set; }
        public Boolean Status { get; set; }
    }
}
