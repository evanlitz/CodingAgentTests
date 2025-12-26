/**
 * Configuration Module
 * Loads and validates environment variables for the Discord bot
 */

require('dotenv').config();

/**
 * Bot configuration object
 * @typedef {Object} BotConfig
 * @property {string} token - Discord bot token
 * @property {string} prefix - Command prefix (default: !)
 * @property {string} environment - Current environment (development/production)
 * @property {string} clientId - Discord application client ID (optional)
 */

const config = {
    // Discord bot token (required)
    token: process.env.DISCORD_TOKEN,
    
    // Command prefix
    prefix: process.env.BOT_PREFIX || '!',
    
    // Environment
    environment: process.env.NODE_ENV || 'development',
    
    // Optional: Discord application client ID for slash commands
    clientId: process.env.DISCORD_CLIENT_ID || '',
    
    // Optional: Guild ID for development (faster slash command registration)
    guildId: process.env.DISCORD_GUILD_ID || '',
};

/**
 * Validates required configuration values
 * @throws {Error} If required config values are missing
 */
function validateConfig() {
    const errors = [];

    if (!config.token) {
        errors.push('DISCORD_TOKEN is required');
    }

    if (errors.length > 0) {
        throw new Error(`Configuration validation failed:\n- ${errors.join('\n- ')}`);
    }
}

/**
 * Gets the full configuration object
 * @returns {BotConfig} The configuration object
 */
function getConfig() {
    return config;
}

/**
 * Checks if bot is running in development mode
 * @returns {boolean} True if in development mode
 */
function isDevelopment() {
    return config.environment === 'development';
}

/**
 * Checks if bot is running in production mode
 * @returns {boolean} True if in production mode
 */
function isProduction() {
    return config.environment === 'production';
}

module.exports = {
    config,
    validateConfig,
    getConfig,
    isDevelopment,
    isProduction,
};
