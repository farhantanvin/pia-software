using pia_server_side_app.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pia_server_side_app.Repositories.Interfaces
{
    public interface IConditionRepository
    {
        Task<IEnumerable<Condition>> Get();
        Task<Condition> Get(int id);
        Task<Condition> Create(Condition condition);
        Task Upadate(Condition condition);
        Task Delete(int id);
    }
}
