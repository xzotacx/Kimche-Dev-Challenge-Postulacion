import React, { useState, useEffect } from "react";
import "./styles.css";
//Components
import { GroupSection, SearchComponent } from "../../components";
//Hooks
import { useQuery } from "@apollo/react-hooks";
//GrphQlQury
import { graphQL } from "../../services";
//Helpers
import { countrySplitByGroup } from "../../helpers";
import { languageCountrysDummy } from "./dummys/country-dumy";
function CountrySearchPage() {
  const { loading, error, data } = useQuery(graphQL.queries.GET_Countrys());
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [group, setGroup] = useState("");

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    if (data) {
      let _countries = countrySplitByGroup({
        countries: data.countries,
        group,
      });
      setCountries(_countries);
    }
    return () => {};
  }, [group]);

  useEffect(() => {
    if (!loading) {
      let _countries = countrySplitByGroup({
        countries: data.countries,
        group,
      });
      setCountries(_countries);
    }
    return () => {};
  }, [loading]);

  return (
    <section className="search-page__container" id="search">
      <div className="search-page__tittle">
        <h2>Country search</h2>
      </div>
      <div className="search-page__searcher">
        <SearchComponent
          onChangeFilter={(value) => setFilter(value)}
          onChangeGroup={(value) => setGroup(value)}
        />
      </div>
      <div className="search-page__groups">
        {countries.map(({ countries, group }) => (
          <GroupSection
            countries={countries}
            groupName={group}
            filter={filter}
            group={group}
          />
        ))}
      </div>
    </section>
  );
}

export default CountrySearchPage;
