using Project99.Server.Repositories.Db;
using Project99.Server.Repositories.Models;

namespace Project99.Server.Repositories
{
    public class TicketRepository(AppDbContext appDbContext) : IRepository<Ticket>
    {
        private readonly AppDbContext _appDbContext = appDbContext;

        public int Add(Ticket entity)
        {
            try
            {
                var result = _appDbContext.Tickets.Add(entity);
                _appDbContext.SaveChanges();
                return result.Entity.Id;
            }
            catch
            {
                throw;
            }
        }

        public bool Delete(Ticket entity)
        {
            try
            {
                var result = _appDbContext.Tickets.Remove(entity);
                _appDbContext.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public Ticket Get(int id)
        {
            try
            {
                return _appDbContext.Tickets.First(ticket => ticket.Id == id);
            }
            catch (Exception ex)
            {
                throw new Exception("Ticket does not exist");
            }

        }

        public Ticket[] Get()
        {
            try
            {
                return _appDbContext.Tickets.ToArray();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public bool Update(Ticket entity)
        {
            try
            {
                var result = _appDbContext.Tickets.Update(entity);
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
