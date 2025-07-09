# MCP-GET

A flexible Model Context Protocol server for accessing multiple task management and productivity services. MCP-GET provides a unified interface for AI assistants to interact with popular workplace tools through a consistent, extensible architecture.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure your services in the `.env` file:
   ```bash
   # Linear (currently supported)
   LINEAR_API_KEY=your_linear_api_key_here
   LINEAR_ENABLED=true
   
   # Notion
   NOTION_API_KEY=your_notion_integration_token
   NOTION_ENABLED=true
   
   # Slack
   SLACK_BOT_TOKEN=xoxb-your-slack-bot-token
   SLACK_ENABLED=true
   
   # GitHub
   GITHUB_API_KEY=your_github_personal_access_token
   GITHUB_ENABLED=true
   
   # Jira
   JIRA_API_KEY=your_jira_api_token
   JIRA_BASE_URL=https://yourcompany.atlassian.net
   JIRA_EMAIL=your.email@company.com
   JIRA_ENABLED=true
   
   # Asana
   ASANA_API_KEY=your_asana_personal_access_token
   ASANA_ENABLED=true
   
   # Trello
   TRELLO_API_KEY=your_trello_api_key
   TRELLO_TOKEN=your_trello_token
   TRELLO_ENABLED=true
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

### Jira Service (Planned)
- `jira_get_my_issues`: Get recent issues assigned to you
- `jira_get_issue_details`: Get detailed information about a specific issue
- `jira_search_issues`: Search for issues by title or description

### Asana Service (Planned)
- `asana_get_my_tasks`: Get recent tasks assigned to you
- `asana_get_task_details`: Get detailed information about a specific task
- `asana_search_tasks`: Search for tasks by title or description

### Trello Service (Planned)
- `trello_get_my_cards`: Get recent cards assigned to you
- `trello_get_card_details`: Get detailed information about a specific card
- `trello_search_cards`: Search for cards by title or description

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
Add this server to your Claude Code MCP configuration to access multiple productivity services directly in your conversations.

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
        "NOTION_API_KEY": "your_notion_integration_token"
      }
    }
  }
}
```

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

## Supported Services

**Currently Available:**
- **Linear**: Full support for issues, assignments, and search functionality

**Planned Integration:**
- **Notion**: Database queries, page management, and content search
- **Slack**: Message retrieval, thread navigation, and workspace search
- **GitHub**: Issues, pull requests, and repository management
- **Jira**: Ticket management, sprint planning, and project tracking
- **Asana**: Task management, project coordination, and team collaboration
- **Trello**: Card management, board organization, and workflow tracking

## Development Roadmap

MCP-GET is designed to become the definitive MCP server for workplace productivity tools. Our development roadmap includes:

### Phase 1: Core Services (Current)
- Linear integration (Complete)
- GitHub Issues and Pull Requests
- Jira Cloud and Server

### Phase 2: Communication Platforms
- Slack workspace integration
- Microsoft Teams connectivity
- Discord server management

### Phase 3: Knowledge Management
- Notion database and page access
- Confluence space management
- Obsidian vault integration

### Phase 4: Project Management
- Asana project and task management
- Trello board and card operations
- Monday.com workflow automation

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