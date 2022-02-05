using pia_server_side_app.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pia_server_side_app.Repositories.Interfaces
{
    public interface ISupplierRepository
    {
        Task<IEnumerable<Supplier>> Get();
        Task<Supplier> Get(int id);
        Task<Supplier> Create(Supplier supplier);
        Task Upadate(Supplier supplier);
        Task Delete(int id);
    }
}
