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
    public class BrandRepository: IBrandRepository
    {
        private readonly ApplicationDbContext _context;

        public BrandRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Brand> Create(Brand brand)
        {
            _context.Brands.Add(brand);
            await _context.SaveChangesAsync();
            return brand;
        }

        public async Task Delete(int id)
        {
            var brandToDelete = await _context.Brands.FindAsync(id);
            _context.Brands.Remove(brandToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Brand>> Get()
        {
            return await _context.Brands.ToListAsync();
        }

        public async Task<Brand> Get(int id)
        {
            return await _context.Brands.FindAsync(id);
        }

        public async Task Upadate(Brand brand)
        {
            _context.Entry(brand).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

    }
}
