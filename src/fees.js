/**
 * Fee helpers. Active business logic ignores VOIDED and CREDITED.
 */

const INACTIVE = { VOIDED: true, CREDITED: true };

function isActiveFee(fee) {
  if (!fee || typeof fee !== "object") {
    return false;
  }
  const status = String(fee.status || "").toUpperCase();
  return !INACTIVE[status];
}

function activeFees(fees) {
  return (fees || []).filter(isActiveFee);
}

function sumActiveFees(fees) {
  return activeFees(fees).reduce(function (total, fee) {
    const amount = Number(fee.amount);
    return total + (Number.isFinite(amount) ? amount : 0);
  }, 0);
}

function hasUnpaidActiveFees(fees) {
  return activeFees(fees).some(function (fee) {
    const status = String(fee.status || "").toUpperCase();
    return status === "NEW" || status === "INVOICED";
  });
}

module.exports = {
  isActiveFee,
  activeFees,
  sumActiveFees,
  hasUnpaidActiveFees,
};
