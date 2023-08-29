const SearchList = ({valueSearchList,valueSearchListWeather, valueSetSearch}) => {    
return(
    <> 
        {valueSearchList.map((item, ind) =>(
        <a  className="main__search__btn" key={ind}
            onClick={() => valueSearchListWeather(item.nameCity)}
            onBlur={() => valueSetSearch(false)}
        >
            {item.nameCity}<span> — {item.nameCountry}</span>
        </a>
        ))}
    </>
    
)
}
export default SearchList