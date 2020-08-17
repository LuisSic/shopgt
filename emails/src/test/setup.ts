jest.mock('../nats-wrapper.ts');
process.env.SENGRID_API_KEY = '';
beforeEach(async () => {
  jest.clearAllMocks();
});
