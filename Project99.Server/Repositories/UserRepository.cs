using Project99.Server.Repositories.Db;
using Project99.Server.Repositories.Models;

namespace Project99.Server.Repositories
{
    public class UserRepository(AppDbContext appDbContext) : IRepository<User>
    {
        private readonly AppDbContext _appDbContext = appDbContext;

        public int Add(User entity)
        {
            try
            {
                var result = _appDbContext.Users.Add(entity);
                _appDbContext.SaveChanges();
                return result.Entity.Id;
            }
            catch
            {
                throw;
            }
        }

        public bool Delete(User entity)
        {
            try
            {
                var result = _appDbContext.Users.Remove(entity);
                _appDbContext.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public User Get(int id)
        {
            try
            {
                return _appDbContext.Users.First(user => user.Id == id);
            }
            catch (Exception ex)
            {
                throw new Exception("User does not exists");
            }

        }

        public User[] Get()
        {
            try
            {
                return [.. _appDbContext.Users];
            }
            catch (Exception)
            {

                throw;
            }
        }

        public User[] GetByCatagory(int id)
        {
            throw new NotImplementedException();
        }

        public bool Update(User entity)
        {
            try
            {
                var result = _appDbContext.Users.Update(entity);
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
