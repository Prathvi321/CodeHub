# PART V — Addressing & Routing

## A Complete Technical Reference

---

# Preface

Every device that communicates over a network needs an address — a unique identifier that tells the network where to send data. But addressing alone is not enough. The network also needs a system to decide *how* to get data from one address to another, potentially crossing dozens of intermediate devices and networks along the way. This is the domain of **addressing and routing** — arguably the most fundamental layer of internet infrastructure.

This part covers everything from the format of an IP address to how routers on the global internet make forwarding decisions involving millions of destinations. We will move from the microscopic (a single device getting an IP address from a DHCP server) to the macroscopic (how an Autonomous System announces its routes to the world via BGP). By the end, you will have a thorough, practical, and interconnected understanding of how the internet knows where everything is — and how it gets data there.

---

# Chapter 1 — IPv4 Addressing & Classes

## 1.1 What Is an IP Address?

An **IP address** (Internet Protocol address) is a numerical label assigned to every device participating in a network that uses the Internet Protocol for communication. It serves two primary purposes:

1. **Host identification** — identifying which device is being addressed
2. **Location addressing** — providing enough information for routers to forward packets toward that device

IPv4 addresses are **32 bits** long, written as four decimal numbers separated by dots (called **dotted-decimal notation**). Each group of decimal digits represents 8 bits, called an **octet**.

```
Example:   192.168.1.10
Binary:    11000000.10101000.00000001.00001010
```

Each octet ranges from 0 to 255 (because 8 bits can represent values from 00000000 to 11111111).

The total address space of IPv4 is 2³² = **4,294,967,296** unique addresses — roughly 4.3 billion. As we will see, this number proved to be far too small for the modern internet.

---

## 1.2 The Structure of an IPv4 Address

Every IPv4 address has two conceptual parts:

- **Network portion** — identifies which network the device belongs to (like a city or zip code)
- **Host portion** — identifies the specific device within that network (like a street address)

The dividing line between these two parts is determined by the **subnet mask** or, in older systems, by the **address class**.

---

## 1.3 Classful Addressing

In the early days of the internet (roughly the 1980s), IPv4 addresses were divided into **five classes** — A, B, C, D, and E — based on the value of the first few bits of the address. This system is known as **classful addressing**.

The class determined:
- How much of the address was the network portion
- How much was the host portion
- How many hosts could exist on that network

### Class A

| Property | Value |
|---|---|
| First bit | Always `0` |
| First octet range | 1 – 126 |
| Network bits | 8 |
| Host bits | 24 |
| Number of networks | 126 |
| Hosts per network | 16,777,214 |

Class A addresses were given to enormous organizations. The first octet identifies the network; the remaining three identify the host.

```
Example: 10.25.100.5
Network: 10.0.0.0
Host:    25.100.5
```

Only 126 Class A networks existed (0 and 127 are reserved), but each could hold over 16 million hosts. Companies like IBM (9.x.x.x), Apple (17.x.x.x), and early universities received entire Class A blocks.

### Class B

| Property | Value |
|---|---|
| First two bits | Always `10` |
| First octet range | 128 – 191 |
| Network bits | 16 |
| Host bits | 16 |
| Number of networks | 16,384 |
| Hosts per network | 65,534 |

Class B addresses were typical for large universities and corporations. The first two octets identify the network.

```
Example: 172.16.5.20
Network: 172.16.0.0
Host:    5.20
```

### Class C

| Property | Value |
|---|---|
| First three bits | Always `110` |
| First octet range | 192 – 223 |
| Network bits | 24 |
| Host bits | 8 |
| Number of networks | 2,097,152 |
| Hosts per network | 254 |

Class C was the most common. The first three octets identify the network; the last identifies the host. Maximum 254 usable hosts (0 is the network address, 255 is the broadcast address).

```
Example: 192.168.1.50
Network: 192.168.1.0
Host:    50
```

### Class D (Multicast)

| Property | Value |
|---|---|
| First four bits | Always `1110` |
| First octet range | 224 – 239 |
| Purpose | Multicast groups |

Not assigned to individual hosts — used for multicast group communication (covered in Chapter 10).

### Class E (Reserved/Experimental)

| Property | Value |
|---|---|
| First four bits | Always `1111` |
| First octet range | 240 – 255 |
| Purpose | Experimental use |

Never deployed for public use.

---

## 1.4 Special IPv4 Addresses

Several IPv4 address ranges carry special meaning:

| Address/Range | Meaning |
|---|---|
| `0.0.0.0` | "This host" — used before an IP is assigned |
| `127.0.0.0/8` | Loopback — traffic sent to itself (most commonly `127.0.0.1`) |
| `255.255.255.255` | Limited broadcast — sent to all hosts on local network |
| `169.254.0.0/16` | Link-local / APIPA — auto-assigned when DHCP fails |

The **loopback address** (`127.0.0.1`) is significant in practice: when you ping `127.0.0.1` or `localhost`, packets never leave your machine. They are processed by the local network stack. This is used to test that the TCP/IP stack is functioning.

---

## 1.5 Problems with Classful Addressing

The classful system had severe inefficiencies:

**Waste at scale:** If a company needed 300 hosts, they couldn't fit in a Class C (254 hosts max), so they'd receive a Class B with 65,534 addresses — wasting over 65,000 addresses.

**Routing table explosion:** The internet's routers had to maintain separate entries for each network, and the table was growing rapidly.

**Inflexibility:** Network sizes came in only three flavors (huge, medium, small), which didn't match real-world needs.

These problems led to the development of **CIDR** (Chapter 3) and ultimately to **IPv6** (Chapter 2).

---

# Chapter 2 — IPv6 Addressing (and Why It Replaces IPv4)

## 2.1 The IPv4 Exhaustion Crisis

The internet grew far faster than anyone in the 1970s and 1980s anticipated. By the early 1990s, engineers realized that IPv4's 4.3 billion addresses would eventually run out. The last blocks of unallocated IPv4 addresses were distributed by IANA (Internet Assigned Numbers Authority) in **February 2011**. Regional registries subsequently exhausted their pools over the following years (APNIC in 2011, RIPE NCC in 2019, ARIN in 2015, etc.).

While technologies like **NAT** (Chapter 5) and **CIDR** (Chapter 3) delayed exhaustion by allowing address reuse and more efficient allocation, they were workarounds — not solutions. A fundamental redesign was needed.

## 2.2 The Birth of IPv6

**IPv6** (Internet Protocol version 6) was developed by the IETF and formally defined in **RFC 2460** (1998), updated by **RFC 8200** (2017). It addresses not only the exhaustion problem but also several technical limitations of IPv4.

> *Note: IPv5 was an experimental streaming protocol that was never deployed publicly — hence jumping from 4 to 6.*

---

## 2.3 IPv6 Address Format

IPv6 addresses are **128 bits** long — four times the length of IPv4. This gives a total address space of:

**2¹²⁸ = 340,282,366,920,938,463,463,374,607,431,768,211,456**

That's approximately **340 undecillion** addresses — enough to assign billions of addresses to every atom on the surface of the Earth. For all practical purposes, IPv6 addresses will never be exhausted.

### Hexadecimal Notation

IPv6 addresses are written as **eight groups of four hexadecimal digits**, separated by colons:

```
2001:0db8:85a3:0000:0000:8a2e:0370:7334
```

Each group of 4 hex digits = 16 bits. 8 groups × 16 bits = 128 bits.

### Simplification Rules

Writing full 128-bit addresses is cumbersome. Two rules allow simplification:

**Rule 1 — Leading zeros in a group can be omitted:**
```
2001:0db8:85a3:0000:0000:8a2e:0370:7334
→  2001:db8:85a3:0:0:8a2e:370:7334
```

**Rule 2 — One consecutive sequence of all-zero groups can be replaced with `::`:**
```
2001:db8:85a3:0:0:8a2e:370:7334
→  2001:db8:85a3::8a2e:370:7334
```

The `::` can only be used **once** in an address, or it would be ambiguous.

**Special addresses in IPv6:**

| Address | Meaning |
|---|---|
| `::1` | Loopback (equivalent to 127.0.0.1) |
| `::` | Unspecified address (equivalent to 0.0.0.0) |
| `fe80::/10` | Link-local addresses |
| `ff00::/8` | Multicast |
| `2000::/3` | Global unicast (public internet) |

---

## 2.4 IPv6 Address Structure

A typical global unicast IPv6 address has three parts:

```
| Global Routing Prefix | Subnet ID | Interface ID |
|    48 bits            |  16 bits  |   64 bits    |
```

- **Global routing prefix** — assigned by ISPs/RIRs, identifies the organization
- **Subnet ID** — used by the organization to subdivide their space
- **Interface ID** — identifies the specific interface (device) within the subnet, often derived from the MAC address using **EUI-64** format

### EUI-64 Interface Identifier

When a device auto-configures its IPv6 address (using SLAAC — Stateless Address Autoconfiguration), it can generate the 64-bit interface ID from its 48-bit MAC address using the EUI-64 process:

1. Take the 48-bit MAC address: `00:1A:2B:3C:4D:5E`
2. Insert `FF:FE` in the middle: `00:1A:2B:FF:FE:3C:4D:5E`
3. Flip the 7th bit of the first byte: `02:1A:2B:FF:FE:3C:4D:5E`
4. Result interface ID: `021A:2BFF:FE3C:4D5E`

This means devices can configure their own IPv6 addresses without a DHCP server, which is called **SLAAC** (Stateless Address Autoconfiguration).

---

## 2.5 Key Improvements in IPv6

### 1. Vastly Larger Address Space
Already discussed — the sheer size eliminates exhaustion concerns for the foreseeable future.

### 2. Simplified Header
IPv4 headers have up to 60 bytes with many optional fields. IPv6 has a **fixed 40-byte header** with a cleaner structure, making router processing faster.

| IPv4 Header Fields | IPv6 Header Fields |
|---|---|
| Version, IHL, DSCP, ECN | Version, Traffic Class |
| Total Length | Payload Length |
| Identification, Flags, Fragment Offset | Next Header, Hop Limit |
| TTL, Protocol | Source Address (128-bit) |
| Header Checksum | Destination Address (128-bit) |
| Source IP, Destination IP | (Extension headers as needed) |
| Options (variable) | — |

IPv6 removes the header checksum (error checking is handled by lower/upper layers) and moves optional features to **extension headers**, keeping the base header lean.

### 3. No Need for NAT
Because every device can have a globally unique IPv6 address, NAT becomes unnecessary. End-to-end connectivity (a core internet principle) is restored.

### 4. Built-in IPSec Support
IPv6 was designed with IPSec (Internet Protocol Security) as a mandatory extension, improving security at the network layer.

### 5. Stateless Address Autoconfiguration (SLAAC)
Devices can configure their own IPv6 addresses using Router Advertisements — no DHCP server required.

### 6. No Broadcast
IPv6 eliminates broadcast entirely, replacing it with multicast and **anycast**. This reduces unnecessary network load.

### 7. Improved Mobility Support
IPv6 includes native support for Mobile IP, making it easier for devices to move between networks while maintaining connections.

---

## 2.6 IPv4 to IPv6 Transition

Transitioning the entire internet from IPv4 to IPv6 is a massive undertaking, and it has been ongoing for decades. Several transition mechanisms exist:

### Dual Stack
The most common approach. Devices and routers run **both IPv4 and IPv6 simultaneously**. They use IPv6 when communicating with IPv6-capable peers, and IPv4 otherwise.

```
User's Laptop (Dual Stack)
   ├── IPv4: 192.168.1.5
   └── IPv6: 2001:db8::1
```

### Tunneling
IPv6 packets are **encapsulated inside IPv4 packets** to cross IPv4-only portions of the internet. Common mechanisms include:
- **6to4** — automatic tunneling using a 2002::/16 prefix
- **Teredo** — tunneling through NAT
- **GRE tunnels** — manual configuration

### NAT64/DNS64
Allows IPv6-only clients to communicate with IPv4-only servers. A NAT64 gateway translates between IPv6 and IPv4, and DNS64 synthesizes AAAA records from A records.

---

## 2.7 Real-World IPv6 Adoption

As of the mid-2020s, IPv6 adoption is significant but incomplete:

- **Google reports** that ~45–50% of its traffic comes over IPv6
- **Comcast** (major US ISP) delivers nearly 70% of traffic over IPv6
- **Mobile networks** (T-Mobile US) are predominantly IPv6
- **Content providers** like Netflix, Facebook, and Google are fully dual-stack

The transition is asymmetric: client devices and ISPs are largely ready, while some legacy enterprise infrastructure and web servers still lag behind.

---

# Chapter 3 — Subnetting & CIDR Notation

## 3.1 What Is Subnetting?

**Subnetting** is the practice of dividing a larger network into smaller, more manageable sub-networks (subnets). It allows network administrators to:

- Organize devices logically (by department, floor, function)
- Reduce broadcast domain size
- Improve security (traffic can be filtered between subnets)
- Make more efficient use of IP address space

The mechanism behind subnetting is the **subnet mask** — a 32-bit value that defines which bits of an IP address represent the network and which represent the host.

---

## 3.2 Subnet Masks

A subnet mask has all network bits set to `1` and all host bits set to `0`.

```
IP Address:    192.168.1.10   →  11000000.10101000.00000001.00001010
Subnet Mask:   255.255.255.0  →  11111111.11111111.11111111.00000000
                                  ←— Network (24 bits) —→ ←Host(8 b)→
```

To find the **network address**, perform a bitwise AND between the IP and the subnet mask:

```
11000000.10101000.00000001.00001010  (192.168.1.10)
AND
11111111.11111111.11111111.00000000  (255.255.255.0)
=
11000000.10101000.00000001.00000000  (192.168.1.0) ← Network Address
```

The **broadcast address** is found by setting all host bits to `1`:
```
192.168.1.255  (host bits all 1s)
```

**Usable hosts** = 2ⁿ - 2, where n = number of host bits
(Subtract 2: one for network address, one for broadcast)

For /24: 2⁸ - 2 = **254 usable hosts**

---

## 3.3 CIDR Notation

**CIDR** — Classless Inter-Domain Routing — was introduced in 1993 (RFC 1519) to replace the rigid classful system. It allows network boundaries to be placed anywhere in the 32-bit address, not just on octet boundaries.

CIDR notation expresses the subnet mask as a **prefix length** — the number of bits used for the network portion — written after a forward slash:

```
192.168.1.0/24   → 24 network bits, 8 host bits
10.0.0.0/8       → 8 network bits, 24 host bits
172.16.0.0/16    → 16 network bits, 16 host bits
192.168.1.64/26  → 26 network bits, 6 host bits
```

CIDR is "classless" because it doesn't respect class boundaries. A /20 network, for example, wouldn't fit neatly into Class A, B, or C.

---

## 3.4 Subnetting Examples

### Example 1: Basic /24 Subnetting

You have the network `192.168.10.0/24` and want to create 4 equal subnets.

To create 4 subnets, you need 2 additional bits (2² = 4). So borrow 2 bits from the host portion: /24 becomes **/26**.

```
Subnet 1:  192.168.10.0/26    (hosts: .1 – .62,   broadcast: .63)
Subnet 2:  192.168.10.64/26   (hosts: .65 – .126,  broadcast: .127)
Subnet 3:  192.168.10.128/26  (hosts: .129 – .190, broadcast: .191)
Subnet 4:  192.168.10.192/26  (hosts: .193 – .254,  broadcast: .255)
```

Each subnet has 2⁶ - 2 = **62 usable hosts**.

### Example 2: Variable-Length Subnetting (VLSM)

You need to design a network for an organization with these requirements:
- Department A: 100 hosts
- Department B: 50 hosts
- Department C: 20 hosts
- WAN link (point-to-point): 2 hosts

You're given `172.16.0.0/24` to work with.

**VLSM** (Variable Length Subnet Masking) lets you allocate different-sized subnets:

| Requirement | Subnet | Prefix | Hosts Available |
|---|---|---|---|
| Dept A (100) | 172.16.0.0/25 | /25 | 126 |
| Dept B (50) | 172.16.0.128/26 | /26 | 62 |
| Dept C (20) | 172.16.0.192/27 | /27 | 30 |
| WAN link | 172.16.0.224/30 | /30 | 2 |

This is far more efficient than giving each department a full /24.

### Example 3: Understanding the Subnet Mask for /30

A **/30** is commonly used for point-to-point links between routers:

```
Network:   10.0.0.0/30
Binary:    00001010.00000000.00000000.00|000000
                                        ↑
                                   Prefix ends here (30 bits)

Network Address:   10.0.0.0
Host 1 (Router A): 10.0.0.1
Host 2 (Router B): 10.0.0.2
Broadcast:         10.0.0.3
```

Only 2 usable addresses — perfect for a router-to-router link.

---

## 3.5 CIDR and Aggregation (Route Summarization)

One of CIDR's most important capabilities is **route aggregation** (also called **supernetting**). Instead of advertising many small routes, a router can advertise a single summary route.

**Example:**

Suppose an ISP has been assigned these four /24 networks:
```
192.168.0.0/24
192.168.1.0/24
192.168.2.0/24
192.168.3.0/24
```

In binary, the first 22 bits are identical:
```
192.168.0.0   = 11000000.10101000.000000|00.00000000
192.168.1.0   = 11000000.10101000.000000|01.00000000
192.168.2.0   = 11000000.10101000.000000|10.00000000
192.168.3.0   = 11000000.10101000.000000|11.00000000
                                        ↑ differs here (bit 23)
```

The ISP can advertise just one route: **192.168.0.0/22**

This dramatically reduces the size of internet routing tables — one of the critical benefits of CIDR.

---

## 3.6 Quick Reference: Common Prefix Lengths

| CIDR | Subnet Mask | Usable Hosts | Common Use |
|---|---|---|---|
| /8 | 255.0.0.0 | 16,777,214 | Large enterprise, ISP |
| /16 | 255.255.0.0 | 65,534 | Medium enterprise |
| /24 | 255.255.255.0 | 254 | Small LAN |
| /25 | 255.255.255.128 | 126 | Half of a /24 |
| /26 | 255.255.255.192 | 62 | Smaller LAN segment |
| /27 | 255.255.255.224 | 30 | Small segment |
| /28 | 255.255.255.240 | 14 | Very small segment |
| /29 | 255.255.255.248 | 6 | Small office |
| /30 | 255.255.255.252 | 2 | Point-to-point links |
| /31 | 255.255.255.254 | 2* | P2P (RFC 3021) |
| /32 | 255.255.255.255 | 1 | Host route, loopback |

**/31 networks** (RFC 3021) are a special case — there's no network or broadcast address, and both addresses are usable. Useful for router-to-router links.

**/32 host routes** represent a single host and are used in routing tables to refer to specific interfaces or loopback addresses.

---

# Chapter 4 — Public vs. Private IP Ranges

## 4.1 The Public/Private Distinction

Not all IP addresses are equal. Some are **globally routable** — packets addressed to them can travel across the entire internet. Others are **private** — they can only be used within an organization's internal network and are not routed on the public internet.

This distinction was formalized in **RFC 1918** (1996) as a practical response to IPv4 exhaustion.

---

## 4.2 Private IP Address Ranges (RFC 1918)

Three ranges of IPv4 addresses are designated as private:

| Range | CIDR | Addresses | Class |
|---|---|---|---|
| `10.0.0.0 – 10.255.255.255` | 10.0.0.0/8 | ~16.7 million | Class A |
| `172.16.0.0 – 172.31.255.255` | 172.16.0.0/12 | ~1 million | Class B |
| `192.168.0.0 – 192.168.255.255` | 192.168.0.0/16 | ~65,536 | Class C |

These ranges can be used freely by anyone, without registration. The same private address can exist in millions of different organizations simultaneously — but since they're never routed on the public internet, there's no conflict.

**Key property:** Internet routers are configured to **drop packets** with private source or destination addresses if they appear on public-facing interfaces. This is called **RFC 1918 filtering**.

---

## 4.3 Public IP Addresses

**Public IP addresses** are globally unique and registered with a Regional Internet Registry (RIR):

- **IANA** — Internet Assigned Numbers Authority (global)
- **ARIN** — American Registry for Internet Numbers (North America)
- **RIPE NCC** — Europe, Middle East, Central Asia
- **APNIC** — Asia Pacific
- **LACNIC** — Latin America
- **AFRINIC** — Africa

ISPs receive blocks of public addresses from RIRs and assign them to customers. When you have a home internet connection, your ISP typically gives your router one public IP address. Internally, your home network uses private addresses.

---

## 4.4 Other Special-Purpose Ranges

Beyond RFC 1918, several other ranges serve special purposes:

| Range | Purpose |
|---|---|
| `127.0.0.0/8` | Loopback (127.0.0.1 = "localhost") |
| `169.254.0.0/16` | Link-local / APIPA |
| `0.0.0.0/8` | "This" network |
| `100.64.0.0/10` | Shared address space (carrier-grade NAT) |
| `192.0.2.0/24` | Documentation examples (TEST-NET-1) |
| `198.51.100.0/24` | Documentation examples (TEST-NET-2) |
| `203.0.113.0/24` | Documentation examples (TEST-NET-3) |
| `240.0.0.0/4` | Reserved (formerly Class E) |
| `255.255.255.255/32` | Limited broadcast |

**APIPA (Automatic Private IP Addressing):** When a Windows device cannot reach a DHCP server, it auto-assigns itself an address in `169.254.x.x`. Two devices on the same network can communicate using APIPA, but there's no routing — they can't reach the internet. Seeing a `169.254.x.x` address on a device is a diagnostic indicator of DHCP failure.

**Shared Address Space (100.64.0.0/10):** Defined in RFC 6598 for use by ISPs implementing Carrier-Grade NAT (CGN). It's like a "super-private" range — private between the ISP and the customer, not visible externally.

---

## 4.5 IPv6 Private-Like Addresses

In IPv6, the equivalent of private addresses are called **Unique Local Addresses (ULA)**:

- Range: `fc00::/7` (practically `fd00::/8`)
- Not routable on the global internet
- Used for internal communication within an organization

**Link-local addresses** (`fe80::/10`) are used for communication on a single link segment — they're automatically configured and used for protocols like NDP (Neighbor Discovery Protocol).

---

## 4.6 Real-World Scenario: Home Network

```
Internet
    │
    │  Public IP: 203.0.113.42 (assigned by ISP)
    │
[Home Router / NAT Gateway]
    │
    ├── [Laptop]    192.168.1.2
    ├── [Phone]     192.168.1.3
    ├── [Smart TV]  192.168.1.4
    └── [Printer]   192.168.1.5
         (all private IPs, range 192.168.1.0/24)
```

From the internet's perspective, all your home devices appear to originate from `203.0.113.42`. The translation between public and private is handled by **NAT**, which we examine next.

---

# Chapter 5 — NAT (Network Address Translation)

## 5.1 What Is NAT?

**NAT** (Network Address Translation) is a technique by which a network device (typically a router or firewall) modifies the source and/or destination IP addresses in packet headers as they pass through it. 

NAT was invented to:
1. **Conserve public IPv4 addresses** — multiple private devices share one public IP
2. **Provide a basic security barrier** — internal devices are not directly reachable from the internet
3. **Enable address flexibility** — internal addresses can change without affecting external visibility

---

## 5.2 Types of NAT

### 5.2.1 Static NAT (SNAT)

A one-to-one mapping between a private IP and a public IP. Every private address has its own dedicated public address.

```
192.168.1.10  ←→  203.0.113.10  (always)
192.168.1.11  ←→  203.0.113.11  (always)
```

**Use case:** Hosting a server internally that must be reachable from the internet. The server has a fixed public IP but uses a private IP internally.

### 5.2.2 Dynamic NAT

A pool of public IP addresses is shared among private hosts on a first-come, first-served basis. When a host needs external access, it's temporarily assigned one of the public IPs from the pool.

```
Pool: {203.0.113.10, 203.0.113.11, 203.0.113.12}

At 10:00: 192.168.1.5 → 203.0.113.10
At 10:01: 192.168.1.6 → 203.0.113.11
At 10:05: 192.168.1.5 finishes → 203.0.113.10 released to pool
```

**Limitation:** If all public IPs are in use, additional hosts cannot access the internet until one is released.

### 5.2.3 PAT — Port Address Translation (NAT Overload)

The most common type in home and office networks. **Multiple private addresses map to a single public IP**, differentiated by **port numbers**.

Also called **NAPT** (Network Address and Port Translation) or colloquially called **masquerading** in Linux.

```
Private Device         NAT Translation Table          Destination
192.168.1.2:5000  →  203.0.113.42:10001  →  93.184.216.34:80
192.168.1.3:5000  →  203.0.113.42:10002  →  93.184.216.34:80
192.168.1.4:6000  →  203.0.113.42:10003  →  1.2.3.4:443
```

The router maintains a **NAT translation table** mapping the internal (IP, port) pair to an external port number. When a response comes back, it uses this table to route the packet to the correct internal device.

---

## 5.3 How PAT Works Step by Step

Let's trace a web request from a device behind NAT:

**Step 1 — Outbound packet**
```
Source:      192.168.1.5:49152  (your laptop)
Destination: 93.184.216.34:80  (example.com)
```

**Step 2 — NAT router rewrites the source**
```
Source:      203.0.113.42:10001  (router's public IP, new port)
Destination: 93.184.216.34:80
NAT table entry: {192.168.1.5:49152 ↔ 203.0.113.42:10001}
```

**Step 3 — Response arrives at router**
```
Source:      93.184.216.34:80
Destination: 203.0.113.42:10001
```

**Step 4 — NAT router consults its table, rewrites destination**
```
Source:      93.184.216.34:80
Destination: 192.168.1.5:49152  (original internal client)
```

The process is transparent to both the client and the server.

---

## 5.4 Port Forwarding

**Port forwarding** (also called **destination NAT** or DNAT) allows incoming connections from the internet to reach a specific device inside the private network.

```
Incoming:   203.0.113.42:80  →  Rule: port 80 → 192.168.1.100:80
Result:     192.168.1.100:80 (internal web server)
```

**Real-world example:** You're running a game server or web server at home. You configure your router to forward external port 25565 (Minecraft) to the internal IP of your gaming PC at port 25565.

---

## 5.5 NAT and Its Problems

Despite being widespread, NAT introduces several complications:

### 1. Breaking End-to-End Connectivity
NAT was never part of the original internet design. It violates the **end-to-end principle** — the idea that any two internet nodes should be able to communicate directly. With NAT, devices behind NAT cannot accept unsolicited incoming connections.

### 2. Application Layer Gateway (ALG) Problems
Some protocols embed IP addresses within application data (not just headers) — examples include FTP, SIP (VoIP), and H.323. NAT must inspect and rewrite application layer content, requiring specialized **ALG** modules. This is complex and fragile.

### 3. NAT Traversal Challenges
Peer-to-peer applications (gaming, video calling, VoIP) need to establish direct connections between two NATted clients. Techniques like **STUN, TURN, and ICE** (collectively used in WebRTC) solve this, but add complexity.

**STUN** (Session Traversal Utilities for NAT): A client behind NAT contacts a STUN server on the public internet, which tells the client what public IP and port the NAT is using for that connection. The client can then share this with peers.

### 4. State Table Limits
The NAT device must maintain state for every active connection. High volumes of connections can exhaust memory.

### 5. Logging and Forensics
Because many users share one IP, identifying which internal user made a connection requires cross-referencing NAT logs with timestamps — a significant challenge for law enforcement and security teams.

---

## 5.6 Carrier-Grade NAT (CGN)

As public IPv4 addresses ran out, some ISPs began deploying **CGN** (Carrier-Grade NAT) — essentially applying NAT *again* between the ISP and the customer. Customers receive addresses from the `100.64.0.0/10` range, which are then NATted to public IPs.

This creates **double NAT**: ISP NAT + home router NAT. This worsens all the NAT problems described above and is widely considered an unfortunate stopgap. The proper solution is IPv6 deployment.

---

# Chapter 6 — DHCP (Dynamic IP Assignment)

## 6.1 What Is DHCP?

**DHCP** — Dynamic Host Configuration Protocol — is a network management protocol that automatically assigns IP addresses and other network configuration parameters to devices on a network. Without DHCP, every device would need to be manually configured with an IP address, subnet mask, default gateway, and DNS servers — impractical at any scale.

DHCP is defined in **RFC 2131** (1997). It operates at the **application layer** and uses **UDP** (port 67 for server, port 68 for client).

---

## 6.2 What DHCP Configures

A DHCP server can provide clients with:

| Parameter | Description |
|---|---|
| **IP Address** | The address assigned to the client |
| **Subnet Mask** | Defines the local network boundary |
| **Default Gateway** | Router address for off-network traffic |
| **DNS Servers** | For resolving hostnames to IPs |
| **Lease Time** | How long the assignment is valid |
| **Domain Name** | Local domain suffix |
| **NTP Servers** | Time servers |
| **WINS Servers** | Windows name servers (legacy) |

---

## 6.3 The DORA Process

DHCP uses a four-step handshake to assign an address, known by the acronym **DORA**:

### Step 1 — DISCOVER

The client has no IP address. It broadcasts a DHCP Discover message to the entire local network:

```
Source IP:      0.0.0.0 (client has no address yet)
Destination IP: 255.255.255.255 (broadcast)
Message:        "Is there a DHCP server? I need an IP address."
```

### Step 2 — OFFER

One or more DHCP servers on the network respond with a DHCP Offer, proposing an IP address:

```
Source IP:      192.168.1.1 (DHCP server)
Destination IP: 255.255.255.255 (broadcast, because client has no IP)
Message:        "I offer you 192.168.1.50 with a 24-hour lease."
```

The server temporarily reserves the offered address.

### Step 3 — REQUEST

The client selects one offer (if multiple servers responded) and broadcasts its acceptance. The broadcast is necessary so all other servers know their offer was declined:

```
Source IP:      0.0.0.0 (client still has no address)
Destination IP: 255.255.255.255
Message:        "I accept the offer from 192.168.1.1 for 192.168.1.50."
```

### Step 4 — ACKNOWLEDGE

The server confirms the assignment:

```
Source IP:      192.168.1.1
Destination IP: 255.255.255.255 (or unicast to MAC address)
Message:        "Confirmed. 192.168.1.50 is yours for 24 hours."
         Includes: Subnet mask, gateway, DNS, lease time.
```

```
Timeline:

Client          Server
  │ ──DISCOVER──→ │
  │ ←──OFFER───── │
  │ ──REQUEST───→ │
  │ ←──ACK──────  │
  │               │
  Now has IP and config.
```

---

## 6.4 DHCP Lease Renewal

IP assignments are temporary — they have a **lease time** (commonly 24 hours, 8 days on some home routers). Before the lease expires, the client attempts to renew it:

- At **50% of lease time** — client sends a unicast Request directly to the server
- At **87.5% of lease time** — if no response, client broadcasts a Request
- At **100% of lease time** — if still no response, client must release the address and start DORA over

---

## 6.5 DHCP Relay Agents

DHCP relies on broadcasts, which don't cross router boundaries. In networks with multiple subnets, you'd need a DHCP server on every subnet — or use a **DHCP relay agent** (also called **IP helper**).

A relay agent is configured on each router interface. When it receives a DHCP Discover broadcast, it:
1. Adds its own IP address (the interface IP) to the packet as the "gateway address" field
2. **Unicasts** the packet to the DHCP server on another subnet
3. The server uses the gateway address field to determine which subnet the client is on and which address pool to draw from
4. The response is unicast back to the relay agent, which forwards it to the client

```
Subnet A:        [Client] → broadcast → [Router Interface A]
                                              ↓ (relay/unicast)
                                         [DHCP Server on Subnet B]
                                              ↓ (unicast response)
                                        [Router Interface A]
                                              ↓ (to Client)
```

---

## 6.6 DHCP Reservations

A **DHCP reservation** (or static binding) tells the DHCP server to always assign the same IP address to a specific device, identified by its **MAC address**.

```
MAC: 00:1A:2B:3C:4D:5E → Always gets 192.168.1.100
```

This gives the convenience of DHCP management (central configuration) with the predictability of a static IP — useful for printers, servers, and access points that need consistent addresses.

---

## 6.7 DHCPv6

IPv6 has its own version of DHCP — **DHCPv6** — though its role is different because IPv6 clients can often configure themselves using SLAAC. DHCPv6 is used for **stateful address assignment** (when the network administrator wants to control specific addresses) and for providing additional information like DNS server addresses that SLAAC doesn't convey.

---

## 6.8 Security Issues with DHCP

### DHCP Starvation Attack
An attacker sends thousands of fake DHCP Discover messages with different MAC addresses, exhausting the DHCP server's address pool. Legitimate clients then can't get addresses.

**Defense:** DHCP snooping on switches limits the number of DHCP requests per port.

### Rogue DHCP Server Attack
An attacker runs an unauthorized DHCP server that answers client requests before the legitimate server does. The attacker can configure clients to use a malicious default gateway or DNS server — a form of man-in-the-middle attack.

**Defense:** DHCP snooping identifies trusted ports (where the legitimate DHCP server is connected) and blocks DHCP Offer messages from other ports.

---

# Chapter 7 — Static vs. Dynamic IP

## 7.1 The Fundamental Distinction

| Feature | Static IP | Dynamic IP |
|---|---|---|
| **Assignment method** | Manually configured | DHCP assigned |
| **Changes over time** | Never (unless manually changed) | Changes when lease expires or device reconnects |
| **Configuration effort** | High | Low |
| **Best for** | Servers, routers, printers | Client devices, user workstations |
| **Cost (ISP)** | Often higher | Included in standard service |

---

## 7.2 Static IP Addresses

A **static IP** is an address that is permanently assigned to a device and never changes. Configuration is done manually on the device or, in enterprise environments, through a DHCP reservation.

### When to Use Static IPs:

**Servers and services:** A web server, mail server, DNS server, or any service that other devices need to consistently find must have a stable address. If a server's IP changed randomly, DNS records would become stale and clients couldn't connect.

**Network infrastructure:** Routers, switches, firewalls — these are the backbone of the network and must have predictable addresses. Router interfaces are always statically assigned.

**Printers and access points:** Devices that many users access benefit from stable addresses. If a printer's IP changes, users can't find it.

**VPN and firewall rules:** Security policies are typically written based on IP addresses. A dynamic address would break these rules.

### Configuration Example (Linux):

```
# Static IP via /etc/network/interfaces
auto eth0
iface eth0 inet static
    address 192.168.1.100
    netmask 255.255.255.0
    gateway 192.168.1.1
    dns-nameservers 8.8.8.8 8.8.4.4
```

---

## 7.3 Dynamic IP Addresses

A **dynamic IP** is assigned automatically via DHCP and may change when the lease expires, when the device reconnects, or when the DHCP server is restarted.

### Why Dynamic IPs Are Preferred for Clients:

**Scalability:** In a company with 500 employees, manually assigning every IP would be enormously time-consuming. DHCP handles everything automatically.

**Flexibility:** When employees join, leave, or move offices, no manual IP management is needed.

**Address reuse:** When a laptop goes home for the night, its IP is returned to the pool and can be assigned to another device.

**Reduced misconfiguration:** Duplicate IP addresses (two devices using the same IP, causing conflicts) are eliminated because DHCP ensures uniqueness.

---

## 7.4 Dynamic DNS (DDNS)

A challenge with dynamic IPs: if your home server's IP changes, how do external clients find it?

**Dynamic DNS (DDNS)** solves this. A client on the server periodically reports its current public IP to a DDNS provider (like No-IP or DuckDNS). The provider updates the DNS record automatically.

```
myserver.ddns.net → currently 203.0.113.42

(IP changes to 203.0.113.99)

DDNS client detects change → updates record
myserver.ddns.net → 203.0.113.99
```

This allows using a consistent hostname even with a dynamic IP.

---

## 7.5 ISP-Level: Static vs. Dynamic

ISPs also distinguish between static and dynamic public IPs:

**Dynamic public IP:** The most common residential option. Your ISP assigns you an IP from a pool. While it may not change often (some users keep the same IP for months), it can change when your router reboots or the ISP rotates leases.

**Static public IP:** A business-grade service where your ISP guarantees you'll always have the same public IP. Required if you're hosting servers, running VPNs, or need consistent whitelisting in customer firewalls. Typically costs extra.

---

# Chapter 8 — Routing Tables & Routing Protocols (OSPF, BGP, RIP)

## 8.1 What Is a Routing Table?

A **routing table** is a data structure stored in a router (or host) that contains a list of known network destinations and the instructions for how to reach them. Every time a router receives a packet, it consults this table to determine where to forward the packet next.

### Structure of a Routing Table Entry

Each entry (called a **route**) contains:

| Field | Description |
|---|---|
| **Destination Network** | The target network (CIDR notation) |
| **Next Hop** | The IP of the next router to send packets to |
| **Interface** | Which network interface to use |
| **Metric** | Cost of this route (lower is better) |
| **Administrative Distance** | Trust level of the routing source |

### Example Routing Table (simplified)

```
Destination       Next Hop        Interface   Metric  Source
0.0.0.0/0        203.0.113.1     eth0        10      Static (default)
10.0.0.0/8       10.1.1.1        eth1        110     OSPF
192.168.1.0/24   —               eth2        0       Connected
172.16.0.0/16    192.168.1.254   eth2        20      RIP
10.5.5.0/24      10.1.1.2        eth1        100     OSPF
```

**The default route (`0.0.0.0/0`)** matches any destination not found elsewhere in the table. It's the "catch-all" that directs unknown traffic toward the internet. Often called the **gateway of last resort**.

---

## 8.2 How Route Selection Works

When a packet arrives, the router performs **longest prefix match** — it selects the most specific route that matches the destination.

**Example:** Packet destined for `10.5.5.10`

```
Matches:  0.0.0.0/0    (0-bit match — default route)
Matches:  10.0.0.0/8   (8-bit match)
Matches:  10.5.5.0/24  (24-bit match) ← SELECTED (most specific)
```

The `/24` route wins because it's the most specific match.

---

## 8.3 Types of Routes

### Connected Routes
Automatically added when an interface is assigned an IP and brought up. If a router has an interface at `192.168.1.1/24`, it automatically knows that `192.168.1.0/24` is directly connected.

### Static Routes
Manually configured by an administrator. They never change unless manually updated.

```
ip route 10.0.0.0 255.0.0.0 192.168.1.254
         (destination)   (mask) (next hop)
```

**Use case:** Small networks with predictable topology, stub networks with only one path.

**Disadvantage:** Doesn't adapt to topology changes. If a link fails, static routes don't automatically reroute traffic.

### Dynamic Routes
Learned automatically through **routing protocols**. Routers exchange information about reachable networks and update their tables accordingly. When topology changes (a link fails, a new network appears), routing protocols reconverge automatically.

---

## 8.4 Administrative Distance

Different routing sources are assigned an **Administrative Distance (AD)** — a trustworthiness value. Lower AD = more trustworthy = preferred.

| Source | Administrative Distance |
|---|---|
| Connected interface | 0 |
| Static route | 1 |
| EIGRP (summary) | 5 |
| External BGP (eBGP) | 20 |
| OSPF | 110 |
| IS-IS | 115 |
| RIP | 120 |
| Internal BGP (iBGP) | 200 |

If OSPF and RIP both have a route to the same destination, OSPF's route is preferred because 110 < 120.

---

## 8.5 Interior vs. Exterior Routing Protocols

Routing protocols are divided into two categories:

**IGP (Interior Gateway Protocols):** Used *within* a single organization or Autonomous System. Examples: OSPF, RIP, EIGRP, IS-IS.

**EGP (Exterior Gateway Protocols):** Used *between* different organizations or Autonomous Systems. The only EGP in use today is **BGP**.

---

## 8.6 RIP — Routing Information Protocol

### Overview

**RIP** is one of the oldest routing protocols, defined in RFC 1058 (1988). It is simple to configure but has significant limitations that make it unsuitable for large networks.

### How RIP Works

RIP is a **distance-vector protocol** — routers share their entire routing table with directly connected neighbors periodically (every 30 seconds). Routers use this information to build their own tables, and the process propagates throughout the network.

**Metric:** RIP uses **hop count** — the number of routers a packet must traverse to reach a destination. Maximum hop count is **15**. A destination 16 or more hops away is considered unreachable.

### RIP Operation Example

```
Router A — Router B — Router C — Router D

A→B→C→D = 3 hops (from A's perspective to reach D's network)
```

**Update process:**
1. Router B tells A: "I can reach C in 1 hop and D in 2 hops"
2. A adds 1 to each: "I can reach C in 2 hops, D in 3 hops"
3. A stores this in its table

### RIP Versions

**RIPv1 (classful):** No subnet mask in updates — assumes classful boundaries. Cannot work with VLSM or CIDR. No authentication.

**RIPv2 (classless):** Includes subnet mask in updates, supports VLSM, adds authentication, uses multicast (224.0.0.9) instead of broadcast.

**RIPng:** IPv6 version.

### RIP Problems

**Slow convergence:** With a 30-second update timer, it can take minutes for network changes to propagate everywhere. During convergence, routing loops can occur.

**Count to infinity:** When a network becomes unreachable, routers may increment the hop count toward infinity (15) before declaring it unreachable. Workarounds like **split horizon** and **poison reverse** help but don't fully solve this.

**15-hop limit:** Makes RIP unsuitable for large networks.

### RIP's Role Today

RIP is largely obsolete in production environments, replaced by OSPF and EIGRP. It remains useful as a teaching tool and appears in small, simple networks or legacy installations.

---

## 8.7 OSPF — Open Shortest Path First

### Overview

**OSPF** is a **link-state routing protocol** defined in RFC 2328 (1998). It is the most widely deployed IGP in enterprise and service provider networks. Unlike RIP, OSPF builds a complete map of the network and uses it to compute optimal paths independently.

**OSPF version for IPv6** is called **OSPFv3** (RFC 5340).

### How OSPF Works

#### Step 1: Neighbor Discovery

OSPF routers send **Hello packets** via multicast to discover neighbors. On Ethernet, Hello packets are sent to `224.0.0.5` every 10 seconds. Routers become neighbors when they exchange Hellos successfully.

```
Router A                  Router B
    │                         │
    │──── Hello (my RID, area, timers) ────→│
    │←─── Hello (your RID seen) ────────────│
    │                         │
    Neighbors formed!
```

#### Step 2: Database Exchange (Flooding LSAs)

Each router creates **LSAs (Link State Advertisements)** describing its own interfaces and neighbors. These are flooded to all routers in the area, so every router has an identical **LSDB (Link State Database)** — a complete map of the network topology.

#### Step 3: SPF Calculation

Each router independently runs **Dijkstra's Shortest Path First (SPF) algorithm** on the LSDB to calculate the shortest (lowest-cost) path to every destination. Results populate the routing table.

**Cost Calculation:** OSPF cost is based on bandwidth:
```
Cost = Reference Bandwidth / Interface Bandwidth
Default reference bandwidth = 100 Mbps

FastEthernet (100 Mbps):  Cost = 100/100 = 1
Ethernet (10 Mbps):       Cost = 100/10  = 10
T1 (1.544 Mbps):          Cost = 100/1.544 ≈ 64
```

On modern networks with gigabit+ speeds, the reference bandwidth is often increased to 1000 Mbps or 100,000 Mbps to provide meaningful differentiation.

#### Step 4: Routing Table Population

The SPF results are installed into the routing table. Only the best paths are used, but OSPF can load-balance across multiple equal-cost paths (ECMP — Equal Cost Multi-Path).

---

### OSPF Areas

OSPF uses a **hierarchical area structure** to scale to large networks. All areas must connect to **Area 0 (the backbone area)**:

```
        Area 0 (Backbone)
       /        |        \
   Area 1    Area 2    Area 3
```

**Area 0 (Backbone):** All inter-area traffic must pass through Area 0.

**Internal Routers:** All interfaces in the same area.

**Area Border Routers (ABRs):** Connect two or more areas — one interface in Area 0, another in a non-backbone area.

**Autonomous System Boundary Routers (ASBRs):** Connect OSPF to other routing domains (e.g., redistribute routes from BGP into OSPF).

**Benefits of areas:**
- Reduces LSA flooding scope (LSAs only flood within an area)
- Smaller LSDB per router
- Topology changes only trigger SPF recalculation in the affected area
- Summary routes can be advertised between areas (reducing routing table size)

---

### OSPF Router Roles on a Multi-Access Network

On Ethernet networks where multiple OSPF routers coexist, OSPF elects a **DR (Designated Router)** and **BDR (Backup Designated Router)**. Instead of forming full adjacencies with every router (O(n²) relationships), all routers form adjacency with the DR/BDR only (O(n) relationships), with the DR serving as the central distributor of LSAs on that segment.

```
Without DR:         With DR:
A–B, A–C, A–D       A–DR
B–C, B–D            B–DR
C–D                 C–DR
6 adjacencies       3 adjacencies
```

The DR is elected based on **OSPF priority** (highest wins; default is 1) and then **Router ID** (highest IP address on a loopback).

---

### OSPF Advantages Over RIP

| Feature | RIP | OSPF |
|---|---|---|
| Algorithm | Distance-vector | Link-state |
| Metric | Hop count | Bandwidth-based cost |
| Max network size | 15 hops | Unlimited (hierarchical areas) |
| Convergence | Slow (minutes) | Fast (seconds) |
| Loop prevention | Split horizon, poison reverse | SPF algorithm (inherently loop-free) |
| Scalability | Small networks only | Enterprise and service provider |
| Classless support | RIPv2 yes | Yes |
| Vendor support | Universal | Universal (open standard) |

---

## 8.8 BGP — Border Gateway Protocol

### Overview

**BGP** (Border Gateway Protocol) is defined in **RFC 4271** (2006, version 4). It is the routing protocol of the internet — the mechanism by which the world's Autonomous Systems exchange routing information and collectively maintain the global routing table. BGP is a **path-vector protocol**.

There is no protocol more important for internet operation than BGP.

### BGP Key Concepts

#### Autonomous System (AS)
A collection of IP networks under a single administrative entity using a common routing policy. Each AS has a globally unique **ASN (Autonomous System Number)**. ASNs can be 16-bit (1–65535) or 32-bit (RFC 6793). Private ASNs (64512–65534 for 16-bit, 4200000000–4294967294 for 32-bit) are used internally.

```
AS65000: Google's networks
AS15169: Actually Google's public AS
AS7018:  AT&T
AS3356:  Lumen (formerly Level 3)
```

#### iBGP vs. eBGP

**eBGP (External BGP):** Between routers in *different* ASes. This is how ASes exchange routing information — it's the "glue" of the internet.

**iBGP (Internal BGP):** Between routers in the *same* AS. Ensures consistent routing decisions across a large AS with multiple BGP-speaking routers.

```
AS65000                              AS65001
┌──────────────────────┐             ┌──────────────────────┐
│ Router A ─iBGP─ Router B ═══eBGP═══ Router C ─iBGP─ Router D │
└──────────────────────┘             └──────────────────────┘
```

#### BGP Path Vector

Unlike OSPF (which shares topology) or RIP (which shares hop counts), BGP shares the **full path** to each destination — specifically, the sequence of AS numbers that a packet would traverse:

```
Prefix: 1.2.3.0/24
AS_PATH: 65001 65003 65007

Meaning: To reach 1.2.3.0/24, traffic goes through AS65001, then AS65003, then AS65007.
```

This AS_PATH attribute serves as loop detection: if a router sees its own ASN in the path, it rejects the route.

---

### BGP Session Establishment

Unlike OSPF (which uses multicast for discovery), BGP uses **TCP port 179** for connections between manually configured peers. The TCP connection makes BGP reliable.

```
State Machine:
Idle → Connect → Active → OpenSent → OpenConfirm → Established
```

Once **Established**, routers exchange their routing tables (only once initially, then incremental updates). BGP keepalives are sent every 60 seconds to maintain the session.

---

### BGP Attributes and Path Selection

BGP can learn multiple paths to the same destination. It uses a set of **attributes** to select the best path. The selection process is evaluated in order:

1. **Weight** (Cisco proprietary) — highest preferred
2. **LOCAL_PREF** — used within an AS to prefer one exit point over another; higher preferred
3. **Locally originated** — prefer routes originated by this router
4. **AS_PATH length** — shorter is preferred (fewer ASes to traverse)
5. **ORIGIN** — IGP < EGP < Incomplete (prefer IGP-sourced routes)
6. **MED (Multi-Exit Discriminator)** — used to influence how neighbors send traffic in; lower preferred
7. **eBGP over iBGP** — prefer external routes
8. **IGP metric** to next hop — prefer lower cost
9. **Oldest route** (eBGP only)
10. **Lowest Router ID**

**LOCAL_PREF example:**
```
AS65000 has two connections to the internet:
- Via Router A (connected to ISP1): LOCAL_PREF = 200
- Via Router B (connected to ISP2): LOCAL_PREF = 100

All routers in AS65000 prefer to send traffic out through ISP1 (higher LOCAL_PREF).
If ISP1 connection fails, traffic automatically switches to ISP2.
```

---

### BGP in Practice — Routing Policy

BGP is fundamentally about **policy routing**. Organizations use BGP to express business relationships:

**Customer-Provider:** An organization (customer) pays an ISP (provider). The provider advertises the customer's prefixes to the internet and provides transit.

**Peering:** Two organizations agree to exchange traffic directly (often at an IXP — Internet Exchange Point) without payment. This is usually for mutual benefit (reducing transit costs, improving performance).

**BGP communities:** Tags attached to routes that carry policy instructions. For example, a prefix tagged with community `65000:666` might mean "blackhole this traffic" — a technique for DDoS mitigation.

---

### Route Reflectors and Confederation

**iBGP full mesh problem:** In an AS with n BGP routers, iBGP requires every router to peer with every other router (n(n-1)/2 sessions). With 50 routers, that's 1,225 sessions — unmanageable.

**Route Reflectors (RR):** A designated router reflects BGP routes to all other iBGP clients, so clients only need to peer with the RR, not with each other.

**BGP Confederation:** The AS is divided into sub-ASes, reducing the iBGP mesh problem within each sub-AS.

---

### BGP Security

BGP was designed in an era of mutual trust between network operators. This has led to significant security problems:

**BGP Hijacking:** A malicious or misconfigured AS announces (advertises) IP prefixes it doesn't own. Other routers accept these announcements and route traffic there.

**Famous incidents:**
- **2010:** China Telecom accidentally announced 50,000+ prefixes, briefly routing significant portions of internet traffic through China
- **2018:** BGP hijacking of Amazon Route 53 DNS servers used in a cryptocurrency theft
- **2019:** Verizon propagated incorrect routes from Allegheny Technologies, disrupting large portions of the internet

**RPKI (Resource Public Key Infrastructure):** A cryptographic system where IP address holders sign their prefix-to-ASN mappings. Routers validate BGP announcements against RPKI records, rejecting invalid ones. Adoption is growing rapidly but not yet universal.

**BGPsec:** A cryptographic extension to BGP that validates the AS_PATH, preventing path manipulation. Still largely in development/early deployment.

---

# Chapter 9 — Autonomous Systems (AS) & Internet Backbone Routing

## 9.1 What Is an Autonomous System?

An **Autonomous System (AS)** is a collection of IP networks and routers under the control of a single organization that presents a common, clearly defined routing policy to the internet. The key word is "autonomous" — the organization controls its own internal routing policy.

Every AS is identified by a globally unique **ASN (Autonomous System Number)**:

- **16-bit ASNs:** Range 1–65535 (original specification, RFC 1930)
- **32-bit ASNs:** Range 1–4,294,967,295 (extended, RFC 6793 — written as `X.Y` notation or plain integers)
- **Private ASNs:** 64512–65534 (16-bit), 4200000000–4294967294 (32-bit) — not used on public internet

ASNs are assigned by RIRs (ARIN, RIPE NCC, APNIC, etc.).

---

## 9.2 AS Types

### Stub AS
Has only one connection to the internet. Traffic can only enter or leave through that single connection. No transit traffic passes through.

```
        Internet
            │
        [ISP AS]
            │
      [Stub AS] ← single connection
```

**Example:** A small company with a single ISP connection. ASN may not even be needed — the ISP can represent the company's prefixes under its own BGP.

### Multihomed AS
Connected to two or more providers for redundancy and/or performance. Can use BGP to control inbound/outbound traffic preferences.

```
        Internet
       /          \
   [ISP1]        [ISP2]
      \             /
    [Multihomed Company AS]
```

**Example:** A large enterprise or website needing high availability.

### Transit AS
Provides connectivity between other ASes — the core business of an ISP. Traffic enters from one AS and exits to another.

```
[Customer AS] → [Transit ISP AS] → [Destination AS]
```

**Example:** Major ISPs like AT&T, NTT, Telia — they carry transit traffic between thousands of customers.

---

## 9.3 The Internet Hierarchy

The internet is loosely organized into a hierarchy:

### Tier 1 ISPs
The top level. Tier 1 ISPs have **global reach** and peer with all other Tier 1s on a **settlement-free basis** (no money changes hands for peering). They form the "backbone" of the internet.

They do not pay for transit — they are transit providers.

Major Tier 1 networks include:
- **AT&T** (AS7018)
- **NTT Communications** (AS2914)
- **Lumen/Level 3** (AS3356)
- **Telia Carrier** (AS1299)
- **GTT Communications** (AS3257)
- **Cogent Communications** (AS174)

### Tier 2 ISPs
Regional or national ISPs. They have extensive reach within a region but may need to purchase transit from Tier 1 for global coverage. They peer with other Tier 2s to reduce costs.

**Examples:** Deutsche Telekom, BT, Comcast.

### Tier 3 ISPs
Local ISPs providing last-mile connectivity to end users. They purchase transit from Tier 1 or Tier 2 providers.

**Examples:** Small regional ISPs, municipal broadband providers.

```
End User
    ↓
Tier 3 ISP (local, last-mile)
    ↓
Tier 2 ISP (regional)
    ↓
Tier 1 ISP (global backbone)
    ↓
Tier 1 ISP (peer)
    ↓
Tier 2 ISP (regional)
    ↓
Tier 3 ISP (last-mile)
    ↓
Destination
```

---

## 9.4 Internet Exchange Points (IXPs)

An **IXP** (Internet Exchange Point) is a physical infrastructure where multiple networks connect to exchange traffic directly (peer), rather than routing it through an upstream provider. This reduces costs and improves performance.

### How IXPs Work

An IXP is essentially a large Ethernet switch infrastructure. Member networks connect their routers to the IXP switch fabric and establish BGP sessions with desired peers.

```
ISP_A ──────────────── IXP Switch Fabric ──────── ISP_B
                               │
                           ISP_C
                               │
                          CDN_Provider
```

When ISP_A and ISP_B peer at an IXP, traffic between their customers travels:
```
ISP_A → IXP → ISP_B   (direct, fast, free)
```
Instead of:
```
ISP_A → Tier1 → Tier2 → ISP_B   (transit costs, additional latency)
```

### Major IXPs Worldwide

| IXP | Location | Peak Traffic |
|---|---|---|
| **DE-CIX Frankfurt** | Germany | 14+ Tbps peak |
| **AMS-IX** | Amsterdam | 9+ Tbps peak |
| **LINX** | London | 6+ Tbps |
| **Equinix IX** | Multiple | Varies |
| **JPIX** | Tokyo | Multi-Tbps |

DE-CIX Frankfurt is the world's largest IXP by connected networks and traffic volume.

---

## 9.5 The Global BGP Routing Table

Every BGP router on the internet that handles full routing maintains the **global BGP routing table** — a list of every publicly advertised IP prefix and the path to reach it.

As of 2024, the global IPv4 BGP table contains approximately **950,000–1,000,000 routes** (rapidly approaching 1 million). The IPv6 table has ~200,000 routes.

**Route table growth** is a significant concern for router hardware and memory requirements. The "DFZ" (Default-Free Zone) consists of routers that carry a full routing table with no default route — any destination on the internet is explicitly known.

---

## 9.6 CDN and Anycast in Backbone Routing

**Content Delivery Networks (CDNs)** like Cloudflare, Akamai, and Fastly use BGP in sophisticated ways. They announce the same IP prefixes from hundreds of locations worldwide, combined with **anycast routing** (Chapter 10) to direct users to the nearest server.

Cloudflare, for example, announces `1.1.1.1` (its DNS resolver) from over 300 locations. When your query reaches the internet, BGP routing naturally directs it to the geographically closest Cloudflare location.

---

# Chapter 10 — Anycast, Unicast, Multicast, Broadcast

## 10.1 Communication Models Overview

IP networking supports four fundamental ways of addressing packets — four "cast" types — each suited to different communication scenarios:

| Type | Sender | Recipients | Example |
|---|---|---|---|
| **Unicast** | One | One specific device | Web browsing, SSH |
| **Broadcast** | One | All devices in local network | DHCP Discover |
| **Multicast** | One (or more) | Subscribed group of devices | Video streaming, routing protocols |
| **Anycast** | One | Nearest member of a group | DNS resolvers, CDN |

---

## 10.2 Unicast

### Definition

**Unicast** is the most common communication model: a single sender communicates with a single receiver using a specific, globally unique destination address.

Every TCP connection, UDP flow to a specific host, HTTPS request, and SSH session uses unicast.

### How It Works

```
Client (192.168.1.5) → unicast packet → Server (93.184.216.34)
                    one specific destination
```

The destination IP in the packet header is the unique address of exactly one device. All routing infrastructure directs the packet toward that specific device.

### IPv4 Unicast Space

All public addresses not reserved for multicast, broadcast, or special purposes are unicast. Private RFC 1918 addresses are also unicast (just not globally routable).

### IPv6 Unicast

- **Global Unicast (2000::/3):** Globally routable, equivalent to public IPv4
- **Link-Local Unicast (fe80::/10):** Only valid on a single link
- **Unique Local Unicast (fc00::/7):** Private, organization-internal (like RFC 1918)

---

## 10.3 Broadcast

### Definition

**Broadcast** sends a packet to **all devices on the local network segment** simultaneously. Every device receives and processes the packet, whether it cares about the content or not.

### Types of Broadcast in IPv4

**Limited Broadcast (`255.255.255.255`):** Sent to all hosts on the local subnet. Routers do not forward limited broadcasts — they are local only.

**Directed Broadcast (`x.x.x.255`):** Sent to all hosts in a specific network. For example, `192.168.1.255` is the broadcast address for `192.168.1.0/24`. By default, routers do not forward directed broadcasts (can be enabled, but rarely should be — historically enabled attacks like Smurf attack).

### Common Broadcast Uses

- **DHCP Discover** — client has no IP, must broadcast to find a server
- **ARP (Address Resolution Protocol)** — "Who has IP 192.168.1.1? Tell 192.168.1.5" (maps IP to MAC)
- **NetBIOS** — Windows name resolution (legacy)

### Broadcast Domains

A **broadcast domain** is the set of devices that receive a broadcast packet. Routers separate broadcast domains — broadcasts don't cross router boundaries. Switches and hubs extend broadcast domains.

Large broadcast domains are problematic:
- All devices process every broadcast, wasting CPU
- Heavy broadcast traffic wastes bandwidth
- ARP storms can occur in large flat networks

This is why large networks are segmented into smaller subnets.

### IPv6 and Broadcast

**IPv6 completely eliminates broadcast.** Functions served by broadcast in IPv4 are handled by:
- **Multicast** for group-addressed traffic
- **NDP (Neighbor Discovery Protocol)** replacing ARP (uses multicast solicited-node addresses)
- **SLAAC** for address configuration without broadcast

---

## 10.4 Multicast

### Definition

**Multicast** delivers packets to a **group of interested receivers** — devices that have explicitly subscribed to receive that traffic. The sender sends one copy of each packet, and the network replicates it only where needed.

This is far more efficient than broadcast (which goes to everyone) or sending individual unicast copies to each receiver.

### Multicast Addressing in IPv4

IPv4 multicast addresses are in the **Class D range: 224.0.0.0 – 239.255.255.255**.

| Range | Scope | Use |
|---|---|---|
| `224.0.0.0/24` | Link-local (TTL 1) | Routing protocols |
| `224.0.1.0/24` | Internet-wide | Well-known multicast |
| `232.0.0.0/8` | Source-specific multicast | SSM |
| `233.0.0.0/8` | GLOP (ASN-based) | ISP multicast |
| `239.0.0.0/8` | Administratively scoped | Enterprise internal |

**Well-known multicast groups:**

| Address | Protocol |
|---|---|
| `224.0.0.1` | All hosts on subnet |
| `224.0.0.2` | All routers on subnet |
| `224.0.0.5` | All OSPF routers |
| `224.0.0.6` | OSPF DR/BDR |
| `224.0.0.9` | RIPv2 routers |
| `239.255.255.250` | SSDP (UPnP) |
| `224.0.0.251` | mDNS (Multicast DNS) |

### IGMP — Internet Group Management Protocol

Hosts use **IGMP** to tell the local router they want to receive traffic for a specific multicast group:

```
Host A sends IGMP Join: "I want to receive multicast group 224.1.2.3"
Router notes: "Send multicast group 224.1.2.3 to port connected to Host A"
```

When the host is done, it sends an IGMP Leave message.

### How Multicast Routing Works

**PIM (Protocol Independent Multicast)** is the standard multicast routing protocol. It builds a distribution tree from the source(s) to all receivers.

**PIM-SM (Sparse Mode):** Uses a **Rendezvous Point (RP)** — a central meeting point where sources register and receivers subscribe. Efficient when receivers are spread across a large network.

**PIM-DM (Dense Mode):** Floods multicast traffic everywhere initially, then prunes branches where there are no receivers. Better for dense receiver distribution.

### Multicast Real-World Uses

**Financial markets:** Stock exchanges use multicast to deliver real-time market data (price feeds) to thousands of trading systems simultaneously. UDP multicast is used for its efficiency.

**IPTV and video streaming:** Cable and telecom providers deliver live TV channels via multicast. A single stream is sent; all subscribers on a segment receive it.

**Video conferencing infrastructure:** Multi-party video can use multicast within large enterprise networks.

**Routing protocols:** OSPF, EIGRP, RIPv2 all use multicast to communicate between routers rather than broadcasting.

**mDNS / Bonjour (224.0.0.251):** Apple's Bonjour and mDNS (Multicast DNS) use multicast for zero-configuration service discovery on local networks. When your Mac finds printers, Apple TVs, or AirPlay speakers without configuration, it's using mDNS.

### IPv6 Multicast

IPv6 uses `ff00::/8` for all multicast. There is no broadcast in IPv6 — all broadcast functions are replaced by specific multicast groups.

**Solicited-node multicast:** IPv6 uses this instead of ARP. When a device needs to find a neighbor's MAC address, it sends to the solicited-node multicast address derived from the target's IPv6 address. Only the target (and perhaps a few others with the same lower 24 bits in their address) process the packet — far more efficient than broadcast ARP.

---

## 10.5 Anycast

### Definition

**Anycast** is the most sophisticated of the four models. The same IP address is assigned to **multiple devices in different locations**. When a packet is sent to that address, the network delivers it to the **topologically nearest** device holding that address (nearest as determined by routing protocol metrics — not necessarily geographically nearest).

The sender is unaware that multiple devices share the address — from the sender's perspective, it's just a normal unicast destination. The routing infrastructure handles the selection.

### How Anycast Works

```
Same IP address: 9.9.9.9 (Quad9 DNS)
                    │
         ┌─────────┤─────────┐
         │         │         │
    [Server in   [Server in [Server in
     New York]    Frankfurt] Singapore]

User in London → 9.9.9.9 → Frankfurt server (nearest)
User in New York → 9.9.9.9 → New York server (nearest)
User in Tokyo → 9.9.9.9 → Singapore server (nearest)
```

Each anycast location announces the same IP prefix via BGP. BGP's shortest-path selection routes users to whichever announcement is "closest" by routing metrics.

### Anycast Addressing

Anycast is not a special address range — any address can technically be anycast. In IPv4, it's implemented by announcing the same prefix from multiple locations via BGP. In IPv6, addresses can be explicitly designated as anycast.

**IPv6 anycast format:** Looks like a unicast address but is explicitly configured as anycast. A special anycast address is the **subnet-router anycast address** — the prefix with all interface ID bits set to zero — which addresses any router in the subnet.

### Anycast vs. Unicast vs. Load Balancing

| Method | How Selection Works | State |
|---|---|---|
| Unicast to single server | N/A | Stateful |
| DNS round-robin | DNS returns different IPs | Stateless |
| Load balancer | Dedicated device distributes requests | Stateful (can be) |
| Anycast | Routing protocol selects nearest node | Stateless |

Anycast is **stateless** — different packets in the same flow may arrive at different servers if routing changes. This is generally fine for UDP (like DNS) but problematic for TCP connections (session state would be lost).

### Critical Anycast Uses in Practice

#### 1. DNS Root Servers

The internet has 13 logical DNS root servers, labeled A through M (e.g., `a.root-servers.net` through `m.root-servers.net`). But they are not 13 physical machines — they are **anycast clusters** totaling over **1,000 physical servers** worldwide.

Each root server "letter" (like `j.root-servers.net` at `192.58.128.30`) is anycast. When your DNS resolver queries a root server, it reaches the nearest physical instance automatically.

Without anycast, 13 machines would handle all root DNS queries globally — they'd be instantly overwhelmed. Anycast scales this to thousands of nodes.

#### 2. Public DNS Resolvers

| Service | IP | Operator |
|---|---|---|
| Google Public DNS | `8.8.8.8`, `8.8.4.4` | Google |
| Cloudflare DNS | `1.1.1.1`, `1.0.0.1` | Cloudflare |
| Quad9 | `9.9.9.9` | Quad9 |
| OpenDNS | `208.67.222.222` | Cisco |

All of these use anycast. `1.1.1.1` doesn't resolve to a single server — it's served from hundreds of PoPs (Points of Presence) worldwide. Your query reaches whichever is nearest.

#### 3. Content Delivery Networks (CDNs)

Cloudflare, Akamai, Fastly, and Amazon CloudFront use anycast to direct users to the nearest edge node. When you connect to a website behind Cloudflare, you're connecting to a Cloudflare server in or near your city.

```
User in Sydney requests → www.example.com (protected by Cloudflare)
                        → Cloudflare Sydney PoP (via anycast)
                        → Origin server
```

This dramatically reduces latency and distributes load globally.

#### 4. DDoS Mitigation

Anycast is also powerful for DDoS defense. When an attacker sends 100 Gbps of attack traffic to an anycast IP, that traffic is distributed across all anycast nodes globally. No single node receives all the traffic:

```
100 Gbps attack → anycast IP
               → 2 Gbps hits Tokyo node
               → 3 Gbps hits London node
               → 4 Gbps hits New York node
               → ... distributed across 50+ nodes
```

Cloudflare, for example, uses anycast combined with massive network capacity to absorb some of the largest DDoS attacks ever recorded.

#### 5. NTP (Network Time Protocol)

The NTP Pool Project (`pool.ntp.org`) uses anycast-like DNS tricks combined with geographic DNS to direct NTP clients to nearby servers. Many organizations also deploy anycast NTP internally.

---

## 10.6 Summary Comparison Table

| Feature | Unicast | Broadcast | Multicast | Anycast |
|---|---|---|---|---|
| **Senders** | One | One | One or more | One |
| **Recipients** | One specific device | All on local net | Subscribed group | Nearest in group |
| **IPv4 range** | Any valid IP | 255.255.255.255 | 224.0.0.0/4 | Any (routing-based) |
| **IPv6 support** | Yes | Eliminated | Yes (ff00::/8) | Yes |
| **Crosses routers** | Yes | No | Yes (with PIM) | Yes |
| **Efficiency** | Low (one-to-one) | Low (all receive) | High (group only) | High (nearest node) |
| **TCP-compatible** | Yes | N/A | Rarely | Limited |
| **UDP-compatible** | Yes | Yes | Yes | Yes |
| **Typical use** | All internet traffic | ARP, DHCP | Routing protocols, video, markets | DNS, CDN, DDoS mitigation |

---

# Conclusion — Addressing and Routing as a System

The topics in this part form an interlocking system. Let us trace a complete journey to see how they all fit together.

**A user opens a browser and types `www.example.com`:**

1. The device has no IP — **DHCP** (Chapter 6) provides one automatically from a **private IP range** (Chapter 4): `192.168.1.10/24`, gateway `192.168.1.1`, DNS `8.8.8.8`.

2. The device needs to resolve `www.example.com`. It sends a **unicast** DNS query to `8.8.8.8` — a public **anycast** address (Chapter 10) served by the nearest Google DNS PoP.

3. The DNS query leaves the home network through the **NAT router** (Chapter 5), which translates the source from `192.168.1.10:5000` to `203.0.113.42:10001` using **PAT**, because `192.168.1.10` is a **private IP** not routable on the internet.

4. The **routing table** (Chapter 8) on the home router has a default route (`0.0.0.0/0`) pointing to the ISP gateway. The packet is forwarded accordingly.

5. The ISP uses **BGP** (Chapter 8) to route the packet toward Google's **AS** (Chapter 9). BGP's path-vector mechanism has built routing table entries based on AS_PATH and LOCAL_PREF attributes, selecting the optimal inter-AS path.

6. The DNS response returns with `93.184.216.34` (example.com's IP — a **public, unicast** address).

7. The browser makes a TCP connection — a **unicast** flow — to `93.184.216.34:443`. Again, the home router's **NAT table** tracks this connection, **subnetting** (Chapter 3) tells devices which traffic is local vs. which needs forwarding, and **routing protocols** within ISP networks use **OSPF** to find the optimal path through their infrastructure.

8. The request arrives at a CDN edge server (possibly served via **anycast**), which proxies the request to the origin.

Every step relies on the concepts in this part. IPv4 addressing provides the foundational syntax. CIDR enables efficient allocation. Private addresses and NAT extend the useful life of IPv4 while IPv6 migration continues. DHCP automates configuration. Routing tables guide every forwarding decision. BGP stitches together thousands of Autonomous Systems into a coherent global internet. And the four cast types — unicast, broadcast, multicast, anycast — provide the vocabulary for addressing the right destinations.

Together, they are not just protocols and technical specifications — they are the architecture of communication itself at planetary scale.

---

*End of Part V — Addressing & Routing*