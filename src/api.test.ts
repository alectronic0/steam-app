import { API_ENDPOINTS } from './api';

describe('API Configuration', () => {
  it('should have correct endpoint functions', () => {
    expect(API_ENDPOINTS.compare).toBeDefined();
    expect(API_ENDPOINTS.health).toBeDefined();
  });

  it('should generate correct compare endpoint URL', () => {
    const userId1 = '123456789';
    const userId2 = '987654321';
    const url = API_ENDPOINTS.compare(userId1, userId2);
    expect(url).toContain(userId1);
    expect(url).toContain(userId2);
    expect(url).toContain('/user');
  });

  it('should include health endpoint', () => {
    expect(API_ENDPOINTS.health).toContain('/health');
  });
});
