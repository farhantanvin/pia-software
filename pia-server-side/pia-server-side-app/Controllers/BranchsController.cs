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
    public class BranchsController : ControllerBase
    {
        private readonly IBranchRepository _branchRepository;

        public BranchsController(IBranchRepository branchRepository)
        {
            _branchRepository = branchRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Branch>> GetBranchs()
        {
            return await _branchRepository.Get();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Branch>> GetBranchTypes(int id) => await _branchRepository.Get(id);

        [HttpPost]
        public async Task<ActionResult<Branch>> PostBranchTypes([FromBody] Branch branch)
        {
            var newBranch = await _branchRepository.Create(branch);
            return CreatedAtAction(nameof(GetBranchs), new { id = newBranch.Id }, newBranch);

        }

        [HttpPut]
        public async Task<ActionResult<Branch>> PutBranchs([FromBody] Branch branch)
        {
            //if (id != accountType.Id)
            // {
            //    return BadRequest();
            //  }

            await _branchRepository.Upadate(branch);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var branchToDelete = await _branchRepository.Get(id);
            if (branchToDelete == null)
                return NotFound();

            await _branchRepository.Delete(branchToDelete.Id);
            return NoContent();
        }
    }
}
