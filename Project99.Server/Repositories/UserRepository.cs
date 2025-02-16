using Project99.Server.Repositories.Db;
using Project99.Server.Repositories.Models;

namespace Project99.Server.Repositories
{
    public class UserRepository : IRepository<User>
    {
        private readonly AppDbContext _appDbContext;

        public UserRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public int Add(User entity)
        {
            throw new NotImplementedException();
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
    }
}
