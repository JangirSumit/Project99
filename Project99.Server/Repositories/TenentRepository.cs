using Project99.Server.Repositories.Db;
using Project99.Server.Repositories.Models;

namespace Project99.Server.Repositories
{
    public class TenentRepository(AppDbContext appDbContext) : IRepository<Tenent>
    {
        private readonly AppDbContext _appDbContext = appDbContext;

        public int Add(Tenent entity)
        {
            try
            {
                var result = _appDbContext.Tenents.Add(entity);
                _appDbContext.SaveChanges();
                return result.Entity.Id;
            }
            catch
            {
                throw;
            }
        }

        public bool Delete(Tenent entity)
        {
            try
            {
                var result = _appDbContext.Tenents.Remove(entity);
                _appDbContext.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public Tenent Get(int id)
        {
            try
            {
                return _appDbContext.Tenents.First(ticket => ticket.Id == id);
            }
            catch (Exception ex)
            {
                throw new Exception("Tenent does not exist");
            }

        }

        public Tenent[] Get()
        {
            try
            {
                return _appDbContext.Tenents.ToArray();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public Tenent[] GetByCatagory(int id)
        {
            throw new NotImplementedException();
        }

        public bool Update(Tenent entity)
        {
            try
            {
                var result = _appDbContext.Tenents.Update(entity);
                _appDbContext.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
