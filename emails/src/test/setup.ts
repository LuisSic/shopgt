jest.mock('../nats-wrapper.ts');
process.env.SENGRID_API_KEY = '';
process.env.SENGRID_TEMPLATE = '';
process.env.SENGRD_FROM = '';
beforeEach(async () => {
  jest.clearAllMocks();
});
