namespace Project99.Server.Repositories;

public interface IRepository<T>
{
    T Get(int id);
    T[] Get();
    int Add(T entity);
    bool Update(T entity);
    bool Delete(T entity);
}
