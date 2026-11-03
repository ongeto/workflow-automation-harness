/**
 * Factory for a fake case/application record used by the harness.
 * Keep source ASCII-only (no smart quotes or em dashes).
 */

function createCap(overrides) {
  const base = {
    id: "CAP-1001",
    type: "Building/Residential/New/Application",
    status: "Submitted",
    fees: [],
    history: [],
  };
  return Object.assign({}, base, overrides || {});
}

module.exports = { createCap };
