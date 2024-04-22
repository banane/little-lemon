import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon.db');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menuitems (id integer primary key not null, name text, price text, description text, image text, category text);'
        );
      },
      reject,
      resolve
    );
  });
}

export async function filterByQueryAndCategories(query, chosenCategories) {
  return new Promise((resolve) => {
    let newQuery = 'select * from menuitems where name like "%'+query+'%"';
    if (chosenCategories.length > 0) {
      const categories = chosenCategories.join('","');
      newQuery += ' AND category in ("'+ categories + '")';
    }
    console.log("filterByQueryAndCategories ");
    console.log(newQuery);

    db.transaction((tx) => {
      tx.executeSql(newQuery, [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}


export function deleteItems() {
  db.transaction((tx) => {
    tx.executeSql('delete from menuitems;')
  }
  );
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menuitems', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export async function getAllCategories() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select distinct category from menuitems order by category;', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  deleteItems();
  const stringValues = menuItems.map((item) => {
    return `('${item.name}', '${item.price}', '${removeQuotes(item.description)}', '${item.image}', '${item.category}')`;
  }).join(",");
  const statement = "INSERT INTO menuitems (name, price, description, image, category) VALUES " + String(stringValues) + ";";

  db.transaction((tx) => {
    tx.executeSql(statement);    
  });  
}

function removeQuotes(str){
  return str.replace(/'/g, "&#39;").replace(/"/g,"&quot;");
}