import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon2');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menuitems (id integer primary key not null, name text, price text, description text, image text);'
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  console.log("in db query to get menu items");
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menuitems', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  const stringValues = menuItems.map((item) => {
    return `('${item.name}', '${item.price}', '${item.description}', '${item.image}')`;
  }).join(",");

  db.transaction((tx) => {
    tx.executeSql("INSERT INTO menuitems (name, price, description, image) VALUES " + String(stringValues))
    
  });  
}
