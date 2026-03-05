export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // ============================================
    // COMMENTS API
    // ============================================
    if (url.pathname === '/api/comments' && request.method === 'GET') {
      try {
        const comments = await env['BCE-COMMENTS'].list();
        const commentData = [];
        
        for (const key of comments.keys) {
          const value = await env['BCE-COMMENTS'].get(key.name);
          if (value) {
            commentData.push(JSON.parse(value));
          }
        }
        
        commentData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        return new Response(JSON.stringify(commentData), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch comments' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    if (url.pathname === '/api/comments' && request.method === 'POST') {
      try {
        const data = await request.json();
        const comment = {
          id: Date.now().toString(),
          name: data.name,
          message: data.message,
          timestamp: data.timestamp || new Date().toISOString()
        };
        
        await env['BCE-COMMENTS'].put(`comment_${comment.id}`, JSON.stringify(comment));
        
        // Send email notification for new comment
        await sendEmailNotification(env, 'New Comment Posted', 
          `Name: ${comment.name}\nMessage: ${comment.message}\nTime: ${comment.timestamp}`);
        
        return new Response(JSON.stringify({ success: true, comment }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to post comment' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // ============================================
    // CONTACT API
    // ============================================
    if (url.pathname === '/api/contact' && request.method === 'POST') {
      try {
        const data = await request.json();
        const contactId = Date.now().toString();
        const contactData = {
          id: contactId,
          ...data,
          timestamp: data.timestamp || new Date().toISOString()
        };
        
        await env['BCE-CONTACTS'].put(`contact_${contactId}`, JSON.stringify(contactData));
        
        // Send email notification for new contact
        await sendEmailNotification(env, 'New Contact Form Submission',
          `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\nType: ${data.inquiryType}\nMessage: ${data.message}`);
        
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to submit contact form' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // ============================================
    // LIVE CHAT API
    // ============================================
    if (url.pathname === '/api/chat' && request.method === 'POST') {
      try {
        const data = await request.json();
        const messageId = Date.now().toString();
        const chatMessage = {
          id: messageId,
          conversationId: data.conversationId,
          message: data.message,
          isUser: data.isUser,
          timestamp: data.timestamp || new Date().toISOString(),
          read: false
        };
        
        await env['BCE-SESSIONS'].put(`chat_${data.conversationId}_${messageId}`, JSON.stringify(chatMessage));
        
        // If it's a user message, send email notification
        if (data.isUser) {
          await sendEmailNotification(env, 'New Live Chat Message',
            `Conversation: ${data.conversationId}\nMessage: ${data.message}\nTime: ${chatMessage.timestamp}\n\nReply at: https://bcesoberliving.com/admin-chat`);
        }
        
        return new Response(JSON.stringify({ success: true, messageId }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to send chat message' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // Get chat history
    if (url.pathname.startsWith('/api/chat/') && request.method === 'GET') {
      try {
        const conversationId = url.pathname.split('/').pop();
        const prefix = `chat_${conversationId}_`;
        const messages = await env['BCE-SESSIONS'].list({ prefix });
        const chatData = [];
        
        for (const key of messages.keys) {
          const value = await env['BCE-SESSIONS'].get(key.name);
          if (value) {
            chatData.push(JSON.parse(value));
          }
        }
        
        chatData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        
        return new Response(JSON.stringify(chatData), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify([]), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // Poll for new agent messages
    if (url.pathname.startsWith('/api/chat/poll/') && request.method === 'GET') {
      try {
        const conversationId = url.pathname.split('/').pop();
        const prefix = `chat_${conversationId}_`;
        const messages = await env['BCE-SESSIONS'].list({ prefix });
        const newMessages = [];
        
        for (const key of messages.keys) {
          const value = await env['BCE-SESSIONS'].get(key.name);
          if (value) {
            const msg = JSON.parse(value);
            if (!msg.isUser && !msg.read) {
              newMessages.push(msg);
              // Mark as read
              msg.read = true;
              await env['BCE-SESSIONS'].put(key.name, JSON.stringify(msg));
            }
          }
        }
        
        return new Response(JSON.stringify({ newMessages }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ newMessages: [] }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // ============================================
    // ADMIN API
    // ============================================
    
    // Verify admin token
    function verifyAdmin(request) {
      const auth = request.headers.get('Authorization');
      if (!auth || !auth.startsWith('Bearer ')) return false;
      // Token is the hashed password - in production use proper JWT
      return auth.length > 20;
    }

    // Public updates listing (no auth required)
    if (url.pathname === '/api/updates' && request.method === 'GET') {
      try {
        const updates = await env['BCE-SESSIONS'].list({ prefix: 'update_' });
        const updateData = [];
        for (const key of updates.keys) {
          const value = await env['BCE-SESSIONS'].get(key.name);
          if (value) updateData.push(JSON.parse(value));
        }
        updateData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        return new Response(JSON.stringify(updateData), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify([]), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // Get all updates (admin)
    if (url.pathname === '/api/admin/updates' && request.method === 'GET') {
      if (!verifyAdmin(request)) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      try {
        const updates = await env['BCE-SESSIONS'].list({ prefix: 'update_' });
        const updateData = [];
        
        for (const key of updates.keys) {
          const value = await env['BCE-SESSIONS'].get(key.name);
          if (value) {
            updateData.push(JSON.parse(value));
          }
        }
        
        updateData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        return new Response(JSON.stringify(updateData), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify([]), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // Add update (admin)
    if (url.pathname === '/api/admin/updates' && request.method === 'POST') {
      if (!verifyAdmin(request)) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      try {
        const data = await request.json();
        const updateId = Date.now().toString();
        const update = {
          id: updateId,
          author: data.author,
          date: data.date,
          title: data.title,
          content: data.content,
          timestamp: data.timestamp || new Date().toISOString()
        };
        
        await env['BCE-SESSIONS'].put(`update_${updateId}`, JSON.stringify(update));
        
        return new Response(JSON.stringify({ success: true, update }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to add update' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // Edit update (admin)
    if (url.pathname.startsWith('/api/admin/updates/') && request.method === 'PUT') {
      if (!verifyAdmin(request)) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      try {
        const updateId = url.pathname.split('/').pop();
        const data = await request.json();
        const existingData = await env['BCE-SESSIONS'].get(`update_${updateId}`);
        if (!existingData) {
          return new Response(JSON.stringify({ error: 'Update not found' }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
        const update = JSON.parse(existingData);
        if (data.author !== undefined) update.author  = data.author;
        if (data.date    !== undefined) update.date    = data.date;
        if (data.title   !== undefined) update.title   = data.title;
        if (data.content !== undefined) update.content = data.content;
        update.editedAt = new Date().toISOString();
        await env['BCE-SESSIONS'].put(`update_${updateId}`, JSON.stringify(update));
        return new Response(JSON.stringify({ success: true, update }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to update' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // Delete update (admin)
    if (url.pathname.startsWith('/api/admin/updates/') && request.method === 'DELETE') {
      if (!verifyAdmin(request)) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      try {
        const updateId = url.pathname.split('/').pop();
        await env['BCE-SESSIONS'].delete(`update_${updateId}`);
        
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to delete update' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // Delete comment (admin)
    if (url.pathname.startsWith('/api/admin/comments/') && request.method === 'DELETE') {
      if (!verifyAdmin(request)) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      try {
        const commentId = url.pathname.split('/').pop();
        await env['BCE-COMMENTS'].delete(`comment_${commentId}`);
        
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to delete comment' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // Edit comment (admin)
    if (url.pathname.startsWith('/api/admin/comments/') && request.method === 'PUT') {
      if (!verifyAdmin(request)) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      try {
        const commentId = url.pathname.split('/').pop();
        const data = await request.json();
        
        // Get existing comment
        const existingData = await env['BCE-COMMENTS'].get(`comment_${commentId}`);
        let comment;
        
        if (existingData) {
          comment = JSON.parse(existingData);
          comment.name = data.name || comment.name;
          comment.message = data.message || comment.message;
          if (data.reply !== undefined) comment.reply = data.reply;
          comment.editedAt = new Date().toISOString();
        } else {
          // Create new if doesn't exist
          comment = {
            id: commentId,
            name: data.name,
            message: data.message,
            timestamp: new Date().toISOString(),
            editedAt: new Date().toISOString()
          };
        }
        
        await env['BCE-COMMENTS'].put(`comment_${commentId}`, JSON.stringify(comment));
        
        return new Response(JSON.stringify({ success: true, comment }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to edit comment' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // ============================================
    // AGENT REPLY API (for responding to chats via email/SMS)
    // ============================================
    if (url.pathname === '/api/agent/reply' && request.method === 'POST') {
      try {
        const data = await request.json();
        const messageId = Date.now().toString();
        const chatMessage = {
          id: messageId,
          conversationId: data.conversationId,
          message: data.message,
          isUser: false,
          timestamp: new Date().toISOString(),
          read: false
        };
        
        await env['BCE-SESSIONS'].put(`chat_${data.conversationId}_${messageId}`, JSON.stringify(chatMessage));
        
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to send reply' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // Fall through to static assets for non-API routes
    return env.ASSETS.fetch(request);
  }
};

// Email notification helper (uses Resend API)
async function sendEmailNotification(env, subject, body) {
  try {
    const sent = false;

    if (env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'BCE Sober Living <william@bcesoberliving.com>',
          to: ['william@bcesoberliving.com'],
          subject: `[BCE] ${subject}`,
          text: body
        })
      });
    }

    // Store notification in KV for backup
    const notifId = Date.now().toString();
    await env['BCE-SESSIONS'].put(`notif_${notifId}`, JSON.stringify({
      subject,
      body,
      timestamp: new Date().toISOString(),
      sent: !!env.RESEND_API_KEY
    }));

  } catch (error) {
    console.error('Email notification error:', error);
  }
}
