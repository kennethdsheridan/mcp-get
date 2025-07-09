# MCP-GET

A flexible Model Context Protocol server for accessing multiple task management and productivity services.

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
   
   # Future services (examples)
   # JIRA_API_KEY=your_jira_api_key
   # JIRA_BASE_URL=https://yourcompany.atlassian.net
   # JIRA_ENABLED=true
   
   # GITHUB_API_KEY=your_github_token
   # GITHUB_ENABLED=true
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

### Future Services
The architecture supports adding more services like:
- **Jira**: `jira_get_my_issues`, `jira_get_issue_details`, `jira_search_issues`
- **GitHub**: `github_get_my_issues`, `github_get_issue_details`, `github_search_issues`
- **Asana**: `asana_get_my_tasks`, `asana_get_task_details`, `asana_search_tasks`
- **Trello**: `trello_get_my_cards`, `trello_get_card_details`, `trello_search_cards`

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

## Usage with Claude Code

Add this server to your Claude Code MCP configuration to access multiple productivity services directly in your conversations.

## Adding New Services

1. Create a new service file in `services/` (e.g., `jira.js`)
2. Extend the `BaseService` class
3. Implement the required methods
4. Add the service to the registry in `services/index.js`
5. Add configuration in `config.js`

See `services/linear.js` for a complete example.

## Supported Services

- ✅ **Linear**: Full support for issues, assignments, and search
- 🔜 **Jira**: Planned
- 🔜 **GitHub Issues**: Planned
- 🔜 **Asana**: Planned
- 🔜 **Trello**: Planned

## Contributing

To add support for a new service:
1. Create a service class extending `BaseService`
2. Implement the required methods
3. Add configuration options
4. Update the service registry
5. Add tests and documentation