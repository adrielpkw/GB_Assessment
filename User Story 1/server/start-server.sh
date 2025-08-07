#!/bin/bash

# =======================================================================
# This script sets the SECRET_API_KEY, API_URL, PORT environment variable and then
# starts the Node.js server.
#
# Usage: ./start_server.sh
#
# IMPORTANT: Replace 'server.js' with the actual name of your Node.js
#            server file if it's different.
# =======================================================================

# --- Configuration ---
# Set the secret API key.
SECRET_API_KEY="GlobalBlue2025"
# Set the PORT which will be used.
PORT="3000"
# Set the API URL.
API_URL="https://localhost:3000/"
# Set the name of your Node.js server file.
SERVER_FILE="server.js"


# --- Script Logic ---

echo "Setting environment variables..."
export SECRET_API_KEY
export API_URL
export PORT

echo "Starting Node.js server: $SERVER_FILE"

# Execute the Node.js server.
# The 'exec' command replaces the current shell process with the Node.js process.
exec node "$SERVER_FILE"

# The script will not reach here if 'exec' is successful.
echo "Server process exited."
