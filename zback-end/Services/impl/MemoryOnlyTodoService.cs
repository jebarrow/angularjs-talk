using System;
using System.Collections.Generic;
using final.Models;

namespace final.Services.impl
{
    public class MemoryOnlyToDoService : IToDoService
    {
        private readonly IDictionary<Guid, ToDo> _todos;

        public MemoryOnlyToDoService(IDictionary<Guid, ToDo> todos)
        {
            _todos = todos;
        }
 
        public IEnumerable<ToDo> GetAll()
        {
            return _todos.Values;
        }

        public ToDo GetById(Guid id)
        {
            ToDo value = null;
            _todos.TryGetValue(id, out value);
            return value;
        }

        public ToDo Create(ToDo value)
        {
            value.Id = Guid.NewGuid();
            _todos.Add(value.Id, value);
            return _todos[value.Id];
        }

        public bool Update(ToDo value)
        {
            if (!_todos.ContainsKey(value.Id))
            {
                return false;
            }
            _todos[value.Id] = value;
            return true;
        }

        public void Remove(Guid id)
        {
            if (_todos.ContainsKey(id))
            {
                _todos.Remove(id);
            }
        }

        public bool Validate(ToDo value)
        {
            if (string.IsNullOrWhiteSpace(value.Title)) return false;
            if (string.IsNullOrWhiteSpace(value.Description)) return false;
            if (value.StartDate > value.StopDate) return false;
            return true;
        }
    }
}