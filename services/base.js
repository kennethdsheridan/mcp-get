export class BaseService {
  constructor(config) {
    this.config = config;
    this.serviceName = 'base';
  }

  // Abstract methods that services should implement
  async getMyIssues(limit = 10) {
    throw new Error('getMyIssues method must be implemented by service');
  }

  async getIssueDetails(issueId) {
    throw new Error('getIssueDetails method must be implemented by service');
  }

  async searchIssues(query, limit = 10) {
    throw new Error('searchIssues method must be implemented by service');
  }

  getTools() {
    throw new Error('getTools method must be implemented by service');
  }

  // Common utility methods
  formatResponse(data) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(data, null, 2)
        }
      ]
    };
  }

  formatError(error) {
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
}