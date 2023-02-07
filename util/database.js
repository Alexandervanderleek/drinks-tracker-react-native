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

                resolve();
            },
            (_, error)=>{

                reject(error);
            }
            )
        })

        const today = new Date();
        today.setDate(today.getDate() - 30);

        database.transaction((transaction)=>{
            transaction.executeSql(
                `DELETE FROM drinks WHERE day < ?`,
            [today.toISOString().slice(0,10)],
            ()=>{
                resolve();
            },
            (_, error)=>{
                console.log(error)
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

                            resolve();
                        },
                        (_, error)=>{

                            reject(error);
                        }
                        )
                        
                    }else{
                        transaction.executeSql(
                            `INSERT INTO drinks (name, icon, provider, strength, volume, quantity, day)
                            VALUES (?, ?, ?, ?, ?, ?, ?)`,
                        [item.name, item.icon, item.provider, item.strength, item.volume, item.quantity, item.date],
                        ()=>{
                            resolve();
                        },
                        (_, error)=>{
                            reject(error);
                        }
                        )}
                })
        })
    });

    return promise;
}

export function todaysDrinks(date){
    const promise = new Promise((reslove, reject)=>{
        database.transaction((transaction)=>{
            transaction.executeSql(`
                SELECT * FROM drinks WHERE day = ? 
            `, [date], (_,result)=>{
                const places = [];
                let alch = 0;

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
                    alch += item.quantity * item.volume * (item.strength/100)
                }

                reslove({drinks:places,alchohol: alch/10});
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
                SELECT SUM(volume*strength*quantity) AS vol FROM drinks WHERE day >= ? 
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


export function deleteDrink(id, todaysDrinks){
    const promise = new Promise((resolve, reject)=>{
      
            const index = todaysDrinks.drinks.findIndex((x)=>{return x.id === id});
            
            database.transaction((transaction)=>{

                    if(todaysDrinks.drinks[index].quantity>1){
                        transaction.executeSql(
                            `UPDATE drinks SET quantity = ? WHERE id = ?`,
                        [todaysDrinks.drinks[index].quantity-1 , id],
                        ()=>{
                            resolve();
                        },
                        (_, error)=>{
                            console.log("error minus")
                            console.log(error);
                            reject(error);
                        }
                        )
                        
                    }else{
                        transaction.executeSql(
                            `DELETE FROM drinks WHERE id = ?`,
                        [id],
                        ()=>{
                            resolve();
                        },
                        (_, error)=>{

                            reject(error);
                        }
                        )}
                })
        
    });

    return promise;
}


export function unitsCalculations(){
    const promise = new Promise((reslove, reject)=>{
        var d = new Date();
        d.setDate(d.getDate()-30);
        database.transaction((transaction)=>{
            transaction.executeSql(`
                SELECT SUM(volume*strength/100*quantity) as total, day FROM drinks WHERE day >= ? GROUP BY day 
            `, [d.toISOString().substring(0,10)], (_,result)=>{
                reslove(result.rows._array);
            },(_,error)=>{
                reject(error);
            })
        })
    })

    return promise;
}


export function terminate(){
    const promise = new Promise((reslove, reject)=>{
       
        database.transaction((transaction)=>{
            transaction.executeSql(`
                DELETE FROM drinks
            `, [], (_,result)=>{
                reslove(result);
            },(_,error)=>{
                reject(error);
            })
        })
    })

    return promise;
}