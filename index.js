#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { config, getEnabledServices } from './config.js';
import { ServiceRegistry } from './services/index.js';

const server = new Server(
  {
    name: config.server.name,
    version: config.server.version,
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

const serviceRegistry = new ServiceRegistry();

// Initialize enabled services
const enabledServices = getEnabledServices();
for (const { name, config: serviceConfig } of enabledServices) {
  try {
    serviceRegistry.registerService(name, serviceConfig);
    console.error(`✓ Registered ${name} service`);
  } catch (error) {
    console.error(`✗ Failed to register ${name} service: ${error.message}`);
  }
}

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: serviceRegistry.getAllTools()
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    // Parse service name from tool name (e.g., 'linear_get_my_issues' -> 'linear')
    const [serviceName, ...methodParts] = name.split('_');
    const methodName = methodParts.join('_');
    
    const service = serviceRegistry.getService(serviceName);
    if (!service) {
      throw new Error(`Service ${serviceName} not found`);
    }

    let result;
    switch (methodName) {
      case 'get_my_issues':
        result = await service.getMyIssues(args.limit);
        break;
      case 'get_issue_details':
        result = await service.getIssueDetails(args.issueId);
        break;
      case 'search_issues':
        result = await service.searchIssues(args.query, args.limit);
        break;
      default:
        throw new Error(`Unknown method: ${methodName}`);
    }

    return service.formatResponse(result);
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`
        }
      ],
      isError: true
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`MCP-GET server running on stdio with ${serviceRegistry.getAllServices().length} services`);
}

main().catch(console.error);