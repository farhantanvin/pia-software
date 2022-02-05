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
    public class DepartmentTypeRepository : IDepartmentTypeRepository
    {
        private readonly ApplicationDbContext _context;

        public DepartmentTypeRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<DepartmentType> Create(DepartmentType departmentType)
        {
            _context.DepartmentTypes.Add(departmentType);
            await _context.SaveChangesAsync();
            return departmentType;
        }

        public async Task Delete(int id)
        {
            var departmentTypeToDelete = await _context.DepartmentTypes.FindAsync(id);
            _context.DepartmentTypes.Remove(departmentTypeToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<DepartmentType>> Get()
        {
            return await _context.DepartmentTypes.ToListAsync();
        }

        public async Task<DepartmentType> Get(int id)
        {
            return await _context.DepartmentTypes.FindAsync(id);
        }

        public async Task Upadate(DepartmentType departmentType)
        {
            _context.Entry(departmentType).State = EntityState.Modified;
            await _context.SaveChangesAsync();

        }
    }
}
