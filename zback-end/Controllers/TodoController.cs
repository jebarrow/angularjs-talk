using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using final.Services;
using final.Models;

namespace final.Controllers
{
    [Route("api/[controller]")]
    public class ToDoController : Controller
    {
        private readonly IToDoService _toDoService;

        public ToDoController(IToDoService toDoService)
        {
            _toDoService = toDoService;
        }

        // GET: api/Todo
        [HttpGet]
        public IEnumerable<ToDo> Get()
        {
            return _toDoService.GetAll();
        }

        // GET: api/Todo/5
        [HttpGet("{id}")]
        public IActionResult Get(Guid? id)
        {
            if (!id.HasValue)
            {
                return this.BadRequest();
            }
            var todo = _toDoService.GetById(id.Value);
            if (null == todo)
            {
                return this.NotFound();
            }
            return this.Ok(todo);
        }

        // POST: api/Todo/new
        [HttpPost("{_id}")]
        public IActionResult Post(string _id, [FromBody]ToDo value)
        {
             if (!_toDoService.Validate(value))
            {
                return this.BadRequest();
            }
            var todo = _toDoService.Create(value);
            return this.Ok(todo);
        }

        // PUT: api/Todo/5
        [HttpPut("{id}")]
        public IActionResult Put(Guid? id, [FromBody]ToDo value)
        {
            if (!id.HasValue)
            {
                return this.BadRequest();
            }
            value.Id = id.Value;
            if (!_toDoService.Update(value))
            {
                return this.StatusCode(500);
            }
            return this.Ok();
        }

        // DELETE: api/Todo/5
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid? id)
        {
            if (!id.HasValue)
            {
                return this.BadRequest();
            }
            var item = _toDoService.GetById(id.Value);
            if (item == null)
            {
                return this.NotFound();
            }
            _toDoService.Remove(id.Value);
            return this.Ok();
        }
    }
}
