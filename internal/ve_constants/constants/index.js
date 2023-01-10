module.exports = {
    TIME: {
        ONE_DAY_SECOND: 60 * 60 * 24,
        ONE_HOUR_SECOND: 60 * 60,
        ONE_DAY_MILISECOND: 1000 * 60 * 60 * 24,
        ONE_HOUR_MILISECOND: 1000 * 60 * 60,
    },
    MAIL_TEMPLATE: {
        ['user-verification']: 'user-verification',
        ['user-verification-success']: 'user-verification-success',
        ['user-reset-password']: 'user-reset-password',
    },
    ...require('./packages.constants'),
    ...require('./invoice.constants'),
    ...require('./payment.constants'),
    ...require('./transaction.constants'),
    ...require('./user-package.constants'),
    ...require('./point.constants'),
    ...require('./allintitle.constants'),
    ...require('./proxies.constants'),
}
