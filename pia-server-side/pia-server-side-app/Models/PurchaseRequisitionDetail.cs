using pia_server_side_app.Models.common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace pia_server_side_app.Models
{
    public class PurchaseRequisitionDetail : BaseEntity
    {
        [Key]
        public int DetailId { get; set; }
        public int Quantity { get; set; }
        public int RequisitionPrice { get; set; }
        public int Unit { get; set; }
        public int BrandId { get; set; }

        [StringLength(200)]
        public string ModelNumber { get; set; }

        public int AccountLedgerId { get; set; }

        public Boolean Status { get; set; }

        [ForeignKey("PurchaseRequisition")]
        public int PurchaseRequisitionId { get; set; }

        public virtual PurchaseRequisition PurchaseRequisition { get;set; }
    }
}
