import * as SQLITE from 'expo-sqlite';

const database = SQLITE.openDatabase('drinks.db');


export function initDb(){
    const promise = new Promise((resolve, reject)=>{
        
        database.transaction((transaction)=>{
            transaction.executeSql(
                `CREATE TABLE IF NOT EXISTS drinks (
                id INTEGER PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                provider TEXT NOT NULL,
                strength INTEGER NOT NULL,
                volume INTEGER NOT NULL,
                quantity INTEGER NOT NULL,
                day DATE NOT NULL
            )`,
            [],
            ()=>{
                console.log("created db");
                resolve();
            },
            (_, error)=>{
                console.log("erro")
                reject(error);
            }
            )
        })
    });

    return promise;
}


export function addDrinks(){
    const promise = new Promise((resolve, reject)=>{
        
        database.transaction((transaction)=>{
            transaction.executeSql(
                ``,
            [],
            ()=>{
                console.log("created db");
                resolve();
            },
            (_, error)=>{
                console.log("erro")
                reject(error);
            }
            )
        })
    });

    return promise;
}