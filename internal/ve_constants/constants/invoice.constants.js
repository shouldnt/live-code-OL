const INVOICE_STATUS = {
    PENDING: 1,
    SUCCESS: 3,
    VOID: 7,
    ERROR: 9,
    NOTICED: 11,
}
const CARD_TYPE = {
    INTERNATIONAL: 1,
    DOMESTIC: 3,
    QR: 5,
    TRANSFER: 7,
    CASH: 9,
}

module.exports = { INVOICE_STATUS, CARD_TYPE }
