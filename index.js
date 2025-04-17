const cors = require('cors');
app.use(cors());
const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");
const app = express();
const PORT = process.env.PORT || 3000;

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

let memberCount = 0;
const GUILD_ID = "1254747357225156690"; // Replace this with your actual Discord Server ID

client.once("ready", async () => {
  console.log("Bot is online!");
  await updateMemberCount();
});

// Function to fetch and update member count
async function updateMemberCount() {
  try {
    const guild = await client.guilds.fetch(GUILD_ID);
    const stats = await guild.fetch();
    memberCount = stats.memberCount;
    console.log(`Updated member count: ${memberCount}`);
  } catch (err) {
    console.error("Error fetching guild member count:", err);
  }
}

// Refresh member count every 5 minutes
setInterval(updateMemberCount, 5 * 60 * 1000);

// API endpoint
app.get("/membercount", (req, res) => {
  res.json({ memberCount });
});

client.login(process.env.DISCORD_TOKEN);
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
