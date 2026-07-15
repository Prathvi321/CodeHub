# Part VI — DNS & Naming

## A Complete Technical Reference

---

# Preface

Every time you type a URL into your browser, before a single byte of the actual web page reaches your screen, an invisible but extraordinarily sophisticated lookup process occurs. Your computer needs to translate a human-readable name — like `www.google.com` — into a machine-usable number — like `142.250.80.46`. This translation is handled by the **Domain Name System**, universally known as **DNS**.

DNS is one of the foundational pillars of the modern internet. Without it, users would need to memorize numerical IP addresses for every website, every email server, and every online service they wished to use. DNS is sometimes called the "phone book of the internet," though that analogy barely scratches the surface of its complexity, elegance, and criticality.

This part of the book covers DNS from the ground up — its hierarchical structure, its record types, its resolution mechanisms, its security vulnerabilities, and the administrative ecosystem surrounding domain names. By the end, you will understand not just *what* DNS does, but *how* and *why* it works the way it does.

---

# Chapter 1 — The DNS Hierarchy

## 1.1 Why a Hierarchy?

The internet is not a small system. As of the mid-2020s, there are well over **350 million registered domain names**, and that number grows daily. Managing all of these names in a single centralized database would be an engineering nightmare — a single point of failure, a bottleneck of unimaginable scale, and an administrative impossibility across political boundaries and jurisdictions.

The designers of DNS solved this problem in the early 1980s — primarily Paul Mockapetris, who published the foundational DNS specifications in **RFC 882** and **RFC 883** in 1983, later superseded by **RFC 1034** and **RFC 1035** in 1987, which remain the core DNS standards to this day.

Their solution was a **distributed, hierarchical, delegated** naming system. Instead of one database, DNS is a tree of databases. Instead of one authority, responsibility is divided and delegated. Instead of one location, DNS is replicated across thousands of servers worldwide.

## 1.2 The DNS Namespace as a Tree

DNS names are structured as a tree, read from right to left in terms of authority. Consider the fully qualified domain name (FQDN):

```
www.example.com.
```

That trailing dot is significant — it represents the **root** of the DNS tree. The full name, read right to left, decomposes into:

```
. (root)
└── com (Top-Level Domain)
    └── example (Second-Level Domain)
        └── www (Subdomain / hostname)
```

Each component separated by a dot is called a **label**. Each label can be up to 63 characters, and the total length of a fully qualified domain name cannot exceed 253 characters.

This tree structure defines **zones** — administrative units that are managed by a specific authority and stored in a specific set of servers.

## 1.3 The Root Zone

At the very top of the DNS hierarchy sits the **root zone**, represented by a single dot (`.`). The root zone is managed by the **Internet Assigned Numbers Authority (IANA)**, which is a function of **ICANN** (Internet Corporation for Assigned Names and Numbers).

The root zone contains authoritative information about where to find the nameservers for all **Top-Level Domains (TLDs)** — `.com`, `.net`, `.org`, `.uk`, `.de`, `.io`, and hundreds more.

The root zone is served by **13 root server clusters**, named with the letters A through M:

| Name | Operator |
|------|----------|
| A.root-servers.net | Verisign |
| B.root-servers.net | USC-ISI |
| C.root-servers.net | Cogent Communications |
| D.root-servers.net | University of Maryland |
| E.root-servers.net | NASA |
| F.root-servers.net | Internet Systems Consortium |
| G.root-servers.net | Defense Information Systems Agency |
| H.root-servers.net | U.S. Army Research Lab |
| I.root-servers.net | Netnod (Sweden) |
| J.root-servers.net | Verisign |
| K.root-servers.net | RIPE NCC (Europe) |
| L.root-servers.net | ICANN |
| M.root-servers.net | WIDE Project (Japan) |

An important clarification: there are only 13 **root server addresses** (IPv4), but there are actually **over 1,500 physical instances** of these servers deployed worldwide. This is achieved through **anycast routing**, where multiple physical machines share the same IP address and routing directs queries to the geographically nearest instance. This design provides both redundancy and performance.

**Why only 13 addresses?**
The original DNS was designed to fit the list of root server addresses into a single UDP packet (512 bytes). With IPv4 addresses and associated metadata, 13 was the maximum that fit comfortably. With IPv6 and modern DNS extensions (EDNS0), this is less of a constraint, but the tradition of 13 logical root servers continues.

The root servers are extraordinarily robust. They collectively handle billions of queries per day. Attempts to attack them (there have been several, including a major DDoS attack in 2002 and another in 2007) have had minimal impact because of the distributed anycast architecture.

## 1.4 Top-Level Domains (TLDs)

Directly below the root are the **Top-Level Domains**. There are several categories:

### Generic TLDs (gTLDs)
The original generic TLDs have specific intended purposes, though most are now open to any registrant:

- `.com` — commercial (originally; now general purpose)
- `.net` — network infrastructure (originally; now general purpose)
- `.org` — non-profit organizations (originally; now general purpose)
- `.edu` — U.S. educational institutions (restricted)
- `.gov` — U.S. government (restricted)
- `.mil` — U.S. military (restricted)
- `.int` — international treaty organizations (restricted)

### Country Code TLDs (ccTLDs)
Each country has a two-letter code based on the ISO 3166-1 standard:

- `.uk` — United Kingdom
- `.de` — Germany
- `.jp` — Japan
- `.cn` — China
- `.au` — Australia
- `.io` — British Indian Ocean Territory (widely used by tech companies)
- `.ai` — Anguilla (widely used by AI companies)

Some ccTLDs like `.tv` (Tuvalu) and `.me` (Montenegro) have been commercially licensed far beyond their home countries.

### New gTLDs
Since 2012, ICANN opened up the TLD space dramatically through a New gTLD Program. Now there are hundreds of new TLDs:

- `.app`, `.dev`, `.blog`, `.shop`, `.cloud`
- `.bank`, `.insurance`, `.health`
- `.google`, `.apple`, `.amazon` (brand TLDs)
- `.nyc`, `.london`, `.paris` (geographic TLDs)

Each TLD has a **registry** — an organization responsible for managing all domains within that TLD. Verisign operates `.com` and `.net`. The Public Interest Registry operates `.org`. These registries maintain the **TLD zone**, which contains the nameserver records for every second-level domain registered within their TLD.

## 1.5 Second-Level Domains and Beyond

Below TLDs are **second-level domains (SLDs)** — this is where individuals, organizations, and companies register names. When you register `example.com`, you are registering the `example` label within the `.com` TLD.

Within your registered domain, you can create as many **subdomains** as you wish:

```
mail.example.com
www.example.com
api.example.com
blog.example.com
vpn.example.com
```

There is no technical limit on subdomain depth, though practical limits apply. You might see:

```
internal.us-east.prod.api.example.com
```

This is entirely valid — five labels deep below the TLD.

Some registries also offer second-level registrations that function like TLDs:

- `.co.uk` (United Kingdom commercial)
- `.com.au` (Australia commercial)
- `.gov.uk` (United Kingdom government)

In these cases, registrants register at the third level: `bbc.co.uk`, `abc.net.au`.

## 1.6 Zones and Delegation

The DNS tree is divided into **zones**, where each zone is a contiguous portion of the namespace administered by a particular entity. Zones are stored in **zone files** on **authoritative nameservers**.

When an authority wants to delegate responsibility for a portion of the namespace to someone else, they create **NS (Nameserver) records** pointing to the delegated entity's nameservers. This is the fundamental mechanism of DNS delegation.

**Example:**
- IANA (root zone) delegates `.com` to Verisign by pointing to Verisign's nameservers
- Verisign's `.com` zone delegates `example.com` to the nameservers you specified when registering your domain
- You control `example.com` and can create subdomains, delegate them further, or host them yourself

This delegation creates the hierarchy — each level trusts the level below it to handle queries for its portion of the namespace.

---

# Chapter 2 — DNS Record Types

## 2.1 Introduction to Resource Records

All information in DNS is stored as **Resource Records (RRs)**. Each resource record has a standard format:

```
[NAME] [TTL] [CLASS] [TYPE] [RDATA]
```

- **NAME**: The domain name this record applies to
- **TTL**: Time To Live — how many seconds this record can be cached
- **CLASS**: Almost always `IN` (Internet); others like `CH` (Chaosnet) are rare
- **TYPE**: The record type (A, MX, CNAME, etc.)
- **RDATA**: The record-specific data (varies by type)

A typical zone file might look like:

```
$ORIGIN example.com.
$TTL 3600

@       IN  SOA   ns1.example.com. admin.example.com. (
                  2024010101 ; Serial
                  3600       ; Refresh
                  900        ; Retry
                  604800     ; Expire
                  300 )      ; Minimum TTL

@       IN  NS    ns1.example.com.
@       IN  NS    ns2.example.com.

@       IN  A     93.184.216.34
www     IN  A     93.184.216.34
mail    IN  A     93.184.216.50

@       IN  MX    10 mail.example.com.
```

Let's now examine each major record type in depth.

---

## 2.2 A Record (Address Record)

**Purpose**: Maps a domain name to an IPv4 address.

**Format**:
```
name    TTL    IN    A    IPv4-address
```

**Examples**:
```
example.com.       3600  IN  A  93.184.216.34
www.example.com.   3600  IN  A  93.184.216.34
mail.example.com.  3600  IN  A  93.184.216.50
```

**How it works**: When a client needs to connect to `www.example.com`, the DNS resolver returns the A record, giving the client an IPv4 address it can use to establish a TCP connection.

**Multiple A Records (Round-Robin Load Balancing)**:
A single name can have multiple A records:
```
www.example.com.  60  IN  A  203.0.113.1
www.example.com.  60  IN  A  203.0.113.2
www.example.com.  60  IN  A  203.0.113.3
```

DNS resolvers return all records, but typically rotate (shuffle) the order. The querying client usually attempts the first address. This is **DNS round-robin** — a rudimentary form of load balancing used by many large websites, including Google, which maintains numerous A records for `google.com`.

**Real-world usage**: Every web server, mail server, API endpoint, and networked device that users connect to by name has at least one A record. It is the most fundamental record type in DNS.

---

## 2.3 AAAA Record (IPv6 Address Record)

**Purpose**: Maps a domain name to an IPv6 address. The name comes from the fact that IPv6 is 128 bits — four times the size of IPv4's 32 bits.

**Format**:
```
name    TTL    IN    AAAA    IPv6-address
```

**Examples**:
```
example.com.     3600  IN  AAAA  2606:2800:220:1:248:1893:25c8:1946
www.google.com.  300   IN  AAAA  2607:f8b0:4004:c09::63
```

**How it works**: Functionally identical to the A record, but for IPv6 addresses. Modern resolvers and clients query for both A and AAAA records simultaneously (this is called **Happy Eyeballs** — RFC 8305), and prefer IPv6 if available.

**Dual-stack operation**: Most modern domains serve both A and AAAA records, allowing both IPv4 and IPv6 clients to connect. This is called **dual-stack** operation.

```
google.com.  300  IN  A     142.250.80.46
google.com.  300  IN  AAAA  2607:f8b0:4004:c09::8b
```

**Real-world significance**: With IPv4 address exhaustion, IPv6 adoption is accelerating. Major providers like Google, Facebook, and Cloudflare report over 40% of their traffic arriving via IPv6. Any modern infrastructure deployment should include AAAA records.

---

## 2.4 CNAME Record (Canonical Name Record)

**Purpose**: Creates an alias from one name to another. Rather than pointing directly to an IP address, a CNAME points to another domain name.

**Format**:
```
alias-name    TTL    IN    CNAME    canonical-name
```

**Examples**:
```
www.example.com.    3600  IN  CNAME  example.com.
ftp.example.com.    3600  IN  CNAME  example.com.
blog.example.com.   3600  IN  CNAME  myblog.wordpress.com.
shop.example.com.   3600  IN  CNAME  mystore.myshopify.com.
```

**How it works**: When a resolver encounters a CNAME, it follows the chain until it reaches a final A or AAAA record. For example:

```
Client queries: www.example.com
→ DNS returns CNAME: example.com
→ Resolver queries: example.com
→ DNS returns A: 93.184.216.34
→ Client connects to 93.184.216.34
```

**CNAME chains**: CNAMEs can chain together, but each hop adds latency, and most resolvers impose limits (typically 8-10 hops) to prevent infinite loops:

```
blog.example.com → mysite.wordpress.com → wordpress.com → 192.0.2.100
```

**Important restrictions**:

1. **No CNAME at zone apex**: You cannot place a CNAME at the root of your zone (the "naked domain" or "apex domain"). This is because the zone apex must have NS and SOA records, and DNS rules say a CNAME cannot coexist with other record types for the same name.

   This creates a well-known problem: you can have `www.example.com CNAME example-lb.amazonaws.com`, but you cannot have `example.com CNAME example-lb.amazonaws.com`.

   Many DNS providers solve this with proprietary extensions: Cloudflare's **CNAME Flattening**, AWS Route 53's **ALIAS records**, and similar mechanisms that resolve the CNAME at query time and return an A record.

2. **No MX or NS pointing to CNAME**: MX and NS records must not point to CNAME aliases — they must point directly to A/AAAA records.

**Real-world usage**: CNAMEs are extremely common when:
- Pointing subdomains to third-party services (Shopify, WordPress, Zendesk)
- Creating user-friendly aliases (www → root domain)
- Distributing traffic through CDNs (Cloudflare, Fastly, Akamai)
- Providing friendly names for load balancers

---

## 2.5 MX Record (Mail Exchanger Record)

**Purpose**: Specifies the mail servers responsible for accepting email on behalf of a domain. When someone sends email to `user@example.com`, their mail server queries the MX records for `example.com` to find where to deliver the message.

**Format**:
```
name    TTL    IN    MX    priority    mail-server
```

**Examples**:
```
example.com.  3600  IN  MX  10  mail1.example.com.
example.com.  3600  IN  MX  20  mail2.example.com.
example.com.  3600  IN  MX  30  mail3.example.com.
```

**Priority (preference value)**: The number before the mail server name is the **priority** (sometimes called preference). **Lower numbers = higher priority**. Mail senders try the lowest-priority server first and only fall back to higher-priority servers if the lower ones are unavailable.

In the example above:
- `mail1.example.com` (priority 10) is tried first
- `mail2.example.com` (priority 20) is the first backup
- `mail3.example.com` (priority 30) is the second backup

**Equal priority load balancing**: If two records have the same priority value, mail servers randomly choose between them (providing load balancing):

```
example.com.  3600  IN  MX  10  mail1.example.com.
example.com.  3600  IN  MX  10  mail2.example.com.
```

**Real-world examples**: Google Workspace (formerly G Suite) uses five MX records:

```
example.com.  3600  IN  MX  1   aspmx.l.google.com.
example.com.  3600  IN  MX  5   alt1.aspmx.l.google.com.
example.com.  3600  IN  MX  5   alt2.aspmx.l.google.com.
example.com.  3600  IN  MX  10  alt3.aspmx.l.google.com.
example.com.  3600  IN  MX  10  alt4.aspmx.l.google.com.
```

Microsoft 365 uses a single MX record that looks like:
```
example.com.  3600  IN  MX  0  example-com.mail.protection.outlook.com.
```

**Important**: MX records must point to a **hostname** (which itself must have an A/AAAA record), not an IP address directly, and never to a CNAME.

**The email delivery flow**:
1. Sender's mail server (SMTP) looks up MX records for the recipient's domain
2. Connects to the highest-priority (lowest number) MX host on port 25
3. Delivers the message using SMTP protocol
4. If the server is unreachable, tries the next priority level
5. If all fail, queues for retry (typically for up to 5 days)

---

## 2.6 NS Record (Nameserver Record)

**Purpose**: Identifies the authoritative nameservers for a domain. NS records form the backbone of DNS delegation — they tell the DNS system which servers hold the authoritative answers for a given zone.

**Format**:
```
name    TTL    IN    NS    nameserver-hostname
```

**Examples**:
```
example.com.  86400  IN  NS  ns1.example.com.
example.com.  86400  IN  NS  ns2.example.com.
```

Or with a third-party DNS provider:
```
example.com.  86400  IN  NS  ns1.cloudflare.com.
example.com.  86400  IN  NS  ns2.cloudflare.com.
```

**How delegation works**: When the `.com` registry has your domain in its zone file, it stores NS records pointing to your nameservers. When a resolver queries the `.com` servers for `example.com`, the response includes a **referral** — a set of NS records pointing to your nameservers, saying "we don't have the answer, but these servers do."

**Glue records**: A subtle but important detail — if a nameserver is within the same domain it's authoritative for, you have a circular dependency:

```
example.com NS ns1.example.com
```

How do you find the IP of `ns1.example.com` if you need to query `example.com` to find out? Answer: **glue records**. The parent zone (`.com`) stores A records for `ns1.example.com` alongside the NS records, providing the IP directly without a separate lookup. These extra A records provided by the parent are called glue.

**Best practice**: Always have at least **two NS records** for redundancy. If one nameserver is unreachable, others can respond. Major domains often have four or more:

```
google.com.  345600  IN  NS  ns1.google.com.
google.com.  345600  IN  NS  ns2.google.com.
google.com.  345600  IN  NS  ns3.google.com.
google.com.  345600  IN  NS  ns4.google.com.
```

**Nameserver TTLs are long**: Note that NS record TTLs are typically very long (86400 seconds = 24 hours, sometimes 172800 = 48 hours). Changing your nameservers requires waiting for the old TTL to expire everywhere, which is why "nameserver changes can take up to 48 hours to propagate" is common advice.

---

## 2.7 TXT Record (Text Record)

**Purpose**: Stores arbitrary text information associated with a domain. Originally intended for human-readable information, TXT records have evolved into a general-purpose mechanism for domain verification, email authentication, and service configuration.

**Format**:
```
name    TTL    IN    TXT    "text-data"
```

**Examples**:
```
example.com.  3600  IN  TXT  "v=spf1 include:_spf.google.com ~all"
example.com.  3600  IN  TXT  "google-site-verification=abc123xyz"
_dmarc.example.com.  3600  IN  TXT  "v=DMARC1; p=reject; rua=mailto:dmarc@example.com"
```

**Major uses of TXT records**:

### SPF (Sender Policy Framework)
SPF TXT records specify which mail servers are authorized to send email from a domain, helping recipients detect forged sender addresses:

```
example.com.  3600  IN  TXT  "v=spf1 ip4:203.0.113.0/24 include:_spf.google.com -all"
```

This record says: "Email from `example.com` should only come from the 203.0.113.0/24 range or Google's servers. Reject all others."

SPF qualifiers:
- `+all` — pass (allow, default)
- `-all` — fail (reject) — recommended for strict policies
- `~all` — softfail (mark as suspicious but accept)
- `?all` — neutral (no policy)

### DKIM (DomainKeys Identified Mail)
DKIM stores public keys used to verify cryptographic signatures on emails:

```
selector1._domainkey.example.com.  3600  IN  TXT  "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA..."
```

When a mail server sends email, it signs the message headers with its private key. The recipient verifies this signature using the public key in the DKIM TXT record.

### DMARC (Domain-based Message Authentication, Reporting & Conformance)
DMARC builds on SPF and DKIM, providing policy instructions and reporting:

```
_dmarc.example.com.  3600  IN  TXT  "v=DMARC1; p=reject; sp=reject; rua=mailto:dmarc-reports@example.com; pct=100"
```

### Domain Verification
Services like Google, GitHub, Facebook, and many others ask you to add a TXT record to prove ownership of a domain:

```
example.com.  3600  IN  TXT  "google-site-verification=WD8bktiAx2XNhAYnSMwKQB"
example.com.  3600  IN  TXT  "MS=ms12345678"
_github-challenge-myorg.example.com.  3600  IN  TXT  "abc123"
```

### Other Uses
- **ACME Challenge** (Let's Encrypt TLS certificate validation):
  ```
  _acme-challenge.example.com.  120  IN  TXT  "HGr8U1IewSarmV18tVlw..."
  ```
- **Keybase identity verification**
- **Apple domain association**
- **Atlassian/Jira verification**

**Multiple TXT records**: A domain can have multiple TXT records, and they can coexist for the same name (unlike CNAME). TXT record data can be up to 255 bytes per string, but multiple strings can be concatenated if more space is needed.

---

## 2.8 SOA Record (Start of Authority Record)

**Purpose**: The SOA record marks the beginning of a DNS zone and contains essential administrative information about the zone. Every zone must have exactly one SOA record, and it must be the first record in a zone file.

**Format**:
```
name    TTL    IN    SOA    primary-ns    admin-email    (
                             serial        ; Serial number
                             refresh       ; Refresh interval
                             retry         ; Retry interval
                             expire        ; Expiry interval
                             minimum )     ; Minimum TTL / Negative caching TTL
```

**Example**:
```
example.com.  3600  IN  SOA  ns1.example.com.  hostmaster.example.com.  (
                             2024031501   ; Serial
                             7200         ; Refresh (2 hours)
                             3600         ; Retry (1 hour)
                             1209600      ; Expire (14 days)
                             300 )        ; Minimum TTL (5 minutes)
```

**Field explanations**:

- **Primary NS** (`ns1.example.com.`): The primary (master) nameserver for this zone. Secondary nameservers know to sync from this one.

- **Admin Email** (`hostmaster.example.com.`): The email address of the zone administrator, with the first dot replacing the `@` symbol. So `hostmaster.example.com` means `hostmaster@example.com`. The traditional address is `hostmaster@`, though others are used.

- **Serial Number** (`2024031501`): A version number for the zone. Must increase every time the zone changes. Secondary nameservers compare their serial number to the primary's; if the primary's is higher, they initiate a zone transfer to get the latest data. The common convention is `YYYYMMDDnn` where `nn` is a two-digit sequence for multiple changes in one day.

- **Refresh** (`7200`): How often (in seconds) secondary nameservers should poll the primary to check if the serial number has changed. 2 hours is common.

- **Retry** (`3600`): If a secondary can't reach the primary during a refresh check, how many seconds to wait before trying again. Should be less than Refresh.

- **Expire** (`1209600`): If a secondary can't reach the primary for this many seconds (14 days), it stops serving the zone entirely, considering its data stale. This prevents serving outdated information indefinitely.

- **Minimum TTL** (`300`): This serves two purposes. Historically it was the default TTL for records without explicit TTLs. Per RFC 2308, it is now primarily used as the **negative caching TTL** — how long resolvers cache the fact that a record *doesn't exist* (NXDOMAIN responses).

**Zone transfers**: Secondary nameservers use two mechanisms to stay synchronized:
- **AXFR** (Full Zone Transfer): Transfer the complete zone file
- **IXFR** (Incremental Zone Transfer): Transfer only changes since a given serial number

**Real-world significance**: The SOA record is the administrative backbone of a zone. DNS administrators query SOA records to verify zone synchronization, check serial numbers, and troubleshoot replication issues. Zone transfers between primary and secondary nameservers keep the entire DNS system's secondaries consistent with the primary's data.

---

## 2.9 SRV Record (Service Record)

**Purpose**: Specifies the location (hostname and port) of servers for specific protocols and services. SRV records generalize the MX concept — while MX handles mail, SRV handles any service.

**Format**:
```
_service._proto.name    TTL    IN    SRV    priority    weight    port    target
```

**Examples**:
```
_sip._tcp.example.com.     3600  IN  SRV  10  60  5060  sip1.example.com.
_sip._tcp.example.com.     3600  IN  SRV  10  40  5060  sip2.example.com.
_sip._tcp.example.com.     3600  IN  SRV  20  0   5060  sip-backup.example.com.

_xmpp-client._tcp.example.com.  3600  IN  SRV  5  0  5222  xmpp.example.com.

_minecraft._tcp.example.com.    3600  IN  SRV  0  5  25565  mc.example.com.
```

**Field explanations**:

- **_service**: The symbolic name of the service (defined in IANA's service name registry, or custom)
- **_proto**: Transport protocol, typically `_tcp` or `_udp`
- **priority**: Lower = higher priority (same as MX)
- **weight**: Used for load balancing among same-priority records. Higher weight = more traffic. In the SIP example, `sip1` gets 60/(60+40) = 60% of traffic, `sip2` gets 40%.
- **port**: The TCP/UDP port number for the service
- **target**: The hostname of the server (must have A/AAAA records)

**The weight algorithm**: When multiple SRV records have the same priority, clients should select among them using weighted random selection. A server with weight 60 should receive 60% of connections relative to a pool of 100 total weight.

**Common SRV record usages**:

- **SIP (VoIP)**: `_sip._tcp`, `_sip._udp`, `_sips._tcp`
- **XMPP (Jabber messaging)**: `_xmpp-client._tcp`, `_xmpp-server._tcp`
- **Minecraft**: `_minecraft._tcp`
- **Microsoft services**: `_kerberos._tcp`, `_ldap._tcp`, `_gc._tcp`
- **CalDAV/CardDAV**: `_caldavs._tcp`, `_carddavs._tcp`
- **Discord (game activity)**: Custom SRV records for game servers
- **Kubernetes**: Internal service discovery uses DNS SRV records

**Auto-discovery**: SRV records enable clients to automatically discover service endpoints without manual configuration. For example, a XMPP client connecting to `user@example.com` can automatically find the XMPP server by querying `_xmpp-client._tcp.example.com` without needing the user to enter a server address.

**Microsoft Active Directory**: AD relies heavily on SRV records for domain controller discovery:
```
_ldap._tcp.dc._msdcs.example.com.  600  IN  SRV  0  100  389  dc1.example.com.
_kerberos._tcp.example.com.        600  IN  SRV  0  100  88   dc1.example.com.
```

---

## 2.10 PTR Record (Pointer Record)

**Purpose**: Performs **reverse DNS lookups** — mapping an IP address back to a hostname. While A records map names to IPs, PTR records map IPs to names. They are stored in a special domain called `in-addr.arpa` for IPv4 and `ip6.arpa` for IPv6.

**Format**:
```
reversed-ip.in-addr.arpa.    TTL    IN    PTR    hostname
```

**Why reversed?** IP addresses in PTR records are written in reverse order so they fit into the DNS hierarchy naturally. The DNS tree goes from least specific (rightmost) to most specific (leftmost). An IP address goes from most specific to least specific (left to right). Reversing it aligns them.

**IPv4 Example**:
For the IP `203.0.113.25`:
- Reversed: `25.113.0.203`
- PTR record name: `25.113.0.203.in-addr.arpa.`

```
25.113.0.203.in-addr.arpa.  3600  IN  PTR  mail.example.com.
```

**IPv6 Example**:
For the IPv6 address `2001:db8::1`:
- Full form: `2001:0db8:0000:0000:0000:0000:0000:0001`
- Each nibble reversed and separated by dots: `1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.b.d.0.1.0.0.2`
- PTR record name: `1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.b.d.0.1.0.0.2.ip6.arpa.`

```
1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.b.d.0.1.0.0.2.ip6.arpa.  3600  IN  PTR  host.example.com.
```

**Who controls PTR records?** Unlike forward DNS (A/AAAA), which is controlled by the domain registrant, PTR records are controlled by the **IP address owner** — usually the ISP or hosting provider. If you have a block of IP addresses, your ISP delegates the `in-addr.arpa` zone for that block to you.

For a /24 block like `203.0.113.0/24`, the ISP delegates `113.0.203.in-addr.arpa` to you, allowing you to set PTR records for all 256 addresses.

**Real-world uses**:

1. **Email delivery**: Many mail servers check that the sending IP has a PTR record (reverse DNS) and that the PTR record resolves back to the same IP (forward-confirmed reverse DNS, or FCrDNS). Missing PTR records often cause mail to be rejected or flagged as spam. Example: if `203.0.113.25` sends mail and has PTR `mail.example.com`, then `mail.example.com` should have an A record pointing back to `203.0.113.25`.

2. **Network troubleshooting**: Tools like `traceroute` use PTR records to display human-readable hostnames for each hop instead of bare IP addresses:
   ```
   3  ae-3.r06.parsfr02.de.bb.gin.ntt.net (203.0.113.1)  12.345 ms
   ```

3. **Security and logging**: Log analysis, intrusion detection systems, and security tools use reverse DNS to identify the organization behind an IP address.

4. **Logging and auditing**: Web server logs can use PTR lookups to log client hostnames instead of raw IPs.

---

## 2.11 Additional Record Types

Beyond the primary types covered above, several other record types deserve mention:

### CAA — Certification Authority Authorization
Specifies which certificate authorities (CAs) are allowed to issue TLS certificates for a domain. Prevents unauthorized certificate issuance.

```
example.com.  3600  IN  CAA  0  issue "letsencrypt.org"
example.com.  3600  IN  CAA  0  issuewild ";"
example.com.  3600  IN  CAA  0  iodef "mailto:security@example.com"
```

- `issue`: which CAs can issue standard (non-wildcard) certificates
- `issuewild`: which CAs can issue wildcard certificates (`*.example.com`)
- `iodef`: where to report policy violations

### NAPTR — Naming Authority Pointer
Used for ENUM (telephone number to URI mapping) and SIP routing. Complex and specialized.

### DS and DNSKEY — DNSSEC Records
Part of the DNSSEC (DNS Security Extensions) framework:
- **DNSKEY**: Contains cryptographic public keys used to sign a zone
- **DS** (Delegation Signer): A hash of a DNSKEY, stored in the parent zone, creating a chain of trust

### TLSA — TLS Authentication
Part of DANE (DNS-Based Authentication of Named Entities). Associates a TLS certificate with a domain via DNS.

```
_443._tcp.example.com.  3600  IN  TLSA  3 1 1 abc123...
```

### SSHFP — SSH Fingerprint
Stores SSH public key fingerprints, allowing clients to verify SSH server identity via DNS.

---

# Chapter 3 — DNS Resolvers: Recursive vs. Authoritative

## 3.1 The Two Fundamental Types

The DNS system distinguishes between two fundamentally different types of nameservers based on their role in the resolution process:

1. **Authoritative nameservers**: Hold the actual DNS records for specific zones. They are the source of truth.
2. **Recursive resolvers** (also called recursive nameservers or DNS resolvers): Do the work of finding answers by querying the DNS hierarchy on behalf of clients.

Understanding the distinction between these two is essential to understanding how DNS actually works.

## 3.2 Authoritative Nameservers

An authoritative nameserver **holds zone data** for specific domains and responds with authoritative answers — answers it knows for certain because it has the zone file.

When an authoritative nameserver responds, it sets the **AA (Authoritative Answer)** bit in the DNS response. This flag tells the querying resolver "I am the authority for this zone; this is a definitive answer."

Authoritative nameservers come in two subtypes:

**Primary (Master) Nameserver**: Holds the original, editable zone file. Zone changes are made on the primary. Every domain needs exactly one primary nameserver.

**Secondary (Slave) Nameserver**: Holds read-only copies of the zone file, obtained through zone transfers from the primary. Secondaries serve the same data as the primary and answer queries with equal authority. They provide redundancy and load distribution.

**Example authoritative nameserver query** (using `dig`):
```
$ dig @ns1.google.com google.com A

;; ANSWER SECTION:
google.com.  300  IN  A  142.250.80.46

;; flags: qr aa rd; QUERY: 1, ANSWER: 1
```

Notice the `aa` flag in the response — this is the Authoritative Answer bit.

**Who runs authoritative nameservers?**
- Domain registrants (for self-hosted DNS)
- DNS providers: Cloudflare, AWS Route 53, Google Cloud DNS, NS1
- Domain registrars that include DNS hosting: GoDaddy, Namecheap
- Companies running their own infrastructure

## 3.3 Recursive Resolvers

A recursive resolver (sometimes called a **full-service resolver** or **recursive nameserver**) is the DNS server that your computer or network device talks to when it has a DNS question. The resolver doesn't usually have the answer itself — instead, it goes and finds it by working through the DNS hierarchy.

The word "recursive" refers to the fact that the resolver handles the entire resolution process on behalf of the client and returns a final answer, abstracting away all the intermediate steps.

**Who provides recursive resolvers?**
- **Your ISP**: Traditionally, your ISP configures your router to use their resolvers
- **Public DNS providers**: Google (`8.8.8.8`, `8.8.4.4`), Cloudflare (`1.1.1.1`, `1.0.0.1`), OpenDNS (`208.67.222.222`), Quad9 (`9.9.9.9`)
- **Enterprise DNS**: Companies run internal resolvers for their employees
- **Local resolvers**: Programs like `systemd-resolved` or `dnsmasq` on Linux, running locally on a machine

## 3.4 The Resolution Process — Step by Step

Here is a complete walkthrough of what happens when you type `www.example.com` into your browser for the very first time (assuming no caching anywhere):

```
[Your Computer / Application]
    |
    | 1. Query: What is the IP for www.example.com?
    v
[Stub Resolver] ──────────────────────────────────────────────────────────────
    |
    | 2. Forwards query to configured recursive resolver
    v
[Recursive Resolver] (e.g., 8.8.8.8)
    |
    | 3. Checks cache: nothing found
    | 4. Needs to start from the top — queries a root server
    v
[Root Nameserver] (e.g., a.root-servers.net)
    |
    | 5. Returns referral: "I don't know www.example.com, but
    |    the .com TLD servers are at a.gtld-servers.net"
    |    (This is a REFERRAL — not an answer, but a pointer)
    v
[Recursive Resolver] — receives the referral
    |
    | 6. Queries the .com TLD server
    v
[.com TLD Nameserver] (a.gtld-servers.net)
    |
    | 7. Returns referral: "I don't know www.example.com, but
    |    the nameservers for example.com are ns1.example.com
    |    and ns2.example.com"
    v
[Recursive Resolver] — receives the referral
    |
    | 8. Queries example.com's authoritative nameserver
    v
[Authoritative NS for example.com] (ns1.example.com)
    |
    | 9. Returns ANSWER: "www.example.com has IP 93.184.216.34"
    |    (AA bit set — authoritative answer)
    v
[Recursive Resolver]
    |
    | 10. Caches the answer with its TTL
    | 11. Returns the answer to your computer
    v
[Your Computer] — connects to 93.184.216.34 on port 80 or 443
```

This entire process typically completes in **20-200 milliseconds** — often faster than you'd notice. In practice, because of caching (discussed in Chapter 4), steps 3-9 are frequently skipped for popular domains.

## 3.5 Iterative vs. Recursive Queries

There is an important distinction in *how* the recursive resolver asks questions:

**Recursive queries**: "Give me the final answer, I don't care how you find it." Your client sends a recursive query to the recursive resolver (with the `RD` — Recursion Desired — bit set). The resolver does all the work.

**Iterative queries**: "Give me the best answer you have, or tell me who knows more." The recursive resolver uses iterative queries when talking to authoritative servers. The authoritative server either answers (if it's authoritative for the queried name) or refers the resolver to another nameserver.

So the typical flow is:
- Client → Recursive Resolver: **Recursive query** (RD bit set)
- Recursive Resolver → Root/TLD/Authoritative: **Iterative queries** (not expecting full recursion)

## 3.6 Stub Resolvers

Your computer doesn't actually implement full DNS resolution. It uses a **stub resolver** — a minimal DNS client that:
1. Accepts DNS queries from applications
2. Forwards them to a configured recursive resolver
3. Returns the answer

The stub resolver knows nothing about the DNS hierarchy — it just asks the recursive resolver to handle everything. On Linux, the stub resolver reads `/etc/resolv.conf` to find the recursive resolver's address. On Windows, it's configured via network adapter settings.

Modern systems sometimes have **local recursive resolvers** (like `systemd-resolved`) acting as a stub that also performs some local caching, forwarding to upstream resolvers as needed.

## 3.7 Negative Responses

Not every DNS query succeeds. There are two types of negative responses:

**NXDOMAIN** (Non-Existent Domain): The queried domain name does not exist at all. If you query `nonexistent.example.com` and there's no such record, the authoritative server returns NXDOMAIN.

**NOERROR with empty answer (NODATA)**: The domain exists, but has no records of the queried type. For example, querying for a AAAA record on a domain that only has A records returns NOERROR with an empty answer section.

Negative responses are also cached, according to the SOA record's Minimum TTL field, to prevent repeated lookups for non-existent names.

---

# Chapter 4 — DNS Caching and TTL

## 4.1 Why Caching is Essential

Without caching, the global DNS infrastructure would collapse under load. Consider that billions of DNS queries occur every second worldwide. If every query had to traverse the full hierarchy from root servers down to authoritative nameservers, the root servers would be overwhelmed within milliseconds.

Caching is the mechanism that makes DNS scalable. By storing previously resolved answers temporarily, recursive resolvers can answer most queries locally without going back to authoritative servers.

According to Cloudflare's research, approximately **80-90% of DNS queries** are answered from cache by recursive resolvers, meaning only 10-20% of queries actually hit authoritative nameservers.

## 4.2 Time To Live (TTL)

Every DNS resource record includes a **TTL (Time To Live)** value — a number of seconds specifying how long the record may be cached before it must be refreshed.

```
www.example.com.  3600  IN  A  93.184.216.34
```

In this record, the `3600` is the TTL — this A record can be cached for 3600 seconds (1 hour).

**When the TTL expires**: The caching resolver discards the entry and will fetch a fresh copy on the next query. The TTL is not a renewal mechanism — it's a maximum cache lifetime.

**TTL countdown**: Importantly, when a recursive resolver passes a cached record to a client, it returns the **remaining TTL**, not the original. If a record was cached 900 seconds ago with a 3600-second TTL, the resolver returns a TTL of 2700 seconds to the client.

## 4.3 Choosing TTL Values

TTL values represent a trade-off between **consistency** (how quickly changes propagate) and **performance** (how much load is reduced by caching):

| TTL | Duration | Best for |
|-----|----------|----------|
| 60 | 1 minute | Records that change frequently; pre-change preparation |
| 300 | 5 minutes | Frequently changing infrastructure |
| 900 | 15 minutes | Regular operational records |
| 3600 | 1 hour | Standard operational records |
| 86400 | 1 day | Stable records (NS, MX) |
| 604800 | 1 week | Highly static records |

**Practical advice for changes**: Before making a DNS change (especially IP changes), lower the TTL to 60 or 300 seconds 24-48 hours in advance. After the change is made and verified, raise the TTL back to normal. This minimizes propagation delay.

**Why not always use very low TTLs?** Low TTLs mean more queries hit authoritative nameservers, increasing load and potentially cost (many DNS providers charge per query). They also make the authoritative nameserver a single point of failure — if it goes down, clients can't resolve names quickly.

**Why not always use very high TTLs?** High TTLs make changes slow to propagate. If you need to update an IP address urgently (e.g., your server is down, you're switching hosts), a 24-hour TTL means clients may continue trying the old IP for up to 24 hours.

## 4.4 Where Caching Occurs

DNS caching happens at multiple levels in the resolution chain:

### 1. Browser Cache
Web browsers maintain their own DNS cache, separate from the operating system. Chrome, Firefox, and Edge all cache DNS responses:

- **Chrome**: Cache viewable at `chrome://net-internals/#dns`
- **Firefox**: Cache viewable at `about:networking#dns`
- Browser DNS cache typically has a default maximum TTL regardless of what the DNS response says (Chrome caps at 1 minute for some records, for example)

### 2. Operating System Cache
The OS has its own DNS cache, managed by:
- **Windows**: DNS Client service (`ipconfig /displaydns`, `ipconfig /flushdns`)
- **macOS**: `dscacheutil` or `mDNSResponder` (`sudo dscacheutil -flushcache`)
- **Linux**: Varies — `systemd-resolved`, `nscd`, `dnsmasq`, or no cache at all depending on distribution and configuration

### 3. Local Resolver Cache
Programs like `systemd-resolved` or `dnsmasq` run locally and maintain caches, serving as a local DNS server for all applications on the machine.

### 4. Recursive Resolver Cache
This is the most impactful cache. A public recursive resolver like Google's `8.8.8.8` or Cloudflare's `1.1.1.1` serves millions of clients. When one client queries for `google.com`, that response is cached and served instantly to all subsequent clients querying the same name.

### 5. Negative Caching
When a resolver receives an NXDOMAIN (non-existent domain) or NODATA response, it caches this negative result too. The duration is controlled by the SOA record's Minimum TTL field. This prevents repeated lookups for names that don't exist.

## 4.5 TTL Propagation and "DNS Propagation"

When people talk about "DNS propagation taking 48 hours," they're referring to the fact that different resolvers around the world have cached your old DNS records for different amounts of time, and all those caches need to expire before the new records are universally seen.

There is no active "push" mechanism in DNS — resolvers don't get notified when records change. They simply wait for their cached TTL to expire and then fetch fresh data.

**Reality check**: With modern TTLs:
- If your TTL was 300 seconds (5 minutes), propagation completes in 5 minutes
- If your TTL was 3600 seconds (1 hour), propagation completes in 1 hour
- If your TTL was 86400 seconds (24 hours), propagation can take up to 24 hours

The "48 hours" figure comes from the NS record TTL, which is often 48 hours, combined with ISP resolvers that may ignore TTLs and cache for their own fixed duration.

## 4.6 DNS Prefetching

Modern browsers and recursive resolvers implement **DNS prefetching** — speculatively resolving domain names before the user actually needs them:

- Browsers prefetch DNS for all links on a page the user might click
- HTML tag: `<link rel="dns-prefetch" href="//example.com">`
- This hides DNS latency for most navigations

## 4.7 Monitoring and Debugging TTL Issues

Diagnosing TTL problems:

```bash
# Check the current TTL of a record
$ dig www.example.com A

;; ANSWER SECTION:
www.example.com.  2743  IN  A  93.184.216.34
# TTL of 2743 means this resolver cached it 857 seconds ago (3600-2743)

# Query an authoritative nameserver directly (bypass cache)
$ dig @ns1.example.com www.example.com A

# Check TTL from multiple global resolvers
$ dig @8.8.8.8 www.example.com A    # Google
$ dig @1.1.1.1 www.example.com A    # Cloudflare
$ dig @9.9.9.9 www.example.com A    # Quad9
```

Tools like [dnschecker.org](https://dnschecker.org) or [whatsmydns.net](https://whatsmydns.net) query DNS from dozens of geographic locations simultaneously, showing how propagation has progressed worldwide.

---

# Chapter 5 — DNS over HTTPS and DNS over TLS

## 5.1 The Problem: Traditional DNS is Plaintext

In traditional DNS (as defined in the original 1983 RFC), queries and responses are sent in **plaintext over UDP port 53** (or TCP port 53 for large responses and zone transfers). This means anyone who can observe network traffic — your ISP, a network administrator, a man-in-the-middle attacker on a public Wi-Fi network, or a surveillance system — can see:

- Every domain name you look up
- Which IP addresses your devices connect to
- Your browsing patterns, app usage, and communication partners

This is not a theoretical concern. DNS traffic analysis is widely used for:
- ISP monitoring and traffic management
- Government surveillance (documented in numerous cases)
- Advertising analytics and profiling
- Network-level content filtering and censorship
- Attack targeting (knowing what services a network uses)

Even if your HTTPS connections are encrypted, DNS leaks the domain names you're connecting to — a significant privacy compromise.

## 5.2 DNS over TLS (DoT)

**DNS over TLS** (DoT), defined in **RFC 7858** (2016), wraps DNS queries in a **TLS (Transport Layer Security)** tunnel, providing encryption and authentication.

**How it works**:
1. The client establishes a TLS connection to the resolver on **port 853**
2. Once the TLS handshake completes, DNS queries and responses flow through the encrypted tunnel
3. The resolver's TLS certificate can be validated, preventing impersonation

**Configuration example** (systemd-resolved on Linux):
```ini
[Resolve]
DNS=1.1.1.1
DNSOverTLS=yes
```

**Advantages of DoT**:
- DNS traffic is encrypted and authenticated
- The resolver's identity is verified via TLS certificate
- Clear separation from HTTPS traffic (uses different port)
- Network administrators can identify DoT traffic (which can be a feature or a bug, depending on perspective)

**Disadvantages of DoT**:
- Uses a distinct port (853) that can be easily blocked by firewalls
- Corporate networks blocking DoT can force fallback to unencrypted DNS
- Slightly more overhead from TLS connection setup

**Major DoT providers**:
- Cloudflare: `1.1.1.1`, `1.0.0.1` (hostname: `cloudflare-dns.com`)
- Google: `8.8.8.8`, `8.8.4.4` (hostname: `dns.google`)
- Quad9: `9.9.9.9` (hostname: `dns.quad9.net`)
- AdGuard DNS, NextDNS, and many others

## 5.3 DNS over HTTPS (DoH)

**DNS over HTTPS** (DoH), defined in **RFC 8484** (2018), encodes DNS queries as HTTPS requests, sending them to a resolver via standard HTTPS on **port 443**.

**How it works**:
1. DNS queries are encoded as HTTP requests (using the `application/dns-message` media type)
2. These are sent over a standard HTTPS connection to a DoH resolver's URL
3. The response is decoded from the HTTP response body

**DoH request format** (GET method):
```
GET /dns-query?dns=AAABAAABAAAAAAAA...base64-encoded-query
Host: cloudflare-dns.com
Accept: application/dns-message
```

**DoH request format** (POST method):
```
POST /dns-query
Host: cloudflare-dns.com
Content-Type: application/dns-message
Content-Length: 33

[binary DNS query body]
```

**Major DoH endpoints**:
- Cloudflare: `https://cloudflare-dns.com/dns-query`
- Google: `https://dns.google/dns-query`
- Quad9: `https://dns.quad9.net/dns-query`
- AdGuard: `https://dns.adguard.com/dns-query`

**Advantages of DoH**:
- Traffic is completely indistinguishable from normal HTTPS web traffic
- Impossible to block without blocking all HTTPS traffic (major advantage for bypassing censorship)
- Works through HTTP/2, enabling request multiplexing and reduced overhead
- Widely supported in browsers (Firefox, Chrome, Edge all support DoH)

**Disadvantages of DoH**:
- Mixes DNS traffic with web traffic, making it harder for network administrators to monitor
- Concerns about centralization — if everyone uses the same DoH provider (e.g., Cloudflare), that provider can see all DNS traffic
- Complicates enterprise network monitoring and security tools

**Browser DoH support**:

Firefox was the first major browser to enable DoH by default (in the US, 2020), using Cloudflare as the default provider. Chrome and Edge followed with their own implementations.

Firefox DoH configuration:
```
Settings → Network Settings → Enable DNS over HTTPS
```

In Firefox, DoH is implemented through **Trusted Recursive Resolvers (TRR)**, with Cloudflare and NextDNS as default options.

## 5.4 DoH vs. DoT — Comparison

| Feature | DoT | DoH |
|---------|-----|-----|
| Port | 853 | 443 |
| Protocol | TLS | HTTPS (TLS + HTTP) |
| Firewallable | Yes (block port 853) | Very difficult |
| Network visibility | Traffic is identifiable as DNS | Looks like regular HTTPS |
| Overhead | Lower | Slightly higher (HTTP framing) |
| Browser support | No (OS/app level) | Yes (native browser support) |
| Performance | Good | Good (HTTP/2 helps) |
| Enterprise friendliness | Better | Controversial |

## 5.5 Oblivious DNS (ODoH)

A more advanced privacy approach is **Oblivious DoH (ODoH)**, defined in **RFC 9230**. In ODoH, an additional **proxy server** sits between the client and the resolver:

```
Client → [Proxy] → [Resolver]
```

The resolver never sees the client's IP (only the proxy's IP), and the proxy never sees the DNS query content (it's encrypted for the resolver only). This provides stronger privacy guarantees — even the resolver can't link queries to specific clients.

Cloudflare has implemented ODoH and offers it as an experimental feature. Apple uses a similar concept called **iCloud Private Relay**, which routes traffic through two separate hops for privacy.

## 5.6 DNS over QUIC (DoQ)

**DNS over QUIC** (**RFC 9250**, 2022) uses the QUIC transport protocol (which underlies HTTP/3) for DNS. QUIC offers:
- Faster connection setup (0-RTT in some cases)
- Multiplexing without head-of-line blocking
- Built-in encryption (no separate TLS handshake)
- Better performance on lossy networks (used by mobile devices)

DoQ uses **port 853** (same as DoT). Adoption is growing but still limited compared to DoH and DoT.

## 5.7 Impact on Enterprise Networks

Encrypted DNS creates significant challenges for enterprise security:
- DNS-based content filtering is bypassed
- Security tools that monitor DNS for threats (DGA detection, C2 detection) can't see DoH traffic
- Data loss prevention systems may be bypassed

Enterprise responses:
- Force all DNS through internal resolvers that implement DoH/DoT themselves
- Block known DoH endpoints at the firewall level
- Use DNS Response Policy Zones (RPZ) on internal resolvers
- Deploy DNS security gateways (Cisco Umbrella, Cloudflare Gateway, Infoblox)

---

# Chapter 6 — DNS Spoofing and Cache Poisoning

## 6.1 The Security Problem with Traditional DNS

Traditional DNS was designed in an era of trusted networks, before the modern threat landscape existed. The original design has several weaknesses that make it vulnerable to attack:

1. **No authentication**: DNS responses carry no cryptographic proof that they come from the legitimate authoritative nameserver
2. **UDP-based**: DNS primarily uses UDP, which is connectionless and easily spoofed
3. **Weak transaction ID**: Originally, only a 16-bit transaction ID distinguished DNS queries

These weaknesses enable a class of attacks known as **DNS spoofing** (or **cache poisoning**), where an attacker provides false DNS answers that get cached by resolvers, redirecting users to malicious servers.

## 6.2 How Cache Poisoning Works

The basic attack principle:

1. The attacker triggers the recursive resolver to make a DNS query for a target domain
2. The attacker floods the resolver with forged responses, pretending to be the authoritative nameserver
3. If the forged response is accepted before the legitimate one arrives, the poisoned record is cached
4. All clients using that resolver are now redirected to the attacker's server for the duration of the TTL

**The race condition**: DNS over UDP is a simple request-response protocol with a 16-bit transaction ID. In the original design, if an attacker can:
- Guess the transaction ID (only 65,536 possibilities)
- Send a response before the real authoritative server

...they win the race. For a 56 kbps connection era, this was slow enough that it seemed secure. By the 2000s, it was clearly not.

## 6.3 The Kaminsky Attack (2008)

The most significant cache poisoning technique was discovered by security researcher **Dan Kaminsky** in 2008 and is known as the **Kaminsky Attack**.

The clever insight of Kaminsky's attack was to bypass the limitation that the resolver already has a cached record for the exact name queried:

**Traditional poisoning limitation**: 
- Query: `www.example.com`
- Resolver already has `www.example.com` cached → attack fails

**Kaminsky's solution**: Query random subdomains that definitely aren't cached:
- Query: `abcdef.example.com`
- This is almost certainly not cached
- Along with the forged NXDOMAIN response for `abcdef.example.com`, the attacker includes **fraudulent glue records** in the Additional section, claiming to be the authoritative nameserver for the entire `example.com` zone
- If successful, the resolver now has a poisoned NS record for `example.com`, redirecting all future queries for any subdomain to the attacker's server

**The attack workflow**:
```
1. Attacker → Resolver: "Please resolve random1.example.com"
2. Resolver → Authoritative NS (legitimate): "What is random1.example.com?"
   [simultaneously]
3. Attacker → Resolver: "I am ns1.example.com, here is the answer:
   random1.example.com = NXDOMAIN
   ns1.example.com = <attacker's IP>  [fraudulent glue]"
4. Attacker sends thousands of forged responses with different transaction IDs,
   hoping to guess correctly before the real answer arrives
5. If guess is correct, the resolver caches the poisoned NS record
6. Now ALL queries for *.example.com go to the attacker's server
```

The birthday paradox makes guessing easier than it seems: with 65,536 possible transaction IDs, and the ability to send thousands of forged responses per second, success probability within seconds is high.

Kaminsky reported this vulnerability privately to a coordinated group of DNS software vendors and released a patch on July 8, 2008. It was one of the most significant coordinated disclosure events in internet history.

## 6.4 Defenses Against Cache Poisoning

### Source Port Randomization
The primary immediate mitigation was **source port randomization** (also called query source port randomization). Instead of sending all queries from a fixed source port, the resolver randomizes the UDP source port, adding another ~16 bits of entropy:

- Transaction ID: 16 bits = 65,536 combinations
- Source port: ~15 bits (range 1024-65535) = ~64,000 combinations
- Combined: ~2³¹ = 2 billion combinations

This makes brute-force guessing impractical in the time available.

### 0x20 Encoding
An additional technique sends DNS queries with mixed case letters (e.g., `wWw.ExAmPlE.cOm`) — the resolver records the original case and requires responses to mirror it exactly. This adds a case fingerprint that attackers can't easily replicate.

### DNSSEC — The Cryptographic Solution
**DNSSEC (DNS Security Extensions)**, defined in RFCs 4033-4035, provides cryptographic authentication of DNS responses. Instead of relying on protocol-level obfuscation, DNSSEC adds digital signatures:

**How DNSSEC works**:
1. Zone administrators generate a public/private key pair
2. Every DNS record is digitally signed using the private key
3. The signature is stored as an **RRSIG** record alongside the data record
4. Validating resolvers use the public key (from the **DNSKEY** record) to verify signatures
5. A chain of trust is established from the root zone down through TLDs to individual zones via **DS** (Delegation Signer) records

**DNSSEC record types**:
- **DNSKEY**: Contains the zone's public signing key
- **RRSIG**: Cryptographic signature over a set of records
- **DS**: Hash of a child zone's DNSKEY, stored in the parent zone
- **NSEC/NSEC3**: Proof that a record does not exist (enables authenticated denial of existence)

**The chain of trust**:
```
Root Zone (signed with root key — "DNS Root Trust Anchor")
    ↓ (DS record)
.com Zone (signed)
    ↓ (DS record)
example.com Zone (signed)
    ↓ (RRSIG records on every record set)
www.example.com A record (signed)
```

If any link in this chain is broken, validation fails and the resolver rejects the answer (or falls back to unsecured, depending on configuration).

**DNSSEC limitations**:
- **Complexity**: Zone signing, key management, and key rollovers are complex
- **Not encrypted**: DNSSEC signs data but does not encrypt it — traffic is still visible
- **Amplification attacks**: DNSSEC responses are larger, potentially usable in DDoS amplification
- **Deployment gaps**: Not all zones are DNSSEC-signed; adoption has been slow

**DNSSEC deployment statistics**: As of the mid-2020s, approximately 90%+ of the root zone and major TLDs are DNSSEC-signed. However, only about 30-50% of second-level domains have DNSSEC, and validation rates vary widely by resolver.

### Other Attack Types

**DNS Hijacking**: Rather than poisoning a cache, attackers compromise the DNS infrastructure itself:
- **Registrar hijacking**: Gaining control of a domain's registrar account and changing NS records
- **Nameserver compromise**: Hacking the authoritative nameserver directly
- **Router compromise**: Changing DNS settings on home routers (common in malware attacks)

**BGP Hijacking of DNS**: Attackers can announce more specific BGP routes for IP ranges belonging to DNS infrastructure, routing traffic to attacker-controlled servers. This has occurred against DNS providers in notable real-world incidents.

**DNS Rebinding**: An attack where a malicious website causes a browser to make requests to internal network addresses:
1. Victim visits `attacker.com`
2. `attacker.com` resolves to `203.0.113.100` (attacker's server)
3. Browser loads the page, JavaScript executes
4. Attacker changes `attacker.com` DNS to resolve to `192.168.1.1` (victim's router)
5. After TTL expires, the browser is making "same-origin" requests to the router
6. JavaScript can now interact with the internal network resource

**Mitigations** include: short TTLs not being the issue (the rebinding happens after TTL expires naturally), DNS rebinding protection in resolvers (blocking private IP ranges in public DNS responses), and browser-side protections.

---

# Chapter 7 — Domain Registration Lifecycle

## 7.1 The Domain Registration Ecosystem

Domain registration is governed by a structured ecosystem with distinct roles:

**ICANN** (Internet Corporation for Assigned Names and Numbers): The global coordinator of the DNS system. ICANN accredits registrars, coordinates with registries, establishes policy, and manages the IANA functions (root zone management, IP address allocation coordination).

**Registries**: Organizations that manage specific TLDs. Verisign manages `.com` and `.net`. The Public Interest Registry (PIR) manages `.org`. Each country's ccTLD has its own registry (Nominet for `.uk`, DENIC for `.de`). Registries maintain the TLD zone file and set policies for registration.

**Registrars**: Companies accredited by ICANN (and/or registries) to sell domain registrations directly to the public. Examples include:
- GoDaddy, Namecheap, Google Domains, Cloudflare Registrar, Hover, Name.com

**Registrants**: The end users — individuals, companies, and organizations that register domains for their use.

**Resellers**: Companies that sell domain registrations through relationships with accredited registrars (they are not themselves ICANN-accredited).

The flow of data and authority:
```
ICANN
  ↓ (accredits)
Registries (manage TLD zones)
  ↓ (wholesale)
Registrars (sell to public)
  ↓ (sell to)
Registrants (domain owners)
```

## 7.2 The Registration Process

When you register a domain, the following steps occur:

### Step 1 — Search and Availability Check
The registrar queries the registry's WHOIS or RDAP (Registration Data Access Protocol) service to check if the domain is available.

### Step 2 — Agreement and Payment
You agree to the registrar's terms of service (which incorporate ICANN's Registrant Rights and Responsibilities) and pay the registration fee.

**Pricing tiers**:
- **Registration fee**: What you pay to register (first year)
- **Renewal fee**: Annual fee to maintain the registration (often higher than registration)
- **Transfer fee**: Fee to move the domain to another registrar (sometimes free)
- **Restore fee**: Fee to recover a domain from expired status (often very high, $100-300)

### Step 3 — Registry Update
The registrar submits the registration to the registry through the **Extensible Provisioning Protocol (EPP)** — the standard protocol for registrar-registry communication. The registry adds the domain to the TLD zone file.

### Step 4 — WHOIS Record Creation
A WHOIS record is created with the registrant's contact information (name, address, email, phone). Privacy protection (WHOIS masking) is increasingly common and required by many registrars to comply with GDPR.

### Step 5 — DNS Propagation
NS records are added to the TLD zone pointing to the specified nameservers. DNS propagation of NS records can take hours.

## 7.3 The Domain Lifecycle — All States

A domain goes through a well-defined lifecycle with specific states:

### 1. Available
The domain has never been registered (or has been deleted and returned to availability). Anyone can register it.

### 2. Active (Registered)
The domain is registered and in normal use. The registrant has full control.

**Typical active domain statuses (EPP codes)**:
- `clientTransferProhibited` — The registrar has locked the domain against transfers (standard security measure)
- `clientUpdateProhibited` — The registrar has locked against updates
- `clientDeleteProhibited` — The registrar has locked against deletion
- `clientHold` — Registrar has suspended the domain (not resolving)

### 3. Expiration Warning Period
As the expiration date approaches (typically 45-60 days out), registrars send multiple expiration notices. During this time, the domain continues to function normally.

### 4. Expired
After the expiration date, the domain enters an initial expiration period (typically 0-30 days, varies by registrar). During this time:
- The domain may stop resolving (depends on registrar policy)
- Registrants can renew at the standard renewal price
- Some registrars continue to resolve the domain, redirecting to a "domain expired" parking page

### 5. Redemption Grace Period (RGP)
After the initial expiration period, the domain enters the **Redemption Grace Period** (typically 30 days). During RGP:
- The domain is removed from the TLD zone (stops resolving)
- Renewal is still possible but requires a **restore fee** (typically $100-300+ on top of renewal)
- The registrant is the only one who can restore it
- No transfers allowed

The RGP exists to give registrants one final chance to recover their domain before it's released.

### 6. Pending Delete
After the Redemption Grace Period, the domain enters a **Pending Delete** state (typically 5 days for `.com`). During this period:
- No actions can be taken
- The domain cannot be renewed, transferred, or deleted manually
- It is awaiting final deletion from the registry

### 7. Available Again / Drop Catching
At the end of Pending Delete, the domain is **dropped** and becomes available for registration again. This triggers a phenomenon called **drop catching** — competing services attempt to register newly available domains the instant they drop, often using high-volume automated registration attempts.

Domains with good metrics (history, backlinks, brand value) are caught within seconds of becoming available by domain resellers or squatters.

**Complete lifecycle diagram**:
```
Available
    ↓ (registration)
Active
    ↓ (expiration date passes)
Expired (Initial Grace Period — 0-30 days)
    ↓ (if not renewed)
Redemption Grace Period (30 days)
    ↓ (if not restored)
Pending Delete (5 days)
    ↓
Available (drop)
```

## 7.4 Domain Transfers

Transferring a domain from one registrar to another involves:

1. **Unlock the domain** at the current registrar (remove `clientTransferProhibited`)
2. **Get the auth code (EPP code)**: A secret code from the current registrar that authorizes the transfer
3. **Initiate transfer** at the new registrar using the auth code
4. **Approval**: The current registrar (or registrant) approves the transfer (usually via email)
5. **Completion**: Takes 5-7 days (ICANN standard); the registry updates the registrar record

**Transfer lock**: ICANN requires a 60-day lock after:
- Initial domain registration
- A successful transfer

This prevents domain hijacking by slowing down unauthorized transfers.

## 7.5 Domain Parking and Monetization

When a domain is registered but not actively in use, registrars often point it to a **parking page** — a webpage with advertisements. The registrar (or a parking service) and sometimes the domain owner share revenue from clicks on these ads.

Large domain portfolios are a legitimate business (domain investing), with valuable domains selling for millions of dollars:
- `voice.com` sold for $30 million in 2019
- `cars.com` sold for $872 million in 2014 (included a business)
- `sex.com` sold for $13 million in 2010

## 7.6 Internationalized Domain Names (IDNs)

Domain names originally only supported ASCII characters (letters a-z, digits 0-9, and hyphens). **Internationalized Domain Names (IDNs)** extend this to support non-ASCII characters from languages worldwide.

IDNs use a encoding system called **Punycode** (RFC 3492) to convert Unicode domain names to ASCII-compatible encoding (ACE):
- `münchen.de` → `xn--mnchen-3ya.de`
- `北京.中国` → `xn--1lq90ic7f1rc.xn--fiqs8s`
- `café.fr` → `xn--caf-dma.fr`

DNS itself only handles ASCII; Punycode encoding happens in the client application (browser, resolver).

---

# Chapter 8 — WHOIS Records

## 8.1 What is WHOIS?

**WHOIS** (pronounced "who is") is both a protocol and a database system for querying information about registered domain names, IP address allocations, and autonomous system numbers. The name literally asks "Who is responsible for this resource?"

WHOIS originated in the early ARPANET days. Elizabeth Feinler at the Stanford Research Institute (SRI) maintained the original ARPANET HOSTS.TXT file and associated registration database. As this evolved into DNS, WHOIS was formalized as RFC 954 (1985) and later updated by RFC 3912 (2004).

## 8.2 WHOIS Data Contents

A traditional WHOIS record for a domain contains:

- **Registrant information**: Name, organization, address, phone, email
- **Administrative contact**: Person who manages the domain administratively
- **Technical contact**: Person responsible for DNS and technical matters
- **Registrar information**: Which registrar the domain is registered with
- **Registry information**: Which registry manages the TLD
- **Domain status**: EPP status codes (clientTransferProhibited, etc.)
- **Name servers**: The authoritative nameservers for the domain
- **Important dates**:
  - Created date: When the domain was first registered
  - Updated date: Last modification date
  - Expires date: When the domain registration expires
- **DNSSEC status**: Whether DNSSEC is enabled

**Example WHOIS output** (from `whois example.com`):
```
Domain Name: EXAMPLE.COM
Registry Domain ID: 2336799_DOMAIN_COM-VRSN
Registrar WHOIS Server: whois.iana.org
Registrar URL: http://res-dom.iana.org
Updated Date: 2023-08-14T07:01:31Z
Creation Date: 1995-08-14T04:00:00Z
Registry Expiry Date: 2024-08-13T04:00:00Z
Registrar: RESERVED-Internet Assigned Numbers Authority
Registrar IANA ID: 376
Domain Status: clientDeleteProhibited
Domain Status: clientTransferProhibited
Domain Status: clientUpdateProhibited
Name Server: A.IANA-SERVERS.NET
Name Server: B.IANA-SERVERS.NET
DNSSEC: signedDelegation
```

For a real commercial domain, registrant contact information would also appear (unless privacy protection is enabled).

## 8.3 The WHOIS Protocol

The WHOIS protocol is simple:
1. Client opens a TCP connection to the WHOIS server on **port 43**
2. Client sends the query string followed by CRLF
3. Server sends a plain-text response and closes the connection

```
$ whois example.com
(Connects to whois.verisign-grs.com on port 43)
```

The protocol is entirely text-based, with no authentication, session management, or standardized response format. Each registry and registrar has its own response format, making automated parsing difficult.

**WHOIS hierarchy**: Like DNS, WHOIS queries are hierarchical:
1. Query the registry's WHOIS server for basic information and referrals
2. The registry WHOIS refers to the registrar's WHOIS for detailed registrant data
3. Query the registrar's WHOIS for full contact information

## 8.4 RDAP — The Modern Replacement

**RDAP (Registration Data Access Protocol)**, defined in **RFC 7480-7484** (2015), is the modern, standards-based replacement for WHOIS. RDAP provides:

- **JSON-formatted responses**: Machine-readable, structured data (unlike WHOIS's free-form text)
- **HTTPS-based**: Secure, authenticated access (unlike WHOIS's plaintext TCP)
- **Standardized format**: Consistent data model across all registries
- **Access control**: Different levels of data access for different requestors (technical users vs. public)
- **Internationalization**: Proper Unicode support
- **Extensibility**: Can include additional data fields

**RDAP query example**:
```bash
$ curl https://rdap.verisign.com/com/v1/domain/example.com

{
  "objectClassName": "domain",
  "handle": "2336799_DOMAIN_COM-VRSN",
  "ldhName": "EXAMPLE.COM",
  "nameservers": [...],
  "events": [
    {"eventAction": "registration", "eventDate": "1995-08-14T04:00:00Z"},
    {"eventAction": "expiration", "eventDate": "2024-08-13T04:00:00Z"}
  ],
  "status": ["client delete prohibited", "client transfer prohibited"],
  ...
}
```

ICANN began requiring all accredited registrars to support RDAP in 2019. RDAP is now the preferred protocol, though WHOIS remains widely used.

## 8.5 WHOIS Privacy and GDPR

### Traditional WHOIS Privacy Problems
Historically, all WHOIS data was publicly accessible, including the personal details of domain registrants. This created several problems:
- **Spam**: Email addresses harvested from WHOIS used for spam
- **Harassment**: Contact information used to harass domain owners
- **Social engineering**: Attackers using WHOIS data to craft targeted phishing attacks
- **Privacy concerns**: Individuals' home addresses published publicly

### WHOIS Privacy Protection Services
Registrars began offering **WHOIS privacy** (also called **domain privacy** or **private registration**) services where:
- The registrar (or a proxy service) substitutes its own contact information for the registrant's
- The proxy forwards legitimate contact attempts to the registrant
- The domain owner's real identity remains hidden

This is typically sold as an add-on ($3-15/year), though many registrars (Cloudflare, Namecheap) now include it free.

### GDPR and WHOIS
The European Union's **General Data Protection Regulation (GDPR)**, effective May 2018, dramatically changed WHOIS data availability. GDPR restricts the collection and publication of personal data of EU residents.

The impact on WHOIS was significant:
- Registrars in the EU, and registrars serving EU registrants, largely stopped publishing personal contact information in WHOIS
- Most WHOIS records now show redacted or proxy information instead of real registrant details
- ICANN and registrars continue to debate how to balance transparency (which WHOIS provided) with privacy requirements

**Post-GDPR WHOIS example**:
```
Registrant Name: REDACTED FOR PRIVACY
Registrant Organization: Example Company Ltd.
Registrant Street: REDACTED FOR PRIVACY
Registrant City: REDACTED FOR PRIVACY
Registrant Email: Please query the RDDS service of the
                  Registrar of Record identified in this
                  output for information on how to contact
                  the Registrant, Admin, or Tech contact
                  of the queried domain name.
```

### The Debate: Transparency vs. Privacy
WHOIS data serves legitimate purposes:
- **Cybersecurity researchers**: Identifying who runs malicious domains
- **Law enforcement**: Tracing domain ownership in criminal investigations
- **Intellectual property protection**: Finding infringers and counterfeit sellers
- **Network operators**: Identifying who controls IP space or domains causing network problems
- **Journalists**: Investigating disinformation campaigns

The tension between these needs and privacy rights is ongoing. ICANN's **SSAD (System for Standardized Access/Disclosure)** initiative aims to create an authenticated, tiered access system where vetted users (law enforcement, security researchers, IP lawyers) can access more complete data than the general public — but implementation has been slow and controversial.

## 8.6 Querying WHOIS — Tools and Techniques

### Command Line
```bash
# Standard WHOIS query
$ whois google.com

# Query a specific WHOIS server
$ whois -h whois.verisign-grs.com google.com

# Query for IP address information
$ whois 8.8.8.8

# Query for ASN information
$ whois AS15169
```

### RDAP Query
```bash
# Using curl
$ curl https://rdap.verisign.com/com/v1/domain/google.com

# ICANN's RDAP lookup tool
$ curl https://lookup.icann.org/rdap/domain/google.com
```

### WHOIS for IP Addresses (RIR WHOIS)
IP address allocation information is maintained by **Regional Internet Registries (RIRs)**:

| RIR | Region | WHOIS Server |
|-----|--------|--------------|
| ARIN | North America | whois.arin.net |
| RIPE NCC | Europe, Middle East, Central Asia | whois.ripe.net |
| APNIC | Asia-Pacific | whois.apnic.net |
| LACNIC | Latin America | whois.lacnic.net |
| AFRINIC | Africa | whois.afrinic.net |

```bash
# Who owns this IP?
$ whois 8.8.8.8
# Returns Google LLC information from ARIN

# Who owns this IP?
$ whois 31.13.64.35
# Returns Facebook (Meta) information from RIPE
```

## 8.7 Using WHOIS in Security and Research

WHOIS data (even in its privacy-redacted form) remains valuable for security analysis:

**Domain age analysis**: A newly registered domain (creation date within days or weeks) is often suspicious — phishing campaigns, malware distribution, and scam operations frequently use freshly registered domains.

**Registrar patterns**: Certain registrars are disproportionately used for malicious domains (often those with the lowest prices and least identity verification). Security researchers track these patterns.

**Name server commonality**: Domains sharing nameservers may be operated by the same entity — useful for connecting malicious infrastructure.

**Certificate transparency logs**: Combined with WHOIS, certificate issuance records (logged in Certificate Transparency logs) can reveal newly created subdomains and help map an organization's infrastructure.

**Passive DNS**: Historical DNS records (from services like RiskIQ, Farsight Security) combined with WHOIS data allow researchers to trace the evolution of malicious infrastructure over time.

---

# Chapter 9 — DNS in Practice: Putting It All Together

## 9.1 A Complete Domain Setup

To make this all concrete, let's walk through the complete DNS setup for a new company, `hypothetical-startup.com`:

### Step 1 — Register the Domain
Register `hypothetical-startup.com` at a registrar (e.g., Cloudflare Registrar, Namecheap). Enable WHOIS privacy protection.

### Step 2 — Configure DNS Hosting
Point to Cloudflare's nameservers for DNS hosting:
```
hypothetical-startup.com  NS  alexia.ns.cloudflare.com
hypothetical-startup.com  NS  bert.ns.cloudflare.com
```

### Step 3 — Populate DNS Records

```
; Zone file for hypothetical-startup.com

; SOA Record
@   3600  IN  SOA   alexia.ns.cloudflare.com. dns.cloudflare.com. (
                    2024031501  ; Serial
                    10000       ; Refresh
                    2400        ; Retry
                    604800      ; Expire
                    3600 )      ; Minimum TTL

; Nameserver Records
@   86400  IN  NS   alexia.ns.cloudflare.com.
@   86400  IN  NS   bert.ns.cloudflare.com.

; A Records (web servers)
@       3600  IN  A   203.0.113.10  ; Root domain → load balancer
www     3600  IN  A   203.0.113.10  ; www → load balancer
api     3600  IN  A   203.0.113.20  ; API server

; AAAA Records (IPv6)
@       3600  IN  AAAA  2001:db8::10
www     3600  IN  AAAA  2001:db8::10

; CNAME Records (third-party services)
blog    3600  IN  CNAME  hypothetical-startup.ghost.io.
status  3600  IN  CNAME  hypothetical-startup.statuspage.io.
help    3600  IN  CNAME  hypothetical-startup.zendesk.com.

; MX Records (Google Workspace email)
@   3600  IN  MX  1   aspmx.l.google.com.
@   3600  IN  MX  5   alt1.aspmx.l.google.com.
@   3600  IN  MX  5   alt2.aspmx.l.google.com.
@   3600  IN  MX  10  alt3.aspmx.l.google.com.
@   3600  IN  MX  10  alt4.aspmx.l.google.com.

; TXT Records
@   3600  IN  TXT  "v=spf1 include:_spf.google.com -all"
@   3600  IN  TXT  "google-site-verification=abcdef1234"

_dmarc     3600  IN  TXT  "v=DMARC1; p=reject; rua=mailto:dmarc@hypothetical-startup.com"

; DKIM (added by Google Workspace setup)
google._domainkey  3600  IN  TXT  "v=DKIM1; k=rsa; p=MIGf..."

; CAA Records (only Let's Encrypt can issue certs)
@   3600  IN  CAA  0  issue "letsencrypt.org"
@   3600  IN  CAA  0  issuewild ";"
@   3600  IN  CAA  0  iodef "mailto:security@hypothetical-startup.com"
```

## 9.2 DNS Troubleshooting Toolkit

```bash
# Basic A record lookup
$ dig hypothetical-startup.com A

# Look up any record type
$ dig hypothetical-startup.com MX
$ dig hypothetical-startup.com TXT
$ dig hypothetical-startup.com NS

# Trace the full resolution path
$ dig +trace hypothetical-startup.com A

# Query a specific nameserver
$ dig @8.8.8.8 hypothetical-startup.com A

# Reverse DNS lookup
$ dig -x 203.0.113.10

# Get the SOA record
$ dig hypothetical-startup.com SOA

# nslookup (Windows-friendly alternative to dig)
$ nslookup hypothetical-startup.com
$ nslookup -type=MX hypothetical-startup.com
$ nslookup -type=TXT hypothetical-startup.com 8.8.8.8

# host command (simple lookups)
$ host hypothetical-startup.com
$ host 203.0.113.10

# Check DNS propagation from many locations
# (web tool) https://dnschecker.org
```

## 9.3 Common DNS Pitfalls and Solutions

**Problem: "My website isn't loading after changing my IP"**
Solution: Old A record cached. Check current TTL with `dig`, wait for TTL to expire. Next time, lower TTL 24 hours before making the change.

**Problem: "My email isn't being delivered / going to spam"**
Solution: Check MX records exist, verify SPF TXT record is correct, check DKIM is configured, implement DMARC, ensure sending IP has a PTR record.

**Problem: "I can't transfer my domain"**
Solution: Check for `clientTransferProhibited` status (unlock in registrar panel), get the auth/EPP code, check the 60-day transfer lock if recently registered.

**Problem: "My Let's Encrypt certificate is failing"**
Solution: Ensure DNS is propagated (especially if recently added), check that `_acme-challenge` TXT records are reachable, verify CAA records don't block Let's Encrypt.

**Problem: "My subdomain resolves but the root domain doesn't"**
Solution: Likely missing A/AAAA record at the zone apex (`@`). Check also that CNAME is not being used at the apex.

---

# Chapter 10 — Summary and Key Concepts

## 10.1 The Big Picture

DNS is a distributed, hierarchical, delegated naming system that translates human-readable domain names into machine-readable IP addresses. It was designed for a simpler internet but has been extended repeatedly to handle modern requirements — security, privacy, internationalization, and new services.

## 10.2 Key Takeaways

**Hierarchy and delegation**: DNS authority flows from the root through TLDs to second-level domains and beyond. Each level delegates to the next through NS records.

**Record types serve different purposes**: A and AAAA for addresses, CNAME for aliases, MX for mail, NS for nameservers, TXT for verification and email authentication, SOA for zone administration, SRV for service discovery, PTR for reverse lookups.

**Recursive vs. authoritative**: Recursive resolvers do the work of finding answers; authoritative nameservers hold the actual data. Your computer talks to a recursive resolver.

**Caching is fundamental**: TTL values control how long records are cached. Too long and changes propagate slowly; too short and you create load on authoritative servers.

**DNS was insecure by design**: Traditional DNS is plaintext and unauthenticated. DoH and DoT add privacy through encryption. DNSSEC adds authentication through cryptographic signatures. Neither is universally deployed.

**Cache poisoning is a real threat**: The Kaminsky attack demonstrated how classic DNS caching can be poisoned. Source port randomization and DNSSEC are the key defenses.

**The registration ecosystem is layered**: ICANN → Registries → Registrars → Registrants. Domain life has well-defined states with specific time windows for recovery.

**WHOIS is being replaced**: The classic WHOIS protocol (plaintext, unstructured, unauthenticated) is being superseded by RDAP. Privacy laws have significantly restricted what WHOIS data is publicly available.

## 10.3 Quick Reference: DNS Record Types

| Type | Purpose | Points To |
|------|---------|-----------|
| A | IPv4 address | An IPv4 address |
| AAAA | IPv6 address | An IPv6 address |
| CNAME | Alias | Another domain name |
| MX | Mail server | A mail server hostname |
| NS | Nameserver | A nameserver hostname |
| TXT | Text/verification | Arbitrary text string |
| SOA | Zone authority | Zone administrative data |
| SRV | Service location | Hostname + port for a service |
| PTR | Reverse DNS | A hostname |
| CAA | Certificate authority | Authorized CA names |
| DS | DNSSEC delegation | Hash of child zone's key |

## 10.4 DNS At Scale — A Closing Perspective

DNS is one of the most elegant engineering achievements in computing. A system designed in 1983 still forms the backbone of the global internet, handling trillions of queries per day across billions of devices. Its distributed architecture means there is no single point of failure, no central authority that can bring down the whole system, and no bottleneck that scales with the growth of the internet.

Yet DNS is also a study in the challenges of evolving critical infrastructure: adding security (DNSSEC) required designing the changes for backward compatibility while not breaking billions of deployed resolvers; adding privacy (DoH, DoT) created tension with network management and security monitoring; the WHOIS to RDAP transition has taken decades.

Understanding DNS is not merely an academic exercise. DNS failures cause widespread internet outages. DNS misconfigurations cause email to not be delivered. DNS security gaps enable large-scale attacks. And DNS is at the center of ongoing debates about surveillance, censorship, and the governance of the internet itself.

Whether you're a developer, a systems administrator, a security professional, or simply a curious technologist, DNS knowledge pays dividends every single day.

---

*End of Part VI — DNS & Naming*

---

**Glossary of Key Terms**

| Term | Definition |
|------|------------|
| FQDN | Fully Qualified Domain Name — a complete domain name including all labels to the root |
| TTL | Time To Live — seconds a DNS record may be cached |
| Zone | A contiguous portion of the DNS namespace under one administrative authority |
| Zone transfer | Replication of zone data from primary to secondary nameservers |
| Glue record | A record in a parent zone providing the IP of a nameserver that is within the delegated zone |
| NXDOMAIN | Non-existent domain — the queried name does not exist |
| EPP | Extensible Provisioning Protocol — the protocol between registrars and registries |
| DNSSEC | DNS Security Extensions — cryptographic signing and validation of DNS records |
| DoH | DNS over HTTPS — encrypted DNS using HTTPS |
| DoT | DNS over TLS — encrypted DNS using TLS |
| Anycast | Routing technique where multiple servers share one IP, with traffic directed to the nearest |
| RGP | Redemption Grace Period — recovery window after domain expiration |
| RDAP | Registration Data Access Protocol — the modern replacement for WHOIS |
| RIR | Regional Internet Registry — manages IP address allocation in a geographic region |
| FCrDNS | Forward-confirmed reverse DNS — PTR matches A record (used in email delivery) |
| AA bit | Authoritative Answer bit — set in responses from authoritative nameservers |
| RD bit | Recursion Desired bit — set in client queries to request recursive resolution |