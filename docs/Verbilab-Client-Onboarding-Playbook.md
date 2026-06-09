# Verbilab AI  
## Client Onboarding & Deployment Playbook

**Document type:** Client-facing operations manual  
**Version:** 1.0 (draft)  
**Prepared by:** Verbilab AI — Delivery & Customer Success  
**Contact:** hello@verbilab.ai  
**Website:** https://www.verbilab.com  

---

## Document control

| Field | Detail |
|--------|--------|
| **Audience** | Client executive sponsor, IT, compliance, operations, QA |
| **Scope** | Call Audit Engine · Conversational Intelligence · Workflow Automation |
| **Typical duration** | 4–8 weeks (bank / regulated enterprise) |
| **Distribution** | Provided at contract signature; updated at each phase gate |

**Confidentiality:** This document may contain client-specific annexes. Do not share outside authorised stakeholders without written approval from both parties.

---

## 1. Executive summary

Verbilab AI deploys applied intelligence for **call audit**, **workflow automation**, and **compliance** in environments where accuracy, auditability, and scale matter — including **BPO contact centres**, **BFSI**, and **enterprise operations**.

This playbook describes **how we onboard your organisation** from the first executive meeting through **production deployment on your servers** (private cloud, VPC, or on-premises) and **full handover** to your teams.

### What you can expect

- A **structured programme** with named meetings, owners, and sign-off gates — not ad-hoc email threads.  
- **Joint workshops** with your IT, compliance, and operations leaders.  
- A **documented timeline** aligned to your change-control calendar (including bank CAB processes).  
- A **complete handover pack** so your L1/L2 teams can run day-to-day operations without depending on Verbilab for routine tasks.

### Our commitment

> Once we hand over the product, your team should have everything required to **operate, monitor, and escalate** using this playbook, the runbooks we provide, and the support SLA you have signed.

---

## 2. Engagement overview

### 2.1 Typical stakeholders

| Role | Client side | Verbilab side |
|------|-------------|---------------|
| Executive sponsor | Business owner, budget authority | Account director |
| Programme lead | PMO / transformation lead | Delivery manager |
| IT / infrastructure | Server, network, security | Solutions architect |
| Compliance / risk | Data policy, audit requirements | Compliance liaison |
| Operations | Contact centre / BPO ops head | Customer success lead |
| QA / training | Supervisors, trainers | Training specialist |

### 2.2 Programme phases at a glance

| Phase | Weeks | Focus | Gate |
|-------|-------|--------|------|
| 0 — Pre-onboarding | Week 0 | Contracts, access, inventory | Pre-onboarding sign-off |
| 1 — Discovery & design | 1–2 | Workshops, solution design | Design approval |
| 2 — Architecture & security | 2–3 | Infra, network, security review | Security & infra readiness |
| 3 — Install & configure | 3–5 | Deploy on client servers | Install report accepted |
| 4 — UAT | 5–6 | Scripted validation | UAT sign-off |
| 5 — Training & go-live | 6–8 | Pilot, hypercare, handover | Go-live certificate |

*Timelines adjust for bank holidays, penetration testing, and CAB lead times.*

---

## 3. Pre-onboarding (Week 0)

Before any software is installed, the following must be complete.

### 3.1 Commercial & legal

- [ ] Master Service Agreement (MSA) / Statement of Work (SOW) executed  
- [ ] Data Processing Agreement (DPA) and confidentiality terms signed  
- [ ] Security questionnaire completed (client → Verbilab and Verbilab → client)  
- [ ] Named contacts and escalation paths exchanged  

### 3.2 Technical discovery inputs (client provides)

- [ ] Target environment: **on-prem / private cloud / VPC / air-gapped**  
- [ ] Integration inventory: telephony, CRM, LMS, core systems, SSO  
- [ ] Data classification for call audio, transcripts, and metadata  
- [ ] Retention and deletion policy requirements  
- [ ] Change-control process (CAB dates, approval lead time)  

### 3.3 Access & connectivity

- [ ] VPN or jump-host access for Verbilab delivery engineers  
- [ ] Firewall rules drafted (see Appendix A)  
- [ ] Service accounts and secrets management approach agreed  
- [ ] Approved communication channel for the programme (email / Teams / Slack)  

**Gate:** Delivery manager issues **Pre-onboarding Sign-off** — no install until signed.

---

## 4. Discovery & design (Weeks 1–2)

### Meeting 1 — Executive kickoff (90 minutes)

**Purpose:** Align leadership on scope, success metrics, and programme cadence.

**Attendees:** Executive sponsor, programme leads, Verbilab account & delivery leads.

**Agenda:**

1. Introductions and roles (10 min)  
2. Business objectives — why Verbilab, what success looks like (20 min)  
3. Scope: modules in scope (audit / workflow / compliance) (15 min)  
4. Timeline, governance, and meeting rhythm (15 min)  
5. Risks, dependencies, and executive decisions needed (15 min)  
6. Next steps and action owners (15 min)  

**Outputs:** Kickoff deck · Programme charter · RAID log (risks / assumptions / issues / dependencies)

---

### Meeting 2 — Technical discovery workshop (half day)

**Purpose:** Map call flows, data paths, integrations, and operational workflows.

**Attendees:** Client IT, operations, integration owners; Verbilab solutions architect.

**Agenda:**

1. Current-state architecture walkthrough (45 min)  
2. Call ingest: sources, formats, volumes, peak hours (45 min)  
3. QA / audit process today — rubrics, sampling, disputes (45 min)  
4. CRM and downstream systems — what must Verbilab read/write (45 min)  
5. Non-functional requirements: latency, availability, RPO/RTO (30 min)  
6. Action items and design workshop scheduling (15 min)  

**Outputs:** Integration inventory · Call-flow diagrams · Draft solution design v0.1

---

### Meeting 3 — Compliance & data governance review (2 hours)

**Purpose:** Confirm regulatory constraints, PII handling, and audit trail requirements.

**Attendees:** Client compliance / risk; Verbilab compliance liaison.

**Agenda:**

1. Applicable regulations and internal policies (30 min)  
2. Data residency and encryption requirements (30 min)  
3. Access control model (RBAC, SSO/SAML) (30 min)  
4. Logging, retention, and right-to-erasure (20 min)  
5. Open items for legal / InfoSec (10 min)  

**Outputs:** Data handling addendum · Compliance requirements matrix

---

**Phase 1 gate:** Client approves **Solution Design Document (SDD)** v1.0.

---

## 5. Architecture & security (Weeks 2–3)

### Meeting 4 — Architecture review board (2 hours)

**Purpose:** Validate target deployment on **client-managed servers** (including bank data centres).

**Attendees:** Client infrastructure, network, security architects; Verbilab solutions architect.

**Agenda:**

1. Logical architecture — Verbilab components and data flows (30 min)  
2. Physical / VM layout — compute, DB, object storage, queues (30 min)  
3. Network zones, DMZ, ingress/egress (25 min)  
4. High availability and disaster recovery (20 min)  
5. Sizing assumptions and growth headroom (15 min)  

**Outputs:** Network diagram · Infrastructure sizing sheet · HA/DR summary

---

### Meeting 5 — Security & penetration readiness (2 hours)

**Purpose:** Align on security controls before install.

**Agenda:**

1. Identity: SSO/SAML/LDAP integration plan  
2. Secrets: vault/HSM, key rotation  
3. TLS certificates and cipher requirements  
4. Vulnerability scanning and pen-test schedule (if required by bank)  
5. Security sign-off checklist walkthrough  

**Outputs:** Security sign-off checklist · Pen-test window (if applicable)

---

### Meeting 6 — CAB / change-control prep (1 hour)

**Purpose:** Package change requests for client IT governance.

**Agenda:**

1. Change request contents and approvers  
2. Rollback plan summary  
3. Maintenance windows for install and go-live  
4. Communication plan for production cutover  

**Outputs:** CAB submission pack · Approved maintenance windows

---

**Phase 2 gate:** **Infrastructure Readiness Checklist** signed by client IT.

---

## 6. Install & configure on your servers (Weeks 3–5)

Verbilab deploys into **your** environment. We do not host production client data on Verbilab infrastructure unless explicitly contracted otherwise.

### 6.1 Installation activities (Verbilab-led, client IT supports)

| Step | Activity | Owner |
|------|----------|--------|
| 1 | Provision VMs/containers per sizing sheet | Client IT |
| 2 | OS hardening, patches, monitoring agents | Client IT |
| 3 | Deploy Verbilab application stack | Verbilab |
| 4 | Configure database, object store, message queues | Verbilab + IT |
| 5 | Install TLS certificates | Client IT |
| 6 | Configure telephony / CRM connectors | Verbilab |
| 7 | Smoke test — ingest → audit → report | Verbilab |
| 8 | Install report and handover to client | Verbilab |

### Meeting 7 — Install readiness review (1 hour)

Confirm environment, credentials, firewall rules, and rollback plan before production install.

### Meeting 8 — Connector configuration sessions (2–4 hours, as needed)

Hands-on configuration of telephony feeds, CRM sync, and webhook endpoints.

### Meeting 9 — Smoke-test war room (half day)

Live test with sample calls; verify audit scores, dashboards, and alerts.

**Outputs:** Install report · Environment configuration workbook · Known issues log

**Phase 3 gate:** Client IT accepts **Install Report**.

---

## 7. Data, models & business configuration (Weeks 4–5)

| Configuration area | Description |
|--------------------|-------------|
| **QA scorecards** | Client defines rubrics; Verbilab loads templates |
| **Compliance rules** | Policy packs for regulated phrases, disclosures, risk flags |
| **User roles** | Admin, supervisor, agent, read-only auditor |
| **Workflows** | Escalation paths, coaching triggers, dispute handling |
| **Reporting** | Scheduled exports, dashboard views, audit trails |

**Outputs:** Configuration workbook (signed) · Test user accounts

---

## 8. User acceptance testing (Weeks 5–6)

### Meeting 10 — UAT planning (2 hours)

Define scenarios, entry/exit criteria, and sign-off approvers.

### UAT scope (minimum)

| # | Scenario | Pass criteria |
|---|----------|---------------|
| 1 | Call ingest from production-like source | 100% of test calls received within SLA |
| 2 | Audit scoring vs agreed sample | Accuracy ≥ contracted threshold |
| 3 | Supervisor dashboard | Scores, flags, and drill-down visible |
| 4 | Compliance alert | Rule breach detected and logged |
| 5 | Dispute / override workflow | Audit trail complete |
| 6 | Report export | Format accepted by client ops |
| 7 | SSO login | Role-based access enforced |
| 8 | Failover / restart | Service recovers per runbook |

### Meeting 11 — UAT sign-off (1 hour)

Formal acceptance or conditional acceptance with dated remediation list.

**Phase 4 gate:** **UAT Sign-off Certificate** signed.

---

## 9. Training (Week 6)

| Session | Audience | Duration | Topics |
|---------|----------|----------|--------|
| Admin training | IT / system admins | 3 hours | Users, roles, integrations, env config |
| Supervisor training | QA leads, team leads | 3 hours | Dashboards, coaching, disputes, reports |
| Agent awareness | Frontline (optional) | 1 hour | What is audited, how to use feedback |

All sessions are recorded and added to the client handover pack.

**Outputs:** Training attendance sheet · Recordings · Quick-reference guides

---

## 10. Go-live & hypercare (Weeks 7–8)

### 10.1 Pilot approach

We recommend a **phased pilot** before full scale:

1. **One business unit** or queue  
2. **One use case** (e.g. inbound sales audit)  
3. **2-week hypercare** — daily 30-minute standup with client ops and Verbilab  

### Meeting 12 — Go-live readiness review (1 hour)

Checklist: UAT complete, training done, runbooks distributed, support contacts confirmed.

### Meeting 13 — Go-live war room (launch day)

Joint monitoring of ingest volumes, error rates, and supervisor feedback.

### Hypercare (10 business days post go-live)

| Day | Activity |
|-----|----------|
| D+1 to D+5 | Daily standup · Issue triage · Config tweaks |
| D+6 to D+10 | Alternate-day check-in · Stability review |
| D+10 | Hypercare exit review |

**Phase 5 gate:** **Go-live Certificate** and **Handover Checklist** signed.

---

## 11. Handover document pack

Every client receives the following at handover:

| # | Document | Purpose |
|---|----------|---------|
| 1 | **This playbook** (client-specific annexes) | Programme reference |
| 2 | **Solution design & network diagram** | Architecture record |
| 3 | **Deployment timeline** | As-run schedule |
| 4 | **Infrastructure & security checklist** | IT reference |
| 5 | **Configuration workbook** | Business rules and settings |
| 6 | **Operations runbook** | Start/stop, health checks, logs |
| 7 | **Admin & supervisor guides** | Day-to-day usage |
| 8 | **UAT scripts & sign-off** | Validation record |
| 9 | **Support & escalation SLA** | How to get help after handover |
| 10 | **FAQ** | Top operational questions |

---

## 12. Support after handover

### 12.1 Support tiers

| Tier | Owner | Examples |
|------|--------|----------|
| **L1** | Client IT / ops | Password resets, user provisioning, restarts per runbook |
| **L2** | Verbilab support (per SLA) | Connector errors, config changes, defect investigation |
| **L3** | Verbilab engineering | Critical defects, performance issues |

### 12.2 What is *not* included in standard support

- New integrations not in SOW  
- Custom report development  
- Rubric redesign without change request  
- Infrastructure changes on client side (client IT owns)  

**Channel:** Support tickets via agreed email/portal — not informal messaging for production incidents.

---

## 13. RACI matrix

| Activity | Client sponsor | Client IT | Client ops | Verbilab delivery | Verbilab support |
|----------|:--------------:|:---------:|:----------:|:-----------------:|:----------------:|
| Contracts & access | A | C | I | R | I |
| Discovery workshops | A | C | R | R | I |
| Infra provisioning | I | **R** | I | C | I |
| Security sign-off | A | **R** | C | C | I |
| Install on servers | I | C | I | **R** | I |
| Business configuration | A | I | **R** | C | I |
| UAT | A | C | **R** | C | I |
| Training | A | I | **R** | **R** | I |
| Go-live approval | **A** | C | R | C | I |
| Steady-state operations | I | R | **R** | I | **R** |

*R = Responsible · A = Accountable · C = Consulted · I = Informed*

---

## 14. Bank / BFSI deployment timeline (reference)

Typical sequence when deploying into **bank-managed servers**:

```
Week 0   │ MSA · Security questionnaire · VPN access
Week 1   │ Executive kickoff · Technical discovery
Week 2   │ Solution design · Architecture review board
Week 3   │ CAB submission · Infra provisioning
Week 4   │ Pen-test window (if required) · Install
Week 5   │ Connector config · Business rules load
Week 6   │ UAT · Training
Week 7   │ Pilot go-live · Hypercare starts
Week 8   │ Full rollout · Handover · Hypercare ends
```

*Add 2–4 weeks if air-gapped media transfer or manual CAB cycles apply.*

---

## Appendix A — Infrastructure prerequisites (summary)

| Component | Minimum guidance |
|-----------|------------------|
| Application servers | Per sizing sheet (CPU/RAM per module) |
| Database | PostgreSQL-compatible or as specified in SDD |
| Object storage | For audio / transcript retention per policy |
| Network | HTTPS egress to approved endpoints; internal service mesh as designed |
| Identity | SAML 2.0 / OIDC / LDAP per client standard |
| Monitoring | Client SIEM/log aggregation integration point |
| Backup | Daily backup per client RPO; restore tested before go-live |

*Detailed ports and sizing are provided in the client-specific Solution Design Document.*

---

## Appendix B — Handover checklist (sign-off)

- [ ] All documents in §11 delivered  
- [ ] UAT sign-off obtained  
- [ ] Training completed and recordings shared  
- [ ] Runbook walkthrough completed with client L1  
- [ ] Support SLA and escalation contacts confirmed  
- [ ] Hypercare exit criteria met  
- [ ] Go-live certificate signed by both parties  

---

## Appendix C — Glossary

| Term | Definition |
|------|------------|
| **CAB** | Change Advisory Board — client IT governance for production changes |
| **UAT** | User Acceptance Testing — formal validation before go-live |
| **Hypercare** | Intensive post-go-live support period |
| **SDD** | Solution Design Document |
| **RBAC** | Role-based access control |
| **RPO/RTO** | Recovery point / time objectives |

---

**Verbilab AI**  
Intelligent solutions. Real results.  
hello@verbilab.ai · https://www.verbilab.com  

*© 2026 Verbilab AI. Internal draft v1.0 — customise annexes per client before external distribution.*
