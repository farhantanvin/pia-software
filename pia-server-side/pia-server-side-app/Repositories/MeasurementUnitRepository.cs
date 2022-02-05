using Microsoft.EntityFrameworkCore;
using pia_server_side_app.Models;
using pia_server_side_app.Models.Contexts;
using pia_server_side_app.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pia_server_side_app.Repositories
{
    public class MeasurementUnitRepository : IMeasurementUnitRepository
    {
        private readonly ApplicationDbContext _context;

        public MeasurementUnitRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<MeasurementUnit> Create(MeasurementUnit measurementUnit)
        {
            _context.MeasurementUnits.Add(measurementUnit);
            await _context.SaveChangesAsync();
            return measurementUnit;
        }

        public async Task Delete(int id)
        {
            var measurementUnitToDelete = await _context.MeasurementUnits.FindAsync(id);
            _context.MeasurementUnits.Remove(measurementUnitToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<MeasurementUnit>> Get()
        {
            return await _context.MeasurementUnits.ToListAsync();
        }

        public async Task<MeasurementUnit> Get(int id)
        {
            return await _context.MeasurementUnits.FindAsync(id);
        }

        public async Task Upadate(MeasurementUnit measurementUnit)
        {
            _context.Entry(measurementUnit).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
