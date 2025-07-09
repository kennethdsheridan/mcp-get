import { LinearService } from './linear.js';
import { BaseService } from './base.js';

export class ServiceRegistry {
  constructor() {
    this.services = new Map();
    this.serviceClasses = {
      linear: LinearService
      // Add other services here as they are implemented
      // jira: JiraService,
      // github: GitHubService
    };
  }

  registerService(name, config) {
    const ServiceClass = this.serviceClasses[name];
    if (!ServiceClass) {
      throw new Error(`Unknown service: ${name}`);
    }

    const service = new ServiceClass(config);
    this.services.set(name, service);
    return service;
  }

  getService(name) {
    return this.services.get(name);
  }

  getAllServices() {
    return Array.from(this.services.values());
  }

  getAllTools() {
    const tools = [];
    for (const service of this.services.values()) {
      tools.push(...service.getTools());
    }
    return tools;
  }

  async executeServiceMethod(serviceName, methodName, args) {
    const service = this.getService(serviceName);
    if (!service) {
      throw new Error(`Service ${serviceName} not found`);
    }

    if (typeof service[methodName] !== 'function') {
      throw new Error(`Method ${methodName} not found on service ${serviceName}`);
    }

    return await service[methodName](...args);
  }
}

export { BaseService, LinearService };