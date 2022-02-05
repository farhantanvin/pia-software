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
    public class SupplierRepository : ISupplierRepository
    {
        private readonly ApplicationDbContext _context;

        public SupplierRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Supplier> Create(Supplier supplier)
        {
            _context.Suppliers.Add(supplier);
            await _context.SaveChangesAsync();
            return supplier;
        }

        public async Task Delete(int id)
        {
            var SupplierToDelete = await _context.Suppliers.FindAsync(id);
            _context.Suppliers.Remove(SupplierToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Supplier>> Get()
        {
            return await _context.Suppliers.ToListAsync();
        }

        public async Task<Supplier> Get(int id)
        {
            return await _context.Suppliers.FindAsync(id);
        }

        public async Task Upadate(Supplier supplier)
        {
            _context.Entry(supplier).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
