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
    public class BranchRepository : IBranchRepository
    {
        private readonly ApplicationDbContext _context;

        public BranchRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Branch> Create(Branch branch)
        {
            _context.Branchs.Add(branch);
            await _context.SaveChangesAsync();
            return branch;
        }

        public async Task Delete(int id)
        {
            var branchToDelete = await _context.Branchs.FindAsync(id);
            _context.Branchs.Remove(branchToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Branch>> Get()
        {
            return await _context.Branchs.ToListAsync();
        }

        public async Task<Branch> Get(int id)
        {
            return await _context.Branchs.FindAsync(id);
        }

        public async Task Upadate(Branch branch)
        {
            _context.Entry(branch).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
