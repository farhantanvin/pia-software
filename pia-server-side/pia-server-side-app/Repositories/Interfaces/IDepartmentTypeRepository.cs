using pia_server_side_app.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pia_server_side_app.Repositories.Interfaces
{
    public interface IDepartmentTypeRepository
    {
        Task<IEnumerable<DepartmentType>> Get();
        Task<DepartmentType> Get(int id);
        Task<DepartmentType> Create(DepartmentType departmentType);
        Task Upadate(DepartmentType departmentType);
        Task Delete(int id);
    }
}
