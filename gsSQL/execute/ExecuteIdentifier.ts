function executeIdentifier(node: SQLIdentifier): ExecutionResult {
  const tables = getTableNames();
  if (tables.includes(node.value)) {
    return {
      context: {
        tables: {},
        aliases: {}
      },
      result: new SQLTable([...getTableRows(node.value)], node.value)
    }
  }
  return {
    context: {
      tables: {},
      aliases: {}
    },
    result: new SQLIdentifierValue(node.value)
  }
}