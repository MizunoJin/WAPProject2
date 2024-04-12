import { Link } from "react-router-dom";

//Favourite Item Section
export const FavouriteItemContent = ({ item }) => {
    return (
        <div className='d-flex align-items-center gap-2'>
            <img className='prop-fav-card-img rounded-2' src={`/images/${item.picture[0]}`} alt={item.title} />
            <div className="d-flex flex-column re-fs-12">
                <Link to={`/${item.id}`} className="fw-semibold text-black">{item.title}</Link>
                <small className="d-flex align-items-center gap-1"><i className="fa-solid fa-location-dot"></i>{item.location}</small>
                <div className='d-flex align-items-center gap-3 re-fs-11'>
                    <small className="d-flex align-items-center gap-1"><i className="fa-solid fa-bed"></i>{item.bedrooms}</small>
                    <small className="d-flex align-items-center gap-1"><i className="fa-solid fa-sack-dollar"></i>£{item.price.toLocaleString('en-UK')}</small>
                </div>
            </div>
        </div>
    );
};

//Main section where all the properties are listed
export const MainItemContent = ({ item }) => {
    return (
        <>
            <img className='prop-card-img hover-zoom' src={`/images/${item.picture[0]}`} alt={item.title} />
            <div className="d-flex flex-column p-2">
                <Link to={`/${item.id}`} className="fw-semibold text-black">{item.title}</Link>
                <small className="d-flex align-items-center gap-1"><i className="fa-solid fa-location-dot"></i>{item.location}</small>
                <div className='d-flex align-items-center gap-3'>
                    <small className=""><span className="fw-medium">Type: </span>{item.type}</small>
                    <small className="d-flex align-items-center gap-1"><i className="fa-solid fa-bed"></i>{item.bedrooms}</small>
                </div>
                <div className='d-flex align-items-center gap-3'>
                    <small className=""><span className="fw-medium">Tenure: </span>{item.tenure}</small>
                    <small className="d-flex align-items-center gap-1"><i className="fa-solid fa-sack-dollar"></i>£{item.price.toLocaleString('en-UK')}</small>
                </div>
                <small className=""><span className="fw-medium">Added: </span>{item.added}</small>
            </div>
        </>
    );
};

//Advanced Filter for searching properties. 
export const AdvancedFilterComp = ({ handleFilterChange, advancedFilter, handleFilterSearch, resetFilter }) => {
    return (
        <div className='row gx-3 p-3'>
            <div className="col-sm-6 d-flex flex-column pb-4 gap-1">
                <label htmlFor="type">Type</label>
                <select onChange={handleFilterChange} className='px-2 w-100' name="type" id="type">
                    <option value="">Any</option>
                    <option value="flat">Flat</option>
                    <option value="house">House</option>
                    <option value="maisonette">Maisonette</option>
                    <option value="bungalow">Bungalow</option>
                </select>
                <label htmlFor="location">Location</label>
                <input onChange={handleFilterChange} value={advancedFilter.location} className='px-2 w-100' type="text" name="location" id="location" />
                <div className="row gx-2 gy-1">
                    <div className="col-6">
                        <label htmlFor="fromdate">From Date</label>
                        <input onChange={handleFilterChange} value={advancedFilter.fromdate} className='px-2 w-100' type="date" name="fromdate" id="fromdate" />
                    </div>
                    <div className="col-6">
                        <label htmlFor="todate">To Date</label>
                        <input onChange={handleFilterChange} value={advancedFilter.todate} className='px-2 w-100' type="date" name="todate" id="todate" />
                    </div>
                </div>

            </div>
            <div className="col-sm-6 d-flex flex-column gap-1">
                <div className="row gx-2 gy-1">
                    <div className="col-6">
                        <label htmlFor="minprice">Min Price</label>
                        <input onChange={handleFilterChange} value={advancedFilter.minprice} className='px-2 w-100' type="number" name="minprice" id="minprice" min={0} />
                    </div>
                    <div className="col-6">
                        <label htmlFor="maxprice">Max Price</label>
                        <input onChange={handleFilterChange} value={advancedFilter.maxprice} className='px-2 w-100' type="number" name="maxprice" id="maxprice" min={0} />
                    </div>
                    <div className="col-6">
                        <label htmlFor="minbed">Min Bedroom</label>
                        <input onChange={handleFilterChange} value={advancedFilter.minbed} className='px-2 w-100' type="number" name="minbed" id="minbed" min={0} />
                    </div>
                    <div className="col-6">
                        <label htmlFor="maxbed">Max Bedroom</label>
                        <input onChange={handleFilterChange} value={advancedFilter.maxbed} className='px-2 w-100' type="number" name="maxbed" id="maxbed" min={0} />
                    </div>
                </div>
                <div className='d-flex justify-content-end gap-2'>
                    <button onClick={resetFilter} className='btn btn-warning mt-2'>Reset</button>
                    <button onClick={handleFilterSearch} className='btn btn-primary mt-2'>Search</button>
                </div>
            </div>
        </div>
    );
};

//       d-flex: Applies the Flexbox layout model to the container, enabling flex items to be aligned and distributed efficiently.
//       align-items-center: Aligns items in the center vertically within the flex container.
//       gap-2: Adds a gap (spacing) of size 2 (around 0.5rem) between flex/grid items.
//       rounded-2: Applies a moderate rounding to the corners of an element.
//       flex-column: Stacks flex items vertically.
//       fw-semibold: Sets the font weight to semi-bold.
//       text-black: Sets the text color to black.
//       p-2: Adds padding of size 2 (around 0.5rem) to all sides of an element.
//       fw-medium: Sets the font weight to medium.

//       row: Creates a row in a Bootstrap grid layout.
//       gx-3: Sets horizontal gutters (spacing) of size 3 (around 1rem) between columns in a row.
//       p-3: Adds padding of size 3 (around 1rem) to all sides of an element.
//       col-sm-6: Creates a column that spans 6 out of the 12 possible grid columns on small and larger devices.
//       pb-4: Adds padding-bottom of size 4 (around 1.5rem) to an element.
//       w-100: Sets the width of an element to 100%.
//       px-2: Adds horizontal padding (left and right) of size 2 (around 0.5rem) to an element.
//       gy-1: Sets vertical gutters (spacing) of size 1 (around 0.25rem) between rows in a grid layout.
//       btn: Basic Bootstrap button styling.
//       btn-warning: Applies a yellow/orange warning theme to buttons.
//       btn-primary: Applies a primary (usually blue) theme to buttons.
//       justify-content-end: Aligns items to the end (right) in a flex container.
//       mt-2: Adds margin-top of size 2 (around 0.5rem) to an element.