//=====================================| Import the Module |=====================================\\
const { Client, ChatInputCommandInteraction, SlashCommandBuilder, ButtonStyle } = require("discord.js");
const gamecord = require("discord-gamecord");

//=====================================| Code |=====================================\\

module.exports = {
    data: new SlashCommandBuilder()
        .setName("minigames")
        .setDescription("Play minigames with friend")
        .addSubcommand((sub) => sub.setName("2080").setDescription("Play minigames 2080."))
        .addSubcommand((sub) => sub.setName("fasttype").setDescription("Play minigames fasttype."))
        .addSubcommand((sub) => sub.setName("findemoji").setDescription("Play minigames findemoji."))
        .addSubcommand((sub) => sub.setName("flood").setDescription("Play minigames flood."))
        .addSubcommand((sub) => sub.setName("pokemon").setDescription("Play minigames pokemon."))
        .addSubcommand((sub) => sub.setName("matchpairs").setDescription("Play minigames matchpairs."))
        .addSubcommand((sub) => sub.setName("minesweeper").setDescription("Play minigames minesweeper."))
        .addSubcommand((sub) => sub.setName("snake").setDescription("Play minigames snake."))
        .addSubcommand((sub) => sub.setName("slots").setDescription("Play minigames slots."))
        .addSubcommand((sub) => sub.setName("hangman").setDescription("Play minigames hangman.")
            .addStringOption((string) => string.setName("word").setDescription("Input the word for hangman games.").setRequired(true))
            .addStringOption((string) => string.setName("theme").setDescription("Select the theme for hangman games.").setRequired(true)
                .addChoices(
                    { name: "Nature", value: "nature" },
                    { name: "Sport", value: "sport" },
                    { name: "Color", value: "color" },
                    { name: "Camp", value: "camp" },
                    { name: "Fruit", value: "fruit" },
                    { name: "Discord", value: "discord" },
                    { name: "Winter", value: "winter" },
                    { name: "Pokemon", value: "pokemon" },
                )
            )
        )
        .addSubcommand((sub) => sub.setName("trivia").setDescription("Play minigames trivia.")
            .addStringOption((string) => string.setName("mode").setDescription("Select the mode for trivia games.").setRequired(true)
                .addChoices(
                    { name: "Multiple", value: "multiple" },
                    { name: "Single", value: "single" },
                )
            )
            .addStringOption((string) => string.setName("difficulty").setDescription("Select the difficulty for trivia games.").setRequired(true)
                .addChoices(
                    { name: "Easy", value: "easy" },
                    { name: "Medium", value: "medium" },
                    { name: "Hard", value: "hard" },
                )
            )
        )
        .addSubcommand((sub) => sub.setName("wouldyourather").setDescription("Play minigames wouldyourather.")
            .addStringOption((string) => string.setName("option1").setDescription("Input the word for would you rather option games.").setRequired(true))
            .addStringOption((string) => string.setName("option2").setDescription("Input the word for would you rather option games.").setRequired(true))
        )
        .addSubcommand((sub) => sub.setName("wordle").setDescription("Play minigames wordle.")
            .addStringOption((string) => string.setName("word").setDescription("Input the word for wordle games.").setRequired(false))
        )
        .addSubcommand((sub) => sub.setName("rockpaper").setDescription("Play minigames rockpaper.")
            .addUserOption((user) => user.setName("user").setDescription("Select the user for playing this game together.").setRequired(true))
            )
        .addSubcommand((sub) => sub.setName("tictactoe").setDescription("Play minigames tictactoe.")
            .addUserOption((user) => user.setName("user").setDescription("Select the user for playing this game together.").setRequired(true))
            )
        .addSubcommand((sub) => sub.setName("connect4").setDescription("Play minigames connect4.")
            .addUserOption((user) => user.setName("user").setDescription("Select the user for playing this game together.").setRequired(true))
        ),
    
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */

    async execute(client, interaction) {
        const subCommand = interaction.options.getSubcommand();

        if (subCommand === "2080") {
            const Game = new gamecord.TwoZeroFourEight({
                message: interaction,
                isSlashGame: true,
                embed: {
                  title: "2048 Games!",
                  color: process.env.COLOR
                },
                emojis: {
                  up: "⬆️",
                  down: "⬇️",
                  left: "⬅️",
                  right: "➡️",
                },
                timeoutTime: 60000,
                buttonStyle: "SUCCESS",
                playerOnlyMessage: "Only {player} can use these buttons."
            });
              
            Game.startGame();
            Game.on("gameOver", result => {
                interaction.followUp({ content: `${result}` })
            });

        };
        if (subCommand === "fasttype") {
            const Game = new gamecord.FastType({
                message: interaction,
                isSlashGame: true,
                embed: {
                  title: "Fast Type Games!",
                  color: process.env.COLOR,
                  description: "You have {time} seconds to type the sentence below."
                },
                timeoutTime: 60000,
                sentence: "Some really cool sentence to fast type.",
                winMessage: "You won! You finished the type race in {time} seconds with wpm of {wpm}.",
                loseMessage: "You lost! You didn\"t type the correct sentence in time.",
            });
            
            Game.startGame();
            Game.on("gameOver", result => {
                interaction.followUp({ content: `${result}` })
            });

        };
        if (subCommand === "findemoji") {
            const Game = new gamecord.FindEmoji({
                message: interaction,
                isSlashGame: true,
                embed: {
                  title: "Find Emoji Games!",
                  color: process.env.COLOR,
                  description: "Remember the emojis from the board below.",
                  findDescription: "Find the {emoji} emoji before the time runs out."
                },
                timeoutTime: 60000,
                hideEmojiTime: 5000,
                buttonStyle: "SUCCESS",
                emojis: ["🍉", "🍇", "🍊", "🍋", "🥭", "🍎", "🍏", "🥝"],
                winMessage: "You won! You selected the correct emoji. {emoji}",
                loseMessage: "You lost! You selected the wrong emoji. {emoji}",
                timeoutMessage: "You lost! You ran out of time. The emoji is {emoji}",
                playerOnlyMessage: "Only {player} can use these buttons."
            });
            
            Game.startGame();
            Game.on("gameOver", result => {
                interaction.followUp({ content: `${result}` })
            });

        };
        if (subCommand === "flood") {
            const Game = new gamecord.Flood({
                message: interaction,
                isSlashGame: true,
                embed: {
                  title: "Flood Games!",
                  color: process.env.COLOR,
                },
                difficulty: 13,
                timeoutTime: 60000,
                buttonStyle: "SUCCESS",
                emojis: ["🟥", "🟦", "🟧", "🟪", "🟩"],
                winMessage: "You won! You took **{turns}** turns.",
                loseMessage: "You lost! You took **{turns}** turns.",
                playerOnlyMessage: "Only {player} can use these buttons."
            });
            
            Game.startGame();
            Game.on("gameOver", result => {
                interaction.followUp({ content: `${result}` })
            });

        };
        if (subCommand === "pokemon") {
            const Game = new gamecord.GuessThePokemon({
                message: interaction,
                isSlashGame: true,
                embed: {
                  title: "Who\'s The Pokemon",
                  color: process.env.COLOR
                },
                timeoutTime: 60000,
                winMessage: "You guessed it right! It was a {pokemon}.",
                loseMessage: "Better luck next time! It was a {pokemon}.",
                errMessage: "Unable to fetch pokemon data! Please try again.",
                playerOnlyMessage: "Only {player} can use these buttons."
            });
            
            Game.startGame();
            Game.on("gameOver", result => {
                interaction.followUp({ content: `${result}` })
            });

        };
        if (subCommand === "matchpairs") {
            const Game = new gamecord.MatchPairs({
                message: interaction,
                isSlashGame: true,
                embed: {
                  title: "Match Pairs Games!",
                  color: process.env.COLOR,
                  description: "**Click on the buttons to match emojis with their pairs.**"
                },
                timeoutTime: 60000,
                emojis: ["🍉", "🍇", "🍊", "🥭", "🍎", "🍏", "🥝", "🥥", "🍓", "🫐", "🍍", "🥕", "🥔"],
                winMessage: "**You won the Game! You turned a total of `{tilesTurned}` tiles.**",
                loseMessage: "**You lost the Game! You turned a total of `{tilesTurned}` tiles.**",
                playerOnlyMessage: "Only {player} can use these buttons."
            });
            
            Game.startGame();
            Game.on("gameOver", result => {
                interaction.followUp({ content: `${result}` })
            });

        };
        if (subCommand === "minesweeper") {
            const Game = new gamecord.Minesweeper({
                message: interaction,
                isSlashGame: true,
                embed: {
                  title: "Minesweeper Games!",
                  color: process.env.COLOR,
                  description: "Click on the buttons to reveal the blocks except mines."
                },
                emojis: { flag: "🚩", mine: "💣" },
                mines: 5,
                timeoutTime: 60000,
                winMessage: "You won the Game! You successfully avoided all the mines.",
                loseMessage: "You lost the Game! Beaware of the mines next time.",
                playerOnlyMessage: "Only {player} can use these buttons."
            });
            
            Game.startGame();
            Game.on("gameOver", result => {
                interaction.followUp({ content: `${result}` })
            });

        };
        if (subCommand === "snake") {
            const Game = new gamecord.Snake({
                message: interaction,
                isSlashGame: true,
                embed: {
                  title: "Snake Games!",
                  overTitle: "Game Over!",
                  color: process.env.COLOR
                },
                emojis: {
                  board: "⬛",
                  food: "🍎",
                  up: "⬆️", 
                  down: "⬇️",
                  left: "⬅️",
                  right: "➡️",
                },
                snake: { head: "🟢", body: "🟩", tail: "🟢", skull: "💀" },
                foods: ["🍎", "🍇", "🍊", "🫐", "🥕", "🥝", "🌽"],
                stopButton: "Stop",
                timeoutTime: 60000,
                playerOnlyMessage: "Only {player} can use these buttons."
            });
            
            Game.startGame();
            Game.on("gameOver", result => {
                interaction.followUp({ content: `${result}` })
            });

        };
        if (subCommand === "slots") {
            const Game = new gamecord.Slots({
                message: interaction,
                isSlashGame: true,
                embed: {
                  title: "Slot Machine Games!",
                  color: process.env.COLOR
                },
                slots: ["🍇", "🍊", "🍋", "🍌"]
            });
            
            Game.startGame();
            Game.on("gameOver", result => {
                interaction.followUp({ content: `${result}` })
            });

        };
        if (subCommand === "hangman") {
            const Game = new gamecord.Hangman({
                message: interaction,
                isSlashGame: true,
                embed: {
                  title: "Hangman Games!",
                  color: process.env.COLOR
                },
                hangman: { hat: "🎩", head: "😟", shirt: "👕", pants: "🩳", boots: "👞👞" },
                customWord: interaction.options.getString("word"),
                timeoutTime: 60000,
                theme: interaction.options.getString("theme"),
                winMessage: "You won! The word was **{word}**.",
                loseMessage: "You lost! The word was **{word}**.",
                playerOnlyMessage: "Only {player} can use these buttons."
            });
            
            Game.startGame();
            Game.on("gameOver", result => {
                interaction.followUp({ content: `${result}` })
            });

        };
        if (subCommand === "trivia") {
            const Game = new gamecord.Trivia({
                message: interaction,
                isSlashGame: true,
                embed: {
                  title: "Trivia Games!",
                  color: process.env.COLOR,
                  description: "You have 60 seconds to guess the answer."
                },
                timeoutTime: 60000,
                buttonStyle: "PRIMARY",
                trueButtonStyle: "SUCCESS",
                falseButtonStyle: "DANGER",
                mode: interaction.options.getString("mode"),
                difficulty: interaction.options.getString("difficulty"),
                winMessage: "You won! The correct answer is {answer}.",
                loseMessage: "You lost! The correct answer is {answer}.",
                errMessage: "Unable to fetch question data! Please try again.",
                playerOnlyMessage: "Only {player} can use these buttons."
            });
            
            
            Game.startGame();
            Game.on("gameOver", result => {
                interaction.followUp({ content: `${result}` })
            });

        };
        if (subCommand === "wouldyourather") {
            const Game = new gamecord.WouldYouRather({
                message: interaction,
                isSlashGame: true,
                embed: {
                  title: "Would You Rather Games!",
                  color: process.env.COLOR,
                },
                buttons: {
                  option1: interaction.options.getString("option1"),
                  option2: interaction.options.getString("option2"),
                },
                timeoutTime: 60000,
                errMessage: "Unable to fetch question data! Please try again.",
                playerOnlyMessage: "Only {player} can use these buttons."
            });
            
            Game.startGame();
            Game.on("gameOver", result => {
                interaction.followUp({ content: `${result}` })
            });

        };
        if (subCommand === "wordle") {
            const Game = new gamecord.Wordle({
                message: interaction,
                isSlashGame: true,
                embed: {
                  title: "Wordle Games!",
                  color: process.env.COLOR,
                },
                customWord: interaction.options.getString("word") || null,
                timeoutTime: 60000,
                winMessage: "You won! The word was **{word}**.",
                loseMessage: "You lost! The word was **{word}**.",
                playerOnlyMessage: "Only {player} can use these buttons."
            });
            
            Game.startGame();
            Game.on("gameOver", result => {
                interaction.followUp({ content: `${result}` })
            });

        };
        if (subCommand === "rockpaper") {
            const Game = new gamecord.RockPaperScissors({
                message: interaction,
                isSlashGame: true,
                opponent: interaction.options.getUser("user"),
                embed: {
                  title: "Rock Paper Scissors Games!",
                  color: process.env.COLOR,
                  description: "Press a button below to make a choice."
                },
                buttons: {
                  rock: "Rock",
                  paper: "Paper",
                  scissors: "Scissors"
                },
                emojis: {
                  rock: "🌑",
                  paper: "📰",
                  scissors: "✂️"
                },
                mentionUser: true,
                timeoutTime: 60000,
                buttonStyle: "SUCCESS",
                pickMessage: "You choose {emoji}.",
                winMessage: "**{player}** won the Game! Congratulations!",
                tieMessage: "The Game tied! No one won the Game!",
                timeoutMessage: "The Game went unfinished! No one won the Game!",
                playerOnlyMessage: "Only {player} and {opponent} can use these buttons."
            });
            
            Game.startGame();
            Game.on("gameOver", result => {
                interaction.followUp({ content: `${result}` })
            });

        };
        if (subCommand === "tictactoe") {
            const Game = new gamecord.TicTacToe({
                message: interaction,
                isSlashGame: true,
                opponent: interaction.options.getUser("user"),
                embed: {
                  title: "Tic Tac Toe Games",
                  color: process.env.COLOR,
                  statusTitle: "Status",
                  overTitle: "Game Over!"
                },
                emojis: {
                  xButton: "❌",
                  oButton: "🔵",
                  blankButton: "➖"
                },
                mentionUser: true,
                timeoutTime: 60000,
                xButtonStyle: "DANGER",
                oButtonStyle: "SUCCESS",
                turnMessage: "{emoji} | Its turn of player **{player}**.",
                winMessage: "{emoji} | **{player}** won the TicTacToe Game.",
                tieMessage: "The Game tied! No one won the Game!",
                timeoutMessage: "The Game went unfinished! No one won the Game!",
                playerOnlyMessage: "Only {player} and {opponent} can use these buttons."
            });
            
            Game.startGame();
            Game.on("gameOver", result => {
                interaction.followUp({ content: `${result}` })
            });

        };
        if (subCommand === "connect4") {
            const Game = new Connect4({
                message: interaction,
                isSlashGame: true,
                opponent: interaction.options.getUser("user"),
                embed: {
                  title: "Connect4 Games!",
                  statusTitle: "Status",
                  color: process.env.COLOR
                },
                emojis: {
                  board: "⚪",
                  player1: "🔴",
                  player2: "🟡"
                },
                mentionUser: true,
                timeoutTime: 60000,
                buttonStyle: "SUCCESS",
                turnMessage: "{emoji} | Its turn of player **{player}**.",
                winMessage: "{emoji} | **{player}** won the Connect4 Game.",
                tieMessage: "The Game tied! No one won the Game!",
                timeoutMessage: "The Game went unfinished! No one won the Game!",
                playerOnlyMessage: "Only {player} and {opponent} can use these buttons."
            });
            
            Game.startGame();
            Game.on("gameOver", result => {
                interaction.followUp({ content: `${result}` })
            });

        };
        if (subCommand === "connect4") {
            const Game = new Connect4({
                message: interaction,
                isSlashGame: true,
                opponent: interaction.options.getUser("user"),
                embed: {
                  title: "Connect4 Games!",
                  statusTitle: "Status",
                  color: process.env.COLOR
                },
                emojis: {
                  board: "⚪",
                  player1: "🔴",
                  player2: "🟡"
                },
                mentionUser: true,
                timeoutTime: 60000,
                buttonStyle: "SUCCESS",
                turnMessage: "{emoji} | Its turn of player **{player}**.",
                winMessage: "{emoji} | **{player}** won the Connect4 Game.",
                tieMessage: "The Game tied! No one won the Game!",
                timeoutMessage: "The Game went unfinished! No one won the Game!",
                playerOnlyMessage: "Only {player} and {opponent} can use these buttons."
            });
            
            Game.startGame();
            Game.on("gameOver", result => {
                interaction.followUp({ content: `${result}` })
            });

        };
    }
};