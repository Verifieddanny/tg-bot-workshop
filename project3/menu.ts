import { Bot, Context, session, SessionFlavor } from "grammy";
import { Menu, MenuRange } from "@grammyjs/menu";

/** This is how the dishes look that this bot is managing */
interface Dish {
  id: string;
  name: string;
}
interface SessionData {
  favoriteIds: string[];
}
type MyContext = Context & SessionFlavor<SessionData>;

const dishDatabase: Dish[] = [
  { id: "1", name: "Pizza 🍕" },
  { id: "2", name: "Burger 🍔" },
  { id: "3", name: "Pasta 🍝" },
  { id: "4", name: "Salad 🥗" },
  { id: "5", name: "Sushi 🍣" },
  { id: "6", name: "Tacos 🌮" },
  { id: "7", name: "Steak 🥩" },
  { id: "8", name: "Ice Cream 🍦" },
  { id: "9", name: "Sandwich 🥪" },
  { id: "10", name: "Soup 🍜" },
  { id: "11", name: "Dumplings 🥟" },
  { id: "12", name: "Curry 🍛" },
  { id: "13", name: "Fried Rice 🍚" },
  { id: "14", name: "Grilled Cheese 🧀" },
];

const bot = new Bot<MyContext>(
 process.env.BOT_TOKEN
);
bot.use(
  session({
    initial(): SessionData {
      return { favoriteIds: [] };
    },
  })
);

const mainText = "Pick a dish to rate it!";
const mainMenu = new Menu<MyContext>("food");
mainMenu.dynamic(() => {
  const range = new MenuRange<MyContext>();
  for (const dish of dishDatabase) {
    range
      .submenu({ text: dish.name, payload: dish.id }, "dish", (ctx) =>
        ctx.editMessageText(dishText(dish.name), { parse_mode: "HTML" })
      )
      .row();
  }
  return range;
});

const dishText = (dish: string) => `<b>${dish}</b>\n\nRate this dish!`;

const dishMenu = new Menu<MyContext>("dish");
dishMenu.dynamic((ctx) => {
  const dish = ctx.match;
  if (typeof dish !== "string") throw new Error("No dish chosen");
  return createDishMenu(dish);
});

function createDishMenu(dish: string) {
  return new MenuRange<MyContext>()
    .text(
      {
        text: (ctx) =>
          ctx.session.favoriteIds.includes(dish) ? "Yummy! ❤️" : "Meh 🤷",
        payload: dish,
      },
      (ctx) => {
        const set = new Set(ctx.session.favoriteIds);
        if (!set.delete(dish)) set.add(dish);
        ctx.session.favoriteIds = Array.from(set.values());
        ctx.menu.update();
      }
    )
    .row()
    .back({ text: "X Delete", payload: dish }, async (ctx) => {
      const index = dishDatabase.findIndex((d) => d.id === dish);
      dishDatabase.splice(index, 1);
      await ctx.editMessageText("Pick a dish to rate it!");
    })
    .row()
    .back({ text: "Back", payload: dish });
}

mainMenu.register(dishMenu);
bot.use(mainMenu);

bot.command("start", (ctx) => ctx.reply(mainText, { reply_markup: mainMenu }));
bot.command("help", async (ctx) => {
  const text =
    "Send /start to see and rate dishes. Send /fav to list your favorites!";
  await ctx.reply(text);
});
bot.command("fav", async (ctx) => {
  const favs = ctx.session.favoriteIds;
  if (favs.length === 0) {
    await ctx.reply("You have no favorites yet! Rate some dishes first.");
    return;
  }
  // ["1", "2", ...] 
  const names = favs
    .map((id) => dishDatabase.find((dish) => dish.id === id))
    .filter((dish): dish is Dish => dish !== undefined)
    .map((dish) => dish.name) //-> ["Pizza 🍕", "Burger 🍔", ...]
    .join("\n"); // "Pizza 🍕 
    // Burger 🍔 .
    // ..."
  await ctx.reply(`These are your favorite dishes:\n\n${names}`);
});

bot.catch(console.error.bind(console));

bot.start();
