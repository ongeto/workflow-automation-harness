# Workflow Automation Harness

> Tiny Node.js harness for event-driven status transitions and fee checks — enterprise workflow scripting patterns without client systems.

## Problem

Workflow scripts must validate fee state and drive status changes safely. Voided/credited fees must never block or inflate business logic.

## Approach

- Fake `cap` (case/application) record object
- Pure functions for status transitions and active-fee totals
- Skip `VOIDED` / `CREDITED` fee statuses (generic pattern)
- Node built-in test runner; ASCII-safe coding convention documented

## How to run

```powershell
node --test
# or
npm test
```

## Skills demonstrated

Event-driven JS · pure functions · fee-status guards · unit tests · ASCII-safe scripting discipline

## License

MIT — see [LICENSE](LICENSE)

**Disclaimer:** Synthetic training harness. Concepts map to enterprise workflow scripting generally; not a dump of any client automation.
