import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server configuration
  server: {
    name: 'mcp-get',
    version: '1.0.0'
  },

  // Service configurations
  services: {
    linear: {
      enabled: process.env.LINEAR_ENABLED !== 'false',
      apiKey: process.env.LINEAR_API_KEY,
      config: {
        // Additional Linear-specific configuration
      }
    }
    // Add other services here as they are implemented
    // jira: {
    //   enabled: process.env.JIRA_ENABLED !== 'false',
    //   apiKey: process.env.JIRA_API_KEY,
    //   baseUrl: process.env.JIRA_BASE_URL,
    //   config: {}
    // },
    // github: {
    //   enabled: process.env.GITHUB_ENABLED !== 'false',
    //   apiKey: process.env.GITHUB_API_KEY,
    //   config: {}
    // }
  }
};

export function getEnabledServices() {
  return Object.entries(config.services)
    .filter(([_, serviceConfig]) => serviceConfig.enabled && serviceConfig.apiKey)
    .map(([serviceName, serviceConfig]) => ({ name: serviceName, config: serviceConfig }));
}