using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pia_server_side_app.Models;
using pia_server_side_app.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pia_server_side_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuppliersController : ControllerBase
    {
        private readonly ISupplierRepository _supplierRepository;

        public SuppliersController(ISupplierRepository supplierRepository)
        {
            _supplierRepository = supplierRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Supplier>> GetSuppliers()
        {
            return await _supplierRepository.Get();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Supplier>> GetSuppliers(int id)
        {
            return await _supplierRepository.Get(id);
        }

        [HttpPost]
        public async Task<ActionResult<Supplier>> PostSuppliers([FromBody] Supplier supplier)
        {
            var newSupplier = await _supplierRepository.Create(supplier);
            return CreatedAtAction(nameof(GetSuppliers), new { id = newSupplier.Id }, newSupplier);

        }

        [HttpPut]
        public async Task<ActionResult<Supplier>> PutSuppliers([FromBody] Supplier supplier)
        {
            //if (id != supplier.Id)
            // {
            //   return BadRequest();
            //  }

            await _supplierRepository.Upadate(supplier);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var supplierToDelete = await _supplierRepository.Get(id);
            if (supplierToDelete == null)
                return NotFound();

            await _supplierRepository.Delete(supplierToDelete.Id);
            return NoContent();
        }
    }
}
