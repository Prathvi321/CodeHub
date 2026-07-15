# PART VII — Governance & Ownership

## A Comprehensive Study of Internet Governance, Standards, and Policy

---

# Preface

The Internet is often described as a decentralized, anarchic network with no central authority — and in a technical sense, that is largely true. No single government, company, or organization "owns" the Internet in the way a utility company owns a power grid. Yet the Internet does not govern itself by magic. Beneath the surface of every web page loaded, every email sent, and every domain name typed into a browser lies an intricate, carefully negotiated system of governance — a patchwork of organizations, policies, protocols, and political agreements that collectively keep the global network functioning, fair, and (ideally) open.

This part of the book explores that governance landscape in full. We examine the organizations that coordinate names, numbers, and protocols; the bodies that write technical standards; the political debates about neutrality and control; and the forums where nations argue about who should ultimately govern the Internet. Understanding these institutions is not merely academic. Decisions made in these spaces directly affect what websites you can reach, how your data is routed, whether your startup can get a domain name, and whether authoritarian governments can fragment the global network into isolated national intranets.

---

# Chapter 1: ICANN — The Internet's Coordination Authority

## 1.1 What Problem Does ICANN Solve?

Imagine a world where two different websites could simultaneously claim the domain name `amazon.com`, routing different users to different servers depending on which part of the network they queried. The result would be chaos — a broken, untrustworthy namespace where no address could be relied upon. Or imagine a world where the same IP address block was assigned to two different organizations in two different countries, causing routers to be confused about where to send packets.

These are not hypothetical disasters. In the early Internet, coordination happened informally, managed largely by a single individual — Jon Postel, a computer scientist at the University of Southern California — who maintained lists of addresses and names by hand and by consensus. As the Internet grew from hundreds of computers to millions, informal management became impossible. A formal institution was needed.

The **Internet Corporation for Assigned Names and Numbers (ICANN)** was created in 1998 to fill that role. It is a nonprofit, private-sector organization incorporated under California law, headquartered in Los Angeles, with offices around the world. Its core mandate is deceptively simple: ensure the stable and secure operation of the Internet's unique identifier systems. In practice, this means coordinating:

- The **Domain Name System (DNS)** — the global directory that maps domain names to IP addresses
- **IP address allocation** — ensuring that numeric addresses are distributed without conflicts
- **Protocol port and parameter assignments** — maintaining registries of technical values used by Internet protocols

ICANN does not build the Internet, operate networks, write laws, or censor content. It is a coordinator, not a ruler. But because coordination of the namespace is essential to Internet functioning, whoever controls coordination exercises enormous, if indirect, power.

## 1.2 Historical Origins

The story of ICANN begins with **Jon Postel**, who for decades served as the informal steward of Internet identifiers under a role called the **Internet Assigned Numbers Authority (IANA)**. Postel was a beloved figure in the technical community — thoughtful, consensus-oriented, deeply committed to the open Internet. He maintained the authoritative lists of protocol numbers, IP address blocks, and domain names from his office at USC's Information Sciences Institute.

By the mid-1990s, the commercialization of the Internet was accelerating rapidly. The domain name system had become enormously valuable — companies were paying premium prices for short, memorable `.com` names. A single organization, **Network Solutions**, held a monopoly on registering `.com`, `.net`, and `.org` domains, and the arrangement was increasingly controversial.

The U.S. government, which had funded the early Internet through ARPA and retained ultimate authority over the DNS root, commissioned a policy process to figure out how to manage the namespace going forward. The result, after considerable political conflict, was ICANN. It was formally incorporated on September 18, 1998. Jon Postel died of heart failure eighteen days later, never seeing the institution he had helped design come to life.

From the beginning, ICANN operated under a **Memorandum of Understanding** with the U.S. Department of Commerce, which retained oversight authority over the DNS root zone — the master list of all top-level domains. This arrangement was controversial internationally, as it meant the United States government effectively held ultimate power over the global DNS. We will return to this controversy later.

In **October 2016**, a landmark transition occurred: the U.S. government formally relinquished its oversight of the IANA functions, transferring stewardship to the global multistakeholder community. This was a major milestone in Internet governance history, though it did not eliminate debate about whether ICANN itself has become too powerful.

## 1.3 ICANN's Organizational Structure

ICANN's structure is deliberately complex, designed to represent the many different groups with a stake in Internet governance. Understanding it requires navigating several layers.

### 1.3.1 The Board of Directors

At the top sits a **Board of Directors** of twenty-one members. The board is the ultimate decision-making authority for ICANN's policies and operations. However, board members are not elected by the general public. They are selected through a multi-channel process designed to represent different stakeholder communities:

- Eight directors are selected by a **Nominating Committee (NomCom)**, which itself represents a cross-section of Internet community groups
- Eight directors are selected by the Supporting Organizations (described below)
- The CEO/President of ICANN serves as a voting board member
- Four seats are reserved for non-voting liaisons from advisory committees

This structure means no single government, company, or interest group can dominate the board — by design.

### 1.3.2 Supporting Organizations

ICANN has three **Supporting Organizations (SOs)**, which are formal policy-development bodies:

**Generic Names Supporting Organization (GNSO)**
This is the primary policy-development body for generic top-level domains (`.com`, `.org`, `.net`, and the hundreds of new gTLDs). The GNSO is itself divided into two "houses" — a Contracted Parties House (registries and registrars who have contracts with ICANN) and a Non-Contracted Parties House (business users, intellectual property interests, ISPs, and noncommercial users). Policies affecting generic domains must pass through the GNSO's deliberative process.

**Country Code Names Supporting Organization (ccNSO)**
This body develops policies related to country-code top-level domains (`.uk`, `.de`, `.jp`, etc.). Its membership includes the managers of ccTLDs from around the world.

**Address Supporting Organization (ASO)**
This body provides policy advice on IP address allocation. It is closely linked to the Regional Internet Registries (RIRs), which we will discuss in Chapter 3.

### 1.3.3 Advisory Committees

Advisory committees do not make binding policy but provide crucial input:

**Governmental Advisory Committee (GAC)**
The GAC includes representatives from national governments — over 170 countries participate. The GAC provides advice to the ICANN board on matters of public policy. Crucially, the board must either follow GAC advice or provide a written explanation of why it did not. This creates a mechanism for government input without giving governments direct control.

**At-Large Advisory Committee (ALAC)**
Represents individual Internet users — the "general public" of the Internet. It is organized through Regional At-Large Organizations (RALOs) on five geographic continents.

**Security and Stability Advisory Committee (SSAC)**
Provides advice on security and operational matters, composed of technical experts.

**Root Server System Advisory Committee (RSSAC)**
Advises on the operation of the root name servers — the thirteen server clusters that form the foundation of the DNS hierarchy.

**Technical Liaison Group (TLG)**
Links ICANN with other technical standards bodies, including the IETF, W3C, ITU, and others.

### 1.3.4 The Empowered Community

A unique feature of ICANN's post-2016 structure is the **Empowered Community (EC)**, created as part of the IANA stewardship transition. The EC is not a committee but a mechanism — a way for the ICANN community to exercise collective oversight over the board. The community can use the EC to reject budgets, remove board members, or even dissolve ICANN itself if the institution strays from its mission. This was designed to replace the oversight role previously held by the U.S. government.

## 1.4 What ICANN Actually Does

### 1.4.1 Managing the DNS Root Zone

The most consequential thing ICANN does is manage the **DNS root zone** — the master file that lists all top-level domains (TLDs) and specifies which name servers are authoritative for each. When you type `www.example.com` into your browser, the resolution process begins by querying a root name server, which consults this root zone file to tell your computer where to find the `.com` top-level domain servers.

ICANN, through the IANA functions it manages, maintains this root zone. If ICANN were to remove `.uk` from the root zone, every `.uk` website would become unreachable globally. This is the ultimate lever of power — and why the governance of ICANN is so politically charged.

### 1.4.2 Accrediting Registrars

ICANN does not directly register domain names with end users. Instead, it accredits **domain registrars** — companies that are authorized to sell and register domain names in generic TLDs. To become an ICANN-accredited registrar, a company must sign the **Registrar Accreditation Agreement (RAA)** and comply with ICANN's policies. As of 2024, there are over 2,000 ICANN-accredited registrars worldwide, including companies like GoDaddy, Namecheap, Google Domains, and thousands of others.

### 1.4.3 Contracting with Registry Operators

For each gTLD, ICANN signs a **Registry Agreement** with a registry operator — the organization that operates the authoritative database for that TLD. For example, **Verisign** operates the `.com` and `.net` registries under contract with ICANN. The registry sets technical standards and maintains the WHOIS database; registrars interact with the registry's systems to register names on behalf of customers.

### 1.4.4 New TLD Programs

One of ICANN's most controversial activities has been expanding the namespace through new TLD programs. In 2012, ICANN opened applications for new generic TLDs, receiving nearly 2,000 applications. This resulted in the addition of over 1,200 new TLDs to the root zone, including `.app`, `.blog`, `.bank`, `.london`, `.amazon`, and many others. Critics argued this was primarily a revenue-generating exercise that created confusion without real benefit; supporters argued it expanded choice and enabled innovation. A second New gTLD Program was launched in 2022, with applications accepted in subsequent rounds.

### 1.4.5 Policy Development

ICANN develops policies through a "bottom-up, multistakeholder" model. When a policy issue arises — say, the rules for WHOIS data privacy — it goes through a formal **Policy Development Process (PDP)** in the relevant Supporting Organization. Working groups of volunteers from diverse backgrounds deliberate, draft, and revise policies over months or years. The board ultimately approves or rejects the policy recommendations. This process is slow and often contentious, but it ensures that policies reflect broad community input rather than unilateral decisions.

## 1.5 Criticisms and Controversies

ICANN is one of the most criticized organizations in Internet governance. The criticisms come from multiple directions:

**U.S. dominance**: For its first eighteen years, ICANN operated under U.S. government oversight, which many nations found unacceptable. Why should an American nonprofit, accountable to American law, control the global namespace? The 2016 transition addressed this partially, but ICANN remains headquartered in California and its disputes are governed by California law.

**Private power without adequate accountability**: ICANN is a private nonprofit, not a democratic institution. Its decisions affect billions of people, but ordinary Internet users have very limited voice in its processes. The multistakeholder model is praised in principle but criticized in practice for being dominated by well-funded industry interests.

**WHOIS privacy**: For decades, ICANN required that domain name registration information (owner's name, address, phone, email) be publicly accessible through WHOIS databases. This created privacy and safety risks for individuals. The conflict between WHOIS transparency (valued by law enforcement and intellectual property holders) and privacy rights (reinforced by Europe's GDPR) became one of ICANN's most intractable policy challenges.

**Trademark protection and cybersquatting**: The **Uniform Domain Name Dispute Resolution Policy (UDRP)** allows trademark holders to challenge domain registrations that infringe on their marks. Critics argue the system favors large corporations over small registrants; others argue it doesn't go far enough in protecting brands.

**Revenue model concerns**: ICANN earns significant revenue from registry and registrar fees, creating potential conflicts of interest in decisions about expanding the namespace. The new gTLD program earned ICANN hundreds of millions of dollars in application fees.

---

# Chapter 2: IANA — The Internet Assigned Numbers Authority

## 2.1 Origins and Role

Long before ICANN existed, **IANA** existed — or rather, IANA was Jon Postel. The Internet Assigned Numbers Authority was originally just a label for the function Postel performed: maintaining the authoritative registries of Internet protocol parameters. As the Internet grew, IANA formalized into a defined set of functions rather than a person.

Today, IANA is a department within ICANN, responsible for three distinct areas of coordination:

1. **Domain Names** — maintaining the DNS root zone, coordinating the `.int` domain, and managing the `.arpa` infrastructure domain
2. **Number Resources** — coordinating the global pool of IP addresses and Autonomous System Numbers, working with the Regional Internet Registries
3. **Protocol Assignments** — maintaining registries of protocol parameters used by Internet standards, such as port numbers, protocol numbers, MIME types, and hundreds of other technical values

## 2.2 Domain Name Functions

### 2.2.1 The Root Zone

IANA's most critical DNS function is managing the **root zone file**. Every time a new TLD is added to the DNS — whether a new country code or a new generic TLD — IANA processes the request, verifies the technical requirements, and publishes the updated root zone.

The root zone itself is a relatively simple text file containing:
- The list of all TLDs (over 1,500 as of 2024)
- The name servers authoritative for each TLD
- DNSSEC cryptographic signatures for security

This file is then distributed to the thirteen **root name server clusters** operated by twelve different organizations around the world (the clusters use anycast routing to expand to hundreds of physical servers globally).

### 2.2.2 ccTLD Delegations

When a new country becomes internationally recognized, or when the management of a ccTLD needs to change hands, IANA processes the delegation. The process involves verifying that the new manager represents the relevant Internet community in that country, meets technical requirements, and agrees to ICANN/IANA policies.

A famous historical example: after the dissolution of the Soviet Union, the `.su` ccTLD (for Soviet Union) remained technically in existence and was not deleted, despite the country ceasing to exist. This reflects IANA's conservative approach — they generally do not remove TLDs because doing so would break any existing registrations.

### 2.2.3 The .arpa Domain

The `.arpa` domain (originally standing for "ARPANET") is a special infrastructure domain used for reverse DNS lookups (mapping IP addresses back to domain names) and for other protocol-specific purposes. IANA manages `.arpa` directly.

## 2.3 Number Resource Functions

### 2.3.1 IP Address Allocation

The global pool of IP addresses is finite (especially IPv4, with its approximately 4.3 billion possible addresses). IANA's role is to allocate large blocks of addresses to the five Regional Internet Registries (RIRs), which then distribute them to networks within their regions.

IANA doesn't assign addresses directly to individual organizations or ISPs. Instead, it manages the top of the hierarchy:

```
IANA
  └─→ Regional Internet Registries (5 regions)
          └─→ Local Internet Registries (ISPs, large organizations)
                  └─→ End Users (companies, individuals)
```

For IPv4, IANA allocates address space in /8 blocks (16,777,216 addresses each). For IPv6, allocations are in /12 or /23 blocks, representing vastly larger numbers of addresses.

**Historical milestone**: In February 2011, IANA allocated the last five /8 blocks of IPv4 space to the five RIRs, exhausting the central IANA pool. This marked the effective end of the IPv4 free pool at the global level. The RIRs subsequently exhausted their own pools in the following years, driving the transition to IPv6.

### 2.3.2 Autonomous System Numbers (ASNs)

Every independently operated network on the Internet — every ISP, every large enterprise, every content delivery network — operates as an **Autonomous System (AS)** and requires a unique **Autonomous System Number (ASN)** to participate in the Border Gateway Protocol (BGP) routing system. IANA allocates ASN ranges to RIRs, which distribute them to networks.

ASNs were originally 16-bit numbers (0–65535), limiting the total to about 64,000. As the Internet grew, 32-bit ASNs were introduced, expanding the space to over four billion.

## 2.4 Protocol Parameter Functions

This is perhaps IANA's least-glamorous but equally essential function. Whenever the IETF creates a new protocol standard that requires a registry of values, IANA creates and maintains that registry. Examples include:

- **Well-known port numbers**: Port 80 is assigned to HTTP, port 443 to HTTPS, port 25 to SMTP, port 22 to SSH. These assignments live in the IANA port number registry. Without this registry, different implementations of the same protocol might use conflicting port numbers.

- **HTTP status codes**: The familiar codes like 200 (OK), 404 (Not Found), and 500 (Internal Server Error) are registered with IANA.

- **MIME types**: Content types like `text/html`, `application/json`, and `image/png` are assigned by IANA.

- **IP Protocol Numbers**: Protocol 6 is TCP, protocol 17 is UDP, protocol 1 is ICMP. These assignments ensure consistency across all Internet implementations globally.

IANA maintains hundreds of such registries, all publicly accessible at `iana.org/protocols`. These registries are essential for interoperability — they ensure that a web server in Japan and a browser in Brazil interpret protocol values identically.

## 2.5 The IANA Functions Contract

After the 2016 transition away from U.S. government oversight, IANA functions are governed by a set of community-developed frameworks. The IETF, the RIRs, and the names community each have their own Service Level Agreements and accountability mechanisms with ICANN/IANA. If ICANN/IANA fails to perform the functions adequately, each community has escalation procedures — up to and including having IANA functions moved to a different operator.

---

# Chapter 3: Regional Internet Registries (RIRs)

## 3.1 The Need for Regional Distribution

When the Internet was small and largely confined to the United States, centralizing IP address management was practical. As the global Internet expanded — with networks proliferating in Europe, Asia, Latin America, and Africa — the inefficiency and cultural inappropriateness of having all address management done from California became obvious.

The solution was the creation of **Regional Internet Registries (RIRs)**: nonprofit organizations that manage IP address allocation and related functions within defined geographic regions. The RIR system was designed to bring number resource management closer to the communities it serves, while maintaining global coordination through IANA.

There are five RIRs, each covering a geographic region:

| RIR | Full Name | Region |
|-----|-----------|--------|
| ARIN | American Registry for Internet Numbers | North America, parts of Caribbean |
| RIPE NCC | Réseaux IP Européens Network Coordination Centre | Europe, Middle East, Central Asia |
| APNIC | Asia-Pacific Network Information Centre | Asia-Pacific |
| LACNIC | Latin America and Caribbean Network Information Centre | Latin America, Caribbean |
| AFRINIC | African Network Information Centre | Africa |

Together, these five organizations serve the entire globe, with the exception of Antarctica (which has no RIR and receives address allocations from IANA directly in practice).

## 3.2 ARIN — American Registry for Internet Numbers

### 3.2.1 Formation and Structure

**ARIN** was established in 1997, taking over IP address management for North America from Network Solutions (which had been handling it under a cooperative agreement with the U.S. government). ARIN is headquartered in Chantilly, Virginia, and is organized as a nonprofit membership organization.

ARIN's governance is member-driven. ISPs, large enterprises, and other organizations that receive address space become ARIN members and can participate in policy development. ARIN's **Annual Meeting** brings together the community to discuss policy proposals, which are developed through a transparent public process.

### 3.2.2 Services and Functions

**IP Address Allocation**
ARIN allocates IPv4 and IPv6 address space to **Local Internet Registries (LIRs)** — typically ISPs — and directly to large end-user organizations. Allocations are based on demonstrated need; organizations must show that they have a plan to use the addresses within a defined timeframe.

With IPv4 exhaustion, ARIN entered the "IPv4 wait list" era in September 2015. New requests for large IPv4 blocks can no longer be immediately fulfilled from a free pool; instead, requesters join a wait list and may receive space as it is returned or recovered from defunct organizations.

**IPv4 Transfer Market**
ARIN administers a **transfer market** for IPv4 addresses. Organizations that have more IPv4 space than they need can transfer it to organizations that need it, with ARIN recording the transfer and ensuring it complies with policy. This has created a genuine market for IPv4 addresses, with prices reaching $40–$60 per IPv4 address in recent years — meaning a /24 block (256 addresses) can be worth $10,000–$15,000.

**WHOIS Database**
ARIN maintains a public WHOIS database that allows anyone to look up who is responsible for a given IP address block or ASN. This is valuable for network troubleshooting and abuse investigation.

**Resource Public Key Infrastructure (RPKI)**
ARIN, like other RIRs, operates a **Resource PKI (RPKI)** service that allows network operators to cryptographically sign their IP address allocations and create **Route Origin Authorizations (ROAs)** — cryptographic attestations that a specific Autonomous System is authorized to announce a specific IP prefix. This helps prevent BGP route hijacking.

### 3.2.3 Real-World Example

Consider a mid-sized ISP in the United States that wants to serve 10,000 customers and offer them dedicated IP addresses. The ISP would:

1. Become an ARIN member
2. Submit a request for an IPv6 allocation, demonstrating their customer base and infrastructure plans
3. If they still need IPv4 addresses, either submit a smaller request (from recovered space) or purchase addresses on the transfer market
4. Receive their allocation and update their network infrastructure accordingly
5. Register their routing information with ARIN and create RPKI ROAs to secure their BGP announcements

## 3.3 RIPE NCC — Europe, Middle East, and Central Asia

### 3.3.1 Formation and Character

**RIPE NCC** (the Network Coordination Centre of Réseaux IP Européens) is the oldest of the RIRs, founded in 1992. It serves fifty-five countries across Europe, the Middle East, and Central Asia. RIPE NCC is headquartered in Amsterdam, Netherlands.

The RIPE community is particularly notable for its **RIPE Policy Development Process**, which operates through open mailing lists and working groups. Anyone can participate by subscribing to RIPE mailing lists and attending RIPE meetings (held twice yearly). RIPE meetings attract hundreds of network engineers and operators for days of technical discussions.

RIPE NCC has approximately 22,000 member organizations (called **Local Internet Registries or LIRs**), making it the largest RIR by membership.

### 3.3.2 Notable Policies and Developments

**IPv4 Exhaustion in RIPE Region**
RIPE NCC allocated its last large blocks of IPv4 space in September 2012. Subsequent policies governed how remaining small allocations could be made, and a transfer policy allows organizations in the RIPE region to transfer IPv4 addresses among themselves.

**IPv6 Deployment**
RIPE NCC has been a strong advocate for IPv6 adoption and publishes detailed statistics on IPv6 deployment across member networks. The RIPE region has generally led in IPv6 adoption, partly due to European regulatory interest in the topic.

**BGP Routing Data**
RIPE NCC operates the **RIPE Routing Information Service (RIS)**, one of the world's most valuable repositories of BGP routing data. Researchers, network operators, and policymakers use RIS data to understand global routing, detect anomalies, and study Internet topology.

**Crisis Responses**
During geopolitical crises, RIPE NCC faces difficult decisions. When Russia invaded Ukraine in 2022, Ukrainian networks and governments requested that RIPE NCC revoke Russian organizations' IP address allocations — effectively cutting Russia off from the Internet. RIPE NCC declined, stating that IP addresses are resources allocated to organizations based on technical need, not political behavior, and that revoking them would not stop Russian Internet access anyway (since routes can be maintained even without registry records). This controversy highlighted the tension between technical neutrality and political reality.

## 3.4 APNIC — Asia-Pacific

### 3.4.1 Overview

**APNIC** (Asia-Pacific Network Information Centre) was established in 1993 and serves fifty-six economies across the Asia-Pacific region — from Japan and South Korea in the north to New Zealand in the south, from Pakistan in the west to the Pacific island nations in the east. It is headquartered in Brisbane, Australia.

APNIC serves a region of extraordinary diversity — in languages, cultures, political systems, economic development levels, and Internet infrastructure maturity. Managing IP resources across a region that includes both Japan (one of the world's most advanced digital economies) and small Pacific Island nations with limited connectivity presents unique challenges.

### 3.4.2 Research and Outreach

Beyond address management, APNIC is known for its research activities. **APNIC Labs** conducts significant original research on Internet topology, security, and routing. APNIC Labs developed a notable method for measuring IPv6 adoption globally by using ads served through Google to test IPv6 connectivity in browser populations — providing remarkably accurate real-world adoption statistics.

APNIC runs extensive **training programs** and **fellowship programs** to build capacity in less-developed economies in the region, helping network operators in Pacific island nations and developing Asian countries understand IP addressing, routing, and security.

### 3.4.3 IP Exhaustion in APNIC Region

APNIC exhausted its IPv4 free pool in April 2011, earlier than other regions, because the Asia-Pacific region's Internet was growing extremely rapidly. This made APNIC the first RIR to fully enter the post-exhaustion era, and its experience provided lessons for other RIRs dealing with the same challenge.

## 3.5 LACNIC — Latin America and Caribbean

**LACNIC** (Latin America and Caribbean Network Information Centre) was established in 2002, making it the fourth RIR. It is headquartered in Montevideo, Uruguay, and serves the Latin American and Caribbean region — thirty-three countries with a combined population of over 600 million.

LACNIC operates primarily in Spanish and Portuguese, reflecting the linguistic diversity of its region. Its policy development process is conducted in these languages, with translations provided for the broader international community.

LACNIC has been a strong voice for the interests of developing economies in global Internet governance debates. The organization has advocated for more equitable distribution of technical resources and capacity building for smaller, less-connected nations in the region.

LACNIC also operates **LACNIC CERT**, coordinating responses to cybersecurity incidents in the region, and runs extensive training programs through its **FRIDA** fund, which supports ICT projects with positive social impact in Latin America.

## 3.6 AFRINIC — Africa

### 3.6.1 Overview and Mission

**AFRINIC** (African Network Information Centre) is the newest RIR, established in 2004 and becoming fully independent in 2005. It is headquartered in Ebène, Mauritius, and serves fifty-four African countries.

AFRINIC's establishment was a landmark moment for African Internet development. Previously, African networks had to obtain IP addresses from ARIN, RIPE NCC, or APNIC, depending on historical relationships. Having a dedicated African RIR brought address management to the continent and gave African networks a direct institutional voice in global governance.

Africa is widely regarded as having significant unrealized Internet potential. Large parts of the continent have low Internet penetration, limited infrastructure, and high costs. AFRINIC's work is thus not only administrative but developmental — part of a broader effort to enable African participation in the global digital economy.

### 3.6.2 The Elsa Fikre Controversy

AFRINIC was rocked by a major governance crisis beginning around 2021 involving allegations of fraud, corruption, and mismanagement by then-CEO Eddy Kayihura. A dramatic legal battle followed, involving court proceedings in Mauritius, attempted hostile takeovers of AFRINIC's IP address resources by a private company (Cloud Innovation, backed by Lu Heng), and a freeze on AFRINIC's bank accounts that threatened the organization's operations.

The controversy highlighted the vulnerabilities of the RIR model — in particular, how a private entity might attempt to exploit governance weaknesses to gain control of scarce IP address resources worth potentially hundreds of millions of dollars. The global RIR community and ICANN rallied to defend AFRINIC's institutional integrity, and the organization eventually stabilized, though the legal proceedings continued for years.

## 3.7 How the RIR System Works Together — The NRO

The five RIRs coordinate globally through the **Number Resource Organization (NRO)**, an umbrella body that:

- Represents the RIRs in dealings with ICANN and the IANA functions
- Coordinates global IP address policies through the **Global Policy Development Process (GPDP)**
- Publishes consolidated statistics on address usage and allocation globally
- Advocates for RIR interests in broader Internet governance forums

A practical example of the NRO's role: if a global policy is needed — say, a change in how IANA allocates address space to RIRs — the policy must be approved by each of the five RIRs through their own policy processes before the NRO can forward it to ICANN for implementation. This ensures that global policies genuinely reflect regional community input.

---

# Chapter 4: Domain Registrars vs. Registries

## 4.1 A Three-Level System

When you register a domain name like `mybusiness.com`, you interact with a **registrar** — a company like GoDaddy or Namecheap. But the registrar doesn't simply store your registration in its own database and call it done. It interacts with a **registry** — a separate organization that maintains the authoritative database for the `.com` TLD. And the registry operates under policies set by **ICANN**, the coordinator at the top.

This three-level system — ICANN, registries, and registrars — was designed deliberately to separate policy-making from registry operations from retail customer service, creating a competitive market for domain registration while maintaining centralized technical coordination.

## 4.2 Registries — The Authoritative Operators

A **domain registry** is an organization that operates the authoritative database for a particular top-level domain. The registry:

- Maintains the **zone file** for its TLD — the definitive list of all registered domains and their associated name servers
- Runs the technical infrastructure that serves DNS queries for its TLD
- Sets technical standards and pricing policies for domain registrations within its TLD
- Operates the **WHOIS** database for its TLD
- Signs a **Registry Agreement** with ICANN defining its responsibilities

Registries operate as wholesalers. They typically do not sell domain names directly to the public. Instead, they make registrations available through accredited registrars and charge a **wholesale fee** per domain (which the registrar then marks up for the retail customer).

**Examples of major domain registries:**

**Verisign** operates the `.com` and `.net` registries — the two largest TLDs in the world. As of 2024, the `.com` registry contained over 160 million registered domains. Verisign's contract with ICANN for `.com` has been repeatedly renewed and is widely considered one of the most valuable monopoly contracts in the technology industry. Verisign does not compete in retail; it is purely a registry operator.

**Public Interest Registry (PIR)** operates the `.org` registry, serving nonprofits and other organizations. PIR was created by ICANN when the `.org` contract was taken away from Verisign in 2002 and given to a nonprofit specifically to serve the nonprofit community.

**Donuts Inc.** (now known as Identity Digital) is a private company that applied for hundreds of new gTLDs in the 2012 round and operates numerous TLDs including `.social`, `.media`, `.email`, `.guru`, and many others.

**Google Registry** operates several TLDs including `.app`, `.dev`, `.page`, and others. Google applied for and won these new gTLD contracts in the 2012 round.

**Amazon Registry Services** similarly applied for and operates several TLDs, though its application for `.amazon` (which was objected to by South American countries claiming the Amazon River as a cultural heritage name) became one of the most controversial new gTLD disputes.

## 4.3 Registrars — The Retail Interface

A **domain registrar** is a company accredited by ICANN to register domain names in gTLDs (and often in ccTLDs through separate agreements with those registries). Registrars are the businesses that most people interact with when buying a domain name.

To become an ICANN-accredited registrar, a company must:
- Sign the **Registrar Accreditation Agreement (RAA)** with ICANN
- Pay an annual accreditation fee
- Meet technical requirements for connecting to registry systems
- Comply with ICANN policies including data escrow requirements

Registrars interact with registries using the **Extensible Provisioning Protocol (EPP)**, a standardized XML-based protocol that allows registrars to create, update, transfer, and delete domain registrations in registry databases.

**Major registrars include:**

**GoDaddy** — the world's largest registrar by number of domains managed (over 80 million domains). GoDaddy is also publicly traded and offers web hosting, website builders, and other services alongside domain registration.

**Namecheap** — popular for its competitive pricing and strong privacy features. Namecheap offers free WhoisGuard privacy protection with every domain.

**Google Domains** (now transitioning to **Squarespace Domains** after Google sold the business to Squarespace in 2023) — known for transparent pricing and integration with Google services.

**Name.com**, **Hover**, **Gandi**, **Porkbun**, and hundreds of others offer domain registration services with varying features and pricing.

## 4.4 The Registration Process in Detail

When a customer registers a domain name, the following sequence of events occurs:

1. **Customer queries registrar**: The customer types a desired domain name into a registrar's search interface. The registrar queries the registry's **EPP server** to check availability.

2. **Registration command**: If available, the customer completes the purchase. The registrar sends an EPP `create` command to the registry with the domain name, registration period, and name server information.

3. **Registry creates the record**: The registry adds the domain to its database and zone file, associating it with the provided name servers.

4. **DNS propagation**: The registry publishes the updated zone file, and DNS resolvers around the world (through their caching mechanisms) eventually learn the new domain exists.

5. **WHOIS record created**: Registration data is stored in the registry's WHOIS database, accessible to the public (subject to privacy policies).

6. **Registrant manages the domain**: The registrant can update name servers, enable/disable WHOIS privacy, renew the registration, or initiate a transfer to another registrar through the registrar's management interface.

The entire technical process from purchase to DNS propagation can happen within minutes, though full propagation across all DNS resolvers globally may take up to 48 hours in practice.

## 4.5 Domain Transfers Between Registrars

The domain registration market is competitive, and ICANN policies ensure that registrants can move their domains between registrars. The transfer process involves:

1. **Unlock the domain**: Registrars place domains in a "locked" state to prevent unauthorized transfers. The registrant must first unlock it.
2. **Obtain the Auth Code**: The losing registrar provides an **Authorization Code (EPP auth code)** to verify the registrant's identity.
3. **Initiate transfer at new registrar**: The registrant submits the auth code to the new (gaining) registrar.
4. **Five-day waiting period**: ICANN policy allows the losing registrar five days to object. If no objection, the transfer completes automatically.

ICANN policies also specify a **60-day transfer lock** on newly registered or recently transferred domains, preventing immediate re-transfer (a measure designed to prevent domain hijacking).

## 4.6 WHOIS and the Privacy Challenge

The **WHOIS** system was originally a simple protocol for looking up who was responsible for a domain name. In the early Internet, all registrations were made by technical staff at universities and research institutions, and public contact information was essential for network coordination.

As domain registration became a mass-market activity — with individuals, small businesses, and activists registering domains — the requirement for fully public registration data became deeply problematic:

- Domain registrants received spam and phishing attacks based on their WHOIS email addresses
- Women and activists faced harassment and stalking because their home addresses were publicly listed
- Abuse of WHOIS data by scrapers was rampant

ICANN struggled for years to balance privacy with the legitimate interests of law enforcement (who use WHOIS to investigate cybercrime), intellectual property holders (who use it to track down counterfeiters), and security researchers (who use it to investigate malicious domains).

The conflict came to a head with the EU's **General Data Protection Regulation (GDPR)**, which took effect in May 2018. GDPR prohibited the public display of personal data without a legal basis, forcing ICANN and registrars to dramatically curtail public WHOIS data for European registrants — and, due to practical difficulties in determining registrant location, for most registrants globally.

ICANN's response was the development of the **Registration Data Access Protocol (RDAP)**, a modern replacement for WHOIS that uses HTTPS, returns structured data, and supports differentiated access — meaning law enforcement and intellectual property attorneys can access fuller data through authenticated requests, while the general public sees limited information. The **ICANN Registration Data Access Policy** continues to evolve in response to legal and community input.

---

# Chapter 5: TLD Types — gTLD, ccTLD, and New gTLDs

## 5.1 The Namespace at the Top

The Domain Name System is hierarchical. At the very top of this hierarchy are the **Top-Level Domains (TLDs)** — the suffixes that appear to the right of the final dot in a domain name. Understanding TLD types requires understanding both their technical character and their governance arrangements.

TLDs fall into several categories:

- **Generic TLDs (gTLDs)**: Originally intended for general use, not tied to specific countries
- **Country Code TLDs (ccTLDs)**: Two-letter codes assigned to specific countries or territories
- **Sponsored TLDs (sTLDs)**: A subset of gTLDs operated by specific communities
- **Infrastructure TLD**: The special `.arpa` domain used for technical purposes
- **New gTLDs**: The wave of new generic TLDs added since 2012

## 5.2 Generic Top-Level Domains (gTLDs)

### 5.2.1 The Original gTLDs

When the DNS was designed in the 1980s, a small set of generic TLDs was created to organize the namespace by type of organization:

| TLD | Intended Purpose | Registry |
|-----|-----------------|---------|
| `.com` | Commercial entities | Verisign |
| `.net` | Network infrastructure providers | Verisign |
| `.org` | Non-profit organizations | Public Interest Registry |
| `.edu` | U.S. educational institutions | Educause |
| `.gov` | U.S. government | CISA (DotGov Program) |
| `.mil` | U.S. military | U.S. Department of Defense |
| `.int` | International organizations established by treaty | IANA |

The original intent was that these TLDs would organize the namespace semantically — `.com` for commercial entities, `.org` for nonprofits, etc. In practice, the distinctions quickly broke down. The only truly restricted TLDs are `.edu` (limited to accredited U.S. higher education institutions), `.gov` (limited to U.S. government entities), `.mil` (U.S. military only), and `.int` (international treaty organizations). `.com`, `.net`, and `.org` are open for anyone to register without restriction, regardless of whether they are actually commercial, a network provider, or a nonprofit.

`.com` became the dominant global namespace for commercial activity and remains by far the most registered TLD in the world. The brand value of `.com` is so deeply embedded in consumer psychology that new TLDs, despite their availability, often struggle to gain mainstream adoption.

### 5.2.2 Why .com Dominates

The `.com` TLD's dominance is a remarkable case study in network effects and first-mover advantage. When the Internet commercialized in the 1990s, `.com` was the obvious choice for businesses. Users learned to assume that a company's website would be at `companyname.com`. This created:

- **User expectation**: People type `.com` by habit, often not even thinking about alternatives
- **SEO perceptions**: There is a widespread (somewhat exaggerated) belief that `.com` domains rank better in search engines
- **Investor expectations**: Many investors view non-`.com` domains as a sign of lower ambition or credibility
- **Type-in traffic**: Users who can't remember a URL might type `companyname.com` and guess

The result is that a premium `.com` domain name can be worth millions of dollars. `Cars.com`, `Insurance.com`, `Sex.com` — these generic `.com` domains have sold for staggering sums. The domain `Cars.com` was acquired for $872 million in 2014 (including the associated business, not just the domain itself). Even purely as a domain name asset, `Voice.com` reportedly sold for $30 million in 2019.

## 5.3 Country Code Top-Level Domains (ccTLDs)

### 5.3.1 Assignment and Basis

**Country code TLDs (ccTLDs)** are two-letter TLD codes assigned to countries and territories, based on the **ISO 3166-1 alpha-2** standard — the same standard used for country codes in international postal mail and telephone systems. This means `.de` for Germany (Deutschland), `.jp` for Japan, `.fr` for France, `.br` for Brazil, and so on.

The ccTLD assignment follows ISO 3166 automatically: when a territory gets an ISO 3166 code, it becomes eligible for a ccTLD. There are currently over 300 ccTLDs in the root zone, including codes for overseas territories, disputed territories, and even some former countries (like `.su` for the Soviet Union and `.yu` for Yugoslavia).

### 5.3.2 Governance of ccTLDs

Each ccTLD is managed by a designated **registry operator** that has been delegated authority by ICANN/IANA. However, unlike gTLDs, ccTLD registry operators are typically national entities — government agencies, nonprofit organizations, or quasi-governmental bodies that represent the Internet community of their country.

The governance of each ccTLD varies enormously:

- **`.de` (Germany)**: DENIC eG, a cooperative of German ISPs and registrars, operates the `.de` registry. It is one of the largest ccTLDs by registrations (over 16 million domains).

- **`.uk` (United Kingdom)**: Nominet UK operates the `.uk` registry, including the widely used `.co.uk` second-level domain. Nominet is a membership organization of UK-based registrars and has been involved in various governance controversies of its own.

- **`.cn` (China)**: CNNIC (China Internet Network Information Center) operates the `.cn` registry under the authority of the Chinese government's Ministry of Industry and Information Technology.

- **`.tv` (Tuvalu)**: The ccTLD for the tiny Pacific island nation of Tuvalu has become famous for its use by television-related businesses (exploiting the `.tv` suffix). Tuvalu earns millions of dollars annually by licensing its ccTLD, providing a significant source of national revenue for one of the world's smallest countries.

### 5.3.3 Localization and Internationalized ccTLDs

An important development in ccTLDs is **Internationalized Country Code TLDs (IDN ccTLDs)** — TLDs written in non-Latin scripts, representing country names in their native languages. These were introduced in 2010:

- **مصر.** — Egypt in Arabic (pronounced "Misr")
- **中国.** — China in Chinese characters
- **한국.** — Korea in Hangul
- **Россия.** — Russia in Cyrillic (Rossiya)

IDN ccTLDs are significant because they allow Internet addresses to be fully expressed in native scripts, lowering barriers for populations that are less comfortable with Latin characters. A user in Saudi Arabia can type a fully Arabic web address without switching keyboard layouts.

### 5.3.4 ccTLDs as Revenue Sources

Some small countries or territories have discovered that their ccTLD has unexpected commercial value due to coincidental associations with popular English words or industries:

- **`.io` (British Indian Ocean Territory)**: Has become extremely popular with technology startups (interpreted as "input/output"). Many tech companies use `.io` domains as their primary web presence.

- **`.ai` (Anguilla)**: Has surged in popularity with the rise of artificial intelligence companies, which use `.ai` as a relevant and memorable TLD.

- **`.me` (Montenegro)**: Used for personal websites and self-referential branding ("hire.me", "about.me").

- **`.ly` (Libya)**: Used for URL shortening services (bit.ly, ow.ly) and other applications where "ly" functions as an adverb suffix.

The revenues from these uses can be significant for small territories. Anguilla reportedly earns over $3 million annually from `.ai` registrations — substantial for a territory with a population of around 18,000.

However, there are risks. When Libya experienced political instability, there was concern about whether `.ly` domains would remain accessible — a cautionary tale about building business-critical infrastructure on a geopolitically unstable ccTLD.

## 5.4 New Generic TLDs

### 5.4.1 The 2012 New gTLD Program

The idea of expanding the TLD namespace beyond the original handful of generic TLDs had been debated for years. Proponents argued that new TLDs would:
- Create more choice and competition in the domain name market
- Enable more relevant and memorable domain names (`.bank` for banks, `.health` for health sites)
- Generate revenue for ICANN and registry operators
- Enable internationalized domain names

After years of debate, ICANN launched the **New gTLD Program** in 2012. The application window opened in January 2012 and closed in April 2012. ICANN received **1,930 applications** for new TLDs, with an application fee of $185,000 each. Selected applicants were required to demonstrate technical and financial capability to operate a registry.

The program resulted in over 1,200 new TLDs being added to the root zone, transforming the namespace dramatically.

### 5.4.2 Categories of New gTLDs

New gTLDs come in several flavors:

**Generic descriptive TLDs**: TLDs describing industries, interests, or activities:
- `.photography`, `.music`, `.fitness`, `.food`, `.travel`
- `.store`, `.shop`, `.market`
- `.consulting`, `.solutions`, `.services`

**Geographic TLDs**: TLDs associated with cities, regions, or localities:
- `.london`, `.nyc`, `.tokyo`, `.paris`, `.berlin`
- `.africa`, `.asia`, `.scot`, `.wales`

**Brand TLDs**: Companies applied for TLDs using their own brand names:
- `.google` (used for internal Google infrastructure)
- `.apple` (applied for by Apple)
- `.microsoft`
- `.bmw`, `.audi`, `.ferrari`
- `.amazon` (controversial, as discussed earlier)

**Community TLDs**: TLDs intended for specific communities:
- `.bank` (for regulated financial institutions only)
- `.pharmacy` (for licensed pharmacies only)
- `.ngo` (for non-governmental organizations)

**Internationalized gTLDs**: New gTLDs in non-Latin scripts:
- **.онлайн** (online in Cyrillic)
- **.网络** (network in Chinese)
- **.موقع** (website in Arabic)

### 5.4.3 Adoption and Market Performance

Despite the proliferation of new TLDs, adoption has been mixed. Many new TLDs have seen limited registrations, and the dominance of `.com` has proven remarkably resilient.

Some new TLDs have succeeded:
- `.app` (operated by Google) became popular with mobile app developers and gained millions of registrations
- `.dev` became a popular choice among software developers
- `.io` (technically a ccTLD but widely used as a new-style generic) and `.ai` have been hugely successful in tech communities

Others have struggled or failed. Several new TLD registries have exited the business, either returning their TLD contracts to ICANN or selling them to other operators.

### 5.4.4 The 2022 New gTLD Round

ICANN opened a second application round for new gTLDs in 2022, with improvements based on lessons learned from 2012:
- Lower application fees (in hopes of more geographic and economic diversity)
- Support mechanisms for applicants from developing countries
- Improved conflict resolution procedures

This round was anticipated to generate hundreds more new TLDs in the coming years.

### 5.4.5 Policy Challenges

New gTLDs have raised several policy challenges:

**Trademark conflicts**: When `.sucks` was launched, companies complained that defensive registrations (to prevent `yourcompany.sucks` from being used to attack them) amounted to extortion. ICANN had to navigate these complaints while also recognizing legitimate free-expression uses.

**Security concerns**: Some new TLDs, particularly internal names previously used in corporate networks (like `.corp` or `.home`), created potential security vulnerabilities when added to the public DNS.

**Consumer confusion**: Critics argued that hundreds of new TLDs would confuse ordinary users and create new opportunities for phishing attacks using similar-looking domains across different TLDs.

---

# Chapter 6: The IETF — The Internet Engineering Task Force

## 6.1 How the Internet's Protocols Get Written

When you send an email, your email client uses SMTP (Simple Mail Transfer Protocol) to communicate with a mail server. When you browse a website, your browser uses HTTP or HTTPS. When your computer gets an IP address from your router, it uses DHCP. Each of these protocols — and hundreds of others — is defined by a technical specification, and most of those specifications come from one organization: the **Internet Engineering Task Force (IETF)**.

The IETF is the primary international standards body for Internet protocols. It develops and promotes voluntary Internet standards — particularly those that make up the Internet protocol suite (TCP/IP). Its work is embodied in documents called **Requests for Comments (RFCs)**, which define protocols in technical detail sufficient for any competent engineer to implement them.

## 6.2 History and Philosophy

The IETF traces its origins to a 1986 meeting of U.S. government-funded researchers working on ARPANET. As the Internet transitioned from a research project to a global infrastructure, the IETF evolved from a government-funded technical coordination group into an open, international volunteer organization.

The IETF's founding philosophy is captured in the phrase attributed to David Clark, one of the Internet's early architects: **"We reject kings, presidents and voting. We believe in rough consensus and running code."**

This philosophy has profound implications for how the IETF works:

**No membership, no votes**: Unlike traditional standards bodies (like ISO or ITU), the IETF has no formal membership and takes no votes. Anyone can participate by joining a mailing list. Decisions are made by **rough consensus** — a determination by a working group chair that the group has reached sufficient agreement, even if not unanimity. If a minority disagrees, they must articulate technical objections, not just preferences.

**Rough consensus**: Rough consensus does not require unanimity. A working group chair "humms" (an IETF tradition — participants literally hum in response to questions) to gauge the level of agreement. If there is broad support with a few dissenters who have been heard and addressed, rough consensus can be declared.

**Running code**: The IETF favors protocols that have been implemented and tested over theoretical designs. A protocol that hasn't been implemented is speculative; a protocol with multiple independent implementations demonstrating interoperability is more credible. This is why many RFCs require at least two independent implementations before a protocol can advance to the highest standards levels.

## 6.3 Organizational Structure

### 6.3.1 Working Groups

The primary technical work of the IETF is done in **Working Groups (WGs)**. Each working group focuses on a specific area of protocol work and operates with a defined scope (called a "charter"), a mailing list, and one or more chairs. Working groups are open to anyone interested; participation is free.

Working groups are organized into **Areas**, each overseen by **Area Directors (ADs)**:

- **Applications and Real-Time Area**: Protocols for applications, web, email, real-time communications
- **Internet Area**: Core Internet protocols, IP, routing
- **Operations and Management Area**: Network management, operations
- **Routing Area**: Routing protocols (BGP, OSPF, etc.)
- **Security Area**: Security protocols and practices
- **Transport Area**: Transport layer protocols (TCP, UDP, QUIC)
- **General Area**: Cross-cutting issues

As of 2024, there are approximately 100–120 active IETF working groups.

### 6.3.2 The IESG

The **Internet Engineering Steering Group (IESG)** is composed of the Area Directors and is responsible for overseeing the technical standards process. When a working group produces a document it believes is ready for standardization, the IESG conducts a formal review — an IESG "ballot" where each Area Director can approve, abstain, or issue a DISCUSS (a blocking objection that must be resolved before publication).

### 6.3.3 The IAB

The **Internet Architecture Board (IAB)** provides oversight of the IETF's technical direction and has responsibility for several governance functions, including appointing the IETF liaison to ICANN and managing the RFC Editor function. The IAB also produces statements on broad Internet architectural matters.

### 6.3.4 The IRTF

Running parallel to the IETF is the **Internet Research Task Force (IRTF)**, which focuses on longer-term research topics that are not yet ready for standardization. IRTF research groups explore areas like network coding, privacy, decentralization, and future Internet architectures. The relationship is synergistic — IRTF research can eventually migrate to IETF standardization as it matures.

### 6.3.5 IETF Administration

The IETF is administered by the **IETF Administration LLC (IETF LLC)**, a nonprofit entity established in 2018 to provide legal and financial administration. The IETF LLC manages the secretariat, holds contracts, and handles finances. It is overseen by a board that includes IETF community representatives.

## 6.4 The RFC Process — How Standards Are Made

The **Request for Comments** series is one of the most remarkable intellectual artifacts in computing. Started in 1969 by Steve Crocker with the first RFC (describing the HOST SOFTWARE for ARPANET), the RFC series now numbers over 9,000 documents and constitutes the definitive technical record of how the Internet works.

### 6.4.1 Document Streams

RFCs come from several different streams:

- **IETF Stream**: The primary stream, representing IETF working group output
- **IRTF Stream**: Research documents from IRTF research groups
- **IAB Stream**: Architectural and policy documents from the IAB
- **Independent Stream**: Documents not affiliated with any IETF body, published by the Independent Submissions Editor

### 6.4.2 Document Types

Within the IETF stream, documents have different intended statuses:

- **Standards Track**: The primary pathway for protocol standards
  - *Proposed Standard*: The first level, indicating the document is mature enough for experimental implementation
  - *Internet Standard (STD)*: The highest level, achieved after multiple implementations have demonstrated interoperability over time
- **Best Current Practice (BCP)**: Documents describing operational best practices rather than protocol specifications
- **Informational**: Documents providing information but not defining standards
- **Experimental**: Documents describing experimental protocols
- **Historic**: Documents that have been superseded or are no longer recommended

### 6.4.3 The Journey from Idea to RFC

The standardization process follows a defined path:

1. **Individual Internet-Draft (I-D)**: Any person can write an Internet-Draft — a temporary document (valid for six months, then automatically expires) proposing a protocol or idea. These are not RFCs; they are working documents.

2. **Working Group Adoption**: If a working group finds an Internet-Draft relevant to its charter, it can adopt the draft as a working group document, beginning a process of community review and revision.

3. **Working Group Last Call**: When the working group believes the document is ready, the chairs issue a "Last Call" — a period (typically two weeks) during which the working group community provides final comments.

4. **IESG Review**: The document is submitted to the IESG for review. Each Area Director reviews the document, and a full IESG ballot is conducted. DISCUSS comments must be resolved through negotiation between the document authors and the AD who raised the concern.

5. **IANA Considerations**: If the document requires new registry entries, IANA reviews the relevant sections to ensure they are correct and actionable.

6. **RFC Editor Processing**: After IESG approval, the document goes to the RFC Editor for copy-editing, format standardization, and publication.

7. **Publication**: The final RFC is published and assigned a number. It becomes permanently and immutably part of the RFC series. Unlike working documents, published RFCs are never modified — if an RFC needs to be changed, a new RFC is written that updates or obsoletes it.

This process can take anywhere from months to years, depending on the complexity of the protocol and the level of controversy involved.

## 6.5 Famous RFCs — The Protocols That Built the Internet

Many of the most fundamental Internet protocols are defined in RFCs that every network engineer should know:

| RFC | Protocol | Year | Description |
|-----|---------|------|-------------|
| RFC 791 | IPv4 | 1981 | The Internet Protocol, version 4 |
| RFC 793 | TCP | 1981 | Transmission Control Protocol |
| RFC 768 | UDP | 1980 | User Datagram Protocol |
| RFC 1034/1035 | DNS | 1987 | Domain Name System |
| RFC 2616 | HTTP/1.1 | 1999 | Hypertext Transfer Protocol (superseded by RFC 7230-7235) |
| RFC 5321 | SMTP | 2008 | Simple Mail Transfer Protocol |
| RFC 8200 | IPv6 | 2017 | Internet Protocol, version 6 (updated Standard) |
| RFC 9000 | QUIC | 2021 | QUIC: A UDP-Based Multiplexed and Secure Transport |
| RFC 8446 | TLS 1.3 | 2018 | Transport Layer Security, version 1.3 |

Some RFCs are also famous for more unusual reasons. **RFC 1149** (1990) and its follow-up **RFC 2549** describe "IP Datagrams on Avian Carriers" — a humorous but technically coherent specification for transmitting Internet packets by carrier pigeon. It was actually implemented as a joke experiment in Norway in 2001. Such Humorous RFCs (published on April 1) are part of the IETF's culture.

## 6.6 The IETF in Action — Real-World Impact

The IETF's work directly shapes the technology billions of people use every day.

**HTTP/2 and HTTP/3**: The IETF's HTTPbis working group produced HTTP/2 (RFC 7540, 2015) and HTTP/3 (RFC 9114, 2022). HTTP/2 reduced web page load times by enabling multiple simultaneous requests over a single connection. HTTP/3, built on the QUIC transport protocol rather than TCP, further improves performance especially on mobile networks with high packet loss. When you notice a website loading faster, the IETF's work is likely part of the reason.

**TLS 1.3**: TLS (Transport Layer Security) is the protocol that encrypts HTTPS connections. TLS 1.3 (RFC 8446, 2018) significantly improved security by removing support for outdated cryptographic algorithms and reduced the handshake from two round trips to one, making encrypted connections faster. The widespread deployment of TLS 1.3 has made the web more secure for everyone.

**QUIC**: Originally developed by Google, QUIC was standardized by the IETF in 2021 and forms the foundation of HTTP/3. QUIC runs over UDP instead of TCP, solving TCP's "head-of-line blocking" problem — where packet loss stalls all streams in a connection. Google began deploying QUIC in Chrome and across Google services, providing data on its real-world performance that informed the IETF standardization process.

**DNSSEC**: DNS Security Extensions, specified in several RFCs, provide cryptographic authentication of DNS responses, preventing attackers from injecting fraudulent DNS records. While DNSSEC deployment has been slower than hoped, it is increasingly widely deployed at the registry level for major TLDs.

---

# Chapter 7: The W3C — The World Wide Web Consortium

## 7.1 Two Different Infrastructures

A common confusion for students of Internet governance is the distinction between the Internet and the World Wide Web. The Internet is the global network of interconnected computers — the physical and logical infrastructure of routers, cables, and protocols that move data from place to place. The World Wide Web is an application that runs on top of the Internet — a system of hyperlinked documents and resources accessed using browsers and identified by URLs.

This distinction matters for governance because the organizations that govern Internet protocols (primarily the IETF) are different from the organizations that govern Web standards (primarily the **W3C** — the World Wide Web Consortium).

## 7.2 Origins — Tim Berners-Lee and CERN

The World Wide Web was invented in 1989 by **Tim Berners-Lee**, a British computer scientist working at CERN, the European particle physics laboratory near Geneva. Berners-Lee proposed a system of hyperlinked documents to allow CERN researchers to share information. He defined three fundamental technologies:

- **HTML (HyperText Markup Language)**: The markup language for creating web pages
- **HTTP (HyperText Transfer Protocol)**: The protocol for transferring web resources
- **URL (Uniform Resource Locator)**: The addressing scheme for identifying web resources

Berners-Lee released the Web to the public in 1991. Its growth was explosive. As the Web commercialized and multiple browser vendors began developing competing and incompatible implementations of HTML and web technologies, the need for standardization became urgent.

In 1994, Berners-Lee founded the **World Wide Web Consortium (W3C)** at MIT, with additional hosting institutions at INRIA in France and Keio University in Japan. The W3C's mission was to develop common protocols that would ensure the Web's long-term growth.

Berners-Lee served as W3C Director from 1994 until 2022, giving the organization a degree of continuity and moral authority unique in the standards world. In 2022, the W3C transitioned to a new legal structure (a public-interest nonprofit organization) and leadership.

## 7.3 How the W3C Works

### 7.3.1 Membership Model

Unlike the IETF, which is free and open to anyone, the W3C operates on a **membership model**. Organizations — companies, universities, government agencies, research institutions — pay annual membership fees to join the W3C. Fees are scaled by organization size; large corporations pay significantly more than small organizations or universities.

Member organizations send representatives to W3C Working Groups and participate in standards development. The W3C has approximately 400–500 member organizations, including virtually every major technology company: Apple, Google, Microsoft, Mozilla, Samsung, Adobe, Facebook/Meta, and hundreds of others.

Non-members can observe and comment on W3C standards through the public process, and W3C specifications are published publicly, but formal participation in Working Groups is reserved for members.

### 7.3.2 Working Groups

Like the IETF, the W3C's primary technical work happens in **Working Groups**, each focused on a specific technology area. Working groups include:

- **HTML Working Group**: Developing the HTML specification
- **CSS Working Group (CSSWG)**: Developing CSS standards
- **WebRTC Working Group**: Real-time communications in the browser
- **WebAssembly Working Group**: The WebAssembly standard
- **Privacy Working Group**: Privacy-preserving web technologies
- **Accessibility Guidelines Working Group (AGWG)**: Web accessibility standards

### 7.3.3 The Recommendation Process

W3C standards go through a defined maturity ladder before becoming final:

1. **Editor's Draft**: An informal working document maintained by editors
2. **Working Draft (WD)**: A formal draft document published for public review
3. **Candidate Recommendation (CR)**: A technically mature draft published for implementation experience
4. **Proposed Recommendation (PR)**: A near-final draft submitted to the W3C Advisory Committee for review
5. **W3C Recommendation (REC)**: The final, approved W3C standard

This process can take years. HTML5, for example, began as a Working Draft in 2008 and reached W3C Recommendation status in October 2014 — a six-year process for one of the most significant web standards ever produced.

## 7.4 The W3C's Major Standards

### 7.4.1 HTML

**HTML (HyperText Markup Language)** is the foundational language of the Web — the set of tags and attributes that give web documents their structure. HTML defines elements like `<p>` for paragraphs, `<h1>` through `<h6>` for headings, `<a>` for hyperlinks, `<img>` for images, and hundreds of other structural elements.

HTML's standardization history is turbulent. In the early Web era, browser vendors (particularly Netscape and Microsoft) competed by adding proprietary extensions to HTML, causing web pages to look different or break in different browsers. The W3C attempted to rationalize HTML with XHTML (a stricter, XML-based variant), but this effort effectively failed.

A parallel effort emerged from the browser vendor community itself: the **Web Hypertext Application Technology Working Group (WHATWG)**, founded in 2004 by Apple, Mozilla, and Opera. WHATWG developed HTML5 based on practical implementation experience, focusing on what browsers actually needed to do rather than theoretical elegance. After years of parallel development and tension between WHATWG and W3C, the two bodies agreed in 2019 to work from a single specification: the **WHATWG HTML Living Standard**, which the W3C would publish as HTML 5.x snapshots. This represented a shift in the locus of HTML development toward the browser vendor community.

### 7.4.2 CSS

**CSS (Cascading Style Sheets)** separates the presentation of web content from its structure. CSS controls colors, fonts, layouts, animations, and nearly every visual aspect of a web page. Without CSS, every web page would render as unstyled text.

The CSS Working Group has produced an extensive family of specifications — CSS is not a single monolithic standard but a collection of modules, each developed at its own pace:

- **CSS Box Model**: The fundamental layout model of elements on a page
- **CSS Flexbox**: A layout model for one-dimensional arrangements
- **CSS Grid**: A powerful two-dimensional layout system
- **CSS Transitions and Animations**: Smooth visual transitions
- **CSS Custom Properties** (variables): Reusable values in CSS
- **CSS Media Queries**: Responsive design based on screen characteristics

### 7.4.3 Accessibility Standards (WCAG)

The **Web Content Accessibility Guidelines (WCAG)** are among the most socially significant standards the W3C has produced. WCAG defines how to make web content accessible to people with disabilities, including those who are blind (and use screen readers), deaf, have motor impairments (and use keyboards or switch devices rather than mice), or have cognitive disabilities.

WCAG is organized around four principles (POUR):
- **Perceivable**: Content can be perceived by all users (e.g., text alternatives for images)
- **Operable**: Interface can be operated by all users (e.g., keyboard-navigable)
- **Understandable**: Content and interface can be understood (e.g., plain language)
- **Robust**: Content works with current and future assistive technologies

WCAG 2.1 (2018) and WCAG 2.2 (2023) are widely referenced in legislation and regulations worldwide. The EU's European Accessibility Act, the U.S. Americans with Disabilities Act (as interpreted by courts), and many national laws require or strongly encourage compliance with WCAG. For businesses, this means accessibility is not just an ethical consideration but a legal one.

### 7.4.4 Web Security Standards

The W3C has produced important security-related standards:

**Web Authentication (WebAuthn)**: A standard for passwordless authentication using biometrics, hardware security keys, or platform authenticators. WebAuthn, combined with the FIDO Alliance's FIDO2 specification, enables users to log in with Face ID, fingerprint readers, or YubiKeys without passwords. This dramatically reduces the risk of phishing and credential theft. WebAuthn became a W3C Recommendation in 2019 and is now supported across all major browsers.

**Content Security Policy (CSP)**: Allows websites to declare which sources of content are trusted, helping prevent cross-site scripting (XSS) attacks.

**Subresource Integrity (SRI)**: Allows browsers to verify that resources loaded from third-party servers (like CDNs) have not been tampered with.

### 7.4.5 XML and Related Technologies

The W3C standardized **XML (Extensible Markup Language)** in 1998, which became foundational for data interchange across the Web and enterprise computing. Related standards like XSLT (for transforming XML), XML Schema (for validating XML documents), and XPath (for navigating XML documents) are widely used in enterprise systems.

While JSON has largely displaced XML for web APIs, XML remains important in document formats (like DOCX and SVG), enterprise integration, and government systems.

### 7.4.6 Semantic Web and Linked Data

One of the W3C's long-term research and standardization efforts has been the **Semantic Web** — a vision of the Web where data has machine-readable meaning, not just human-readable presentation. Key technologies include:

- **RDF (Resource Description Framework)**: A model for expressing metadata as subject-predicate-object triples
- **OWL (Web Ontology Language)**: For defining ontologies (structured vocabularies)
- **SPARQL**: A query language for RDF data

While the full Semantic Web vision has not been realized, these technologies underpin linked data initiatives, knowledge graphs (including Google's Knowledge Graph and Wikidata), and machine-readable data publication by governments and cultural institutions.

## 7.5 The W3C vs. WHATWG — Governance Tension

The emergence of WHATWG as a significant force in web standards reflects a deeper tension in Web governance: who should control the standards that define the Web?

The W3C's membership model, while ensuring funding and broad industry participation, has also been criticized for being too slow (standards taking a decade to complete), too influenced by member organizations' commercial interests, and sometimes out of touch with the real needs of web developers and users.

WHATWG, driven primarily by the browser vendors who actually implement the standards, has been more agile but less democratically accountable. When the browser vendors (essentially Apple, Google, Mozilla, and Microsoft) reach consensus, the WHATWG Living Standard changes — and if you're a web developer or user, you have limited ability to influence that process unless you work for one of those companies.

This tension reflects a broader dynamic in Internet governance: the distinction between the organizations formally charged with governance and the organizations that actually have power through market dominance and technical implementation.

---

# Chapter 8: Net Neutrality

## 8.1 The Central Question

**Net neutrality** is the principle that Internet service providers (ISPs) must treat all Internet traffic equally, regardless of its source, destination, content, type, or the identity of the sender or receiver. Under net neutrality, your ISP cannot:

- Speed up access to websites that have paid for preferential treatment
- Slow down access to services that compete with the ISP's own offerings
- Block access to specific websites or services
- Charge content providers differently based on their relationship with the ISP

The concept is simple to state, but the policy debate around it is extraordinarily complex, touching on questions of economic regulation, free speech, innovation, corporate power, and the fundamental character of the Internet.

## 8.2 Why Net Neutrality Matters

To understand why net neutrality became one of the most bitterly contested technology policy debates of the past two decades, consider the position that ISPs occupy in the Internet ecosystem.

In most countries — and especially in the United States — broadband Internet access is provided by a small number of large ISPs. Many Americans have only one or two realistic options for home broadband service. The ISP is the **gatekeeper** — the company through which all of a customer's Internet traffic must flow.

If ISPs are free to manipulate traffic, several problematic outcomes become possible:

**Scenario 1 — Competitive harm**: Comcast (a major ISP) also owns NBCUniversal and operates its own video streaming service. Without net neutrality, Comcast could slow down Netflix traffic while giving its own streaming service preferential speed, undermining competition in the streaming market.

**Scenario 2 — Paid prioritization**: Large content companies like Google, Facebook, and Netflix can afford to pay ISPs for preferential delivery. Small startups, nonprofits, and independent journalists cannot. This creates a "two-tier Internet" where well-funded incumbents have a structural advantage over new entrants.

**Scenario 3 — Censorship**: An ISP with ideological or business interests could block access to websites it disapproves of — political content, union organizing sites, or services that compete with its business partners.

**Scenario 4 — Extortion**: An ISP could threaten to slow down a content provider's traffic unless the content provider pays a "toll." Reports of Comcast and Level 3 network disputes (2010) and Netflix's payments to Comcast for direct interconnection (2014) were widely seen as approximations of this scenario.

Net neutrality advocates argue that the open, non-discriminatory nature of the Internet has been fundamental to its value as a platform for innovation and free expression. The lack of gatekeepers was precisely what made it possible for Google, Facebook, and YouTube to emerge as startups and eventually become dominant companies — had ISPs been free to block or throttle competing services in the 1990s and 2000s, the modern Internet landscape would look very different.

## 8.3 The Arguments Against Net Neutrality

Opponents of net neutrality regulation — primarily ISPs and free-market economists — offer several counterarguments:

**Network management**: ISPs argue they need the ability to manage their networks efficiently, including prioritizing time-sensitive traffic (like voice calls and video conferencing) over bulk file transfers. Rigid net neutrality rules could prevent legitimate traffic management.

**Investment incentives**: If ISPs can earn revenue from paid prioritization and quality tiers, they will have more incentive to invest in expanding and upgrading their networks. Regulatory constraints may reduce investment, ultimately harming consumers.

**Market solutions**: In a competitive market, ISPs that discriminate against popular services will lose customers to competitors that don't. Regulation is unnecessary if competition is maintained.

**Innovation in service design**: Tiered services could enable new applications. For example, a remote surgery system might benefit from guaranteed priority access; a telehealth service for rural patients might be better served by specialized QoS guarantees rather than best-effort treatment.

**Free speech for ISPs**: Some argued that forcing ISPs to carry all traffic without discrimination violated ISPs' First Amendment rights as speech editors.

## 8.4 The U.S. Net Neutrality Battle

### 8.4.1 Early Enforcement Attempts

The U.S. **Federal Communications Commission (FCC)** is the federal agency responsible for regulating communications services, including broadband Internet. The FCC's authority over the Internet has been the central legal battleground in the net neutrality debate.

The FCC's first significant net neutrality action came in 2005, when it sanctioned **Madison River Communications** for blocking Vonage's VoIP (voice over IP) service — blocking competition with Madison River's own telephone business.

In 2007, the Associated Press reported that **Comcast** was secretly throttling BitTorrent traffic — slowing down the peer-to-peer file-sharing protocol regardless of the legality of the content being transferred. The FCC found Comcast in violation of net neutrality principles and ordered it to stop. Comcast challenged the FCC's authority in court — and won. The D.C. Circuit Court of Appeals ruled in 2010 that the FCC had not established adequate legal authority to impose net neutrality rules.

### 8.4.2 The Open Internet Order (2010)

The FCC responded by enacting the **Open Internet Order** in 2010, establishing rules against:
- **Blocking**: ISPs cannot block lawful websites or applications
- **Unreasonable discrimination**: ISPs cannot unreasonably discriminate against traffic

Critically, the FCC regulated broadband under **Title I** of the Communications Act (as an "information service") rather than **Title II** (as a "telecommunications service"). This decision had profound legal consequences.

Verizon challenged the 2010 Open Internet Order, and in 2014, the D.C. Circuit ruled that while the FCC could regulate broadband, its specific rules against blocking and discrimination violated the legal requirements for Title I information services. The court essentially told the FCC: if you want to impose common carrier-style rules, you need to reclassify broadband as a telecommunications service under Title II.

### 8.4.3 The Strong Net Neutrality Order (2015)

The Obama administration's FCC, under Chairman **Tom Wheeler**, responded decisively. In February 2015, the FCC reclassified broadband Internet access as a **telecommunications service** under Title II of the Communications Act, applying common carrier rules to ISPs.

The 2015 Open Internet Order established three "bright line" rules:
1. **No blocking** of lawful content, applications, services, or non-harmful devices
2. **No throttling** of lawful Internet traffic based on content, applications, or services
3. **No paid prioritization** — no creating "fast lanes" for those who pay

Additionally, the order included a general conduct standard prohibiting any practice that "unreasonably interferes" with end users' ability to access the Internet.

ISPs and Republican political interests challenged the 2015 order vigorously. The D.C. Circuit upheld the FCC's authority in 2016, in **U.S. Telecom Association v. FCC** — a major victory for net neutrality advocates.

### 8.4.4 Repeal Under the Trump Administration (2017)

The Trump administration's FCC, under Chairman **Ajit Pai** (a former Verizon attorney), reversed course in December 2017. The **Restoring Internet Freedom Order** reclassified broadband back to a Title I information service and eliminated the specific net neutrality rules, replacing them with a requirement that ISPs disclose their traffic management practices.

The repeal was intensely controversial. A campaign encouraging the public to comment on the FCC's proposal generated over 22 million comments — though an investigation revealed that millions were fake, submitted using stolen identities by parties on both sides of the debate.

States responded by enacting their own net neutrality laws. California passed the strongest state net neutrality law, and after a legal battle (where the federal government argued state net neutrality laws were preempted by federal law), California's law was upheld and took effect in 2021. Other states passed similar legislation.

### 8.4.5 Reinstatement Under the Biden Administration (2024)

The Biden administration's FCC, under Chairwoman **Jessica Rosenworcel**, moved to reinstate net neutrality rules similar to the 2015 order. The FCC voted in April 2024 to reclassify broadband under Title II and reimpose net neutrality rules.

The legal and political battle continues, reflecting the deeply partisan character the net neutrality debate has taken on in the United States. Net neutrality has become a proxy for broader debates about the role of government regulation in markets, the power of large technology companies, and the nature of the Internet as a public good.

## 8.5 Net Neutrality in Other Countries

The net neutrality debate is global, though it plays out differently in different regulatory environments.

**European Union**: The EU enacted strong net neutrality rules through the **Open Internet Regulation** (EU 2015/2120), which took effect in 2016 and was enforced through national telecom regulators. The EU rules prohibit blocking and throttling and restrict paid prioritization, while allowing some flexibility for specialized services (like hospital remote surgery systems) that require dedicated quality of service. The Body of European Regulators for Electronic Communications (BEREC) provides guidelines for consistent enforcement across member states.

**India**: India's **Telecom Regulatory Authority of India (TRAI)** established strong net neutrality rules in 2018, following a major public debate over Facebook's "Free Basics" program, which offered free access to a limited set of websites (including Facebook) without counting it against users' data caps. Critics (including many Indian Internet users who campaigned under the hashtag #SaveTheInternet) argued that this violated net neutrality by privileging Facebook's preferred content. TRAI agreed and prohibited differential pricing for data services.

**Brazil**: Brazil's **Marco Civil da Internet** (Civil Rights Framework for the Internet), enacted in 2014, includes strong net neutrality provisions and is often cited as a model for comprehensive Internet rights legislation.

**China**: China's Internet is governed by regulations that bear no relationship to net neutrality principles — the Great Firewall blocks extensive categories of content, and ISPs operate under government direction. Net neutrality in any conventional sense does not apply in China.

## 8.6 Zero-Rating and Its Complexities

A particularly contentious practice related to net neutrality is **zero-rating** — the practice of ISPs not counting access to specific services against users' data caps. For example:

- AT&T zero-rated its own **DirecTV** streaming service on mobile plans, meaning customers could watch DirecTV without consuming their data allowance, while Netflix or Hulu would count against the cap
- T-Mobile's **Binge On** program zero-rated multiple streaming services, including Netflix and YouTube, at reduced video quality

Proponents argue zero-rating benefits consumers by allowing them to use popular services without data cost concerns, and promotes competition among content providers to get included in zero-rating programs.

Opponents argue zero-rating distorts the market in favor of ISP-preferred services or well-funded incumbents, disadvantages new entrants and competitors that aren't zero-rated, and effectively creates the two-tier Internet that net neutrality is meant to prevent.

The EU's BEREC issued guidelines in 2016 treating many forms of zero-rating as incompatible with the Open Internet Regulation, while the U.S. has been more permissive.

---

# Chapter 9: Internet Governance Forums — The IGF, the ITU, and the Battle for Internet Control

## 9.1 Who Governs the Internet? The Fundamental Dispute

We have now examined the organizations that coordinate specific functions — ICANN for names and numbers, IANA for identifiers, RIRs for IP addresses, the IETF for protocols, the W3C for Web standards. But there is a broader question that has animated global politics for three decades: **who governs the Internet as a whole?**

This question has no universally accepted answer, and different stakeholders hold fundamentally different views:

**The multistakeholder model**: Supported primarily by the United States, European democracies, and the technical community. In this model, Internet governance is distributed among multiple stakeholders — governments, businesses, civil society, and the technical community — each contributing to different aspects of governance through organizations like ICANN, the IETF, and regional RIRs. No single authority controls the whole.

**The multilateral model**: Supported primarily by China, Russia, and a bloc of developing nations. In this model, Internet governance should be conducted through intergovernmental processes, with nation-states as the primary actors. The primary vehicle would be the United Nations system — specifically the **International Telecommunication Union (ITU)**.

This is not merely a theoretical debate. The outcome determines whether governments can impose their domestic law across borders on Internet services, whether authoritarian states can gain international legitimacy for censorship and surveillance, whether the technical community retains its role in shaping Internet evolution, and whether the Internet remains a globally unified network or fragments into national or regional "internets."

## 9.2 The World Summit on the Information Society (WSIS)

The formal beginning of the contemporary Internet governance debate can be traced to the **World Summit on the Information Society (WSIS)**, a UN summit held in two phases:
- **Geneva, 2003**
- **Tunis, 2005**

WSIS brought together heads of state, government ministers, business leaders, and civil society representatives to discuss the role of ICT (Information and Communications Technology) in development and governance.

At WSIS, a significant fault line emerged. The United States (along with the EU and others) wanted to keep existing Internet governance arrangements — with ICANN under U.S. oversight — largely intact. A coalition of developing nations and authoritarian states, led by China and supported by many African and Asian governments, demanded a greater role for governments and the UN system, particularly the ITU.

The compromise reached at Tunis in 2005 was characteristically diplomatic in its vagueness: it established the **Internet Governance Forum (IGF)** as a new body for multistakeholder dialogue, while leaving actual governance arrangements largely unchanged. The governments that wanted intergovernmental control didn't get it; those who wanted to preserve the status quo had to accept a new forum for challenging it.

The WSIS also produced the **Tunis Agenda**, which articulated the principle that "policy authority for Internet-related public policy issues is the sovereign right of States" — language that authoritarian governments later used to justify domestic Internet censorship as a matter of "Internet sovereignty."

## 9.3 The Internet Governance Forum (IGF)

### 9.3.1 Structure and Character

The **Internet Governance Forum (IGF)** was established by the UN General Assembly following the WSIS Tunis phase. It is a multistakeholder forum — open to governments, private sector representatives, civil society organizations, the technical community, and academia. No distinction is formally made between government delegates and NGO representatives; all participate as equals.

The IGF holds an annual meeting, rotating among different host cities. Previous IGF meetings have been held in Athens, Rio de Janeiro, Hyderabad, Sharm el-Sheikh, Vilnius, Nairobi, Baku, Bali, Istanbul, João Pessoa, Jalisco, Geneva, Paris, Berlin, and other cities. The forum typically attracts 3,000–5,000 participants for a week of panel discussions, workshops, and networking.

### 9.3.2 The IGF's Role — What It Does and Doesn't Do

The IGF has a carefully limited mandate. It is explicitly a **dialogue** forum, not a decision-making body. It does not:
- Make binding policies
- Negotiate treaties
- Control any Internet resources
- Have the power to direct ICANN, the IETF, or any other organization

What the IGF does:
- Provides a global space for stakeholders to discuss Internet governance issues
- Produces "messages" and summaries from each annual meeting reflecting the discussions
- Supports the creation of **National and Regional IGFs** that address governance issues at more local levels
- Operates **Best Practice Forums** and **Dynamic Coalitions** on specific topics (cybersecurity, IPv6, gender and Internet governance, etc.)
- Serves as a networking and capacity-building space, particularly for participants from developing countries

### 9.3.3 Criticism of the IGF

The IGF is praised by multistakeholder advocates as a unique space for inclusive global dialogue, but it is criticized from multiple directions:

**Lack of impact**: Without decision-making authority, IGF discussions often seem disconnected from the actual governance processes that matter. After years of IGF workshops on issues like cybersecurity norms or spectrum policy, critics note that outcomes remain opaque or divorced from the discussions.

**Dominance by developed-country actors**: Despite its open participation model, the IGF is de facto dominated by participants from wealthy democracies and the technology industry, who have the resources to travel to annual meetings and engage in the bureaucratic processes year-round.

**Repetitive discussions**: With annual meetings that often cover the same topics (cybersecurity, freedom of expression, access) without producing concrete outcomes, some participants express frustration with the forum's perceived circularity.

**Legitimacy questioned by authoritarian states**: Governments that favor the multilateral model do not accept the IGF as a legitimate governance mechanism, because it gives equal standing to civil society and business, not just states.

### 9.3.4 The IGF's Mandate Renewal

The IGF's mandate is renewable every five years. At the WSIS+10 review in 2015, the UN General Assembly renewed and modestly strengthened the IGF's mandate, emphasizing improved outcomes and intersessional work (ongoing activities between annual meetings). The WSIS+20 review, coming in 2025, will again examine whether the IGF's model should be continued, modified, or replaced.

## 9.4 The International Telecommunication Union (ITU)

### 9.4.1 History and Structure

The **International Telecommunication Union (ITU)** is a specialized agency of the United Nations responsible for coordinating global telecommunications networks and services. It is one of the oldest international organizations, tracing its origins to the **International Telegraph Union** established in 1865 — predating the UN, the Internet, and much of the modern world.

The ITU coordinates:
- **Radio spectrum** allocation and satellite orbit coordination (through the ITU-R sector)
- **Technical standards** for telecommunications equipment and networks (through the ITU-T sector)
- **ICT development** assistance for developing countries (through the ITU-D sector)

The ITU has 193 member states and approximately 900 "Sector Members" (companies and international organizations). Its governance is fundamentally **intergovernmental** — votes are cast by member states, each with one vote. This is the model that authoritarian states favor for Internet governance, because it gives state governments primacy and excludes civil society.

The ITU holds a **World Radiocommunication Conference (WRC)** every four years to negotiate changes to global radio spectrum allocations — these conferences directly affect WiFi, 5G, satellite Internet, and other wireless technologies. It also holds a **World Telecommunication Standardization Assembly (WTSA)** and a **World Telecommunication Development Conference (WTDC)** on their respective topics.

Crucially, the ITU holds a **Plenipotentiary Conference (PP)** every four years — the ITU's supreme governing body, where member states vote on key decisions, elect leadership, and set the organization's strategic direction.

### 9.4.2 The World Conference on International Telecommunications (WCIT) 2012

The most significant recent confrontation between the multistakeholder and multilateral models occurred at the **World Conference on International Telecommunications (WCIT)** in December 2012, held in Dubai.

The conference was convened to revise the **International Telecommunication Regulations (ITRs)** — a treaty-level document governing international telecommunications. The ITRs had last been updated in 1988, before the commercial Internet existed.

Proposed revisions included language that would have:
- Acknowledged government authority to manage Internet traffic within their territories
- Allowed ITU oversight of Internet interconnection
- Recognized "security" grounds for governments to block Internet content
- Extended ITU authority to spam and network security issues previously managed by private sector entities

The United States, European Union, Canada, Australia, and others viewed these proposals as an attempt to bring Internet governance under intergovernmental control and to provide international legitimacy for censorship and surveillance.

The conference ended in crisis. When the final treaty text was put to a vote, **89 countries signed** the revised ITRs, while **55 countries refused to sign** — including the United States, EU members, Japan, Canada, and Australia. The result was two camps: one that accepted ITU authority over Internet matters, and one that rejected it.

The 2012 WCIT failure hardened positions on both sides. Multistakeholder advocates saw it as a successful defense of Internet freedom; proponents of intergovernmental control saw it as evidence that the existing system was illegitimately dominated by Western interests.

### 9.4.3 Internet Sovereignty — The Chinese and Russian Vision

The counterpart to the multistakeholder model is what China and Russia call **"Internet sovereignty"** or **"cyberspace sovereignty"** — the principle that each nation-state has the right to govern the Internet within its borders, unrestricted by international norms of openness or human rights.

China's model is the most fully realized version of Internet sovereignty:
- The **Great Firewall** (a suite of technical measures including IP blocking, DNS manipulation, deep packet inspection, and application-level filtering) blocks access to thousands of foreign websites, including Google, Facebook, YouTube, Twitter, Wikipedia, and many others
- **Domestic Internet companies** (Baidu, WeChat, Weibo, Alibaba) dominate the Chinese Internet market in a deliberately protected environment
- **Real-name registration** requirements link online activity to real-world identities, enabling surveillance
- **Internet content regulation** enforces compliance with Communist Party directives

China promotes its model internationally, providing technical assistance to countries seeking to build similar systems and advocating for Internet sovereignty principles in global governance forums, including the **World Internet Conference (Wuzhen Summit)** — a Chinese-organized alternative to global governance forums that China has used to advocate for its vision of Internet governance.

Russia has enacted laws requiring that Russian Internet traffic be routable through **SORM (System of Operative Investigative Measures)** infrastructure controlled by the FSB, and passed the **Sovereign Internet Law** in 2019, creating the technical capability to disconnect the Russian Internet from the global Internet ("Runet") in the event of an emergency.

### 9.4.4 The NETmundial Meeting (2014)

In the wake of Edward Snowden's revelations in 2013 about NSA mass Internet surveillance — which severely damaged the credibility of U.S. claims to be a guardian of an open and free Internet — Brazil's President Dilma Rousseff called for an international meeting to discuss Internet governance.

The resulting **NETmundial meeting**, held in São Paulo in April 2014, was organized on a multistakeholder basis and produced a set of principles and a roadmap for Internet governance. NETmundial is notable for:
- Being the first high-level Internet governance meeting organized on genuinely multistakeholder principles (not just intergovernmental)
- Producing a broad consensus statement on Internet governance principles, including human rights, access, and the multistakeholder model
- Representing Brazilian leadership in Internet governance, signaling that developing nations need not align with either the U.S. or China's positions

## 9.5 The Ongoing Governance Debate

### 9.5.1 The IANA Transition and Its Aftermath

The 2016 transition of IANA oversight from the U.S. government to the global multistakeholder community was intended partly to defuse international criticism of U.S. control. By removing formal U.S. government oversight, the transition sought to demonstrate that Internet governance could be accountable to a broader global community without either U.S. dominance or the ITU multilateral alternative.

The transition was not universally welcomed. Some U.S. lawmakers opposed it, arguing it could eventually lead to censorship-enabling governments gaining influence over ICANN. Defenders argued that the accountability mechanisms built into the new ICANN structure were more robust than the informal U.S. government oversight they replaced.

The transition's effects continue to play out. ICANN has become more genuinely international in its engagement, but critics continue to debate whether its accountability mechanisms are truly adequate.

### 9.5.2 Cybersecurity and Internet Governance

**Cybersecurity** has become the most urgent and contested dimension of global Internet governance. Nation-state cyberattacks (attributed to Russia, China, Iran, North Korea, and others, as well as the United States and its allies), ransomware attacks, and the weaponization of Internet infrastructure for geopolitical ends have raised fundamental questions that no existing governance institution is well-positioned to answer:

- What norms govern state behavior in cyberspace?
- What constitutes an "armed attack" in cyberspace, triggering legal self-defense responses?
- How can critical infrastructure be protected from foreign cyber intrusion?
- What role should private sector companies play in cyber defense?

The UN has attempted to address these questions through the **Group of Governmental Experts (GGE)** on cybersecurity, which produced reports in 2010, 2013, 2015, and 2021 articulating norms of responsible state behavior. However, the GGE process broke down in 2017 when states could not agree on whether international humanitarian law (the laws of war) applies to cyberspace — a question with enormous implications.

An **Open-Ended Working Group (OEWG)** process was established in 2019, allowing all UN member states (not just the small GGE membership) to participate in cybersecurity norm development. This process, while more inclusive, has also been more contentious.

### 9.5.3 The Splinternet Fear

The most dramatic potential outcome of ongoing governance conflicts is the **fragmentation of the global Internet** into separate, incompatible networks — a "Splinternet."

Several developments push in this direction:
- China's Great Firewall creates a de facto separate Chinese Internet
- Russia's Sovereign Internet Law creates technical capability for disconnection
- The EU's GDPR and data localization requirements in some countries restrict data flows
- U.S. restrictions on Chinese technology (Huawei bans, TikTok concerns) fragment the hardware and software ecosystem
- India's data localization proposals would require Internet services to store Indian user data on Indian servers

The Internet's strength has been its global, unified nature — the same protocols and namespace work everywhere, enabling global commerce, communication, and collaboration. Fragmentation, even partial, reduces these benefits and creates compliance nightmares for global businesses, barriers for small organizations operating internationally, and reduced resilience (a fragmented Internet cannot route around censorship or disasters as effectively).

Defenders of the global Internet argue that technical standards and protocols create a powerful inertial force against fragmentation — the economic costs of incompatibility are too great for most states to bear. Skeptics argue that political and security pressures are strong enough to override economic logic, especially for large economies like China, Russia, and (potentially) the EU that have enough domestic market to sustain their own Internet ecosystems.

## 9.6 The Future of Internet Governance

The Internet governance landscape in the 2020s is more complex and contested than ever. Several trends will shape its evolution:

**The rise of AI governance**: Artificial intelligence is rapidly becoming the most significant technology governance challenge. Questions about AI safety, algorithmic accountability, data training, and AI-enabled surveillance overlap extensively with Internet governance. New institutions and frameworks are being created (the EU AI Act, the U.S. AI Safety Institute), and the existing Internet governance institutions are struggling to integrate these new concerns.

**Digital colonialism concerns**: Civil society and governments in the Global South have increasingly argued that Internet governance — and the Internet economy more broadly — reproduces colonial power dynamics. Platform companies based in the U.S. dominate global markets; governance processes are effectively controlled by wealthy nations. These critiques are pushing for more meaningful inclusion of developing-country voices, more equitable economic models (such as proposals for data taxation or platform profit-sharing), and more genuine capacity-building.

**Climate and Internet**: The Internet's energy consumption — data centers, network infrastructure, and device manufacturing — is enormous and growing. Internet governance institutions are beginning to grapple with sustainability requirements, green data center standards, and the environmental implications of Internet growth.

**Platform governance**: The governance of major Internet platforms (Google, Facebook/Meta, Twitter/X, Amazon, Apple) has become a major political issue globally. Platforms make decisions that affect billions of people's access to information, commerce, and communication, but they operate largely outside traditional governance frameworks. Proposals range from treating platforms as public utilities (subject to common carrier rules), to sectoral regulation of specific harms (illegal content, disinformation), to antitrust breakups, to new forms of democratic oversight.

---

# Conclusion: The Governance of a Global Commons

The Internet is, in many respects, a global commons — a shared infrastructure that no single entity owns but from which everyone benefits. Like other commons, it faces challenges of governance: how to prevent its exploitation, ensure its fair use, maintain its sustainability, and manage conflicts among its many users.

The institutions we have examined in this part — ICANN, IANA, the RIRs, the IETF, the W3C, the IGF, and the ITU — represent different approaches to governing different aspects of this commons. Each has strengths and limitations. None is complete or fully adequate.

The multistakeholder model that currently prevails, with all its complexity and imperfection, has produced a remarkably functional and innovative global network. The alternative — intergovernmental control through the ITU or similar bodies — would likely produce a more politically stable but less dynamic and open Internet. The ongoing tension between these models will continue to shape the Internet's evolution.

What is clear is that governance matters. The decisions made in ICANN's policy working groups, the IETF's technical discussions, the ITU's plenipotentiary conferences, and the IGF's workshops have real-world consequences for billions of people. The Internet is too important to be left entirely to engineers, or entirely to politicians, or entirely to the market. Its governance requires the engagement of all of us — as users, citizens, professionals, and members of a global community that depends on its open and reliable functioning.

---

# Summary of Key Concepts

| Organization | Type | Primary Function | Model |
|---|---|---|---|
| ICANN | Private Nonprofit | DNS coordination, TLD management | Multistakeholder |
| IANA | ICANN Function | Identifier assignments | Technical |
| ARIN | Nonprofit | IP addresses — North America | Regional Multistakeholder |
| RIPE NCC | Nonprofit | IP addresses — Europe/ME/Central Asia | Regional Multistakeholder |
| APNIC | Nonprofit | IP addresses — Asia-Pacific | Regional Multistakeholder |
| LACNIC | Nonprofit | IP addresses — Latin America/Caribbean | Regional Multistakeholder |
| AFRINIC | Nonprofit | IP addresses — Africa | Regional Multistakeholder |
| IETF | Volunteer Body | Internet protocol standards | Open/Rough Consensus |
| W3C | Membership Nonprofit | Web standards | Membership/Consensus |
| IGF | UN Forum | Internet governance dialogue | Multistakeholder |
| ITU | UN Agency | Telecom coordination, spectrum | Intergovernmental |

---

*This concludes Part VII of the study text. The governance and ownership landscape of the Internet is among the most dynamic and politically significant areas in the technology domain. Students are encouraged to follow ongoing developments through resources including the ICANN Blog, RIPE Labs, IETF Datatracker, W3C News, and the Internet Governance Forum's documentation — all freely accessible online.*