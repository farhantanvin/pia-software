using pia_server_side_app.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pia_server_side_app.Repositories.Interfaces
{
    public interface IPurchaseRequisitionRepository
    {
        Task<IEnumerable<PurchaseRequisition>> Get();
        Task<PurchaseRequisition> Get(int id);
        Task<PurchaseRequisition> Create(PurchaseRequisition purchaseRequisition);
        Task Upadate(PurchaseRequisition purchaseRequisition);
        Task Delete(int id);
    }
}
