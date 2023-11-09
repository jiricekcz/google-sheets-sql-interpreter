function executeIdentifier(node: SQLIdentifier, context: Context): ExecutionResult {
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
  if (context.has(node.value)) {
    return {
      context: {
        tables: {},
        aliases: {}
      },
      result: context.get(node.value)!
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