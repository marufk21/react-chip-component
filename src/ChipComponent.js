import React, { useState, useEffect } from "react";
import jsonData from "./data.json";

const ChipComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [chips, setChips] = useState([]);
  const [availableItems, setAvailableItems] = useState([]);

  useEffect(() => {
    setAvailableItems(
      jsonData.email_accounts.map((account) => ({
        username: account.username,
        email: account.email,
        icon: account.icon,
      }))
    );
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleItemClick = (item) => {
    setChips([...chips, item]);
    setAvailableItems(
      availableItems.filter(
        (availableItem) => availableItem.username !== item.username
      )
    );
    setInputValue("");
  };

  const handleChipRemove = (chipToRemove) => {
    setChips(chips.filter((chip) => chip !== chipToRemove));
    setAvailableItems([...availableItems, chipToRemove]);
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <div
            key={chip.username}
            className="inline-flex rounded-2xl items-center px-2  me-2 text-sm font-medium text-blue-800 bg-blue-100 dark:bg-blue-900 dark:text-blue-300"
          >
            <div className="flex items-center">
            <span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clipRule="evenodd"
                />

              </svg>
            </span>
              
              {chip.username}
              <span
                className=" items-center p-1 text-sm text-blue-800 bg-transparent rounded-sm"
                onClick={() => handleChipRemove(chip)}
              > X
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="input-field rounded-3xl p-2 mt-2"
          placeholder=""
        />
        <div className="absolute top-10 left-0 w-full">
          {availableItems
            .filter((item) =>
              item.username.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((item) => (
              <div
                key={item.username}
                className="available-item cursor-pointer text-blue-500 p-2 hover:bg-blue-100"
                onClick={() => handleItemClick(item)}
              >
                <div className="flex items-center">
                  <span className="flex items-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        clipRule="evenodd"
                      />

                    </svg>
                    <span className="text-base font-medium">{item.username}</span>
                  </span>
                  <span className="ml-12 text-base font-normal">{item.email}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ChipComponent;