/**
 * Tests for configuration module
 */

describe('Config Module', () => {
    let originalEnv;

    beforeEach(() => {
        // Save original environment
        originalEnv = process.env;
        
        // Clear module cache
        jest.resetModules();
    });

    afterEach(() => {
        // Restore original environment
        process.env = originalEnv;
    });

    describe('validateConfig', () => {
        test('should throw error when DISCORD_TOKEN is missing', () => {
            process.env = { ...originalEnv };
            delete process.env.DISCORD_TOKEN;

            const { validateConfig } = require('../src/config');
            
            expect(() => validateConfig()).toThrow('DISCORD_TOKEN is required');
        });

        test('should not throw when DISCORD_TOKEN is present', () => {
            process.env = {
                ...originalEnv,
                DISCORD_TOKEN: 'test_token_123',
            };

            const { validateConfig } = require('../src/config');
            
            expect(() => validateConfig()).not.toThrow();
        });
    });

    describe('config object', () => {
        test('should have default prefix when BOT_PREFIX is not set', () => {
            process.env = {
                ...originalEnv,
                DISCORD_TOKEN: 'test_token_123',
            };
            delete process.env.BOT_PREFIX;

            const { config } = require('../src/config');
            
            expect(config.prefix).toBe('!');
        });

        test('should use custom prefix when BOT_PREFIX is set', () => {
            process.env = {
                ...originalEnv,
                DISCORD_TOKEN: 'test_token_123',
                BOT_PREFIX: '$',
            };

            const { config } = require('../src/config');
            
            expect(config.prefix).toBe('$');
        });

        test('should have default environment when NODE_ENV is not set', () => {
            process.env = {
                ...originalEnv,
                DISCORD_TOKEN: 'test_token_123',
            };
            delete process.env.NODE_ENV;

            const { config } = require('../src/config');
            
            expect(config.environment).toBe('development');
        });
    });

    describe('helper functions', () => {
        test('isDevelopment should return true in development', () => {
            process.env = {
                ...originalEnv,
                DISCORD_TOKEN: 'test_token_123',
                NODE_ENV: 'development',
            };

            const { isDevelopment } = require('../src/config');
            
            expect(isDevelopment()).toBe(true);
        });

        test('isProduction should return true in production', () => {
            process.env = {
                ...originalEnv,
                DISCORD_TOKEN: 'test_token_123',
                NODE_ENV: 'production',
            };

            const { isProduction } = require('../src/config');
            
            expect(isProduction()).toBe(true);
        });

        test('getConfig should return config object', () => {
            process.env = {
                ...originalEnv,
                DISCORD_TOKEN: 'test_token_123',
            };

            const { getConfig } = require('../src/config');
            const config = getConfig();
            
            expect(config).toHaveProperty('token');
            expect(config).toHaveProperty('prefix');
            expect(config).toHaveProperty('environment');
        });
    });
});
