using pia_server_side_app.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pia_server_side_app.Repositories.Interfaces
{
    public interface IBranchRepository
    {
        Task<IEnumerable<Branch>> Get();
        Task<Branch> Get(int id);
        Task<Branch> Create(Branch branch);
        Task Upadate(Branch branch);
        Task Delete(int id);

    }
}
