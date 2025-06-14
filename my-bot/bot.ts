import { Bot } from "grammy";
import { Menu } from "@grammyjs/menu";
// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot("8013292423:AAGzYTUo25SsgN_Hvrul8pRyMszA0YssG9o"); // <-- put your bot token between the ""

const menu = new Menu("main-menu");
menu.text("A", (ctx) => ctx.reply("You clicked A!")).row()
    .text("B", (ctx) => ctx.reply("You clicked B!"))

bot.use(menu)

bot.command('start', async ctx => {
  // Send the menu:
  await ctx.reply('Check out this menu:', {
    reply_markup: menu
  })
})







// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.

// bot.command("start", (ctx) => ctx.react("😍"));
// // bot.on("message", (ctx) => ctx.react("👍"));

// bot.on("message:voice", async (ctx) => {
//   const voice = ctx.msg.voice;

//   const duration = voice.duration; // in seconds
//   await ctx.reply(`Your voice message is ${duration} seconds long.`);

//   const fileId = voice.file_id;
//   await ctx.reply("The file identifier of your voice message is: " + fileId);

//   const file = await ctx.getFile(); // valid for at least 1 hour
//   const path = file.file_path; // file path on Bot API server
//   await ctx.reply("Download your own file again: " + path);
// });

// // bot.api.sendMessage("959044894", "Hello from grammY!, Welcome to the Telegram bootcamp!");

// // bot.api.sendMessage(
// //   959044894,
// //   "*Hi\\!* _Welcome_ to [grammY](https://grammy.dev)\\.",
// //   { parse_mode: "MarkdownV2" },
// // );

// // bot.api.sendMessage(
// //   959044894,
// //   '<b>Hi!</b> <i>Welcome</i> to <a href="https://grammy.dev">grammY</a>.',
// //   { parse_mode: "HTML" },
// // );
// // // Handle the /start command.
// // bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
// bot.command(["start", "help"], async (ctx) => {
//   await ctx.reply("Hi! I can only read messages that explicitly reply to me!", {
//     // Make Telegram clients automatically show a reply interface to the user.
//     reply_markup: { force_reply: true },
//   });
// });
// bot.command("help", (ctx) => ctx.reply("How can I help you?, type /start to see the welcome message."));
// bot.command("surprise", (ctx) => {
//      const emojis = ["😃", "🎉", "🚀", "🌟", "💡"];
//      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
//      console.log(ctx);
//      ctx.reply(`Here's a surprise for you: ${randomEmoji}`);
// })

// bot.hears("ping", async (ctx) => {
//   // `reply` is an alias for `sendMessage` in the same chat (see next section).
//   await ctx.reply("pong", {
//     // `reply_parameters` specifies the actual reply feature.
//     reply_parameters: { message_id: ctx.msg.message_id },
//   });
// });

// bot.on("edited_message", async (ctx) => {
//    await ctx.reply("You edited a message!", {
//         reply_parameters: { message_id: ctx.editedMessage.message_id}
//     })
// })

// bot.on("message:entities", async (ctx) => {
//   // Get all the entities.
//   const entities = ctx.entities();

//   // Get the first entity's text.
//   entities[0].text;

//   // Get email entities.
//   const emails = ctx.entities("email");
//   console.log(emails);

//   // Get phone and email entities.
//   const phonesAndEmails = ctx.entities(["email", "phone_number"]);
//   console.log(phonesAndEmails);
// });


// // Handle other messages.
// bot.on("message", (ctx) => ctx.reply("Got another message!"));


// // Now that you specified how to handle messages, you can start your bot.
// // This will connect to the Telegram servers and wait for messages.

// // Start the bot.
// bot.start();