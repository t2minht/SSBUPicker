import { Button, Text, Pressable, StyleSheet, TextInput, View, ScrollView  } from 'react-native';
import { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

// import SQLite from 'react-native-sqlite-storage';

const charcters = {
    Mario: "../assets/characters/Mario.png",
    Donkey_Kong: "../assets/characters/DonkeyKong.png",
    Link: "../assets/characters/Link.png",
    Samus: "../assets/characters/Samus.png",
    Dark_Samus: "../assets/characters/DarkSamus.png",
    Yoshi: "../assets/characters/Yoshi.png",
    Kirby: "../assets/characters/Kirby.png",
    Fox: "../assets/characters/Fox.png",
    Pikachu: "../assets/characters/Pikachu.png",
    Luigi: "../assets/characters/Luigi.png",
    Ness: "../assets/characters/Ness.png",
    Captain_Falcon: "../assets/characters/CaptainFalcon.png",
    Jigglypuff: "../assets/characters/Jigglypuff.png",
    Peach: "../assets/characters/Peach.png",
    Daisy: "../assets/characters/Daisy.png",
    Bowser: "../assets/characters/Bowser.png",
    Ice_Climbers: "../assets/characters/IceClimbers.png",
    Sheik: "../assets/characters/Sheik.png",
    Zelda: "../assets/characters/Zelda.png",
    Dr_Mario: "../assets/characters/DrMario.png",
    Pichu: "../assets/characters/Pichu.png",
    Falco: "../assets/characters/Falco.png",
    Marth: "../assets/characters/Marth.png",
    Lucina: "../assets/characters/Lucina.png",
    Young_Link: "../assets/characters/YoungLink.png",
    Ganondorf: "../assets/characters/Ganondorf.png", 
    Mewtwo: "../assets/characters/Mewtwo.png",
    Roy: "../assets/characters/Roy.png",
    Chrom: "../assets/characters/Chrom.png",
    Mr_Game_and_Watch: "../assets/characters/MrGameAndWatch.png",
    Meta_Knight: "../assets/characters/MetaKnight.png",
    Pit: "../assets/characters/Pit.png",
    Dark_Pit: "../assets/characters/DarkPit.png",
    Zero_Suit_Samus: "../assets/characters/ZSS.png",
    Wario: "../assets/characters/Wario.png",
    Snake: "../assets/characters/Snake.png",
    Ike: "../assets/characters/Ike.png",
    Pokemon_Trainer: "../assets/characters/PokemonTrainer.png",
    Diddy_Kong: "../assets/characters/DiddyKong.png",
    Lucas: "../assets/characters/Lucas.png",
    Sonic: "../assets/characters/Sonic.png",
    King_Dedede: "../assets/characters/KingDedede.png",
    Olimar: "../assets/characters/Olimar.png",
    Lucario: "../assets/characters/Lucario.png",
    ROB: "../assets/characters/ROB.png",
    Toon_Link: "../assets/characters/ToonLink.png",
    Wolf: "../assets/characters/Wolf.png",
    Villager: "../assets/characters/Villager",
    Mega_Man: "../assets/characters/Megaman.png",
    Wii_Fit_Trainer: "../assets/characters/WiiFitTrainer.png",
    Rosalina: "../assets/characters/Rosalina.png",
    Little_Mac: "../assets/characters/Mac.png",
    Greninja: "../assets/characters/Greninja.png",
    Mii_Fighter: "../assets/characters/Mii.png",
    Palutena: "../assets/characters/Palutena.png",
    Pac_Man: "../assets/characters/PacMan.png",
    Robin: "../assets/characters/Robin.png",
    Shulk: "../assets/characters/Shulk.png",
    Bowser_Jr: "../assets/characters/BowserJr.png",
    Duck_Hunt: "../assets/characters/DuckHunt.png",
    Ryu: "../assets/characters/Ryu.png",
    Ken: "../assets/characters/Ken.png",
    Cloud: "../assets/characters/Cloud.png",
    Corrin: "../assets/characters/Corrin.png",
    Bayonetta: "../assets/characters/Bayonetta.png",
    Inkling: "../assets/characters/Inkling.png",
    Ridley: "../assets/characters/Ridley.png",
    Simon: "../assets/characters/Simon.png",
    Richter: "../assets/characters/Richter.png",
    King_K_Rool: "../assets/characters/KingKRool.png",
    Isabelle: "../assets/characters/Isabelle.png",
    Incineroar: "../assets/characters/Incineroar.png",
    Piranha_Plant: "../assets/characters/PiranhaPlant.png",
    Joker: "../assets/characters/Joker.png",
    Hero: "../assets/characters/Hero.png",
    Banjo_and_Kazooie: "../assets/characters/BanjoKazooie.png",
    Terry: "../assets/characters/Terry.png",
    Byleth: "../assets/characters/Byleth.png",
    Min_Min: "../assets/characters/MinMin.png",
    Steve: "../assets/characters/Steve.png",
    Sephiroth: "../assets/characters/Sephiroth.png",
    Pyra: "../assets/characters/Pyra.png",
    Mythra: "../assets/characters/Mythra.jpg",
    Kazuya: "../assets/characters/Kazuya.png",
    Sora: "../assets/characters/Sora.png"

}

function openDatabase() {
    if (Platform.OS === "web") {
        return {
        transaction: () => {
            return {
            executeSql: () => {},
            };
        },
        };
    }

    const db = SQLite.openDatabase("db.db");
    return db;
}

const db = openDatabase();

function load() {
    
    var character_array = Object.keys(charcters)
    db.transaction(
        (tx) => {
            // for(let i = 0; i < character_array.length; i++){
            // var query = "INSERT OR IGNORE INTO randomizer (character, used) VALUES(\"" + character_array[i] + "\", 0);";
            // // var inputs = [character_array[i], 0];
            // console.log(query);
            // tx.executeSql(query);
            // }
        }
    );
}
  

export default function start() {
    const [character, assignCharacter] = useState("");
    useEffect(() => {
        var character_array = Object.keys(charcters)
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE if not exists randomizer (character TEXT PRIMARY KEY NOT NULL, used INTEGER, UNIQUE(character));"
            );
            for(let i = 0; i < character_array.length; i++){
                var query = "INSERT OR IGNORE INTO randomizer (character, used) VALUES(\"" + character_array[i] + "\", 0);";
                // var inputs = [character_array[i], 0];
                // console.log(query);
                tx.executeSql(query);
            }
        });
    }, []);

    const randomize =() => {
    
    // var character_array = Object.keys(charcters)
        var query = "SELECT character FROM randomizer WHERE used = 0;"
        console.log("_____________\n\n___________________")


        db.transaction(
            (tx) => {
                tx.executeSql(query, 
                    [], 
                    (trans, resultSet) => {
                        console.log(resultSet.rows.length)
                        if (resultSet.rows.length > 0) {
                            for (let i = 0; i < resultSet.rows.length; i++) {
                                const row = resultSet.rows.item(i);
                                console.log(i + ')', row.character);
                            }
                        choice = Math.floor(Math.random()*resultSet.rows.length)
                        console.log(resultSet.rows.item(choice).character)
                        assignCharacter(resultSet.rows.item(choice).character)
                        chosen = resultSet.rows.item(choice).character
                            
                        updateQuery = "UPDATE randomizer SET used = 1 WHERE character = \'" + chosen + "\';"

                        alert(chosen)

                        db.transaction(
                            (tx2) => {
                                tx2.executeSql(
                                    updateQuery,
                                    [],
                                    (trans, result) => {console.log("Success: " + updateQuery)},
                                    (trans, error) => {console.log("Error: " + error)}
                                )
                            }
                        );


                        } else {
                            console.log('No rows returned from the query.');
                        }
                    }, 
                    (trans, error) => {console.log("Error: " + error)}
                );
            }
        );


    };

    const reset = () => {

        updateQuery = "UPDATE randomizer SET used = 0"

        console.log(updateQuery)

        db.transaction(
            (tx) => {
                tx.executeSql(
                    updateQuery,
                    [],
                    (trans, result) => {console.log("Success: " + updateQuery)},
                    (trans, error) => {console.log("Error: " + error)}
                )
            }
        );

    }

    return (
        <View>
            {/* <Button onPress={() => load()} title="Load Database"></Button> */}
            <Button onPress={() => randomize()} title = "Randomize" ></Button>
            
            <Button onPress={() => reset()} title = "Reset" ></Button>
        </View>
    );
}
