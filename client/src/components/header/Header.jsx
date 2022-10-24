import React, { useEffect, useState } from 'react';
import SearchData from '../UI/search/SearchData';
import './header.css';

const Header = ({
  pageName, 
  getSearchQuery, 
  value, 
  delSearchQuery, 
  searchQueryLength, 
  logout,
  moveHeader
}) => {

  console.log(moveHeader)
 
  return (
    <div className="header">
      <div className={moveHeader === false ? "header__inner" : "slided-content"}>
        <div className="search">
          {pageName === "deviceSearhPage" && (
            <SearchData
              placeholder="Поиск..."
              value={value}
              onChange={(e) => getSearchQuery(e.target.value)}
              delSearchQuery={delSearchQuery}
              searchQueryLength={searchQueryLength}
            />
          )}
        </div>
        <div className="header-menu">
          <ul>
            <li>menu 1</li>
            <li>menu 1</li>
            <li>menu 1</li>
            <li>menu 1</li>
          </ul>
        </div>
        <div className="user-info">
          <button onClick={logout}>Выйти</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
