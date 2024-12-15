/**
 * HTTP: Hypertext Transfer Protocol
 *
 * Diagram:
 * Client                                    Server
 * |                                           |
 * |<------------ TCP Connection ------------->|
 * |------------- HTTP Request -------------->||
 * |<------------ HTTP Response --------------|
 *
 * Use Case: Web Browsing
 *
 * TCP: Transmission Control Protocol
 *
 * Diagram:
 * Client                                    Server
 * |                                           |
 * |<------------ SYN Connection ------------->|
 * |------------- SYN-ACK Connection -------->||
 * |<------------ ACK Connection -------------|
 *
 * Use Case: File Transfer, Email, etc.
 *
 * Description:
 *   TCP asks if the server is available for connection; the server acknowledges.
 *   With acknowledgment, the server sends an ID to the client. This ID is used to
 *   ensure that the data is not dropped.
 *
 * UDP: User Datagram Protocol
 *
 * Diagram:
 * Client                                    Server
 * |                                           |
 * |<------------ UDP Request -------------->| |
 * |<------------ UDP Response --------------|
 *
 * Use Case: Video Streaming, Online Gaming, etc. (No handshake is done and data can be dropped)
 *
 * HTTP/3 (QUIC)
 *
 * Diagram:
 * Client                                    Server
 * |                                           |
 * |<------------ UDP Connection ------------->|
 * |------------- UDP Request -------------->| |
 * |<------------ UDP Response --------------|
 *
 * Description:
 *   Header compression is there to reduce the size of the header.
 *   Better network congestion control.
 *   Use Case: IoT, Virtual Reality, etc.
 *
 * HTTPS: Hypertext Transfer Protocol Secure
 *
 * Diagram:
 * Client                                    Server
 * |                                           |
 * |<------------ TCP Connection ------------->|
 * |<------------ Public Key -----------------|
 * |------------- Session Key -------------->| |
 * |<------------ Encrypted Data ------------|
 *
 * Description:
 *   The data that is transferred is encrypted and decrypted.
 *   Use Case: Web Browsing, Email, etc. (Encrypted Data)
 *
 * WebSocket:
 *
 * Diagram:
 * Client                                    Server
 * |                                           |
 * |<------------ HTTP Upgrade ------------->| |
 * |<-------- Full Duplex Communication ----->|
 *
 * Use Case: Online Gaming, Real-Time Communication, etc. (Full Duplex Communication)
 *
 * SMTP: Simple Mail Transfer Protocol
 *
 * Diagram:
 * Client                                  Receiver
 * |                                           |
 * |<------------ SMTP Server -------------->| |
 *
 * Use Case: Email, etc.
 *
 * FTP: File Transfer Protocol
 *
 * Diagram:
 * Client                                    Server
 * |                                           |
 * |<------------ Control Channel ------------>|
 * |<------------ Data Channel -------------->|
 *
 * Use Case: File Transfer, etc.
 */
