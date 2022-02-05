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
    public class PurchaseRequisitionRepository: IPurchaseRequisitionRepository
    {
        private readonly ApplicationDbContext _context;
        public PurchaseRequisitionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<PurchaseRequisition> Create(PurchaseRequisition purchaseRequisition)
        {
            _context.PurchaseRequisitions.Add(purchaseRequisition);
            await _context.SaveChangesAsync();
            return purchaseRequisition;
        }

        public async Task Delete(int id)
        {
            var purchaseRequisitionToDelete = await _context.PurchaseRequisitions.FindAsync(id);
            _context.PurchaseRequisitions.Remove(purchaseRequisitionToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<PurchaseRequisition>> Get()
        {
            return await _context.PurchaseRequisitions.ToListAsync();
        }

        public async Task<PurchaseRequisition> Get(int id)
        {
            return await _context.PurchaseRequisitions.FindAsync(id);
        }

        public async Task Upadate(PurchaseRequisition purchaseRequisition)
        {
            _context.Entry(purchaseRequisition).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
