using pia_server_side_app.Models.common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace pia_server_side_app.Models
{
    public class PurchaseRequisition : BaseEntity
    {
        public int Id { get; set; }

        public int BranchId { get; set; }
        //public DateTime RequisitionDate { get; set; }

       // public int DepartmentTypeId { get; set; }

      //  [StringLength(200)]
       // public string Remarks { get; set; }

       // public DateTime DeliveryDate { get; set; }

       // public Boolean Status { get; set; }

        public virtual List<PurchaseRequisitionDetail> PurchaseRequisitionDetails { get; set; } = new List<PurchaseRequisitionDetail>(); 
    }
}
