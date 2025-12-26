/**
 * Tests for Discord bot main entry point
 */

describe('Discord Bot Index', () => {
    let originalEnv;

    beforeEach(() => {
        // Save original environment
        originalEnv = process.env;
        
        // Mock environment variables
        process.env = {
            ...originalEnv,
            DISCORD_TOKEN: 'test_token_123',
            BOT_PREFIX: '!',
            NODE_ENV: 'test',
        };

        // Clear module cache to allow re-requiring with new env
        jest.resetModules();
    });

    afterEach(() => {
        // Restore original environment
        process.env = originalEnv;
    });

    test('should export client and config', () => {
        // Mock discord.js to prevent actual Discord connection
        jest.mock('discord.js', () => ({
            Client: jest.fn().mockImplementation(() => ({
                commands: new Map(),
                once: jest.fn(),
                on: jest.fn(),
                login: jest.fn().mockResolvedValue('Logged in'),
                destroy: jest.fn(),
                user: { tag: 'TestBot#0000' },
                guilds: { cache: { size: 0 } },
            })),
            GatewayIntentBits: {
                Guilds: 1,
                GuildMessages: 2,
                MessageContent: 4,
                GuildMembers: 8,
            },
            Collection: Map,
        }));

        const index = require('../src/index.js');
        
        expect(index).toHaveProperty('client');
        expect(index).toHaveProperty('config');
        expect(index.config).toHaveProperty('token');
        expect(index.config).toHaveProperty('prefix');
    });

    test('config should have correct default values', () => {
        const { config } = require('../src/index.js');
        
        expect(config.prefix).toBe('!');
        expect(config.environment).toBe('test');
    });
});
