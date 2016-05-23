using System;
using System.Collections.Generic;
using final.Models;

namespace final.Services
{
    public interface IToDoService
    {
        IEnumerable<ToDo> GetAll();
        ToDo GetById(Guid id);
        ToDo Create(ToDo value);
        bool Update(ToDo value);
        void Remove(Guid id);
        bool Validate(ToDo value);
    }
}