const schemaObjectId = {
    type: 'string',
    minLength: 24,
    maxLength: 24,
    pattern: '^[0-9a-fA-F]{24}$',
}

module.exports = { schemaObjectId }
