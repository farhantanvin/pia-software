using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pia_server_side_app.Models;
using pia_server_side_app.Repositories;
using pia_server_side_app.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pia_server_side_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConditionsController : ControllerBase
    {
        private readonly IConditionRepository _conditionRepository;

        public ConditionsController(IConditionRepository conditionRepository)
        {
            _conditionRepository = conditionRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Condition>> GetConditions()
        {
            return await _conditionRepository.Get();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Condition>> GetConditions(int id) => await _conditionRepository.Get(id);

        [HttpPost]
        public async Task<ActionResult<Condition>> PostConditions([FromBody] Condition condition)
        {
            var newCondition = await _conditionRepository.Create(condition);
            return CreatedAtAction(nameof(GetConditions), new { id = newCondition.Id }, newCondition);

        }

        [HttpPut]
        public async Task<ActionResult<Condition>> PutConditions([FromBody] Condition condition)
        {
            //if (id != condition.Id)
            // {
            //    return BadRequest();
            //  }

            await _conditionRepository.Upadate(condition);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var conditionToDelete = await _conditionRepository.Get(id);
            if (conditionToDelete == null)
                return NotFound();

            await _conditionRepository.Delete(conditionToDelete.Id);
            return NoContent();
        }
    }
}
