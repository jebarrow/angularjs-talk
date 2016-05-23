namespace final.Models
{
    public interface IObjectWithId<T>
    {
        T Id { get; set; }
    }
}