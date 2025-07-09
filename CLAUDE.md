# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MCP-GET is a flexible Model Context Protocol (MCP) server that provides integration with multiple task management and productivity services. The server uses a service-based architecture that makes it easy to add new services while maintaining a consistent interface for AI assistants.

## Architecture

The codebase uses a modular service-based architecture:

1. **Main Server (`index.js`)**: Core MCP server using `@modelcontextprotocol/sdk` with stdio transport
2. **Service Registry (`services/index.js`)**: Manages service registration and tool routing
3. **Base Service (`services/base.js`)**: Abstract base class defining the service interface
4. **Individual Services**: Each service (e.g., `services/linear.js`) implements the base interface
5. **Configuration (`config.js`)**: Centralized service configuration and environment management

### Service Architecture Pattern

Each service implements three core methods:
- `getMyIssues(limit)`: Get user's assigned items
- `getIssueDetails(id)`: Get detailed item information  
- `searchIssues(query, limit)`: Search items by text

Tools are namespaced by service: `{service}_{method}` (e.g., `linear_get_my_issues`)

## Environment Configuration

Services are configured via environment variables in `.env`:

```bash
# Linear service
LINEAR_API_KEY=your_linear_api_key_here
LINEAR_ENABLED=true

# Future services (examples)
# JIRA_API_KEY=your_jira_api_key
# JIRA_BASE_URL=https://yourcompany.atlassian.net
# JIRA_ENABLED=true

# GITHUB_API_KEY=your_github_token
# GITHUB_ENABLED=true
```

Generate Linear API keys at https://linear.app/settings/api when needed.

## Development Commands

```bash
# Install dependencies
npm install

# Start the server
npm start

# Run in development mode with auto-reload
npm run dev
```

## Key Implementation Details

- **Service Discovery**: Only enabled services with valid API keys are registered
- **Tool Routing**: Tool names are parsed to extract service and method (`serviceName_methodName`)
- **Error Handling**: Consistent error formatting across all services via `BaseService.formatError()`
- **Response Formatting**: Standardized JSON response formatting via `BaseService.formatResponse()`
- **Extensibility**: New services can be added by creating a service class and updating the registry

## Current Tool Patterns

### Linear Service
- `linear_get_my_issues`: Returns up to 10 recent issues by default, ordered by `updatedAt`
- `linear_get_issue_details`: Requires an `issueId` parameter and includes labels in the response
- `linear_search_issues`: Case-insensitive search across title and description fields

## Adding New Services

To add a new service:

1. Create `services/{serviceName}.js` extending `BaseService`
2. Implement required methods: `getMyIssues()`, `getIssueDetails()`, `searchIssues()`, `getTools()`
3. Add service to `serviceClasses` in `services/index.js`
4. Add configuration in `config.js`
5. Add environment variables for API keys and settings

## Troubleshooting

- **Authentication errors**: Verify API keys are valid and have appropriate permissions
- **Service not found errors**: Check that the service is enabled and properly registered
- **Tool not found errors**: Ensure the MCP client configuration includes this server
- **Method not found errors**: Verify the tool name format matches `{service}_{method}`