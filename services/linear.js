import { LinearClient } from '@linear/sdk';

export class LinearService {
  constructor(config) {
    this.client = new LinearClient({
      apiKey: config.apiKey || process.env.LINEAR_API_KEY
    });
    this.serviceName = 'linear';
  }

  async getMyIssues(limit = 10) {
    const me = await this.client.viewer;
    const issues = await this.client.issues({
      filter: {
        assignee: { id: { eq: me.id } }
      },
      orderBy: 'updatedAt',
      first: limit
    });

    return issues.nodes.map(issue => ({
      id: issue.id,
      title: issue.title,
      description: issue.description,
      state: issue.state.name,
      priority: issue.priority,
      createdAt: issue.createdAt,
      updatedAt: issue.updatedAt,
      url: issue.url,
      service: this.serviceName
    }));
  }

  async getIssueDetails(issueId) {
    const issue = await this.client.issue(issueId);
    
    return {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      state: issue.state.name,
      priority: issue.priority,
      assignee: issue.assignee?.name,
      createdAt: issue.createdAt,
      updatedAt: issue.updatedAt,
      url: issue.url,
      labels: issue.labels.nodes.map(label => label.name),
      service: this.serviceName
    };
  }

  async searchIssues(query, limit = 10) {
    const issues = await this.client.issues({
      filter: {
        or: [
          { title: { containsIgnoreCase: query } },
          { description: { containsIgnoreCase: query } }
        ]
      },
      orderBy: 'updatedAt',
      first: limit
    });

    return issues.nodes.map(issue => ({
      id: issue.id,
      title: issue.title,
      description: issue.description,
      state: issue.state.name,
      priority: issue.priority,
      assignee: issue.assignee?.name,
      createdAt: issue.createdAt,
      updatedAt: issue.updatedAt,
      url: issue.url,
      service: this.serviceName
    }));
  }

  getTools() {
    return [
      {
        name: 'linear_get_my_issues',
        description: 'Get recent issues assigned to me from Linear',
        inputSchema: {
          type: 'object',
          properties: {
            limit: {
              type: 'number',
              description: 'Number of issues to return (default: 10)',
              default: 10
            }
          }
        }
      },
      {
        name: 'linear_get_issue_details',
        description: 'Get detailed information about a specific Linear issue',
        inputSchema: {
          type: 'object',
          properties: {
            issueId: {
              type: 'string',
              description: 'The ID of the issue to get details for',
              required: true
            }
          },
          required: ['issueId']
        }
      },
      {
        name: 'linear_search_issues',
        description: 'Search for Linear issues by title or description',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query',
              required: true
            },
            limit: {
              type: 'number',
              description: 'Number of results to return (default: 10)',
              default: 10
            }
          },
          required: ['query']
        }
      }
    ];
  }
}