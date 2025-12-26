/**
 * Discord Bot - Main Entry Point
 * 
 * This is the main entry point for the Discord bot. It handles:
 * - Client initialization with required intents
 * - Configuration loading and validation
 * - Event handling (ready, error)
 * - Graceful shutdown
 * - Command collection setup
 * 
 * @module index
 */

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { config, validateConfig } = require('./config');

// Validate configuration before starting
try {
    validateConfig();
} catch (error) {
    console.error('❌ Configuration Error:', error.message);
    console.error('Please create a .env file with your Discord bot token.');
    console.error('See .env.example for reference.');
    process.exit(1);
}

/**
 * Create Discord client with required intents
 * Intents determine what events the bot can receive from Discord
 */
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,           // Required for guild-related events
        GatewayIntentBits.GuildMessages,     // Required to receive messages
        GatewayIntentBits.MessageContent,    // Required to read message content
        GatewayIntentBits.GuildMembers,      // Required for member join/leave events
    ],
});

// Initialize commands collection for dynamic command loading
client.commands = new Collection();

/**
 * Ready Event Handler
 * Fires once when the bot successfully connects to Discord
 */
client.once('ready', () => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Discord bot is online!');
    console.log(`📝 Logged in as: ${client.user.tag}`);
    console.log(`🆔 Bot ID: ${client.user.id}`);
    console.log(`🔧 Prefix: ${config.prefix}`);
    console.log(`🌍 Environment: ${config.environment}`);
    console.log(`🏠 Servers: ${client.guilds.cache.size}`);
    console.log(`👥 Users: ${client.users.cache.size}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // Set bot presence/status
    client.user.setPresence({
        activities: [{ name: `${config.prefix}help | Built by AI` }],
        status: 'online',
    });
});

/**
 * Error Event Handler
 * Handles Discord client errors
 */
client.on('error', (error) => {
    console.error('❌ Discord client error:', error);
});

/**
 * Warning Event Handler
 * Logs Discord client warnings
 */
client.on('warn', (warning) => {
    console.warn('⚠️ Discord client warning:', warning);
});

/**
 * Debug Event Handler (only in development)
 * Logs debug information for troubleshooting
 */
if (config.environment === 'development') {
    client.on('debug', (info) => {
        console.log('🐛 Debug:', info);
    });
}

/**
 * Process Error Handlers
 * Handle uncaught errors to prevent crashes
 */
process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled promise rejection:', error);
});

process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught exception:', error);
    process.exit(1);
});

/**
 * Graceful Shutdown Handlers
 * Ensure the bot disconnects properly on exit
 */
const shutdown = async (signal) => {
    console.log(`\n🛑 Received ${signal}, shutting down bot gracefully...`);
    try {
        await client.destroy();
        console.log('✅ Bot disconnected successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error during shutdown:', error);
        process.exit(1);
    }
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

/**
 * Login to Discord
 * Initiates the connection to Discord using the bot token
 */
console.log('🚀 Starting Discord bot...');
console.log(`📂 Environment: ${config.environment}`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

client.login(config.token).catch((error) => {
    console.error('❌ Failed to login to Discord:', error.message);
    console.error('Please check your DISCORD_TOKEN in the .env file.');
    console.error('\nCommon issues:');
    console.error('- Token is invalid or expired');
    console.error('- Token is missing from .env file');
    console.error('- Bot intents are not enabled in Discord Developer Portal');
    process.exit(1);
});

// Export client and config for use in other modules
module.exports = { client, config };
