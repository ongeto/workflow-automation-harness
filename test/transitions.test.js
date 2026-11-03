const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { createCap } = require("../src/cap");
const { applyTransition } = require("../src/transitions");

describe("status transitions", () => {
  it("allows Submitted to In Review", () => {
    const cap = createCap();
    const result = applyTransition(cap, "In Review");
    assert.equal(result.ok, true);
    assert.equal(result.cap.status, "In Review");
    assert.equal(result.cap.history.length, 1);
  });

  it("rejects illegal transitions", () => {
    const cap = createCap({ status: "Submitted" });
    const result = applyTransition(cap, "Issued");
    assert.equal(result.ok, false);
  });

  it("blocks Issued when unpaid active fees exist", () => {
    const cap = createCap({
      status: "Approved",
      fees: [
        { code: "BASE", amount: 100, status: "INVOICED" },
        { code: "OLD", amount: 50, status: "VOIDED" },
      ],
    });
    const result = applyTransition(cap, "Issued");
    assert.equal(result.ok, false);
    assert.match(result.reason, /unpaid active fees/);
  });

  it("allows Issued when only voided fees remain unpaid-looking", () => {
    const cap = createCap({
      status: "Approved",
      fees: [{ code: "OLD", amount: 50, status: "VOIDED" }],
    });
    const result = applyTransition(cap, "Issued");
    assert.equal(result.ok, true);
    assert.equal(result.cap.status, "Issued");
  });
});
