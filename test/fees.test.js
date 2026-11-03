const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { activeFees, sumActiveFees, hasUnpaidActiveFees } = require("../src/fees");

describe("fee status guards", () => {
  const fees = [
    { code: "BASE", amount: 100, status: "INVOICED" },
    { code: "PLAN", amount: 50, status: "PAID" },
    { code: "OLD", amount: 999, status: "VOIDED" },
    { code: "ADJ", amount: 200, status: "CREDITED" },
  ];

  it("skips voided and credited", () => {
    const active = activeFees(fees);
    assert.equal(active.length, 2);
    assert.equal(sumActiveFees(fees), 150);
  });

  it("detects unpaid active fees", () => {
    assert.equal(hasUnpaidActiveFees(fees), true);
    assert.equal(hasUnpaidActiveFees([{ amount: 10, status: "PAID" }]), false);
    assert.equal(hasUnpaidActiveFees([{ amount: 10, status: "VOIDED" }]), false);
  });
});
