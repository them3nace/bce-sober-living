// BCE SOBER LIVING - FULL FUNCTIONALITY SCRIPT
// Handles: Menu, Forms, Live Chat, Admin, Comments

(function() {
    'use strict';
    
    // API Base URL - same origin via _worker.js
    const API_BASE = '';
    
    // ============================================
    // MOBILE MENU
    // ============================================
    window.addEventListener('load', function() {
        var menuButton = document.getElementById('menuToggle');
        var menu = document.getElementById('navMenu');
        var body = document.body;
        
        if (!menuButton || !menu) return;
        
        var menuScrollY = 0;

        function closeMenu() {
            menu.classList.remove('active');
            menuButton.classList.remove('active');
            body.classList.remove('menu-open');
            body.style.top = '';
            window.scrollTo(0, menuScrollY);
        }

        function toggleMenu() {
            var isOpen = menu.classList.contains('active');
            if (isOpen) {
                closeMenu();
            } else {
                menuScrollY = window.pageYOffset;
                body.style.top = '-' + menuScrollY + 'px';
                menu.classList.add('active');
                menuButton.classList.add('active');
                body.classList.add('menu-open');
            }
        }
        
        menuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
        
        var links = menu.getElementsByTagName('a');
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', function() {
                closeMenu();
            });
        }

        document.addEventListener('click', function(e) {
            if (!menu.contains(e.target) && !menuButton.contains(e.target)) {
                if (menu.classList.contains('active')) {
                    closeMenu();
                }
            }
        });
    });
    
    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    window.addEventListener('scroll', function() {
        var navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.pageYOffset > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
    
    // ============================================
    // PAGE FADE-IN
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        document.body.style.opacity = '0';
        setTimeout(function() {
            document.body.style.transition = 'opacity 0.6s ease-in';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // ============================================
    // ADMIN PANEL FOR COMMENTS PAGE
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        if (!window.location.pathname.includes('comments')) return;

        function escapeHtml(text) {
            var div = document.createElement('div');
            div.textContent = text || '';
            return div.innerHTML;
        }

        function formatDate(ts) {
            if (!ts) return '';
            try { return new Date(ts).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); }
            catch (e) { return ts; }
        }

        function renderCommentToPage(c) {
            var dateStr  = c.date || formatDate(c.timestamp);
            var replyHtml = '';
            if (c.reply && c.reply.message) {
                replyHtml = `
                    <div class="admin-reply">
                        <div class="comment-header">
                            <span class="comment-author admin-reply-author">${escapeHtml(c.reply.name || 'BCE Admin')}</span>
                            <span class="comment-date">${escapeHtml(c.reply.date || '')}</span>
                        </div>
                        <div class="comment-text">${escapeHtml(c.reply.message).replace(/\n/g, '<br>')}</div>
                    </div>`;
            }
            return `
                <div class="comment-item" data-comment-id="${c.id}">
                    <div class="comment-header">
                        <span class="comment-author">${escapeHtml(c.name)}</span>
                        <span class="comment-date">${escapeHtml(dateStr)}</span>
                    </div>
                    <div class="comment-text">${escapeHtml(c.message).replace(/\n/g, '<br>')}</div>
                    ${replyHtml}
                </div>`;
        }

        async function loadPageComments() {
            var list = document.getElementById('commentsList');
            if (!list) return;
            try {
                var res = await fetch(API_BASE + '/api/comments');
                if (res.ok) {
                    var comments = await res.json();
                    list.innerHTML = comments.length === 0
                        ? '<p style="text-align:center;color:#888;padding:2rem;">No messages yet. Be the first to post!</p>'
                        : comments.map(renderCommentToPage).join('');
                } else {
                    list.innerHTML = '<p style="text-align:center;color:#888;padding:2rem;">Could not load messages.</p>';
                }
            } catch (e) {
                list.innerHTML = '<p style="text-align:center;color:#888;padding:2rem;">Could not load messages.</p>';
            }
        }

        loadPageComments();

        // Inject admin button + modal
        var adminSection = document.createElement('div');
        adminSection.id = 'adminSection';
        adminSection.innerHTML = `
            <button id="adminBtn" class="btn btn-primary">🔐 Admin Comments</button>

            <div id="adminModal" class="admin-modal">
                <div class="admin-modal-content">
                    <button class="admin-close" id="adminClose">✕</button>

                    <div id="adminLogin">
                        <h3>Admin Login</h3>
                        <div class="form-group">
                            <label for="adminPassword">Password</label>
                            <input type="password" id="adminPassword" placeholder="Enter admin password" />
                        </div>
                        <button id="adminLoginBtn" class="btn btn-primary">Login</button>
                        <p id="adminError" class="error-text"></p>
                    </div>

                    <div id="adminPanel" style="display:none;">
                        <h3>Manage Comments</h3>
                        <div class="admin-tabs">
                            <button class="admin-tab active" data-tab="add">Add Comment</button>
                            <button class="admin-tab" data-tab="manage">Manage Comments</button>
                        </div>

                        <div id="tabAdd" class="admin-tab-content active">
                            <div class="form-group">
                                <label>Author Name</label>
                                <input type="text" id="commentAuthor" placeholder="Name" />
                            </div>
                            <div class="form-group">
                                <label>Date</label>
                                <input type="text" id="commentDate" />
                            </div>
                            <div class="form-group">
                                <label>Message</label>
                                <textarea id="commentContent" placeholder="Comment message..." rows="5"></textarea>
                            </div>
                            <button id="addCommentBtn" class="btn btn-primary">Post Comment</button>
                        </div>

                        <div id="tabManage" class="admin-tab-content">
                            <div id="adminCommentsList">Loading comments...</div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        var ctaSection = document.querySelector('.cta-section');
        if (ctaSection) {
            ctaSection.parentNode.insertBefore(adminSection, ctaSection);
        } else {
            document.querySelector('.content-section').appendChild(adminSection);
        }

        var adminModal = document.getElementById('adminModal');
        var adminLogin = document.getElementById('adminLogin');
        var adminPanel = document.getElementById('adminPanel');
        var isAuth     = false;
        var adminToken = '';

        async function hashPassword(password) {
            const encoder = new TextEncoder();
            const data = encoder.encode(password + 'bce_salt_2025');
            const hash = await crypto.subtle.digest('SHA-256', data);
            return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
        }

        document.getElementById('adminBtn').addEventListener('click', function() {
            adminModal.classList.add('open');
        });

        document.getElementById('adminClose').addEventListener('click', function() {
            adminModal.classList.remove('open');
        });

        document.getElementById('adminLoginBtn').addEventListener('click', async function() {
            var password    = document.getElementById('adminPassword').value;
            var hashedInput = await hashPassword(password);
            var correctHash = await hashPassword('admin123');
            if (hashedInput === correctHash) {
                isAuth     = true;
                adminToken = hashedInput;
                adminLogin.style.display = 'none';
                adminPanel.style.display = 'block';
                document.getElementById('commentDate').value = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                loadAdminData();
            } else {
                document.getElementById('adminError').textContent = 'Incorrect password';
            }
        });

        // Tab switching
        document.querySelectorAll('.admin-tab').forEach(function(tab) {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                var id = 'tab' + tab.dataset.tab.charAt(0).toUpperCase() + tab.dataset.tab.slice(1);
                document.getElementById(id).classList.add('active');
            });
        });

        // Add comment (admin)
        document.getElementById('addCommentBtn').addEventListener('click', async function() {
            if (!isAuth) return;
            var name    = document.getElementById('commentAuthor').value.trim() || 'BCE Admin';
            var date    = document.getElementById('commentDate').value.trim();
            var message = document.getElementById('commentContent').value.trim();
            if (!message) { alert('Please fill in the message'); return; }

            try {
                var res = await fetch(API_BASE + '/api/comments', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: name, message: message, timestamp: new Date().toISOString() })
                });
                if (!res.ok) throw new Error();
                var result  = await res.json();
                var comment = result.comment;
                comment.date = date;

                var commentsList = document.getElementById('commentsList');
                var emptyMsg = commentsList.querySelector('p');
                if (emptyMsg) emptyMsg.remove();
                commentsList.insertAdjacentHTML('afterbegin', renderCommentToPage(comment));

                document.getElementById('commentAuthor').value  = '';
                document.getElementById('commentContent').value = '';
                await loadAdminData();
            } catch (e) {
                alert('Failed to add comment');
            }
        });

        async function loadAdminData() {
            try {
                var res = await fetch(API_BASE + '/api/comments');
                var comments = res.ok ? await res.json() : [];
                renderCommentsList(comments);
            } catch (e) {
                document.getElementById('adminCommentsList').innerHTML = '<p>Could not load comments.</p>';
            }
        }

        function renderCommentsList(comments) {
            var html = '';
            comments.forEach(function(c) {
                var dateStr = c.date || formatDate(c.timestamp);
                var preview = (c.message || '').substring(0, 100) + (c.message && c.message.length > 100 ? '...' : '');
                html += `
                    <div class="admin-item" data-cid="${c.id}">
                        <div class="admin-item-info">
                            <strong>${escapeHtml(c.name)}</strong>
                            <span style="font-size:0.8rem;color:#888;margin-left:8px;">${escapeHtml(dateStr)}</span>
                            <p style="font-size:0.85rem;color:#666;margin:0.25rem 0 0;">${escapeHtml(preview)}</p>
                        </div>
                        <div class="admin-item-actions">
                            <button class="btn-small btn-edit" data-id="${c.id}">Edit</button>
                            <button class="btn-small btn-reply-admin" data-id="${c.id}" style="background:#6f42c1;color:white;">Reply</button>
                            <button class="btn-small btn-delete" data-id="${c.id}">Delete</button>
                        </div>
                        <div id="editForm_${c.id}" style="display:none;margin-top:0.75rem;">
                            <input type="text" class="edit-name" placeholder="Author name" value="${escapeHtml(c.name)}" style="width:100%;margin-bottom:0.4rem;padding:6px;border:1px solid #ccc;border-radius:4px;" />
                            <input type="text" class="edit-date" placeholder="Date" value="${escapeHtml(dateStr)}" style="width:100%;margin-bottom:0.4rem;padding:6px;border:1px solid #ccc;border-radius:4px;" />
                            <textarea class="edit-msg" rows="3" style="width:100%;padding:6px;border:1px solid #ccc;border-radius:4px;resize:vertical;">${escapeHtml(c.message)}</textarea>
                            <div style="display:flex;gap:6px;margin-top:0.4rem;">
                                <button class="btn-small btn-save-edit" data-id="${c.id}" style="background:#007bff;color:white;">Save</button>
                                <button class="btn-small btn-cancel-edit" data-id="${c.id}" style="background:#6c757d;color:white;">Cancel</button>
                            </div>
                        </div>
                        <div id="replyForm_${c.id}" style="display:none;margin-top:0.75rem;">
                            <input type="text" class="reply-name" value="BCE — William" style="width:100%;margin-bottom:0.4rem;padding:6px;border:1px solid #ccc;border-radius:4px;" />
                            <textarea class="reply-msg" rows="3" placeholder="Reply message..." style="width:100%;padding:6px;border:1px solid #ccc;border-radius:4px;resize:vertical;"></textarea>
                            <div style="display:flex;gap:6px;margin-top:0.4rem;">
                                <button class="btn-small btn-save-reply" data-id="${c.id}" style="background:#28a745;color:white;">Post Reply</button>
                                <button class="btn-small btn-cancel-reply" data-id="${c.id}" style="background:#6c757d;color:white;">Cancel</button>
                            </div>
                        </div>
                    </div>
                `;
            });
            document.getElementById('adminCommentsList').innerHTML = html || '<p>No comments found</p>';
            attachAdminHandlers();
        }

        function attachAdminHandlers() {
            // Edit toggle
            document.querySelectorAll('#adminCommentsList .btn-edit').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var form = document.getElementById('editForm_' + this.dataset.id);
                    form.style.display = form.style.display === 'none' ? 'block' : 'none';
                    document.getElementById('replyForm_' + this.dataset.id).style.display = 'none';
                });
            });

            // Save edit
            document.querySelectorAll('.btn-save-edit').forEach(function(btn) {
                btn.addEventListener('click', async function() {
                    var id      = this.dataset.id;
                    var form    = document.getElementById('editForm_' + id);
                    var newName = form.querySelector('.edit-name').value.trim();
                    var newDate = form.querySelector('.edit-date').value.trim();
                    var newMsg  = form.querySelector('.edit-msg').value.trim();
                    if (!newName || !newMsg) { alert('Name and message required'); return; }

                    try {
                        await fetch(API_BASE + '/api/admin/comments/' + id, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + adminToken },
                            body: JSON.stringify({ name: newName, message: newMsg })
                        });
                    } catch (e) {}

                    var domEl = document.querySelector('.comment-item[data-comment-id="' + id + '"]');
                    if (domEl) {
                        domEl.querySelector('.comment-author').textContent = newName;
                        domEl.querySelector('.comment-date').textContent   = newDate;
                        domEl.querySelector('.comment-text').innerHTML     = escapeHtml(newMsg).replace(/\n/g, '<br>');
                    }
                    var row = document.querySelector('#adminCommentsList .admin-item[data-cid="' + id + '"]');
                    if (row) {
                        row.querySelector('.admin-item-info strong').textContent = newName;
                        var p = row.querySelector('.admin-item-info p');
                        if (p) p.textContent = newMsg.substring(0, 100) + (newMsg.length > 100 ? '...' : '');
                    }
                    form.style.display = 'none';
                });
            });

            // Cancel edit
            document.querySelectorAll('.btn-cancel-edit').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    document.getElementById('editForm_' + this.dataset.id).style.display = 'none';
                });
            });

            // Reply toggle
            document.querySelectorAll('.btn-reply-admin').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var form = document.getElementById('replyForm_' + this.dataset.id);
                    form.style.display = form.style.display === 'none' ? 'block' : 'none';
                    document.getElementById('editForm_' + this.dataset.id).style.display = 'none';
                });
            });

            // Save reply — persists to API
            document.querySelectorAll('.btn-save-reply').forEach(function(btn) {
                btn.addEventListener('click', async function() {
                    var id   = this.dataset.id;
                    var form = document.getElementById('replyForm_' + id);
                    var name = form.querySelector('.reply-name').value.trim() || 'BCE — William';
                    var msg  = form.querySelector('.reply-msg').value.trim();
                    if (!msg) { alert('Please enter a reply'); return; }

                    var replyData = {
                        name:    name,
                        message: msg,
                        date:    new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                    };

                    try {
                        await fetch(API_BASE + '/api/admin/comments/' + id, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + adminToken },
                            body: JSON.stringify({ reply: replyData })
                        });
                    } catch (e) {}

                    var domEl = document.querySelector('.comment-item[data-comment-id="' + id + '"]');
                    if (domEl) {
                        var existing = domEl.querySelector('.admin-reply');
                        if (existing) existing.remove();
                        var replyEl = document.createElement('div');
                        replyEl.className = 'admin-reply';
                        replyEl.innerHTML = `
                            <div class="comment-header">
                                <span class="comment-author admin-reply-author">${escapeHtml(name)}</span>
                                <span class="comment-date">${escapeHtml(replyData.date)}</span>
                            </div>
                            <div class="comment-text">${escapeHtml(msg).replace(/\n/g, '<br>')}</div>
                        `;
                        domEl.appendChild(replyEl);
                    }
                    form.querySelector('.reply-msg').value = '';
                    form.style.display = 'none';
                });
            });

            // Cancel reply
            document.querySelectorAll('.btn-cancel-reply').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    document.getElementById('replyForm_' + this.dataset.id).style.display = 'none';
                });
            });

            // Delete
            document.querySelectorAll('#adminCommentsList .btn-delete').forEach(function(btn) {
                btn.addEventListener('click', async function() {
                    if (!confirm('Delete this comment?')) return;
                    var id = this.dataset.id;
                    try {
                        await fetch(API_BASE + '/api/admin/comments/' + id, {
                            method: 'DELETE',
                            headers: { 'Authorization': 'Bearer ' + adminToken }
                        });
                    } catch (e) {}
                    var domEl = document.querySelector('.comment-item[data-comment-id="' + id + '"]');
                    if (domEl) domEl.remove();
                    this.closest('.admin-item').remove();
                });
            });
        }
    });

    // ============================================
    // COMMENT FORM HANDLER
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        var commentForm = document.getElementById('commentForm');
        var commentSuccess = document.getElementById('commentSuccess');
        
        if (commentForm) {
            commentForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                var name = document.getElementById('commentName').value.trim();
                var message = document.getElementById('commentMessage').value.trim();
                
                if (!name || !message) {
                    alert('Please fill in all required fields.');
                    return;
                }
                
                var submitBtn = commentForm.querySelector('button[type="submit"]');
                var originalText = submitBtn.textContent;
                submitBtn.textContent = 'Posting...';
                submitBtn.disabled = true;
                
                try {
                    var response = await fetch(API_BASE + '/api/comments', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            name: name,
                            message: message,
                            timestamp: new Date().toISOString()
                        })
                    });
                    
                    if (response.ok) {
                        var result = await response.json();

                        // Add the new comment to the DOM immediately
                        var commentsList = document.getElementById('commentsList');
                        if (commentsList) {
                            var newCommentId = (result.comment && result.comment.id) ? result.comment.id : ('c_' + Date.now());
                            var dateStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                            var newCommentHTML = `
                                <div class="comment-item" data-comment-id="${newCommentId}" style="cursor: pointer;" title="Click to edit/delete (admin only)">
                                    <div class="comment-header">
                                        <span class="comment-author">${name}</span>
                                        <span class="comment-date">${dateStr}</span>
                                    </div>
                                    <div class="comment-text">
                                        ${message.replace(/\n/g, '<br>')}
                                    </div>
                                </div>
                            `;
                            commentsList.insertAdjacentHTML('afterbegin', newCommentHTML);
                        }
                        
                        commentSuccess.classList.add('show');
                        commentForm.reset();
                        setTimeout(function() {
                            commentSuccess.classList.remove('show');
                        }, 3000);
                    } else {
                        throw new Error('Failed to post');
                    }
                } catch (error) {
                    console.error('Comment error:', error);
                    alert('Failed to post comment. Please try again.');
                } finally {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            });
        }
    });
    
    // ============================================
    // CONTACT FORM HANDLER
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        var contactForm = document.getElementById('contactForm');
        var successMessage = document.getElementById('successMessage');
        
        if (contactForm) {
            contactForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                var name = document.getElementById('name').value.trim();
                var email = document.getElementById('email').value.trim();
                var phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '';
                var inquiryType = document.getElementById('inquiryType') ? document.getElementById('inquiryType').value : 'general';
                var message = document.getElementById('message').value.trim();
                
                if (!name || !email || !message) {
                    alert('Please fill in all required fields.');
                    return;
                }
                
                var submitBtn = contactForm.querySelector('button[type="submit"]');
                var originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                try {
                    var response = await fetch(API_BASE + '/api/contact', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            name: name,
                            email: email,
                            phone: phone,
                            inquiryType: inquiryType,
                            message: message,
                            timestamp: new Date().toISOString()
                        })
                    });
                    
                    if (response.ok) {
                        successMessage.classList.add('show');
                        contactForm.reset();
                        setTimeout(function() {
                            successMessage.classList.remove('show');
                        }, 5000);
                    } else {
                        throw new Error('Failed to send');
                    }
                } catch (error) {
                    console.error('Contact error:', error);
                    alert('Failed to send message. Please try again or contact us directly at (424) 395-6144.');
                } finally {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            });
        }
    });
    
    // ============================================
    // LIVE AGENT CHAT WIDGET
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        // Create Live Agent Button
        var liveAgentBtn = document.createElement('div');
        liveAgentBtn.id = 'liveAgentBtn';
        liveAgentBtn.innerHTML = `
            <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                <circle cx="12" cy="10" r="1.5"/>
                <circle cx="8" cy="10" r="1.5"/>
                <circle cx="16" cy="10" r="1.5"/>
            </svg>
            <span>Live Agent</span>
        `;
        document.body.appendChild(liveAgentBtn);
        
        // Create Chat Popup
        var chatPopup = document.createElement('div');
        chatPopup.id = 'chatPopup';
        chatPopup.innerHTML = `
            <div class="chat-header">
                <div class="chat-header-info">
                    <div class="chat-avatar">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                        </svg>
                    </div>
                    <div>
                        <strong>BCE Live Support</strong>
                        <span class="chat-status">● Online</span>
                    </div>
                </div>
                <button class="chat-close" id="chatClose">✕</button>
            </div>
            <div class="chat-messages" id="chatMessages">
                <div class="chat-message agent">
                    <p>Hello! Welcome to BCE Sober Living. How can I help you today?</p>
                    <span class="chat-time">Just now</span>
                </div>
            </div>
            <div class="chat-typing-indicator" id="chatTypingIndicator"></div>
            <div class="chat-emoji-picker" id="chatEmojiPicker"></div>
            <div class="chat-input-area">
                <button class="chat-emoji-btn" id="chatEmojiBtn" type="button">😊</button>
                <input type="text" id="chatInput" placeholder="Type your message..." />
                <button id="chatSend">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                </button>
            </div>
        `;
        document.body.appendChild(chatPopup);
        
        // Chat functionality
        var isOpen = false;
        var chatMessages = document.getElementById('chatMessages');
        var chatInput = document.getElementById('chatInput');
        var conversationId = 'chat_' + Date.now();
        
        liveAgentBtn.addEventListener('click', function() {
            isOpen = !isOpen;
            chatPopup.classList.toggle('open', isOpen);
            liveAgentBtn.classList.toggle('open', isOpen);
            if (isOpen) {
                chatInput.focus();
                loadChatHistory();
            }
        });
        
        document.getElementById('chatClose').addEventListener('click', function() {
            isOpen = false;
            chatPopup.classList.remove('open');
            liveAgentBtn.classList.remove('open');
        });
        
        function addMessage(text, isUser) {
            var div = document.createElement('div');
            div.className = 'chat-message ' + (isUser ? 'user' : 'agent');
            div.innerHTML = '<p>' + escapeHtml(text) + '</p><span class="chat-time">' + formatTime(new Date()) + '</span>';
            chatMessages.appendChild(div);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        function escapeHtml(text) {
            var div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
        
        function formatTime(date) {
            return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }
        
        async function sendMessage() {
            var text = chatInput.value.trim();
            if (!text) return;
            
            chatInput.value = '';
            addMessage(text, true);
            
            try {
                await fetch(API_BASE + '/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        conversationId: conversationId,
                        message: text,
                        timestamp: new Date().toISOString(),
                        isUser: true
                    })
                });
                
                // Auto response after short delay
                setTimeout(function() {
                    addMessage("Thank you for your message!  Responses typically take about 2-5 minutes; please be patient for your response...  William will respond shortly but for immediate assistance, you may call William at (424) 395-6144.", false);
                }, 1000);
            } catch (error) {
                console.error('Chat error:', error);
            }
        }
        
        async function loadChatHistory() {
            try {
                var response = await fetch(API_BASE + '/api/chat/' + conversationId);
                if (response.ok) {
                    var messages = await response.json();
                    // Load any agent responses
                    messages.forEach(function(msg) {
                        if (!msg.isUser) {
                            addMessage(msg.message, false);
                        }
                    });
                }
            } catch (error) {
                // Ignore - chat history not found is ok
            }
        }
        
        document.getElementById('chatSend').addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendMessage();
        });

        // Emoji picker setup
        var EMOJIS = ['😀','😊','😂','🥲','😍','🥰','😎','🙏','👍','👎','❤️','🔥','✨','🎉','💪','🤝','💯','😢','😔','🌟','🌈','🕊️','💙','💚','💛','🧡','🫶','🙌','💐','🌻'];
        var emojiPicker = document.getElementById('chatEmojiPicker');
        var emojiBtn = document.getElementById('chatEmojiBtn');
        emojiPicker.innerHTML = EMOJIS.map(function(e) {
            return '<button class="chat-emoji-item" type="button">' + e + '</button>';
        }).join('');
        emojiPicker.querySelectorAll('.chat-emoji-item').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var pos = chatInput.selectionStart || chatInput.value.length;
                chatInput.value = chatInput.value.slice(0, pos) + btn.textContent + chatInput.value.slice(pos);
                chatInput.focus();
                chatInput.selectionStart = chatInput.selectionEnd = pos + btn.textContent.length;
                emojiPicker.classList.remove('open');
            });
        });
        emojiBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            emojiPicker.classList.toggle('open');
        });
        document.addEventListener('click', function(e) {
            if (!emojiPicker.contains(e.target) && e.target !== emojiBtn) {
                emojiPicker.classList.remove('open');
            }
        });

        // Typing signal — fire when user types, 4s debounce
        var typingTimeout = null;
        chatInput.addEventListener('input', function() {
            clearTimeout(typingTimeout);
            fetch(API_BASE + '/api/chat/typing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ conversationId: conversationId, isUser: true })
            }).catch(function() {});
            typingTimeout = setTimeout(function() {}, 4000);
        });

        // Poll for agent typing indicator (every 2s)
        var typingIndicator = document.getElementById('chatTypingIndicator');
        setInterval(async function() {
            if (!isOpen) return;
            try {
                var r = await fetch(API_BASE + '/api/chat/typing/' + conversationId);
                if (r.ok) {
                    var d = await r.json();
                    typingIndicator.textContent = d.agentTyping ? 'BCE Support is typing...' : '';
                }
            } catch (e) {}
        }, 2000);

        // Poll for new agent responses
        setInterval(async function() {
            if (!isOpen) return;
            try {
                var response = await fetch(API_BASE + '/api/chat/poll/' + conversationId);
                if (response.ok) {
                    var data = await response.json();
                    if (data.newMessages) {
                        data.newMessages.forEach(function(msg) {
                            addMessage(msg.message, false);
                        });
                    }
                }
            } catch (error) {
                // Polling error - ignore
            }
        }, 5000);
    });
    
    // ============================================
    // UPDATES PAGE — Load & Admin Panel
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        if (!window.location.pathname.includes('updates')) return;

        function escapeHtml(text) {
            var div = document.createElement('div');
            div.textContent = text || '';
            return div.innerHTML;
        }

        function todayFormatted() {
            return new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        }

        function renderUpdateToPage(u) {
            return `
                <div class="update-item" data-update-id="${u.id}">
                    <div class="update-header">
                        <span class="update-author">${escapeHtml(u.author)}</span>
                        <span class="update-date">${escapeHtml(u.date)}</span>
                    </div>
                    <div class="update-content">
                        <h3 class="update-title">${escapeHtml(u.title)}</h3>
                        <div class="update-text"><p>${escapeHtml(u.content).replace(/\n/g, '</p><p>')}</p></div>
                    </div>
                </div>
            `;
        }

        // Load and render updates on page open
        async function loadPageUpdates() {
            var list = document.getElementById('updatesList');
            try {
                var res = await fetch(API_BASE + '/api/updates');
                if (res.ok) {
                    var updates = await res.json();
                    if (updates.length === 0) {
                        list.innerHTML = '<p style="text-align:center;color:#888;padding:2rem;">No updates yet.</p>';
                    } else {
                        list.innerHTML = updates.map(renderUpdateToPage).join('');
                    }
                } else {
                    list.innerHTML = '<p style="text-align:center;color:#888;padding:2rem;">Could not load updates.</p>';
                }
            } catch (e) {
                list.innerHTML = '<p style="text-align:center;color:#888;padding:2rem;">Could not load updates.</p>';
            }
        }

        loadPageUpdates();

        // --- Admin Panel ---
        var adminSection = document.createElement('div');
        adminSection.id = 'adminSection';
        adminSection.innerHTML = `
            <button id="adminBtn" class="btn btn-primary">🔐 Admin Update</button>

            <div id="adminModal" class="admin-modal">
                <div class="admin-modal-content">
                    <button class="admin-close" id="adminClose">✕</button>

                    <div id="adminLogin">
                        <h3>Admin Login</h3>
                        <div class="form-group">
                            <label for="adminPassword">Password</label>
                            <input type="password" id="adminPassword" placeholder="Enter admin password" />
                        </div>
                        <button id="adminLoginBtn" class="btn btn-primary">Login</button>
                        <p id="adminError" class="error-text"></p>
                    </div>

                    <div id="adminPanel" style="display:none;">
                        <h3>Manage Updates</h3>
                        <div class="admin-tabs">
                            <button class="admin-tab active" data-tab="add">Add Update</button>
                            <button class="admin-tab" data-tab="manage">Manage Updates</button>
                            <button class="admin-tab" data-tab="comments">Manage Comments</button>
                        </div>

                        <div id="tabAdd" class="admin-tab-content active">
                            <div class="form-group">
                                <label>Author</label>
                                <input type="text" id="updateAuthor" placeholder="BCE Sober Living Team" />
                            </div>
                            <div class="form-group">
                                <label>Date</label>
                                <input type="text" id="updateDate" />
                            </div>
                            <div class="form-group">
                                <label>Title</label>
                                <input type="text" id="updateTitle" placeholder="Update Title" />
                            </div>
                            <div class="form-group">
                                <label>Content</label>
                                <textarea id="updateContent" placeholder="Update content..." rows="5"></textarea>
                            </div>
                            <button id="addUpdateBtn" class="btn btn-primary">Add Update</button>
                        </div>

                        <div id="tabManage" class="admin-tab-content">
                            <div id="adminUpdatesList">Loading updates...</div>
                        </div>

                        <div id="tabComments" class="admin-tab-content">
                            <div id="commentsAdminList">Loading comments...</div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        var ctaSection = document.querySelector('.cta-section');
        if (ctaSection) {
            ctaSection.parentNode.insertBefore(adminSection, ctaSection);
        } else {
            document.querySelector('.content-section').appendChild(adminSection);
        }

        var adminModal = document.getElementById('adminModal');
        var adminLogin = document.getElementById('adminLogin');
        var adminPanel = document.getElementById('adminPanel');
        var isAuth     = false;
        var adminToken = '';

        async function hashPassword(password) {
            const encoder = new TextEncoder();
            const data = encoder.encode(password + 'bce_salt_2025');
            const hash = await crypto.subtle.digest('SHA-256', data);
            return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
        }

        document.getElementById('adminBtn').addEventListener('click', function() { adminModal.classList.add('open'); });
        document.getElementById('adminClose').addEventListener('click', function() { adminModal.classList.remove('open'); });

        document.getElementById('adminLoginBtn').addEventListener('click', async function() {
            var pw          = document.getElementById('adminPassword').value;
            var hashedInput = await hashPassword(pw);
            var correctHash = await hashPassword('admin123');
            if (hashedInput === correctHash) {
                isAuth      = true;
                adminToken  = hashedInput;
                adminLogin.style.display  = 'none';
                adminPanel.style.display  = 'block';
                document.getElementById('updateDate').value = todayFormatted();
                loadAdminData();
            } else {
                document.getElementById('adminError').textContent = 'Incorrect password';
            }
        });

        // Tab switching
        document.querySelectorAll('.admin-tab').forEach(function(tab) {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                var id = 'tab' + tab.dataset.tab.charAt(0).toUpperCase() + tab.dataset.tab.slice(1);
                document.getElementById(id).classList.add('active');
            });
        });

        // Add update
        document.getElementById('addUpdateBtn').addEventListener('click', async function() {
            if (!isAuth) return;
            var update = {
                author:    document.getElementById('updateAuthor').value.trim()  || 'BCE Sober Living Team',
                date:      document.getElementById('updateDate').value.trim()    || todayFormatted(),
                title:     document.getElementById('updateTitle').value.trim(),
                content:   document.getElementById('updateContent').value.trim(),
                timestamp: new Date().toISOString()
            };
            if (!update.title || !update.content) { alert('Please fill in title and content'); return; }

            try {
                var res = await fetch(API_BASE + '/api/admin/updates', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + adminToken },
                    body: JSON.stringify(update)
                });
                if (!res.ok) throw new Error();
                var result = await res.json();
                update.id  = result.update.id;

                // Add to live page immediately
                var list = document.getElementById('updatesList');
                var empty = list.querySelector('p');
                if (empty) empty.remove();
                list.insertAdjacentHTML('afterbegin', renderUpdateToPage(update));

                // Clear form
                document.getElementById('updateAuthor').value  = '';
                document.getElementById('updateTitle').value   = '';
                document.getElementById('updateContent').value = '';

                // Refresh manage list
                await loadAdminData();
            } catch (e) {
                alert('Failed to add update');
            }
        });

        async function loadAdminData() {
            // Load updates from API
            try {
                var res = await fetch(API_BASE + '/api/admin/updates', {
                    headers: { 'Authorization': 'Bearer ' + adminToken }
                });
                var updates = res.ok ? await res.json() : [];
                renderUpdatesList(updates);
            } catch (e) {
                document.getElementById('adminUpdatesList').innerHTML = '<p>Could not load updates.</p>';
            }

            // Load comments from API
            try {
                var res2 = await fetch(API_BASE + '/api/comments');
                var comments = res2.ok ? await res2.json() : [];
                renderCommentsList(comments);
            } catch (e) {
                document.getElementById('commentsAdminList').innerHTML = '<p>Could not load comments.</p>';
            }
        }

        function renderUpdatesList(updates) {
            var html = '';
            updates.forEach(function(u) {
                html += `
                    <div class="admin-item" data-uid="${u.id}">
                        <div class="admin-item-info">
                            <strong>${escapeHtml(u.title)}</strong>
                            <span style="font-size:0.8rem;color:#888;margin-left:8px;">${escapeHtml(u.date)}</span>
                            <span style="font-size:0.8rem;color:#999;display:block;">${escapeHtml(u.author)}</span>
                        </div>
                        <div class="admin-item-actions">
                            <button class="btn-small btn-edit-update" data-id="${u.id}">Edit</button>
                            <button class="btn-small btn-delete-update" data-id="${u.id}">Delete</button>
                        </div>
                        <div id="editUpdateForm_${u.id}" style="display:none;margin-top:0.75rem;">
                            <input type="text" class="eu-author" value="${escapeHtml(u.author)}" placeholder="Author" style="width:100%;margin-bottom:0.4rem;padding:6px;border:1px solid #ccc;border-radius:4px;" />
                            <input type="text" class="eu-date"   value="${escapeHtml(u.date)}"   placeholder="Date"   style="width:100%;margin-bottom:0.4rem;padding:6px;border:1px solid #ccc;border-radius:4px;" />
                            <input type="text" class="eu-title"  value="${escapeHtml(u.title)}"  placeholder="Title"  style="width:100%;margin-bottom:0.4rem;padding:6px;border:1px solid #ccc;border-radius:4px;" />
                            <textarea class="eu-content" rows="4" style="width:100%;padding:6px;border:1px solid #ccc;border-radius:4px;resize:vertical;">${escapeHtml(u.content)}</textarea>
                            <div style="display:flex;gap:6px;margin-top:0.4rem;">
                                <button class="btn-small btn-save-update" data-id="${u.id}" style="background:#007bff;color:white;">Save</button>
                                <button class="btn-small btn-cancel-update" data-id="${u.id}" style="background:#6c757d;color:white;">Cancel</button>
                            </div>
                        </div>
                    </div>
                `;
            });
            document.getElementById('adminUpdatesList').innerHTML = html || '<p>No updates found.</p>';
            attachUpdateHandlers();
        }

        function attachUpdateHandlers() {
            // Toggle edit form
            document.querySelectorAll('.btn-edit-update').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var form = document.getElementById('editUpdateForm_' + this.dataset.id);
                    form.style.display = form.style.display === 'none' ? 'block' : 'none';
                });
            });

            // Cancel
            document.querySelectorAll('.btn-cancel-update').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    document.getElementById('editUpdateForm_' + this.dataset.id).style.display = 'none';
                });
            });

            // Save edit
            document.querySelectorAll('.btn-save-update').forEach(function(btn) {
                btn.addEventListener('click', async function() {
                    var id      = this.dataset.id;
                    var form    = document.getElementById('editUpdateForm_' + id);
                    var author  = form.querySelector('.eu-author').value.trim();
                    var date    = form.querySelector('.eu-date').value.trim();
                    var title   = form.querySelector('.eu-title').value.trim();
                    var content = form.querySelector('.eu-content').value.trim();
                    if (!title || !content) { alert('Title and content are required'); return; }

                    try {
                        var res = await fetch(API_BASE + '/api/admin/updates/' + id, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + adminToken },
                            body: JSON.stringify({ author: author, date: date, title: title, content: content })
                        });
                        if (!res.ok) throw new Error();
                    } catch (e) { alert('Save failed'); return; }

                    // Update live page
                    var domEl = document.querySelector('.update-item[data-update-id="' + id + '"]');
                    if (domEl) {
                        domEl.querySelector('.update-author').textContent = author;
                        domEl.querySelector('.update-date').textContent   = date;
                        domEl.querySelector('.update-title').textContent  = title;
                        domEl.querySelector('.update-text').innerHTML     = '<p>' + escapeHtml(content).replace(/\n/g, '</p><p>') + '</p>';
                    }

                    // Update admin row
                    var row = document.querySelector('#adminUpdatesList .admin-item[data-uid="' + id + '"]');
                    if (row) {
                        row.querySelector('.admin-item-info strong').textContent = title;
                    }
                    form.style.display = 'none';
                });
            });

            // Delete
            document.querySelectorAll('.btn-delete-update').forEach(function(btn) {
                btn.addEventListener('click', async function() {
                    if (!confirm('Delete this update?')) return;
                    var id = this.dataset.id;
                    try {
                        await fetch(API_BASE + '/api/admin/updates/' + id, {
                            method: 'DELETE',
                            headers: { 'Authorization': 'Bearer ' + adminToken }
                        });
                    } catch (e) {}
                    // Remove from live page
                    var domEl = document.querySelector('.update-item[data-update-id="' + id + '"]');
                    if (domEl) domEl.remove();
                    // Remove from admin list
                    this.closest('.admin-item').remove();
                });
            });
        }

        function renderCommentsList(comments) {
            var html = '';
            comments.forEach(function(c) {
                var preview = (c.message || '').substring(0, 100) + (c.message && c.message.length > 100 ? '...' : '');
                html += `
                    <div class="admin-item">
                        <div class="admin-item-info">
                            <strong>${escapeHtml(c.name)}</strong>
                            <p style="font-size:0.85rem;color:#666;margin:0.25rem 0 0;">${escapeHtml(preview)}</p>
                        </div>
                        <div class="admin-item-actions">
                            <button class="btn-small btn-delete-comment" data-id="${c.id}" style="background:#dc3545;color:white;">Delete</button>
                        </div>
                    </div>
                `;
            });
            document.getElementById('commentsAdminList').innerHTML = html || '<p>No comments found.</p>';

            document.querySelectorAll('.btn-delete-comment').forEach(function(btn) {
                btn.addEventListener('click', async function() {
                    if (!confirm('Delete this comment?')) return;
                    var id = this.dataset.id;
                    try {
                        await fetch(API_BASE + '/api/admin/comments/' + id, {
                            method: 'DELETE',
                            headers: { 'Authorization': 'Bearer ' + adminToken }
                        });
                    } catch (e) {}
                    this.closest('.admin-item').remove();
                });
            });
        }
    });
    
    // ============================================
    // GALLERY LIGHTBOX
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        var galleryItems = document.querySelectorAll('[data-gallery]');
        if (!galleryItems.length) return;

        var lightbox = document.createElement('div');
        lightbox.id = 'galleryLightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay" id="lightboxOverlay">
                <div class="lightbox-content">
                    <button class="lightbox-close" id="lightboxClose">&#x2715;</button>
                    <div class="lightbox-image" id="lightboxImage"></div>
                    <div class="lightbox-info">
                        <h3 id="lightboxTitle"></h3>
                        <p id="lightboxDesc"></p>
                        <div class="lightbox-actions">
                            <a href="contact.html" class="btn btn-primary">Schedule a Tour</a>
                            <a href="tel:4243956144" class="btn btn-secondary">Call (424) 395-6144</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(lightbox);

        var overlay = document.getElementById('lightboxOverlay');

        galleryItems.forEach(function(item) {
            item.addEventListener('click', function() {
                var placeholder = item.querySelector('.image-placeholder');
                var svgText = item.querySelector('svg text');
                var desc = item.querySelector('p');

                document.getElementById('lightboxImage').innerHTML = placeholder ? placeholder.outerHTML : '';
                document.getElementById('lightboxTitle').textContent = svgText ? svgText.textContent : 'Facility Photo';
                document.getElementById('lightboxDesc').textContent = desc ? desc.textContent : '';
                overlay.classList.add('open');
                document.body.style.overflow = 'hidden';
            });
        });

        document.getElementById('lightboxClose').addEventListener('click', closeLightbox);

        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) closeLightbox();
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeLightbox();
        });

        function closeLightbox() {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // ============================================
    // FAQ ACCORDION
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        var faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(function(question) {
            question.addEventListener('click', function() {
                var item = this.closest('.faq-item');
                var isActive = item.classList.contains('active');
                
                // Close all others
                document.querySelectorAll('.faq-item.active').forEach(function(activeItem) {
                    if (activeItem !== item) {
                        activeItem.classList.remove('active');
                    }
                });
                
                // Toggle current
                item.classList.toggle('active', !isActive);
            });
        });
    });
    
    // ============================================
    // FLOATING PARTICLES
    // ============================================
    window.addEventListener('load', function() {
        var container = document.createElement('div');
        container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;overflow:hidden;';
        document.body.appendChild(container);
        
        for (var i = 0; i < 20; i++) {
            var particle = document.createElement('div');
            var size = Math.random() * 4 + 2;
            var x = Math.random() * 100;
            var duration = Math.random() * 20 + 15;
            var delay = Math.random() * 5;
            
            particle.style.cssText = 
                'position:absolute;' +
                'width:' + size + 'px;' +
                'height:' + size + 'px;' +
                'background:rgba(77,166,255,' + (Math.random() * 0.5 + 0.2) + ');' +
                'border-radius:50%;' +
                'left:' + x + '%;' +
                'bottom:-20px;' +
                'animation:floatUp ' + duration + 's linear ' + delay + 's infinite;' +
                'box-shadow:0 0 ' + (size * 2) + 'px rgba(77,166,255,0.5);';
            
            container.appendChild(particle);
        }
    });
    
    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        var anchorLinks = document.querySelectorAll('a[href^="#"]');
        for (var i = 0; i < anchorLinks.length; i++) {
            anchorLinks[i].addEventListener('click', function(e) {
                var href = this.getAttribute('href');
                var target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
    });
    
    // ============================================
    // PARALLAX EFFECT
    // ============================================
    window.addEventListener('scroll', function() {
        var heroes = document.querySelectorAll('.hero');
        var scrolled = window.pageYOffset;
        var rate = scrolled * 0.5;
        
        for (var i = 0; i < heroes.length; i++) {
            heroes[i].style.transform = 'translate3d(0, ' + rate + 'px, 0)';
        }
    });
    
})();
