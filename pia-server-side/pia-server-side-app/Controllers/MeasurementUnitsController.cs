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
    public class MeasurementUnitsController : ControllerBase
    {
        private readonly IMeasurementUnitRepository _measurementUnitRepository;

        public MeasurementUnitsController(IMeasurementUnitRepository measurementUnitRepository)
        {
            _measurementUnitRepository = measurementUnitRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<MeasurementUnit>> GetMeasurementUnits()
        {
            return await _measurementUnitRepository.Get();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MeasurementUnit>> GetMeasurementUnits(int id) => await _measurementUnitRepository.Get(id);

        [HttpPost]
        public async Task<ActionResult<MeasurementUnit>> PostMeasurementUnits([FromBody] MeasurementUnit measurementUnit)
        {
            var newMeasurementUnit = await _measurementUnitRepository.Create(measurementUnit);
            return CreatedAtAction(nameof(GetMeasurementUnits), new { id = newMeasurementUnit.Id }, newMeasurementUnit);

        }

        [HttpPut]
        public async Task<ActionResult<MeasurementUnit>> PutMeasurementUnits([FromBody] MeasurementUnit measurementUnit)
        {
            //if (id != measurementUnit.Id)
            // {
            //    return BadRequest();
            //  }

            await _measurementUnitRepository.Upadate(measurementUnit);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var measurementUnitToDelete = await _measurementUnitRepository.Get(id);
            if (measurementUnitToDelete == null)
                return NotFound();

            await _measurementUnitRepository.Delete(measurementUnitToDelete.Id);
            return NoContent();
        }
    }
}
