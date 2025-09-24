using System;
using System.Collections.Generic;

namespace contosopizza.Models
{
    public class Conversation
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public virtual required ICollection<Message> Messages { get; set; }

    }

    public class Message
    {
        public int Id { get; set; }
        public required string Content { get; set; }

        public bool IsUser { get; set; }
        public int ConversationId { get; set; }
       public string CreatedAt { get; set; } = DateTime.Now.ToString("dd-MM-yy HH:mm");


       
    }
}
