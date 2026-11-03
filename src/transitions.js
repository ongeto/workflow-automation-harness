/**
 * Status transition rules for the synthetic workflow.
 */

const { hasUnpaidActiveFees } = require("./fees");

const ALLOWED = {
  Submitted: ["In Review", "Withdrawn"],
  "In Review": ["Fees Due", "Approved", "Denied"],
  "Fees Due": ["Approved", "Withdrawn"],
  Approved: ["Issued"],
  Issued: ["Closed"],
  Denied: [],
  Withdrawn: [],
  Closed: [],
};

function canTransition(fromStatus, toStatus) {
  const options = ALLOWED[fromStatus] || [];
  return options.indexOf(toStatus) !== -1;
}

/**
 * Apply a status change. Blocks Issued when unpaid active fees remain.
 */
function applyTransition(cap, toStatus) {
  const fromStatus = cap.status;
  if (!canTransition(fromStatus, toStatus)) {
    return {
      ok: false,
      reason: "Transition not allowed: " + fromStatus + " -> " + toStatus,
      cap: cap,
    };
  }
  if (toStatus === "Issued" && hasUnpaidActiveFees(cap.fees)) {
    return {
      ok: false,
      reason: "Cannot issue while unpaid active fees remain",
      cap: cap,
    };
  }
  const next = Object.assign({}, cap, { status: toStatus });
  next.history = (cap.history || []).concat([
    { from: fromStatus, to: toStatus, at: new Date().toISOString() },
  ]);
  return { ok: true, reason: null, cap: next };
}

module.exports = { ALLOWED, canTransition, applyTransition };
