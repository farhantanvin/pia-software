using pia_server_side_app.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pia_server_side_app.Repositories.Interfaces
{
    public interface IBrandRepository
    {
        Task<IEnumerable<Brand>> Get();
        Task<Brand> Get(int id);
        Task<Brand> Create(Brand brand);
        Task Upadate(Brand brand);
        Task Delete(int id);
    }
}
