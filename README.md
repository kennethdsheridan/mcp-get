# MCP-GET

A flexible [Model Context Protocol](https://modelcontextprotocol.io/) server for accessing multiple task management and productivity services. MCP-GET provides a unified interface for AI assistants to interact with popular workplace tools through a consistent, extensible architecture.

## About the Model Context Protocol

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) is an open standard that enables AI assistants to securely connect to external data sources and tools. Developed by [Anthropic](https://anthropic.com/), MCP provides a standardized way for AI systems to access real-time information and perform actions across different services.

**Key Resources:**
- [MCP Official Documentation](https://modelcontextprotocol.io/)
- [Anthropic MCP Guide](https://docs.anthropic.com/en/docs/build-with-claude/computer-use)
- [MCP Specification](https://spec.modelcontextprotocol.io/)
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/sdk)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure your services in the `.env` file:
   ```bash
   # Linear (currently supported)
   # Get your API key: https://linear.app/settings/api
   LINEAR_API_KEY=your_linear_api_key_here
   LINEAR_ENABLED=true
   
   # Notion
   # Create integration: https://developers.notion.com/docs/create-a-notion-integration
   NOTION_API_KEY=your_notion_integration_token
   NOTION_ENABLED=true
   
   # Slack
   # Create app: https://api.slack.com/apps
   SLACK_BOT_TOKEN=xoxb-your-slack-bot-token
   SLACK_ENABLED=true
   
   # GitHub
   # Generate token: https://github.com/settings/tokens
   GITHUB_API_KEY=your_github_personal_access_token
   GITHUB_ENABLED=true
   
   # Plaid
   # Get credentials: https://dashboard.plaid.com/developers/keys
   PLAID_CLIENT_ID=your_plaid_client_id
   PLAID_SECRET=your_plaid_secret_key
   PLAID_ENV=sandbox  # or development, production
   PLAID_ENABLED=true
   ```

3. Run the server:
   ```bash
   npm start
   ```

## Available Tools

### Linear Service
- `linear_get_my_issues`: Get recent issues assigned to you from Linear
- `linear_get_issue_details`: Get detailed information about a specific Linear issue
- `linear_search_issues`: Search for Linear issues by title or description

### Notion Service (Planned)
- `notion_get_my_pages`: Get recent pages you have access to
- `notion_get_page_details`: Get detailed information about a specific page
- `notion_search_pages`: Search for pages by title or content

### Slack Service (Planned)
- `slack_get_my_messages`: Get recent messages from your conversations
- `slack_get_thread_details`: Get detailed information about a specific thread
- `slack_search_messages`: Search for messages by content or user

### GitHub Service (Planned)
- `github_get_my_issues`: Get recent issues assigned to you
- `github_get_issue_details`: Get detailed information about a specific issue
- `github_search_issues`: Search for issues by title or description

### Plaid Service (Planned)
- `plaid_get_accounts`: Get linked bank accounts and balances
- `plaid_get_transactions`: Get recent transactions across accounts
- `plaid_search_transactions`: Search transactions by merchant, amount, or description

## Architecture

MCP-GET uses a service-based architecture that makes it easy to add new productivity services:

```
mcp-get/
├── index.js              # Main MCP server
├── config.js             # Service configuration
└── services/
    ├── base.js           # Base service class
    ├── linear.js         # Linear service implementation
    ├── index.js          # Service registry
    └── [future services] # Jira, GitHub, etc.
```

Each service implements the same interface:
- `getMyIssues(limit)`: Get user's assigned items
- `getIssueDetails(id)`: Get detailed item information
- `searchIssues(query, limit)`: Search items by text

## Integration with AI Assistants

MCP-GET integrates seamlessly with AI assistants that support the Model Context Protocol:

### Claude Code
[Claude Code](https://claude.ai/code) is Anthropic's official CLI tool that supports MCP servers. Add MCP-GET to your Claude Code configuration to access multiple productivity services directly in your conversations.

**Claude Code Resources:**
- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Claude Code Installation Guide](https://docs.anthropic.com/en/docs/claude-code/quickstart)
- [Claude Code MCP Integration](https://docs.anthropic.com/en/docs/claude-code/mcp)

### Configuration Example
```json
{
  "mcpServers": {
    "mcp-get": {
      "command": "node",
      "args": ["path/to/mcp-get/index.js"],
      "env": {
        "LINEAR_API_KEY": "your_linear_api_key",
        "GITHUB_API_KEY": "your_github_token",
        "NOTION_API_KEY": "your_notion_integration_token",
        "SLACK_BOT_TOKEN": "your_slack_bot_token",
        "PLAID_CLIENT_ID": "your_plaid_client_id",
        "PLAID_SECRET": "your_plaid_secret"
      }
    }
  }
}
```

### Other Compatible AI Assistants
- [Cline](https://github.com/cline/cline) - VS Code extension with MCP support
- [Continue](https://continue.dev/) - AI coding assistant with MCP integration
- Custom implementations using the [MCP SDK](https://github.com/modelcontextprotocol/sdk)

### Benefits
- **Unified Interface**: Consistent command patterns across all services
- **Contextual Awareness**: AI assistants can cross-reference data between services
- **Productivity Enhancement**: Streamlined workflows without switching between tools
- **Extensible Architecture**: Easy to add new services as your workflow evolves

## Adding New Services

1. Create a new service file in `services/` (e.g., `jira.js`)
2. Extend the `BaseService` class
3. Implement the required methods
4. Add the service to the registry in `services/index.js`
5. Add configuration in `config.js`

See `services/linear.js` for a complete example.

**Development Resources:**
- [MCP Server Development Guide](https://modelcontextprotocol.io/docs/concepts/servers)
- [Service Integration Examples](https://github.com/modelcontextprotocol/servers)
- [MCP SDK TypeScript Documentation](https://github.com/modelcontextprotocol/sdk)

## Supported Services

**Currently Available:**
- **Linear**: Full support for issues, assignments, and search functionality

**Planned Integration:**
- **Notion**: Database queries, page management, and content search
- **Slack**: Message retrieval, thread navigation, and workspace search
- **GitHub**: Issues, pull requests, and repository management
- **Plaid**: Banking data access, transaction history, and account management

## Development Roadmap

MCP-GET is designed to become the definitive MCP server for workplace productivity tools. Our development roadmap includes:

### Phase 1: Core Services (Current)
- Linear integration (Complete)
- GitHub Issues and Pull Requests
- Plaid financial data access

### Phase 2: Communication Platforms
- Slack workspace integration
- Microsoft Teams connectivity
- Discord server management

### Phase 3: Knowledge Management
- Notion database and page access
- Confluence space management
- Obsidian vault integration

### Phase 4: Financial & Analytics
- Enhanced Plaid transaction analysis
- Banking workflow automation
- Financial reporting and insights

## Contributing

We welcome contributions to expand service support and improve functionality. To add support for a new service:

1. **Create a service class** extending `BaseService` in the `services/` directory
2. **Implement required methods** following the established interface pattern
3. **Add configuration options** to `config.js` with appropriate environment variables
4. **Update the service registry** in `services/index.js`
5. **Add comprehensive tests** and update documentation

### Code Quality Standards
- Follow existing architectural patterns
- Implement proper error handling and logging
- Maintain consistent API response formats
- Include comprehensive JSDoc documentation

## API Documentation

### Service API References
- [Linear API Documentation](https://developers.linear.app/docs/graphql/working-with-the-graphql-api)
- [Notion API Documentation](https://developers.notion.com/reference/intro)
- [Slack Web API Documentation](https://api.slack.com/web)
- [GitHub REST API Documentation](https://docs.github.com/en/rest)
- [Plaid API Documentation](https://plaid.com/docs/api/)

### MCP Development Resources
- [MCP Server Development Guide](https://modelcontextprotocol.io/docs/concepts/servers)
- [MCP SDK Reference](https://github.com/modelcontextprotocol/sdk)
- [MCP Community Examples](https://github.com/modelcontextprotocol/servers)
- [Anthropic MCP Best Practices](https://docs.anthropic.com/en/docs/build-with-claude/computer-use)

## Support and Community

- **Issues**: Report bugs and request features on [GitHub Issues](https://github.com/kennethdsheridan/mcp-get/issues)
- **Discussions**: Join the conversation in [GitHub Discussions](https://github.com/kennethdsheridan/mcp-get/discussions)
- **MCP Community**: Connect with other developers in the [MCP Discord](https://discord.gg/modelcontextprotocol)
- **Anthropic Support**: Get help with Claude Code at [Anthropic Support](https://support.anthropic.com/)

## License

MIT License - see [LICENSE](LICENSE) for details.