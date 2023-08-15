import { Button, Text, Pressable, StyleSheet, TextInput, View, ScrollView  } from 'react-native';
import { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';

// import SQLite from 'react-native-sqlite-storage';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const characters = {
    Mario: require("../assets/characters/Mario.png"),
    Donkey_Kong: require("../assets/characters/DonkeyKong.png"),
    Link: require("../assets/characters/Link.png"),
    Samus: require("../assets/characters/Samus.png"),
    Dark_Samus: require("../assets/characters/DarkSamus.png"),
    Yoshi: require("../assets/characters/Yoshi.png"),
    Kirby: require("../assets/characters/Kirby.png"),
    Fox: require("../assets/characters/Fox.png"),
    Pikachu: require("../assets/characters/Pikachu.png"),
    Luigi: require("../assets/characters/Luigi.png"),
    Ness: require("../assets/characters/Ness.png"),
    Captain_Falcon: require("../assets/characters/CaptainFalcon.png"),
    Jigglypuff: require("../assets/characters/Jigglypuff.png"),
    Peach: require("../assets/characters/Peach.png"),
    Daisy: require("../assets/characters/Daisy.png"),
    Bowser: require("../assets/characters/Bowser.png"),
    Ice_Climbers: require("../assets/characters/IceClimbers.png"),
    Sheik: require("../assets/characters/Sheik.png"),
    Zelda: require("../assets/characters/Zelda.png"),
    Dr_Mario: require("../assets/characters/DrMario.png"),
    Pichu: require("../assets/characters/Pichu.png"),
    Falco: require("../assets/characters/Falco.png"),
    Marth: require("../assets/characters/Marth.png"),
    Lucina: require("../assets/characters/Lucina.png"),
    Young_Link: require("../assets/characters/YoungLink.png"),
    Ganondorf: require("../assets/characters/Ganondorf.png"), 
    Mewtwo: require("../assets/characters/Mewtwo.png"),
    Roy: require("../assets/characters/Roy.png"),
    Chrom: require("../assets/characters/Chrom.png"),
    Mr_Game_and_Watch: require("../assets/characters/MrGameAndWatch.png"),
    Meta_Knight: require("../assets/characters/MetaKnight.png"),
    Pit: require("../assets/characters/Pit.png"),
    Dark_Pit: require("../assets/characters/DarkPit.png"),
    Zero_Suit_Samus: require("../assets/characters/ZSS.png"),
    Wario: require("../assets/characters/Wario.png"),
    Snake: require("../assets/characters/Snake.png"),
    Ike: require("../assets/characters/Ike.png"),
    Pokemon_Trainer: require("../assets/characters/PokemonTrainer.png"),
    Diddy_Kong: require("../assets/characters/DiddyKong.png"),
    Lucas: require("../assets/characters/Lucas.png"),
    Sonic: require("../assets/characters/Sonic.png"),
    King_Dedede: require("../assets/characters/KingDedede.png"),
    Olimar: require("../assets/characters/Olimar.png"),
    Lucario: require("../assets/characters/Lucario.png"),
    ROB: require("../assets/characters/ROB.png"),
    Toon_Link: require("../assets/characters/ToonLink.png"),
    Wolf: require("../assets/characters/Wolf.png"),
    Villager: require("../assets/characters/Villager.png"),
    Mega_Man: require("../assets/characters/Megaman.png"),
    Wii_Fit_Trainer: require("../assets/characters/WiiFitTrainer.png"),
    Rosalina: require("../assets/characters/Rosalina.png"),
    Little_Mac: require("../assets/characters/Mac.png"),
    Greninja: require("../assets/characters/Greninja.png"),
    Mii_Fighter: require("../assets/characters/Mii.png"),
    Palutena: require("../assets/characters/Palutena.png"),
    Pac_Man: require("../assets/characters/PacMan.png"),
    Robin: require("../assets/characters/Robin.png"),
    Shulk: require("../assets/characters/Shulk.png"),
    Bowser_Jr: require("../assets/characters/BowserJr.png"),
    Duck_Hunt: require("../assets/characters/DuckHunt.png"),
    Ryu: require("../assets/characters/Ryu.png"),
    Ken: require("../assets/characters/Ken.png"),
    Cloud: require("../assets/characters/Cloud.png"),
    Corrin: require("../assets/characters/Corrin.png"),
    Bayonetta: require("../assets/characters/Bayonetta.png"),
    Inkling: require("../assets/characters/Inkling.png"),
    Ridley: require("../assets/characters/Ridley.png"),
    Simon: require("../assets/characters/Simon.png"),
    Richter: require("../assets/characters/Richter.png"),
    King_K_Rool: require("../assets/characters/KingKRool.png"),
    Isabelle: require("../assets/characters/Isabelle.png"),
    Incineroar: require("../assets/characters/Incineroar.png"),
    Piranha_Plant: require("../assets/characters/PiranhaPlant.png"),
    Joker: require("../assets/characters/Joker.png"),
    Hero: require("../assets/characters/Hero.png"),
    Banjo_and_Kazooie: require("../assets/characters/BanjoKazooie.png"),
    Terry: require("../assets/characters/Terry.png"),
    Byleth: require("../assets/characters/Byleth.png"),
    Min_Min: require("../assets/characters/MinMin.png"),
    Steve: require("../assets/characters/Steve.png"),
    Sephiroth: require("../assets/characters/Sephiroth.png"),
    Pyra: require("../assets/characters/Pyra.png"),
    Mythra: require("../assets/characters/Mythra.png"),
    Kazuya: require("../assets/characters/Kazuya.png"),
    Sora: require("../assets/characters/Sora.png")
}

const showCharacters = {
    Mario: true,
    Donkey_Kong: true,
    Link: true,
    Samus: true,
    Dark_Samus: true,
    Yoshi: true,
    Kirby: true,
    Fox: true,
    Pikachu: true,
    Luigi: true,
    Ness: true,
    Captain_Falcon: true,
    Jigglypuff: true,
    Peach: true,
    Daisy: true,
    Bowser: true,
    Ice_Climbers: true,
    Sheik: true,
    Zelda: true,
    Dr_Mario: true,
    Pichu: true,
    Falco: true,
    Marth: true,
    Lucina: true,
    Young_Link: true,
    Ganondorf: true, 
    Mewtwo: true,
    Roy: true,
    Chrom: true,
    Mr_Game_and_Watch: true,
    Meta_Knight: true,
    Pit: true,
    Dark_Pit: true,
    Zero_Suit_Samus: true,
    Wario: true,
    Snake: true,
    Ike: true,
    Pokemon_Trainer: true,
    Diddy_Kong: true,
    Lucas: true,
    Sonic: true,
    King_Dedede: true,
    Olimar: true,
    Lucario: true,
    ROB: true,
    Toon_Link: true,
    Wolf: true,
    Villager: true,
    Mega_Man: true,
    Wii_Fit_Trainer: true,
    Rosalina: true,
    Little_Mac: true,
    Greninja: true,
    Mii_Fighter: true,
    Palutena: true,
    Pac_Man: true,
    Robin: true,
    Shulk: true,
    Bowser_Jr: true,
    Duck_Hunt: true,
    Ryu: true,
    Ken: true,
    Cloud: true,
    Corrin: true,
    Bayonetta: true,
    Inkling: true,
    Ridley: true,
    Simon: true,
    Richter: true,
    King_K_Rool: true,
    Isabelle: true,
    Incineroar: true,
    Piranha_Plant: true,
    Joker: true,
    Hero: true,
    Banjo_and_Kazooie: true,
    Terry: true,
    Byleth: true,
    Min_Min: true,
    Steve: true,
    Sephiroth: true,
    Pyra: true,
    Mythra: true,
    Kazuya: true,
    Sora: true

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
    
    var character_array = Object.keys(characters)
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
    const [count, SetCount] = useState(85);
    const [character, assignCharacter] = useState("");
    const [blank, flipBlank] = useState(true);
    useEffect(() => {
        var character_array = Object.keys(characters)
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

            tx.executeSql(
                "SELECT character FROM randomizer WHERE used = 1;",
                [],
                (trans, resultSet) => {
                    if (resultSet.rows.length > 0) {
                        for (let i = 0; i < resultSet.rows.length; i++) {
                            const row = resultSet.rows.item(i);
                            showCharacters[row.character] = false;
                            SetCount(count -1);
                        }
                    }
                },
                (trans, error) => {
                    console.log("Error: require(" + error);
                }
            );
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
                        // assignCharacter(resultSet.rows.item(choice).character)
                        chosen = resultSet.rows.item(choice).character

                        assignCharacter(chosen)

                        remove(chosen);
                            
                        updateQuery = "UPDATE randomizer SET used = 1 WHERE character = \'" + chosen + "\';"

                        flipBlank(true);
                        // alert(chosen)

                        db.transaction(
                            (tx2) => {
                                tx2.executeSql(
                                    updateQuery,
                                    [],
                                    (trans, result) => {console.log("Success: require(" + updateQuery)},
                                    (trans, error) => {console.log("Error: require(" + error)}
                                )
                            }
                        );


                        } else {
                            console.log('No rows returned from the query.');
                        }
                    }, 
                    (trans, error) => {console.log("Error: require(" + error)}
                );
            }
        );


    };

    const reset = () => {

        flipBlank(false)
        updateQuery = "UPDATE randomizer SET used = 0"

        console.log(updateQuery)

        db.transaction(
            (tx) => {
                tx.executeSql(
                    updateQuery,
                    [],
                    (trans, result) => {console.log("Success: require(" + updateQuery)},
                    (trans, error) => {console.log("Error: require(" + error)}
                )
            }
        );

        for(let char in showCharacters){
            showCharacters[char] = true;
            
        }
        SetCount(85)
        assignCharacter("")
    }

    const remove = (character) => {
        showCharacters[character] = false;
        SetCount(count -1)
    }

    const show = () => {
        let cnt = 0;
        for(let char in showCharacters){
            if(showCharacters[char]){
                console.log(cnt + ": require(" + char)
                cnt++
            }
            
        }

        SetCount(cnt)
    }

    const formatName = (char) =>{
        let c = char
        c = c.toUpperCase();
        c = c.replaceAll("_", " ");
        c = c.replace("DR", "DR.");
        c = c.replace("BANJO AND KAZOOIE", "BANJO KAZOOIE");
        c = c.replace("GAME AND WATCH", "GAME & WATCH");
        c = c.replace("II", "ii");
        c = c.replace("JR", 'JR.');
        console.log(c)
        return c;
    }

    {/* <Image source={require('../assets/characters/BanjoKazooie.png')} style={{ width: 30, height: 30}} /> */}
    return (
        <View style={[styles.mainBox]}>
            <StatusBar style="dark" translucent={true}/>

            <View style={[{marginTop:10, justifyContent:'center', width:'100%', alignItems:'center'}]}>
                <View style={[styles.charBox, {height:150, width: 150, backgroundColor:'white', paddingBottom:10, alignItems:'center', marginBottom:10}]}>
                    {blank && <Image source={characters[character]} style={[{width: 125, height:125, }]}/>}
                    
                    <Text style={[{ color:'black', fontWeight:'bold'}]}>{formatName(character)}</Text>
                </View>

                <View style={[styles.buttonBox]}>
                    <Pressable style={styles.button} onPress={() => randomize()}>
                        <Text style={styles.text}>Randomize</Text>
                    </Pressable>
                </View>
            </View>
            <ScrollView style={[{ height:"60%"}]}>
                <View style={[{flex:1, flexDirection:'row', flexWrap: "wrap", justifyContent:"space-evenly"}]}>
                    {showCharacters["Mario"] && <Image source={characters["Mario"]} style={styles.scrollIcon}/>}
                    {showCharacters["Donkey_Kong"] && <Image source={characters["Donkey_Kong"]} style={styles.scrollIcon}/>}
                    {showCharacters["Link"] && <Image source={characters["Link"]} style={styles.scrollIcon}/>}
                    {showCharacters["Samus"] && <Image source={characters["Samus"]} style={styles.scrollIcon}/>}
                    {showCharacters["Dark_Samus"] && <Image source={characters["Dark_Samus"]} style={styles.scrollIcon}/>}
                    {showCharacters["Yoshi"] && <Image source={characters["Yoshi"]} style={styles.scrollIcon}/>}
                    {showCharacters["Kirby"] && <Image source={characters["Kirby"]} style={styles.scrollIcon}/>}
                    {showCharacters["Fox"] && <Image source={characters["Fox"]} style={styles.scrollIcon}/>}
                    {showCharacters["Pikachu"] && <Image source={characters["Pikachu"]} style={styles.scrollIcon}/>}
                    {showCharacters["Luigi"] && <Image source={characters["Luigi"]} style={styles.scrollIcon}/>}
                    {showCharacters["Ness"] && <Image source={characters["Ness"]} style={styles.scrollIcon}/>}
                    {showCharacters["Captain_Falcon"] && <Image source={characters["Captain_Falcon"]} style={styles.scrollIcon}/>}
                    {showCharacters["JigglyPuff"] && <Image source={characters["JigglyPuff"]} style={styles.scrollIcon}/>}
                    {showCharacters["Peach"] && <Image source={characters["Peach"]} style={styles.scrollIcon}/>}
                    {showCharacters["Daisy"] && <Image source={characters["Daisy"]} style={styles.scrollIcon}/>}
                    {showCharacters["Bowser"] && <Image source={characters["Bowser"]} style={styles.scrollIcon}/>}
                    {showCharacters["Ice_Climbers"] && <Image source={characters["Ice_Climbers"]} style={styles.scrollIcon}/>}
                    {showCharacters["Sheik"] && <Image source={characters["Sheik"]} style={styles.scrollIcon}/>}
                    {showCharacters["Zelda"] && <Image source={characters["Zelda"]} style={styles.scrollIcon}/>}
                    {showCharacters["Dr_Mario"] && <Image source={characters["Dr_Mario"]} style={styles.scrollIcon}/>}
                    {showCharacters["Pichu"] && <Image source={characters["Pichu"]} style={styles.scrollIcon}/>}
                    {showCharacters["Falco"] && <Image source={characters["Falco"]} style={styles.scrollIcon}/>}
                    {showCharacters["Marth"] && <Image source={characters["Marth"]} style={styles.scrollIcon}/>}
                    {showCharacters["Lucina"] && <Image source={characters["Lucina"]} style={styles.scrollIcon}/>}
                    {showCharacters["Young_Link"] && <Image source={characters["Young_Link"]} style={styles.scrollIcon}/>}
                    {showCharacters["Ganondorf"] && <Image source={characters["Ganondorf"]} style={styles.scrollIcon}/>}
                    {showCharacters["Mewtwo"] && <Image source={characters["Mewtwo"]} style={styles.scrollIcon}/>}
                    {showCharacters["Roy"] && <Image source={characters["Roy"]} style={styles.scrollIcon}/>}
                    {showCharacters["Chrom"] && <Image source={characters["Chrom"]} style={styles.scrollIcon}/>}
                    {showCharacters["Mr_Game_and_Watch"] && <Image source={characters["Mr_Game_and_Watch"]} style={styles.scrollIcon}/>}
                    {showCharacters["Meta_Knight"] && <Image source={characters["Meta_Knight"]} style={styles.scrollIcon}/>}
                    {showCharacters["Pit"] && <Image source={characters["Pit"]} style={styles.scrollIcon}/>}
                    {showCharacters["Dark_Pit"] && <Image source={characters["Dark_Pit"]} style={styles.scrollIcon}/>}
                    {showCharacters["Zero_Suit_Samus"] && <Image source={characters["Zero_Suit_Samus"]} style={styles.scrollIcon}/>}
                    {showCharacters["Wario"] && <Image source={characters["Wario"]} style={styles.scrollIcon}/>}
                    {showCharacters["Snake"] && <Image source={characters["Snake"]} style={styles.scrollIcon}/>}
                    {showCharacters["Ike"] && <Image source={characters["Ike"]} style={styles.scrollIcon}/>}
                    {showCharacters["Pokemon_Trainer"] && <Image source={characters["Pokemon_Trainer"]} style={styles.scrollIcon}/>}
                    {showCharacters["Diddy_Kong"] && <Image source={characters["Diddy_Kong"]} style={styles.scrollIcon}/>}
                    {showCharacters["Lucas"] && <Image source={characters["Lucas"]} style={styles.scrollIcon}/>}
                    {showCharacters["Sonic"] && <Image source={characters["Sonic"]} style={styles.scrollIcon}/>}
                    {showCharacters["King_Dedede"] && <Image source={characters["King_Dedede"]} style={styles.scrollIcon}/>}
                    {showCharacters["Olimar"] && <Image source={characters["Olimar"]} style={styles.scrollIcon}/>}
                    {showCharacters["Lucario"] && <Image source={characters["Lucario"]} style={styles.scrollIcon}/>}
                    {showCharacters["ROB"] && <Image source={characters["ROB"]} style={styles.scrollIcon}/>}
                    {showCharacters["Toon_Link"] && <Image source={characters["Toon_Link"]} style={styles.scrollIcon}/>}
                    {showCharacters["Wolf"] && <Image source={characters["Wolf"]} style={styles.scrollIcon}/>}
                    {showCharacters["Villager"] && <Image source={characters["Villager"]} style={styles.scrollIcon}/>}
                    {showCharacters["Mega_Man"] && <Image source={characters["Mega_Man"]} style={styles.scrollIcon}/>}
                    {showCharacters["Wii_Fit_Trainer"] && <Image source={characters["Wii_Fit_Trainer"]} style={styles.scrollIcon}/>}
                    {showCharacters["Rosalina"] && <Image source={characters["Rosalina"]} style={styles.scrollIcon}/>}
                    {showCharacters["Little_Mac"] && <Image source={characters["Little_Mac"]} style={styles.scrollIcon}/>}
                    {showCharacters["Greninja"] && <Image source={characters["Greninja"]} style={styles.scrollIcon}/>}
                    {showCharacters["Mii_Fighter"] && <Image source={characters["Mii_Fighter"]} style={styles.scrollIcon}/>}
                    {showCharacters["Palutena"] && <Image source={characters["Palutena"]} style={styles.scrollIcon}/>}
                    {showCharacters["Pac_Man"] && <Image source={characters["Pac_Man"]} style={styles.scrollIcon}/>}
                    {showCharacters["Robin"] && <Image source={characters["Robin"]} style={styles.scrollIcon}/>}
                    {showCharacters["Shulk"] && <Image source={characters["Shulk"]} style={styles.scrollIcon}/>}
                    {showCharacters["Bowser_Jr"] && <Image source={characters["Bowser_Jr"]} style={styles.scrollIcon}/>}
                    {showCharacters["Duck_Hunt"] && <Image source={characters["Duck_Hunt"]} style={styles.scrollIcon}/>}
                    {showCharacters["Ryu"] && <Image source={characters["Ryu"]} style={styles.scrollIcon}/>}
                    {showCharacters["Ken"] && <Image source={characters["Ken"]} style={styles.scrollIcon}/>}
                    {showCharacters["Cloud"] && <Image source={characters["Cloud"]} style={styles.scrollIcon}/>}
                    {showCharacters["Corrin"] && <Image source={characters["Corrin"]} style={styles.scrollIcon}/>}
                    {showCharacters["Bayonetta"] && <Image source={characters["Bayonetta"]} style={styles.scrollIcon}/>}
                    {showCharacters["Inkling"] && <Image source={characters["Inkling"]} style={styles.scrollIcon}/>}
                    {showCharacters["Ridley"] && <Image source={characters["Ridley"]} style={styles.scrollIcon}/>}
                    {showCharacters["Simon"] && <Image source={characters["Simon"]} style={styles.scrollIcon}/>}
                    {showCharacters["Richter"] && <Image source={characters["Richter"]} style={styles.scrollIcon}/>}
                    {showCharacters["King_K_Rool"] && <Image source={characters["King_K_Rool"]} style={styles.scrollIcon}/>}
                    {showCharacters["Isabelle"] && <Image source={characters["Isabelle"]} style={styles.scrollIcon}/>}
                    {showCharacters["Incineroar"] && <Image source={characters["Incineroar"]} style={styles.scrollIcon}/>}
                    {showCharacters["Piranha_Plant"] && <Image source={characters["Piranha_Plant"]} style={styles.scrollIcon}/>}
                    {showCharacters["Joker"] && <Image source={characters["Joker"]} style={styles.scrollIcon}/>}
                    {showCharacters["Hero"] && <Image source={characters["Hero"]} style={styles.scrollIcon}/>}
                    {showCharacters["Banjo_and_Kazooie"] && <Image source={characters["Banjo_and_Kazooie"]} style={styles.scrollIcon}/>}
                    {showCharacters["Terry"] && <Image source={characters["Terry"]} style={styles.scrollIcon}/>}
                    {showCharacters["Byleth"] && <Image source={characters["Byleth"]} style={styles.scrollIcon}/>}
                    {showCharacters["Min_Min"] && <Image source={characters["Min_Min"]} style={styles.scrollIcon}/>}
                    {showCharacters["Steve"] && <Image source={characters["Steve"]} style={styles.scrollIcon}/>}
                    {showCharacters["Sephiroth"] && <Image source={characters["Sephiroth"]} style={styles.scrollIcon}/>}
                    {showCharacters["Pyra"] && <Image source={characters["Pyra"]} style={styles.scrollIcon}/>}
                    {showCharacters["Mythra"] && <Image source={characters["Mythra"]} style={styles.scrollIcon}/>}
                    {showCharacters["Kazuya"] && <Image source={characters["Kazuya"]} style={styles.scrollIcon}/>}
                    {showCharacters["Sora"] && <Image source={characters["Sora"]} style={styles.scrollIcon}/>}
                </View>
            </ScrollView>


            <View style={[styles.buttonBox, {marginTop:"auto", marginBottom:5, height:70}]}>
                <Pressable style={[styles.button, {width: "30%", backgroundColor: "red"}]} onPress={() => reset()}>
                    <Text style={styles.text}>Reset</Text>
                </Pressable>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    mainBox:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'white',
    },
    buttonBox:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 5,
        elevation: 3,
        backgroundColor: 'black', 
        width: 300,
        borderRadius: 12,
    },
    text:{
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',

    },
    image:{
        flex: 1,
        width: '100%',
        backgroundColor: '#0553',
    },
    charBox:{
        width: '100%',
        justifyContent: 'center',
        borderColor:"black",
        borderWidth:5,
        borderRadius:25,
    },
    scrollIcon:{
        width: 75, 
        height:75
    }
});
