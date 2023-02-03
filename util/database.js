import * as SQLITE from 'expo-sqlite';

const database = SQLITE.openDatabase('drinks.db');


export function initDb(){
    const promise = new Promise((resolve, reject)=>{
        
        database.transaction((transaction)=>{
            transaction.executeSql(
                `CREATE TABLE IF NOT EXISTS drinks (
                id INTEGER PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                icon TEXT NOT NULL,
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


export function addDrinks(drinks, todaysDrinks){
    const promise = new Promise((resolve, reject)=>{
        drinks.forEach((item)=>{
            const index = todaysDrinks.findIndex((x)=>{return x.name === item.name});
            database.transaction((transaction)=>{

                    if(index>-1){
                        transaction.executeSql(
                            `UPDATE drinks SET quantity = ? WHERE id = ?`,
                        [item.quantity+ todaysDrinks[index].quantity, todaysDrinks[index].id],
                        ()=>{
                            console.log("success update");
                            resolve();
                        },
                        (_, error)=>{
                            console.log("error update")
                            console.log(error);
                            reject(error);
                        }
                        )
                        
                    }else{
                        transaction.executeSql(
                            `INSERT INTO drinks (name, icon, provider, strength, volume, quantity, day)
                            VALUES (?, ?, ?, ?, ?, ?, ?)`,
                        [item.name, item.icon, item.provider, item.strength, item.volume, item.quantity, item.date],
                        ()=>{
                            console.log("success adding");
                            resolve();
                        },
                        (_, error)=>{
                            console.log("error adding")
                            console.log(error);
                            reject(error);
                        }
                        )}
                })
        })
    });

    return promise;
}

export function todaysDrinks(){
    const promise = new Promise((reslove, reject)=>{
        database.transaction((transaction)=>{
            transaction.executeSql(`
                SELECT * FROM drinks WHERE day = ? 
            `, [(new Date()).toISOString().substring(0,10)], (_,result)=>{
                console.log(result);
                const places = [];

                for(const item of result.rows._array){
                    places.push({
                        id: item.id,
                        name: item.name,
                        icon: item.icon,
                        provider: item.provider,
                        strength: item.strength,
                        volume: item.volume,
                        quantity: item.quantity,
                        date: item.day
                    })
                }

                reslove(places);
            },(_,error)=>{
                reject(error);
            })
        })
    })

    return promise;
}

export function thisWeeksConsumed(){
    const promise = new Promise((resolve, reject)=>{
        
        var d = new Date();
        d.setDate(d.getDate()-5);
        database.transaction((transaction)=>{
            transaction.executeSql(`
                SELECT SUM(volume*strength/100*quantity) AS vol FROM drinks WHERE day >= ? 
            `, [d.toISOString().substring(0,10)], (_,result)=>{
                
                    resolve(result.rows._array[0]);
                
                
                
            },(_,error)=>{
                console.log("error")
                reject(error);
            })
        })
    })

    return promise;
}