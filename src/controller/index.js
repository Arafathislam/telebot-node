const { handleMessage } = require("./lib/telegram");
const { errorHandler } = require("./lib/helper");

async function handler(req, method) {
    try {
        if (method === "GET") {
            return  "Hello Get";
        }

        const { body } = req;
        if (body && body.message) {
            const messageObj = body.message;
            console.log(messageObj);
            const result = await handleMessage(messageObj);
            // Log or return more relevant information based on the result
            return "Success";
        }

        return "Unknown request";
    } catch (error) {
        errorHandler(error, "mainIndexHandler");
        return { error: "Internal server error" };
    }
}

module.exports = { handler };
