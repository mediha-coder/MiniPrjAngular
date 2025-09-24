
using contosopizza.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace contosopizza.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConversationsController : ControllerBase
    {   
  

        private readonly AppDbContext _context;

        public ConversationsController(AppDbContext context)
        {
            _context = context;
        }
    
        // POST: api/Conversations

       
[HttpPost]
public async Task<IActionResult> SaveConversation([FromBody] Conversation conversation)
{
    try
    {
        if (conversation.Id == 0)
        {
            // Nouvelle conversation
            _context.Conversations.Add(conversation);
        }
        else
        {
            // Conversation existante
            var existingConversation = await _context.Conversations
                .Include(c => c.Messages)
                .FirstOrDefaultAsync(c => c.Id == conversation.Id);

            if (existingConversation == null)
            {
                return NotFound();
            }

            foreach (var message in conversation.Messages)
            {
                if (message.Id == 0)
                {
                    existingConversation.Messages.Add(message);
                }
                else
                {
                    var existingMessage = existingConversation.Messages
                        .FirstOrDefault(m => m.Id == message.Id);

                    if (existingMessage != null)
                    {
                        _context.Entry(existingMessage).CurrentValues.SetValues(message);
                    }
                    else
                    {
                    
                        existingConversation.Messages.Add(message);
                    }
                }
            }

            _context.Entry(existingConversation).CurrentValues.SetValues(conversation);
        }

        await _context.SaveChangesAsync();
        return Ok(conversation);
    }
    catch (DbUpdateException ex)
    {
        return StatusCode(500, ex.InnerException?.Message ?? ex.Message);
    }
}

        // GET: api/Conversations
        [HttpGet]

        public async Task<IActionResult> GetConversations()
        {
            var conversations = await _context.Conversations.Include(c => c.Messages).ToListAsync();
            return Ok(conversations);
        }

        // GET: api/Conversations/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetConversation(int id)
        {
            var conversation = await _context.Conversations
                .Include(c => c.Messages)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (conversation == null)
            {
                return NotFound();
            }

            return Ok(conversation);
        }

        // PUT: api/Conversations/5
[HttpPut("{id}")]

 public async Task<IActionResult> UpdateConversation(  Conversation conversation)
    {
        var existingConversation = await _context.Conversations
            .Include(c => c.Messages)
            .FirstOrDefaultAsync(c => c.Id == conversation.Id);

        if (existingConversation == null)
        {
            return NotFound();
        }

        foreach (var message in conversation.Messages)
        {  if (!existingConversation.Messages.Any(m => m.Id == message.Id && m.Content == message.Content))
        {
                   message.Id = 0; 

            message.ConversationId = conversation.Id; 
            existingConversation.Messages.Add(message);
        }
        }

        try
        {
            await _context.SaveChangesAsync();
           
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ConversationExists(conversation.Id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

         return Ok(conversation.Messages);
    }
    private bool ConversationExists(int id)
{
    return _context.Conversations.Any(e => e.Id == id);
}
  
   







        // DELETE: api/Conversations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConversation(int id)
        {
            var conversation = await _context.Conversations.FindAsync(id); // Utilisez 'Conversations'
            if (conversation == null)
            {
                return NotFound();
            }

            _context.Conversations.Remove(conversation); // Utilisez 'Conversations'
            await _context.SaveChangesAsync();

            return NoContent();
        }


    }
}

