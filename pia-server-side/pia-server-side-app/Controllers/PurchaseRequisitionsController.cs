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
    public class PurchaseRequisitionsController : ControllerBase
    {
        private readonly IPurchaseRequisitionRepository _purchaseRequisitionRepository;

        public PurchaseRequisitionsController(IPurchaseRequisitionRepository purchaseRequisitionRepository)
        {
            _purchaseRequisitionRepository = purchaseRequisitionRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<PurchaseRequisition>> GetPurchaseRequisitions()
        {
            return await _purchaseRequisitionRepository.Get();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PurchaseRequisition>> GetPurchaseRequisitions(int id) => await _purchaseRequisitionRepository.Get(id);

        [HttpPost]
        public async Task<ActionResult<PurchaseRequisition>> PostPurchaseRequisitions(PurchaseRequisition purchaseRequisition)
        {
           var newPurchaseRequisition = await _purchaseRequisitionRepository.Create(purchaseRequisition);
            // return CreatedAtAction(nameof(GetPurchaseRequisitions), new { id = newPurchaseRequisition.Id }, newPurchaseRequisition);
            return Ok("success");
            //Ok(purchaseRequisition);
        }


        [HttpPut]
        public async Task<ActionResult<PurchaseRequisition>> PutPurchaseRequisitions([FromBody] PurchaseRequisition purchaseRequisition)
        {

            await _purchaseRequisitionRepository.Upadate(purchaseRequisition);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var purchaseRequisitionToDelete = await _purchaseRequisitionRepository.Get(id);
            if (purchaseRequisitionToDelete == null)
                return NotFound();

            await _purchaseRequisitionRepository.Delete(purchaseRequisitionToDelete.Id);
            return NoContent();
        }
    }
}
