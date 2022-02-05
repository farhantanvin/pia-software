using pia_server_side_app.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pia_server_side_app.Repositories.Interfaces
{
   public interface IMeasurementUnitRepository
    {
        Task<IEnumerable<MeasurementUnit>> Get();
        Task<MeasurementUnit> Get(int id);
        Task<MeasurementUnit> Create(MeasurementUnit measurementUnit);
        Task Upadate(MeasurementUnit measurementUnit);
        Task Delete(int id);
    }
}
