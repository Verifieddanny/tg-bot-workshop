"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var grammy_1 = require("grammy");
var menu_1 = require("@grammyjs/menu");
var dishDatabase = [
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
var bot = new grammy_1.Bot(process.env.BOT_TOKEN || "");
bot.use((0, grammy_1.session)({
    initial: function () {
        return { favoriteIds: [] };
    },
}));
var mainText = "Pick a dish to rate it!";
var mainMenu = new menu_1.Menu("food");
mainMenu.dynamic(function () {
    var range = new menu_1.MenuRange();
    var _loop_1 = function (dish) {
        range
            .submenu({ text: dish.name, payload: dish.id }, "dish", function (ctx) {
            return ctx.editMessageText(dishText(dish.name), { parse_mode: "HTML" });
        })
            .row();
    };
    for (var _i = 0, dishDatabase_1 = dishDatabase; _i < dishDatabase_1.length; _i++) {
        var dish = dishDatabase_1[_i];
        _loop_1(dish);
    }
    return range;
});
var dishText = function (dish) { return "<b>".concat(dish, "</b>\n\nRate this dish!"); };
var dishMenu = new menu_1.Menu("dish");
dishMenu.dynamic(function (ctx) {
    var dish = ctx.match;
    if (typeof dish !== "string")
        throw new Error("No dish chosen");
    return createDishMenu(dish);
});
function createDishMenu(dish) {
    var _this = this;
    return new menu_1.MenuRange()
        .text({
        text: function (ctx) {
            return ctx.session.favoriteIds.includes(dish) ? "Yummy! ❤️" : "Meh 🤷";
        },
        payload: dish,
    }, function (ctx) {
        var set = new Set(ctx.session.favoriteIds);
        if (!set.delete(dish))
            set.add(dish);
        ctx.session.favoriteIds = Array.from(set.values());
        ctx.menu.update();
    })
        .row()
        .back({ text: "X Delete", payload: dish }, function (ctx) { return __awaiter(_this, void 0, void 0, function () {
        var index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    index = dishDatabase.findIndex(function (d) { return d.id === dish; });
                    dishDatabase.splice(index, 1);
                    return [4 /*yield*/, ctx.editMessageText("Pick a dish to rate it!")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })
        .row()
        .back({ text: "Back", payload: dish });
}
mainMenu.register(dishMenu);
bot.use(mainMenu);
bot.command("start", function (ctx) { return ctx.reply(mainText, { reply_markup: mainMenu }); });
bot.command("help", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var text;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                text = "Send /start to see and rate dishes. Send /fav to list your favorites!";
                return [4 /*yield*/, ctx.reply(text)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.command("fav", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var favs, names;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                favs = ctx.session.favoriteIds;
                if (!(favs.length === 0)) return [3 /*break*/, 2];
                return [4 /*yield*/, ctx.reply("You have no favorites yet! Rate some dishes first.")];
            case 1:
                _a.sent();
                return [2 /*return*/];
            case 2:
                names = favs
                    .map(function (id) { return dishDatabase.find(function (dish) { return dish.id === id; }); })
                    .filter(function (dish) { return dish !== undefined; })
                    .map(function (dish) { return dish.name; }) //-> ["Pizza 🍕", "Burger 🍔", ...]
                    .join("\n");
                // Burger 🍔 .
                // ..."
                return [4 /*yield*/, ctx.reply("These are your favorite dishes:\n\n".concat(names))];
            case 3:
                // Burger 🍔 .
                // ..."
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.catch(console.error.bind(console));
bot.start();
