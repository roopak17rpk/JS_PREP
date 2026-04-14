# Communication Protocols — A Complete Guide

Think of the internet as a postal system. Every time you open a website, send a message, or stream a video, data is being shipped between computers using **communication protocols** — agreed-upon rules that both the sender and receiver follow so they can understand each other.

Let's break down each protocol one by one.

---

## Table of Contents

1. [TCP — Transmission Control Protocol](#1-tcp--transmission-control-protocol)
2. [UDP — User Datagram Protocol](#2-udp--user-datagram-protocol)
3. [HTTP — Hypertext Transfer Protocol](#3-http--hypertext-transfer-protocol)
4. [HTTPS — Hypertext Transfer Protocol Secure](#4-https--hypertext-transfer-protocol-secure)
5. [HTTP/3 (QUIC) — Quick UDP Internet Connections](#5-http3-quic--quick-udp-internet-connections)
6. [WebSocket](#6-websocket)
7. [FTP — File Transfer Protocol](#7-ftp--file-transfer-protocol)
8. [Protocol Comparison Table](#8-protocol-comparison-table)

---

## 1. TCP — Transmission Control Protocol

### What is it?

TCP is a **transport layer** protocol. It's the foundation that protocols like HTTP, HTTPS, and FTP are built on top of. Think of TCP as a **registered mail service** — it guarantees that your letter arrives, arrives in order, and arrives intact.

### How it works — The 3-Way Handshake

Before any data is sent, TCP establishes a **reliable connection** between the client and the server using a 3-step handshake:

```mermaid
sequenceDiagram
    participant Client
    participant Server

    Note over Client,Server: Step 1 — SYN (Synchronize)
    Client->>Server: SYN: "Hey, I want to talk. My sequence number is X."

    Note over Client,Server: Step 2 — SYN-ACK (Synchronize + Acknowledge)
    Server->>Client: SYN-ACK: "Got it! My sequence number is Y. I acknowledge X+1."

    Note over Client,Server: Step 3 — ACK (Acknowledge)
    Client->>Server: ACK: "Great! I acknowledge Y+1. Let's go!"

    Note over Client,Server: ✅ Connection Established — Data can flow
```

### How TCP guarantees reliability

| Mechanism | What it does |
|---|---|
| **Sequencing** | Each packet gets a sequence number so the receiver can reassemble them in the correct order, even if they arrive out of order. |
| **Acknowledgments (ACKs)** | The receiver sends back an ACK for every packet received. If the sender doesn't get an ACK within a timeout, it **retransmits** the packet. |
| **Checksum** | Each packet carries a checksum — a mathematical fingerprint of the data. The receiver recalculates it. If it doesn't match, the packet is discarded and retransmitted. |
| **Flow Control** | The receiver tells the sender how much data it can handle at a time (via a "window size"), preventing the receiver from being overwhelmed. |
| **Congestion Control** | TCP monitors the network for signs of congestion (packet loss, delays) and dynamically adjusts the sending rate. |

### Connection Teardown — The 4-Way Handshake

When the conversation is done, TCP gracefully closes the connection:

```mermaid
sequenceDiagram
    participant Client
    participant Server

    Client->>Server: FIN: "I'm done sending."
    Server->>Client: ACK: "Got it."
    Server->>Client: FIN: "I'm done too."
    Client->>Server: ACK: "Acknowledged. Goodbye!"

    Note over Client,Server: ❌ Connection Closed
```

### Real-Life Use Cases

- **Web browsing** (HTTP/HTTPS runs over TCP)
- **Email** (SMTP, IMAP, POP3 all use TCP)
- **File transfers** (FTP, SFTP)
- **Database connections** (MySQL, PostgreSQL)
- Any scenario where **data integrity matters more than speed**

---

## 2. UDP — User Datagram Protocol

### What is it?

UDP is also a **transport layer** protocol, but it's the polar opposite of TCP. Think of UDP as **throwing postcards into a mailbox** — you send them and hope they arrive, but you don't wait for confirmation and you don't care about the order.

### How it works

There is **no handshake, no connection, no guarantees**. The sender simply fires off packets (called **datagrams**) to the receiver.

```mermaid
sequenceDiagram
    participant Client
    participant Server

    Note over Client,Server: No handshake needed!

    Client->>Server: Datagram 1: "Here's some data"
    Client->>Server: Datagram 2: "Here's more data"
    Client->>Server: Datagram 3: "And more..."

    Note over Client,Server: Server receives whatever arrives.<br/>No ACKs. No retransmission.<br/>Packets may arrive out of order or not at all.
```

### TCP vs UDP — Side by Side

| Feature | TCP | UDP |
|---|---|---|
| Connection | Connection-oriented (handshake) | Connectionless (fire and forget) |
| Reliability | Guaranteed delivery | No guarantee |
| Ordering | Packets arrive in order | Packets may arrive out of order |
| Speed | Slower (overhead from ACKs, retransmission) | Faster (minimal overhead) |
| Header Size | 20-60 bytes | 8 bytes |
| Use Case | When accuracy matters | When speed matters |

### Real-Life Use Cases

- **Video streaming** (Netflix, YouTube) — a dropped frame is better than buffering
- **Online gaming** — old position data is useless; you need the latest one fast
- **Voice/Video calls** (Zoom, Discord) — slight glitches are acceptable; lag is not
- **DNS lookups** — small, fast queries
- **IoT sensor data** — constant stream of small readings

---

## 3. HTTP — Hypertext Transfer Protocol

### What is it?

HTTP is an **application layer** protocol built **on top of TCP**. It defines how a client (your browser) and a server communicate. Every time you type a URL and press Enter, HTTP is at work.

HTTP follows a **request-response model** — the client asks, the server answers. That's it. The server never spontaneously sends data to the client.

### How it works

```mermaid
sequenceDiagram
    participant Browser as 🌐 Browser (Client)
    participant Server as 🖥️ Server

    Note over Browser,Server: Step 1 — TCP Handshake (SYN, SYN-ACK, ACK)
    Browser->>Server: TCP: SYN
    Server->>Browser: TCP: SYN-ACK
    Browser->>Server: TCP: ACK

    Note over Browser,Server: Step 2 — HTTP Request
    Browser->>Server: GET /index.html HTTP/1.1<br/>Host: example.com<br/>Accept: text/html

    Note over Browser,Server: Step 3 — HTTP Response
    Server->>Browser: HTTP/1.1 200 OK<br/>Content-Type: text/html<br/><br/><html>...</html>

    Note over Browser,Server: Step 4 — TCP Connection Closed (or kept alive)
    Browser->>Server: TCP: FIN
    Server->>Browser: TCP: FIN-ACK
```

### Anatomy of an HTTP Request

```
GET /api/users HTTP/1.1          ← Method + Path + Version
Host: example.com                ← Which server
Accept: application/json         ← What format I want
Authorization: Bearer abc123     ← Authentication
Content-Type: application/json   ← Format of body (for POST/PUT)
```

### HTTP Methods

| Method | Purpose | Idempotent? | Has Body? |
|---|---|---|---|
| `GET` | Retrieve data | Yes | No |
| `POST` | Create a resource | No | Yes |
| `PUT` | Replace a resource entirely | Yes | Yes |
| `PATCH` | Partially update a resource | No | Yes |
| `DELETE` | Remove a resource | Yes | No |
| `HEAD` | Same as GET but no body | Yes | No |
| `OPTIONS` | Check what methods are allowed | Yes | No |

### HTTP Status Codes

| Range | Category | Examples |
|---|---|---|
| `1xx` | Informational | `100 Continue` |
| `2xx` | Success | `200 OK`, `201 Created`, `204 No Content` |
| `3xx` | Redirection | `301 Moved Permanently`, `304 Not Modified` |
| `4xx` | Client Error | `400 Bad Request`, `401 Unauthorized`, `404 Not Found`, `429 Too Many Requests` |
| `5xx` | Server Error | `500 Internal Server Error`, `502 Bad Gateway`, `503 Service Unavailable` |

### HTTP Versions at a Glance

| Version | Key Feature |
|---|---|
| HTTP/1.0 | One request per TCP connection |
| HTTP/1.1 | **Keep-alive** connections (reuse TCP), pipelining |
| HTTP/2 | **Multiplexing** (multiple requests over one TCP connection), header compression, server push |
| HTTP/3 | Built on **QUIC (UDP)** instead of TCP — see section below |

### Real-Life Use Cases

- Every website you visit
- REST APIs (`GET /api/products`, `POST /api/orders`)
- Loading images, scripts, stylesheets
- Form submissions

---

## 4. HTTPS — Hypertext Transfer Protocol Secure

### What is it?

HTTPS is **HTTP + TLS (Transport Layer Security)**. It encrypts the communication between client and server so no one in the middle (hackers, ISPs, governments) can read or tamper with the data.

Think of HTTP as a **postcard** (anyone handling it can read it) and HTTPS as a **sealed envelope** (only the recipient can open it).

### How it works — The TLS Handshake

Before any HTTP data flows, a TLS handshake happens **on top of the TCP handshake**:

```mermaid
sequenceDiagram
    participant Browser as 🌐 Browser
    participant Server as 🖥️ Server

    Note over Browser,Server: TCP 3-Way Handshake (SYN → SYN-ACK → ACK)

    Note over Browser,Server: 🔐 TLS Handshake Begins

    Browser->>Server: ClientHello: "I support TLS 1.3, here are my cipher suites"
    Server->>Browser: ServerHello: "Let's use TLS 1.3 with AES-256-GCM"
    Server->>Browser: Certificate: "Here's my SSL certificate (signed by a CA)"
    Server->>Browser: ServerKeyExchange: "Here's my public key"

    Note over Browser: Browser verifies certificate<br/>against trusted Certificate Authorities (CAs)

    Browser->>Server: ClientKeyExchange: "Here's my part of the key"

    Note over Browser,Server: Both sides compute the<br/>shared symmetric session key

    Browser->>Server: Finished (encrypted)
    Server->>Browser: Finished (encrypted)

    Note over Browser,Server: ✅ Secure channel established!<br/>All HTTP data is now encrypted
```

### What TLS protects against

| Threat | How TLS prevents it |
|---|---|
| **Eavesdropping** | All data is encrypted — even if intercepted, it's unreadable |
| **Tampering** | Message Authentication Code (MAC) detects any modification |
| **Impersonation** | SSL certificates verify the server is who it claims to be |
| **Man-in-the-Middle (MITM)** | Certificate verification + encryption together prevent MITM attacks |

### Symmetric vs Asymmetric Encryption in HTTPS

```
1. Asymmetric encryption (slow but secure) is used ONLY during the TLS handshake
   to safely exchange a symmetric key.

2. Symmetric encryption (fast) is used for ALL actual data transfer
   after the handshake is complete.

This gives you the best of both worlds — security AND speed.
```

### Real-Life Use Cases

- **Every modern website** (browsers show a 🔒 padlock for HTTPS)
- **Online banking & payments**
- **Login pages** — passwords are encrypted in transit
- **APIs** — securing data between services
- **Any site handling sensitive data** (medical, legal, personal)

---

## 5. HTTP/3 (QUIC) — Quick UDP Internet Connections

### What is it?

HTTP/3 is the **latest version of HTTP**, and it makes a radical change: instead of running on **TCP**, it runs on **QUIC**, which is built on **UDP**.

Why? TCP has a fundamental problem called **Head-of-Line Blocking** — if one packet is lost, ALL streams on that connection are blocked until the lost packet is retransmitted. QUIC solves this.

### The Problem with HTTP/2 over TCP

```mermaid
graph TD
    A[HTTP/2 over TCP] --> B[Stream 1: Image]
    A --> C[Stream 2: CSS]
    A --> D[Stream 3: JS]

    B --> E[Packet Lost! ❌]
    E --> F[ALL streams blocked ⏸️<br/>waiting for retransmission]

    style E fill:#ff6b6b
    style F fill:#ffa94d
```

### How QUIC (HTTP/3) solves it

```mermaid
graph TD
    A[HTTP/3 over QUIC/UDP] --> B[Stream 1: Image]
    A --> C[Stream 2: CSS]
    A --> D[Stream 3: JS]

    B --> E[Packet Lost! ❌]
    E --> F[Only Stream 1 affected ⏸️]
    C --> G[Stream 2 continues ✅]
    D --> H[Stream 3 continues ✅]

    style E fill:#ff6b6b
    style F fill:#ffa94d
    style G fill:#51cf66
    style H fill:#51cf66
```

### How it works

```mermaid
sequenceDiagram
    participant Browser as 🌐 Browser
    participant Server as 🖥️ Server

    Note over Browser,Server: QUIC combines TCP handshake + TLS handshake<br/>into a SINGLE round trip (0-RTT or 1-RTT)

    Browser->>Server: QUIC Initial: ClientHello + Connection Setup
    Server->>Browser: QUIC Handshake: ServerHello + Certificate + Done

    Note over Browser,Server: ✅ Connection established in 1 round trip!<br/>(TCP+TLS would take 2-3 round trips)

    Browser->>Server: HTTP/3 Request: GET /page
    Server->>Browser: HTTP/3 Response: 200 OK + data

    Note over Browser,Server: If client has connected before:<br/>0-RTT — sends data immediately!
```

### Key advantages of HTTP/3

| Feature | Benefit |
|---|---|
| **No Head-of-Line Blocking** | Lost packets only affect their own stream, not others |
| **Faster Connection Setup** | 1-RTT (or 0-RTT for returning visitors) vs 2-3 RTT for TCP+TLS |
| **Built-in Encryption** | TLS 1.3 is mandatory and integrated, not layered on top |
| **Connection Migration** | Switching from Wi-Fi to cellular doesn't break the connection (uses Connection IDs, not IP+Port) |
| **Better on lossy networks** | Mobile networks, Wi-Fi with interference |

### Real-Life Use Cases

- **Google services** (YouTube, Gmail, Google Search — Google invented QUIC)
- **Cloudflare** and other CDNs
- **Facebook / Meta**
- Any application where **low latency** on **unreliable networks** is critical

---

## 6. WebSocket

### What is it?

WebSocket is a protocol that provides **full-duplex** (two-way), **persistent** communication over a **single TCP connection**. Unlike HTTP where the client always initiates, with WebSocket **both the client and server can send messages at any time**.

Think of HTTP as **walkie-talkie** (one talks, the other listens, then they switch). WebSocket is a **phone call** (both can talk simultaneously).

### How it works

WebSocket starts as an HTTP request (called the **upgrade handshake**), then upgrades to a persistent WebSocket connection:

```mermaid
sequenceDiagram
    participant Client as 🌐 Client
    participant Server as 🖥️ Server

    Note over Client,Server: Step 1 — HTTP Upgrade Handshake

    Client->>Server: GET /chat HTTP/1.1<br/>Upgrade: websocket<br/>Connection: Upgrade<br/>Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==

    Server->>Client: HTTP/1.1 101 Switching Protocols<br/>Upgrade: websocket<br/>Connection: Upgrade<br/>Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=

    Note over Client,Server: ✅ WebSocket Connection Established!<br/>Full-duplex communication begins

    Client->>Server: {"type": "message", "text": "Hello!"}
    Server->>Client: {"type": "message", "text": "Hi there!"}
    Server->>Client: {"type": "notification", "text": "New user joined"}
    Client->>Server: {"type": "typing", "user": "Alice"}
    Server->>Client: {"type": "message", "text": "Another message"}

    Note over Client,Server: Either side can send at any time!<br/>No request-response pattern needed
```

### HTTP Polling vs WebSocket

```mermaid
sequenceDiagram
    participant Client
    participant Server

    Note over Client,Server: ❌ HTTP Polling (Wasteful)
    Client->>Server: Any new messages?
    Server->>Client: No.
    Client->>Server: Any new messages?
    Server->>Client: No.
    Client->>Server: Any new messages?
    Server->>Client: Yes! Here's the message.

    Note over Client,Server: ✅ WebSocket (Efficient)
    Client->>Server: [Connection established]
    Server->>Client: New message arrived!
    Server->>Client: Another message!
    Server->>Client: And another!
```

### Real-Life Use Cases

- **Chat applications** (Slack, WhatsApp Web, Discord)
- **Real-time notifications** (push notifications in web apps)
- **Live dashboards** (stock tickers, analytics dashboards)
- **Collaborative editing** (Google Docs, Figma)
- **Online multiplayer games**
- **Live sports scores**

---

## 7. FTP — File Transfer Protocol

### What is it?

FTP is one of the **oldest protocols** on the internet (1971!). It's specifically designed for **transferring files** between a client and a server. Think of it as a **dedicated file courier service**.

### How it works

FTP is unique because it uses **two separate TCP connections**:

1. **Control Connection (Port 21)** — for sending commands (login, navigate directories, request files)
2. **Data Connection (Port 20)** — for actually transferring the file data

```mermaid
sequenceDiagram
    participant Client as 📁 FTP Client
    participant Server as 🖥️ FTP Server

    Note over Client,Server: Control Connection (Port 21)

    Client->>Server: Connect to port 21
    Server->>Client: 220 Welcome to FTP Server

    Client->>Server: USER admin
    Server->>Client: 331 Password required

    Client->>Server: PASS ****
    Server->>Client: 230 Login successful

    Client->>Server: CWD /uploads
    Server->>Client: 250 Directory changed

    Client->>Server: RETR report.pdf
    Server->>Client: 150 Opening data connection

    Note over Client,Server: Data Connection (Port 20)

    Server->>Client: [Binary data: report.pdf content...]
    Server->>Client: 226 Transfer complete

    Note over Client,Server: Control connection stays open<br/>Data connection closes after each transfer

    Client->>Server: QUIT
    Server->>Client: 221 Goodbye
```

### FTP Modes

| Mode | How Data Connection Works | Firewall Friendly? |
|---|---|---|
| **Active Mode** | Server connects TO the client on a random port | No — firewalls often block incoming connections |
| **Passive Mode** | Client connects TO the server on a port the server specifies | Yes — client initiates both connections |

### FTP vs Modern Alternatives

| Protocol | Encrypted? | Use Case |
|---|---|---|
| **FTP** | ❌ No (plain text, even passwords!) | Legacy systems only |
| **FTPS** | ✅ FTP + TLS encryption | Secure file transfer (FTP with SSL) |
| **SFTP** | ✅ Runs over SSH | Secure file transfer (completely different protocol) |
| **SCP** | ✅ Runs over SSH | Simple secure file copy |

> ⚠️ **Warning:** Plain FTP sends everything (including passwords) in **clear text**. Never use plain FTP for sensitive data. Use **SFTP** or **FTPS** instead.

### Real-Life Use Cases

- **Web hosting** — uploading website files to a server
- **Backup systems** — transferring backup files to remote storage
- **Legacy enterprise systems** — many older systems still use FTP
- **Large file distribution** — sharing large files within organizations

---

## 8. Protocol Comparison Table

| Protocol | Layer | Built On | Connection | Reliable? | Encrypted? | Duplex | Speed |
|---|---|---|---|---|---|---|---|
| **TCP** | Transport | IP | Connection-oriented | ✅ Yes | ❌ No | Full | Moderate |
| **UDP** | Transport | IP | Connectionless | ❌ No | ❌ No | Full | Fast |
| **HTTP** | Application | TCP | Request-Response | ✅ Yes | ❌ No | Half | Moderate |
| **HTTPS** | Application | TCP + TLS | Request-Response | ✅ Yes | ✅ Yes | Half | Moderate |
| **HTTP/3** | Application | QUIC (UDP) | Request-Response | ✅ Yes | ✅ Yes | Half | Fast |
| **WebSocket** | Application | TCP | Persistent | ✅ Yes | Optional (WSS) | Full | Fast |
| **FTP** | Application | TCP | Dual TCP | ✅ Yes | ❌ No | Half | Moderate |

---

## 9. The Full Picture — How They Stack Together

```
┌─────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER                      │
│  ┌──────┐ ┌───────┐ ┌────────┐ ┌───────────┐ ┌───────┐ │
│  │ HTTP │ │ HTTPS │ │ HTTP/3 │ │ WebSocket │ │  FTP  │ │
│  └──┬───┘ └──┬────┘ └───┬────┘ └─────┬─────┘ └──┬────┘ │
├─────┼────────┼─────────┼────────────┼───────────┼───────┤
│     │   ┌────┴───┐  ┌──┴───┐        │           │       │
│     │   │  TLS   │  │ QUIC │        │           │       │
│     │   └────┬───┘  └──┬───┘        │           │       │
├─────┼────────┼─────────┼────────────┼───────────┼───────┤
│                   TRANSPORT LAYER                        │
│         ┌─────────┐    ┌─────────┐                       │
│         │   TCP   │    │   UDP   │                       │
│         └────┬────┘    └────┬────┘                       │
├──────────────┼──────────────┼────────────────────────────┤
│                   NETWORK LAYER                          │
│              ┌──────────────┐                            │
│              │      IP      │                            │
│              └──────────────┘                            │
└─────────────────────────────────────────────────────────┘

HTTP, HTTPS, WebSocket, FTP  →  use TCP
HTTP/3                       →  uses QUIC which uses UDP
HTTPS                        →  adds TLS on top of TCP
```

---

## 10. Interview Quick-Fire Answers

**Q: What's the difference between TCP and UDP?**
> TCP is reliable and ordered (3-way handshake, ACKs, retransmission). UDP is fast and unreliable (fire-and-forget). Use TCP when data accuracy matters (web, email). Use UDP when speed matters (gaming, streaming, DNS).

**Q: How does HTTPS work?**
> HTTPS = HTTP + TLS. After the TCP handshake, a TLS handshake exchanges keys using asymmetric encryption. Then all data flows using fast symmetric encryption. The SSL certificate verifies the server's identity.

**Q: What is HTTP/3 and why does it exist?**
> HTTP/3 runs on QUIC (UDP-based) instead of TCP to eliminate head-of-line blocking. If one stream loses a packet, other streams aren't affected. It also has faster connection setup (1-RTT or 0-RTT).

**Q: When would you use WebSocket over HTTP?**
> When you need real-time, bidirectional communication. HTTP is request-response only — the server can't push data to the client. WebSocket keeps a persistent connection open where both sides can send data anytime.

**Q: Why does FTP use two connections?**
> Separation of concerns. The control connection (port 21) handles commands and responses. The data connection (port 20) handles file transfer. This way, you can browse directories while a file is transferring.
