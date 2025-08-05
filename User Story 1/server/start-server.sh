#!/bin/bash

# =======================================================================
# This script sets the SECRET_API_KEY environment variable and then
# starts the Node.js server.
#
# Usage: ./start_server.sh
#
# IMPORTANT: Replace 'server.js' with the actual name of your Node.js
#            server file if it's different.
# =======================================================================

# --- Configuration ---
# Set the secret API key.
# It's generally recommended to use a more secure method for production,
# such as a secrets management system, but for local development or
# simple cases, this works.
SECRET_API_KEY="GlobalBlue2025"
API_URL="https://localhost:3000/"
# Set the name of your Node.js server file.
SERVER_FILE="server.js"
PORT="3000"

# --- Script Logic ---

echo "Setting SECRET_API_KEY environment variable..."
export SECRET_API_KEY
export API_URL
export PORT

echo "Starting Node.js server: $SERVER_FILE"

# Execute the Node.js server.
# The 'exec' command replaces the current shell process with the Node.js process.
# This is often preferred for long-running processes like servers.
exec node "$SERVER_FILE"

# The script will not reach here if 'exec' is successful.
echo "Server process exited."