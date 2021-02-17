import React, { useState, useEffect } from "react";

// SERVICES
import menuService from './services/menuService';

function App() {
  const [menus, setmenus] = useState(null);

  useEffect(() => {
    if(!menus) {
      getMenus();
    }
  })

  const getMenus = async () => {
    let res = await menuService.getAll();
    console.log(res);
    setmenus(res);
  }

  const renderMenu = menu => {
    return (
      <li key={menu._id} className="list__item product">
        <h3 className="product__name">{menu.name}</h3>
        <p className="product__price">{menu.price}</p>
      </li>
    );
  };

  return (
    <div className="App">
      <ul className="list">
        {(menus && menus.length > 0) ? (
          menus.map(menu => renderMenu(menu))
        ) : (
          <p>No products found</p>
        )}
      </ul>
    </div>
  );
}

export default App;
