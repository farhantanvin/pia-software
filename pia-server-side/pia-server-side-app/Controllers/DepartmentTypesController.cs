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
    public class DepartmentTypesController : ControllerBase
    {
        private readonly IDepartmentTypeRepository _departmentTypeRepository;

        public DepartmentTypesController(IDepartmentTypeRepository departmentTypeRepository)
        {
            _departmentTypeRepository = departmentTypeRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<DepartmentType>> GetDepartmentTypes()
        {
            return await _departmentTypeRepository.Get();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DepartmentType>> GetDepartmentTypes(int id) => await _departmentTypeRepository.Get(id);

        [HttpPost]
        public async Task<ActionResult<DepartmentType>> PostDepartmentTypes([FromBody] DepartmentType departmentType)
        {
            var newDepartmentType = await _departmentTypeRepository.Create(departmentType);
            return CreatedAtAction(nameof(GetDepartmentTypes), new { id = newDepartmentType.Id }, newDepartmentType);

        }

        [HttpPut]
        public async Task<ActionResult<DepartmentType>> PutAccountTypes([FromBody] DepartmentType departmentType)
        {
            //if (id != departmentType.Id)
            // {
            //    return BadRequest();
            //  }

            await _departmentTypeRepository.Upadate(departmentType);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var departmentTypeToDelete = await _departmentTypeRepository.Get(id);
            if (departmentTypeToDelete == null)
                return NotFound();

            await _departmentTypeRepository.Delete(departmentTypeToDelete.Id);
            return NoContent();

        }
    }
}

