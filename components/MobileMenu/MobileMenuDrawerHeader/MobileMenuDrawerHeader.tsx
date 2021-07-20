import { useState } from "react";
import styles from "./MobileMenuDrawerHeader.module.css";
const suggestions = ["Whitepaper", "Toro Rounds", "Winners", "Buy Now"];
interface MobileMenuDrawerProps {
  searchDrawer: boolean;
  setSearchDrawer: (searchDrawer: boolean) => void;
}
const MobileMenuDrawerHeader: React.FC<
  React.HTMLAttributes<HTMLDivElement> & MobileMenuDrawerProps
> = ({ searchDrawer, setSearchDrawer }) => {
  const [suggestionsArr, setSuggestionsArr] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchSection = () => {
    setSearchDrawer(!searchDrawer);
  };
  return (
    <div className={styles.wrapper__header}>
      <div className={styles.wrapper__brand}>
        <img src="./gain-protocol-logo.svg" />
      </div>
      <button
        onClick={handleSearchSection}
        className={styles.wrapper__header__search}
      >
        <div
          className={`${styles.search__icon} ${
            searchDrawer ? styles.active__search : ""
          }`}
        >
          <span className={`${styles.search__line}`}></span>
          <span
            className={`${styles.search__circle} ${styles.search__third}`}
          ></span>
        </div>
      </button>
      <div
        id="wrapper__header__search__section"
        className={`${styles.wrapper__header__search__section} ${
          searchDrawer ? styles.wrapper__header__search__section__active : ""
        }`}
      >
        <div className={styles.wrapper__search__box}>
          <input
            className={styles.wrapper__search}
            id="search-box"
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <p className={styles.wrapper__search__text}>Search Suggestions</p>
          <ul
            style={{ position: "absolute" }}
            id="suggestions"
            className={styles.search__suggestions}
          >
            {displayMatches(searchQuery).map((item) => {
              return item;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileMenuDrawerHeader;

function findMatches(wordToMatch: string) {
  return suggestions.filter((suggestion) => {
    const regex = new RegExp(wordToMatch, "gi");
    return suggestion.match(regex) || suggestion.match(regex);
  });
}
function displayMatches(e: string) {
  const matchArray = findMatches(e);
  const html = matchArray.map((suggestion) => {
    const regex = new RegExp(e, "gi");
    const highlighted = e === "" ? suggestion : suggestion.replace(regex, e);
    // console.log(suggestion.match(regex)?.map((match=>{

    // }));
    return <li key={suggestion}>{highlighted}</li>;
  });
  if (matchArray.length > 0) {
    return html;
  } else {
    return [<li key={"no result"}>Sorry no results found</li>];
  }
}
